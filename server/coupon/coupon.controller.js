const express = require("express");
const router = express.Router();
const couponService = require("./coupon.service");

// router.delete("/remove", remove);
// router.put("/update", update);
router.post("/create", create);
// router.get("/get", get);
router.get("/current", getCurrent);
router.get("/", getAll);

module.exports = router;

const remove = () => {};

const update = () => {};

function create(req, res, next) {
  couponService
    .create(req.body)
    .then(coupon => {
      if (coupon) {
        console.log(coupon);
        res.json(coupon);
      } else {
        res.status(400).json({
          message: "Bad request. Could not add coupon to the database"
        });
      }
    })
    .catch(err => next(err));
}

const get = () => {};

function getAll(req, res, next) {
  couponService
    .getAll()
    .then(coupons => res.json(coupons))
    .catch(err => next(err));
}

async function getCurrent(req, res, next) {
  couponService
    .getCurrent()
    .then(coupons => res.json(coupons))
    .catch(err => next(err));
}
