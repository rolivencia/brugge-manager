const environment = require("server/_helpers/environment");

const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const moment = require("moment");

const Coupon = require("./coupon.model");
const User = require("../users/user.model");
const CouponType = require("./coupon-type.model");
const Customer = require("../customer/customer.model");
const CustomerCoupon = require("../customer/customer-coupon.model");

const CouponHelpers = require("./coupon.helpers");

// Constantes para definir las distintas lógicas de negocio para cada tipo de cupón
const ONE_TIME = 1;
const MULTIPLE_DIFFERENT_DAYS = 2;
const HAPPY_HOUR = 3;

module.exports = {
  canRedeem,
  create,
  get,
  getAll,
  getCurrent,
  getRedeemed,
  getRedeemedByDate,
  getRedeemable,
  redeem,
  remove,
  status,
  update
};

/**
 * Obtiene todos los cupones canjeados por un cliente. Soporta paginación.
 * @param idCustomer
 * @param limit
 * @param offset
 * @returns {Promise<CustomerCoupon[]>}
 */
async function getRedeemed(idCustomer, limit, offset) {
  limit = limit ? parseInt(limit) : 25;
  offset = offset ? parseInt(offset) : 0;

  return await CustomerCoupon().findAll({
    limit: limit,
    offset: offset,
    include: [{ as: "coupon", model: Coupon() }],
    where: { idCustomer: idCustomer },

    order: [["createdAt", "DESC"]]
  });
}

/**
 * Obtiene los cupones canjeados por el cliente que están actualmente vigentes.
 * @param idCustomer
 * @returns {Promise<CustomerCoupon[]>}
 */
async function getCurrentRedeemed(idCustomer) {
  return await CustomerCoupon().findAll({
    include: [
      {
        as: "coupon",
        model: Coupon(),
        where: {
          deleted: 0,
          enabled: 1,
          endsAt: {
            [Op.gte]: moment().toDate()
          }
        }
      }
    ],
    where: { idCustomer: idCustomer },

    order: [["createdAt", "DESC"]]
  });
}

async function status(idCoupon, idCustomer) {
  const couponData = await Coupon().findOne({
    where: {
      id: idCoupon
    },
    include: [
      { as: "type", model: CouponType() },
      {
        as: "user",
        model: User()
      }
    ]
  });

  const customerData = await Customer().findOne({ where: { id: idCustomer } });

  const redeemedCoupons = await CustomerCoupon().findAndCountAll({
    include: [
      {
        as: "coupon",
        model: Coupon(),
        attributes: ["id", "title", "dailyCoupon"],
        include: [
          { as: "type", model: CouponType(), attributes: ["id", "description"] }
        ]
      },
      {
        as: "customer",
        model: Customer(),
        attributes: [
          "id",
          [
            Sequelize.fn(
              "CONCAT",
              Sequelize.col("first_name"),
              " ",
              Sequelize.col("last_name")
            ),
            "fullName"
          ]
        ]
      }
    ],
    where: { idCustomer: idCustomer }
  });

  return new Promise((resolve, reject) => {
    const coupon = {
      ...couponData.dataValues,
      audit: {
        createdAt: couponData.createdAt,
        updatedAt: couponData.updatedAt,
        enabled: couponData.enabled,
        deleted: couponData.deleted
      }
    };

    const customer = {
      ...customerData.dataValues,
      audit: {
        createdAt: customerData.createdAt,
        updatedAt: customerData.updatedAt,
        enabled: customerData.enabled,
        deleted: customerData.deleted
      }
    };

    if (coupon && customer && redeemedCoupons) {
      const status = canRedeem(coupon, redeemedCoupons);
      resolve({
        coupon: coupon,
        customer: customer,
        redeemedCoupons: redeemedCoupons,
        status: status
      });
    } else {
      reject(error);
    }
  });
}

/**
 * Redime (canjea) un cupón determinado para un cliente determinado, en base a sus respectivos ids
 * @param idCoupon
 * @param idCustomer
 * @returns {Promise}
 */
async function redeem({ idCoupon, idCustomer }) {
  const redeemed = await CustomerCoupon().create({
    idCoupon: idCoupon,
    idCustomer: idCustomer
  });

  return new Promise((resolve, reject) => {
    redeemed.dataValues
      ? resolve({
          ...redeemed.dataValues,
          status: redeemed.dataValues.id ? "success" : "error",
          message: redeemed.dataValues.id
            ? "Cupón canjeado con éxito."
            : "Error. No pudo canjearse el cupón."
        })
      : reject(error);
  });
}

