const express = require("express");
const router = express.Router();
const couponService = require("./coupon.service");

router.delete("/remove/:id", remove);
router.put("/update", update);
router.post("/create", create);
router.post("/redeem", redeem);
router.get("/get/:id", get);
router.get("/current", getCurrent);
router.get("/status/:idCoupon/:idCustomer", status);
router.get("/all/:expired/:deleted", getAll);

module.exports = router;

async function status(req, res, next) {
  couponService
    .status(req.params.idCoupon, req.params.idCustomer)
    .then(response => {
      if (response) {
        res.json(response);
      } else {
        res.status(400).json({
          message:
            "Bad request. Could not get coupon status data for coupon with id: " +
            req.param("idCoupon") +
            " in relation to user with id: " +
            req.param("idCustomer")
        });
      }
    })
    .catch(err => next(err));
}

async function remove(req, res, next) {
  couponService
    .remove(req.param("id"))
    .then(response => {
      if (response) {
        res.json([...response, req.param("id")]);
      } else {
        res.status(400).json({
          message:
            "Bad request. Could not delete coupon with id: " + req.param("id")
        });
      }
    })
    .catch(err => next(err));
}

async function update(req, res, next) {
  couponService
    .update(req.body)
    .then(response => {
      if (response) {
        res.json([...response, req.body.id]);
      } else {
        res.status(400).json({
          message:
            "Bad request. Could not update coupon with id: " + req.body.id
        });
      }
    })
    .catch(err => next(err));
}

async function create(req, res, next) {
  couponService
    .create(req.body)
    .then(coupon => {
      if (coupon) {
        res.json(coupon);
      } else {
        res.status(400).json({
          message: "Bad request. Could not add coupon to the database."
        });
      }
    })
    .catch(err => next(err));
}

async function get(req, res, next) {
  couponService
    .get(req.params.id)
    .then(coupons => res.json(coupons))
    .catch(err => next(err));
}

async function getAll(req, res, next) {
  couponService
    .getAll(req.params.expired, req.params.deleted)
    .then(coupons => res.json(coupons))
    .catch(err => next(err));
}

async function getCurrent(req, res, next) {
  couponService
    .getCurrent()

    .then(coupons => res.json(coupons))

    .catch(err => next(err));
}

async function redeem(req, res, next) {
  //TODO: Implement method. Must have an user and a coupon as parameters
  couponService
    .redeem(req.body)
    .then(response => {
      if (response) {
        console.log(response);
        res.json(response);
      } else {
        res.status(400).json({
          message: "Bad request. Could not add coupon to the database."
        });
      }
    })
    .catch(err => next(err));
}
