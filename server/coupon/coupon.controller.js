const express = require("express");
const router = express.Router();
const couponsService = require("./coupon.service");

router.delete("/remove", remove);
router.put("/update", update);
router.post("/create", create);
router.get("/get", get);
router.get("/", getAll);

module.exports = router;

const remove = () => {};

const update = () => {};

const create = () => {};

const get = () => {};

const getAll = () => {};
