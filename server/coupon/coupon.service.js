const environment = require("server/_helpers/environment");
const Coupon = require("./coupon.model");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const moment = require("moment");

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
  return Coupon().findAll();
}

async function update() {}
