const environment = require("server/_helpers/environment");

const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const moment = require("moment");

const Coupon = require("./coupon.model");
const User = require("../users/user.model");
const CouponType = require("./coupon-type.model");
const Customer = require("../customer/customer.model");
const CustomerCoupon = require("../customer/customer-coupon.model");

module.exports = {
  canRedeem,
  create,
  get,
  getAll,
  getCurrent,
  redeem,
  remove,
  status,
  update
};

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
    where: { idCoupon: idCoupon, idCustomer: idCustomer }
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

function canRedeem(coupon, redeemedCoupons) {
  //Strings de status posibles: 'can-redeem', 'redeemed', 'expired'

  // Constantes para definir las distintas lógicas de negocio para cada tipo de cupón
  const ONE_TIME = 1;
  const MULTIPLE_DIFFERENT_DAYS = 2;

  if (isExpired(coupon) || coupon.audit.deleted) {
    return { canRedeem: false, status: "expired" };
  }

  // Primer canje de cualquier tipo
  if (redeemedCoupons.count === 0) {
    return { canRedeem: true, status: "can-redeem" };
  }

  // Canje único - Cupón ya canjeado
  if (coupon.type.id === ONE_TIME && redeemedCoupons.count !== 0) {
    return { canRedeem: false, status: "redeemed" };
  }

  // Canje múltiple - distintos días
  if (
    coupon.type.id === MULTIPLE_DIFFERENT_DAYS &&
    !redeemedToday(coupon, redeemedCoupons)
  ) {
    return { canRedeem: true, status: "can-redeem" };
  }

  // Default -> Ya canjeado
  return { canRedeem: false, status: "redeemed" };
}

function isExpired(coupon) {
  const currentDate = moment();
  const expirationDate = moment(coupon.endsAt);
  return currentDate.isAfter(expirationDate);
}

function redeemedToday(coupon, redeemedCoupons) {
  const today = moment();
  const redeemedDates = redeemedCoupons.rows.map(redemption =>
    moment(redemption.createdAt)
  );
  return (
    redeemedDates.filter(redeemedDate => today.isSame(redeemedDate, "day"))
      .length !== 0
  );
}

async function get(id) {
  return Coupon().findAll({
    where: {
      id: id
    }
  });
}

async function remove(id) {
  return Coupon().update({ deleted: 1 }, { where: { id: id } });
}

async function getCurrent() {
  return Coupon().findAll({
    where: {
      deleted: 0,
      enabled: 1,
      endsAt: {
        [Op.gte]: moment().toDate()
      }
    }
  });
}

async function create({
  title,
  description,
  startsAt,
  endsAt,
  idType,
  idUser,
  code,
  imageUrl
}) {
  return Coupon().create({
    title: title,
    startsAt: startsAt,
    endsAt: endsAt,
    description: description,
    code: code,
    imageUrl: imageUrl,
    idUser: idUser,
    idType: idType
  });
}

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

async function update({
  id,
  title,
  description,
  startsAt,
  endsAt,
  idType,
  idUser,
  code,
  imageUrl
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
      imageUrl: imageUrl
    },
    { where: { id: id } }
  );
}