/**
 * Devuelve información acerca de si un cupón determinado es o no canjeable para un determinado cliente
 * @param coupon
 * @param redeemedCoupons
 * @returns {{canRedeem: boolean, status: string}}
 */
function canRedeem(coupon, redeemedCoupons) {
  //TODO: Incluir el caso para happy hour
  //Strings de status posibles: 'can-redeem', 'redeemed', 'expired'

  // Si el cupón está expirado
  if (isExpired(coupon) || coupon.audit.deleted) {
    return { canRedeem: false, status: "expired" };
  }

  // Cupones de canje diario - Valida si hay otras redenciones de "cupones diarios" en la jornada de trabajo.
  // Validación anterior al canje en distintos días y del de canje único, dado el orden de prioridad.
  // (ambos tipos de cupones, indistintamente, pueden tener la restricción de "canje diario")
  if (coupon.dailyCoupon) {
    const dailyRedeemedTodayCount = redeemedTodayList(
      redeemedCoupons.rows
    ).filter(
      redeemedCoupon =>
        redeemedCoupon.coupon.dailyCoupon &&
        coupon.id !== redeemedCoupon.coupon.id
    ).length;

    if (dailyRedeemedTodayCount > 0) {
      return { canRedeem: false, status: "redeemed-other-daily" };
    }
  }

  // Primer canje de cualquier tipo
  if (!_hasBeenRedeemed(coupon, redeemedCoupons)) {
    return { canRedeem: true, status: "can-redeem" };
  }

  // Canje único - Cupón ya canjeado
  if (
    coupon.type.id === ONE_TIME &&
    _hasBeenRedeemed(coupon, redeemedCoupons)
  ) {
    return { canRedeem: false, status: "redeemed" };
  }

  // Canje múltiple - distintos días
  if (
    coupon.type.id === MULTIPLE_DIFFERENT_DAYS &&
    !_hasBeenRedeemedToday(coupon, redeemedCoupons)
  ) {
    return { canRedeem: true, status: "can-redeem" };
  } else if (
    coupon.type.id === MULTIPLE_DIFFERENT_DAYS &&
    !_hasBeenRedeemedToday(coupon, redeemedCoupons)
  ) {
    //TODO: Customizar el mensaje para el caso de canjes múltiples en distintos días
    return { canRedeem: false, status: "redeemed" };
  }
  // Default -> Ya canjeado
  return { canRedeem: false, status: "redeemed" };
}

/**
 * Determina si, en algún momento, un cupón ha sido redimido
 * @param couponToCheck
 * @param redeemedCoupons
 * @returns {boolean}
 * @private
 */
const _hasBeenRedeemed = (couponToCheck, redeemedCoupons) => {
  return (
    redeemedCoupons.rows.filter(
      coupon => couponToCheck.id === coupon.dataValues.idCoupon
    ).length > 0
  );
};

/**
 * Devuelve un boolean que especifica si una lista de redenciones de cupones
 * tiene alguna redención durante la jornada de hoy.
 * @param couponToCheck
 * @param redeemedCoupons
 * @returns {boolean}
 */
function _hasBeenRedeemedToday(couponToCheck, redeemedCoupons) {
  const couponRedeemed = _hasBeenRedeemed(couponToCheck, redeemedCoupons);
  return (
    couponRedeemed &&
    redeemedCoupons.rows.filter(
      coupon =>
        couponToCheck.id === coupon.dataValues.idCoupon &&
        CouponHelpers.dateInCurrentWorkday(coupon.dataValues.createdAt)
    ).length !== 0
  );
}

/**
 * Gets the redeemable coupons for a given customer
 * @param idCustomer
 * @returns {Promise}
 */
