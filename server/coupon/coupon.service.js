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
  return Coupon().findAll({
    include: [
      {
        model: CouponType(),
        attributes: ["id", "description"]
      },
      {
        model: User(),
        attributes: ["id", "first_name", "last_name", "user_name"]
      }
    ]
  });
}

async function update() {}
