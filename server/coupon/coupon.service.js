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
      ...couponData,
      audit: {
        createdAt: couponData.createdAt,
        updatedAt: couponData.updatedAt,
        enabled: couponData.enabled,
        deleted: couponData.deleted
      }
    };

    const customer = {
      ...customerData,
      audit: {
        createdAt: customerData.createdAt,
        updatedAt: customerData.updatedAt,
        enabled: customerData.enabled,
        deleted: customerData.deleted
      }
    };

    if (coupon && customer && redeemedCoupons) {
      resolve({
        coupon: coupon,
        customer: customer,
        redeemedCoupons: redeemedCoupons
      });
    } else {
      reject(error);
    }
  });
}

async function redeem(idCoupon, idCustomer) {
  const redeemed = CustomerCoupon().findOrCreate({
    where: Sequelize.or(
      {
        idCoupon: idCoupon
      },
      { idCustomer: idCustomer }
    ),
    defaults: {
      idCoupon: idCoupon,
      idCustomer: idCustomer
    }
  });

  return new Promise((resolve, reject) => {
    const [redeemedCouponData, isNewRecord] = redeemed;
    redeemedCouponData.dataValues
      ? resolve({ ...redeemedCouponData.dataValues, created: isNewRecord })
      : reject({});
  });
}

async function canRedeem(idCoupon, idCustomer) {
  //We check if the coupon is valid for redemption
  const coupon = Coupon().findOne({
    where: { id: idCoupon }
  });

  //We check if the coupon has already bee redeemed
  const redeemedCoupons = await CustomerCoupon().findAndCountAll({
    where: { idCoupon: idCoupon, idCustomer: idCustomer }
  });

  return new Promise((resolve, reject) => {
    if (redeemedCoupons) {
      resolve({
        canRedeem: redeemedCoupons.count === 0,
        message:
          redeemedCoupons.count === 0
            ? "El cliente puede redimir este cupón"
            : "El cliente ya ha redimido este cupón"
      });
    } else {
      reject(error);
    }
  });
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

async function getAll() {
  const result = await Coupon().findAll({
    where: {
      deleted: 0,
      enabled: 1
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