async function getRedeemable(idCustomer) {
  const currentCoupons = await getCurrent();
  const currentRedeemed = await getCurrentRedeemed(idCustomer, 1000, 0);

  // Discrimino qué cupones vigentes de única vez fueron canjeados
  const redeemedOneTime = currentRedeemed.filter(
    redemption => redemption.coupon.idType === ONE_TIME
  );

  // Discrimino qué cupones vigentes de múltiples veces fueron canjeados
  const redeemedMultipleTimes = currentRedeemed.filter(
    redemption =>
      redemption.coupon.idType === MULTIPLE_DIFFERENT_DAYS &&
      CouponHelpers.redeemedToday(redemption)
  );

  // TODO: Discriminar cupones diarios ya canjeados, para mostrar al cliente.
  let redeemableCoupons = [];
  const validRedemptions = redeemedOneTime.concat(redeemedMultipleTimes);

  // Calculo la intersección entre los cupones redimidos y los disponibles para canje
  currentCoupons.forEach(coupon => {
    const intersection = validRedemptions
      .filter(redeemed => redeemed.idCoupon === coupon.id)
      .map(redeemed => redeemed.coupon);

    if (!intersection.length) {
      redeemableCoupons.push(coupon);
    }
  });

  const returnedCoupons = redeemableCoupons.map(coupon => ({
    id: coupon.id,
    title: coupon.title,
    code: coupon.code,
    description: coupon.description,
    startsAt: coupon.startsAt,
    endsAt: coupon.endsAt,
    imageUrl: coupon.imageUrl,
    type: coupon.type,
    user: coupon.user,
    audit: {
      createdAt: coupon.createdAt,
      updatedAt: coupon.updatedAt,
      enabled: coupon.enabled,
      deleted: coupon.deleted
    }
  }));

  return new Promise((resolve, reject) => {
    returnedCoupons && currentRedeemed
      ? resolve(returnedCoupons)
      : reject(error);
  });
}

/**
 * Determina si un cupón dado está expirado (su fecha de validez excede a la actual).
 * @param coupon
 * @returns {boolean}
 */
function isExpired(coupon) {
  const currentDate = moment();
  const expirationDate = moment(coupon.endsAt);
  return currentDate.isAfter(expirationDate);
}

/**
 * Filtra, en base a la lista de redención de cupones pasada como parámetro,
 * cuáles de esas redenciones fueron hechas durante la actual jornada de trabajo
 * @param redeemedCoupons
 * @returns {CustomerCoupon[]}
 */
function redeemedTodayList(redeemedCoupons) {
  return redeemedCoupons.filter(redeemedCoupon =>
    CouponHelpers.dateInCurrentWorkday(redeemedCoupon.dataValues.createdAt)
  );
}

/**
 * Mapea la lista de redenciones pasada como parámetro a una lista con sólo las fechas
 * de estas redenciones, en formato date nativo
 * @param redeemedCoupons
 * @returns {Date[]}
 * @private
 */
const _mapRedemptionDates = redeemedCoupons => {
  return redeemedCoupons.rows
    ? redeemedCoupons.rows.map(redemption => redemption.createdAt)
    : redeemedCoupons.map(redemption => redemption.createdAt);
};

/**
 * Obtiene un cupón en base a su id
 * @param id
 * @returns {Promise}
 */
async function get(id) {
  const retrievedCoupon = await Coupon().findOne({
    include: [
      { as: "type", model: CouponType(), attributes: ["id", "description"] },
      {
        as: "user",
        model: User()
      }
    ],
    where: {
      id: id
    }
  });

  return new Promise((resolve, reject) => {
    if (retrievedCoupon) {
      resolve({
        id: retrievedCoupon.id,
        title: retrievedCoupon.title,
        code: retrievedCoupon.code,
        description: retrievedCoupon.description,
        startsAt: retrievedCoupon.startsAt,
        endsAt: retrievedCoupon.endsAt,
        imageUrl: retrievedCoupon.imageUrl,
        type: retrievedCoupon.type,
        user: retrievedCoupon.user,
        audit: {
          createdAt: retrievedCoupon.createdAt,
          updatedAt: retrievedCoupon.updatedAt,
          enabled: retrievedCoupon.enabled,
          deleted: retrievedCoupon.deleted
        }
      });
    } else {
      reject(error);
    }
  });
}

/**
 * Elimina lógicamente un cupón en base a su id
 * @param id
 * @returns {Promise<Promise<[number, Coupon[]]>>}
 */
async function remove(id) {
  return Coupon().update({ deleted: 1 }, { where: { id: id } });
}

/**
 * Obtiene los cupones vigentes (no expirados ni eliminados)
 * @returns {Promise<Promise<Coupon[]>>}
 */
