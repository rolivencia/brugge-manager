const express = require("express");
const _ = require("lodash");
const router = express.Router();
const customerService = require("./customer.service");

router.delete("/remove", remove);
router.put("/update", update);
router.post("/create", create);
router.get("/getById/:id", getById);
router.get("/", getAll);

module.exports = router;

function remove() {}

function update() {}

function create(req, res, next) {
  console.log("Objeto:");
  console.log(req.body);
  customerService
    .create(req.body)
    .then(customer => {
      if (customer) {
        console.log(customer);
        res.json(customer);
      } else {
        res
          .status(400)
          .json({ message: "Customer could not be added to the database." });
      }
    })
    .catch(err => next(err));
}

function getById(req, res, next) {
  customerService
    .getById(req.params.id)
    .then(customerRaw => {
      return res.json({
        id: customerRaw.id,
        firstName: customerRaw.firstName,
        lastName: customerRaw.lastName,
        email: customerRaw.email,
        uidFirebase: customerRaw.uidFirebase,
        audit: {
          createdAt: customerRaw.createdAt,
          updatedAt: customerRaw.updatedAt,
          enabled: customerRaw.enabled,
          deleted: customerRaw.deleted
        }
      });
    })
    .catch(err => next(err));
}

function getAll(req, res, next) {
  customerService
    .getAll()
    .then(customers => res.json(customers))
    .catch(err => next(err));
}
