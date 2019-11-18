const express = require("express");
const router = express.Router();
const recommendedService = require("./recommended.service");

router.get("/getAll", getAll);
router.put("/update", update);
router.delete("/remove/:id", remove);
router.post("/create", create);

module.exports = router;

async function getAll(req, res, next) {
  recommendedService
    .getAll()
    .then(coupons => {
      res.json(coupons);
    })
    .catch(err => next(err));
}

async function update(req, res, next) {
  recommendedService
    .update(req.body)
    .then(coupons => {
      res.json(coupons);
    })
    .catch(err => next(err));
}

async function remove(req, res, next) {
  recommendedService
    .remove(req.params.id)
    .then(coupons => {
      res.json(coupons);
    })
    .catch(err => next(err));
}

async function create(req, res, next) {
  recommendedService
    .create(req.body)
    .then(coupons => {
      res.json(coupons);
    })
    .catch(err => next(err));
}