async function getCurrent() {
  return Coupon().findAll({
    where: {
      deleted: 0,
      enabled: 1,
      endsAt: {
        [Op.gte]: moment().toDate()
      }
    },
    order: [["updatedAt", "DESC"]]
  });
}

/**
 * Añade un nuevo cupón al sistema
 * @param title
 * @param description
 * @param startsAt
 * @param endsAt
 * @param idType
 * @param idUser
 * @param code
 * @param imageUrl
 * @param dailyCoupon
 * @returns {Promise<Promise<Coupon>>}
 */
async function create({
  title,
  description,
  startsAt,
  endsAt,
  idType,
  idUser,
  code,
  imageUrl,
  dailyCoupon
}) {
  return Coupon().create({
    title: title,
    startsAt: startsAt,
    endsAt: endsAt,
    description: description,
    code: code,
    imageUrl: imageUrl,
    dailyCoupon: dailyCoupon,
    idUser: idUser,
    idType: idType
  });
}

/**
 * Obtiene todos los cupones disponibles en el sistema. Los parámetros "expired" y "deleted" determinan si también son
 * devueltos los cupones expirados o eliminados, respectivamente
 * @param expired
 * @param deleted
 * @returns {Promise}
 */
async function getAll(expired, deleted) {
  const result = await Coupon().findAll({
    where: {
      deleted: deleted === "true" ? 1 : 0,
      enabled: 1,
      endsAt:
        expired === "true"
          ? {
              [Op.ne]: null
            }
          : {
              [Op.gte]: moment().toDate()
            }
    },
    order: [["updatedAt", "DESC"]],
    include: [
      { as: "type", model: CouponType(), attributes: ["id", "description"] },
      {
        as: "user",
        model: User()
      }
    ]
  });

  return new Promise((resolve, reject) => {
    const coupons = result.map(coupon => ({
      id: coupon.id,
      title: coupon.title,
      code: coupon.code,
      description: coupon.description,
      startsAt: coupon.startsAt,
      endsAt: coupon.endsAt,
      imageUrl: coupon.imageUrl,
      dailyCoupon: coupon.dailyCoupon,
      type: coupon.type,
      user: coupon.user,
      audit: {
        createdAt: coupon.createdAt,
        updatedAt: coupon.updatedAt,
        enabled: coupon.enabled,
        deleted: coupon.deleted
      }
    }));

    if (true) {
      resolve(coupons);
    } else {
      reject(error);
    }
  });
}

/**
 * Actualiza un cupón con los datos pasados como parámetro, en base a su id
 * @param id
 * @param title
 * @param description
 * @param startsAt
 * @param endsAt
 * @param idType
 * @param idUser
 * @param code
 * @param imageUrl
 * @param dailyCoupon
 * @returns {Promise<Promise<[number, Coupon[]]>>}
 */
async function update({
  id,
  title,
  description,
  startsAt,
  endsAt,
  idType,
  idUser,
  code,
  imageUrl,
  dailyCoupon
}) {
  return Coupon().update(
    {
      title: title,
      description: description,
      startsAt: startsAt,
      endsAt: endsAt,
      idType: idType,
      idUser: idUser,
      code: code,
      imageUrl: imageUrl,
      dailyCoupon: dailyCoupon
    },
    { where: { id: id } }
  );
}

/**
 * Permite obtener los datos de canje de cupones entre las fechas determinadas en los parámetros
 * @param dateFrom - Date
 * @param dateTo - Date
 * @returns {Promise<Promise<CustomerCoupon[]>>}
 */
async function getRedeemedByDate(dateFrom, dateTo) {
  const workdayInterval = CouponHelpers.getWorkdayInterval(dateFrom, dateTo);
  const startingDate = workdayInterval.startingDate;
  const endingDate = workdayInterval.endingDate;

  return CustomerCoupon().findAll({
    where: {
      createdAt: {
        [Op.between]: [startingDate, endingDate]
      }
    },
    attributes: ["id", "createdAt"],
    include: [
      {
        as: "coupon",
        model: Coupon(),
        attributes: ["id", "title"],
        include: [
          { as: "type", model: CouponType(), attributes: ["id", "description"] }
        ]
      },
      {
        as: "customer",
        model: Customer(),
        attributes: [
          "id",
          [
            Sequelize.fn(
              "CONCAT",
              Sequelize.col("first_name"),
              " ",
              Sequelize.col("last_name")
            ),
            "fullName"
          ]
        ]
      }
    ]
  });
}
