const express = require("express");
const router = express.Router();
const couponService = require("./coupon.service");

router.delete("/remove/:id", remove);
// router.put("/update", update);
router.post("/create", create);
// router.get("/get", get);
router.get("/current", getCurrent);
router.get("/", getAll);

module.exports = router;

async function remove(req, res, next) {
  couponService
    .remove(req.param("id"))
    .then(response => {
      if (response) {
        console.log(response);
        res.json(response);
      } else {
        res.status(400).json({
          message:
            "Bad request. Could not delete coupon with id: " + req.param("id")
        });
      }
    })
    .catch(err => next(err));
}

const update = () => {};

async function create(req, res, next) {
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

async function getAll(req, res, next) {
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
