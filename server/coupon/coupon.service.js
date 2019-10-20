const environment = require("server/_helpers/environment");

const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const moment = require("moment");

const Coupon = require("./coupon.model");
const User = require("../users/user.model");
const CouponType = require("./coupon-type.model");

module.exports = {
  getAll,
  getCurrent
};

async function getAll() {}

function getCurrent() {
  return Coupon().findAll({
    where: {
      endsAt: {
        [Op.gte]: moment().toDate()
      }
    }
  });
}

async function create({
  title,
  startsAt,
  endsAt,
  description,
  type,
  code,
  imageUrl,
  user
}) {
  const newCoupon = await Coupon()
    .create({
      title: title,
      startsAt: startsAt,
      endsAt: endsAt,
      description: description,
      code: code,
      imageUrl: imageUrl,
      idUser: user.id,
      idType: type.id
    })
    .then(coupon => {
      console.log(coupon);
    });
}

async function getAll() {
  const result = await Coupon().findAll({
    include: [
      { as: "type", model: CouponType() },
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

async function update() {}
