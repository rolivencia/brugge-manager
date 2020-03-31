const express = require("express");
const router = express.Router();
const recommendedService = require("./recommended.service");

router.get("/get/:disabled/:deleted", getAll);
router.put("/update", update);
router.delete("/remove/:id", remove);
router.post("/create", create);

module.exports = router;

async function getAll(req, res, next) {
  recommendedService
    .getAll(req.params.disabled, req.params.deleted)
    .then(recommendations => {
      if (recommendations) {
        res.json(recommendations);
      } else {
        res.status(400).json({
          message: "Bad request. Could not retrieve recommendations."
        });
      }
    })
    .catch(err => next(res.status(400).json(err)));
}

async function update(req, res, next) {
  recommendedService
    .update(req.body)
    .then(response => {
      if (response) {
        res.json([...response, req.body.id]);
      } else {
        res.status(400).json({
          message:
            "Bad request. Could not update recommendation with id: " +
            req.body.id
        });
      }
    })
    .catch(err => next(res.status(400).json(err)));
}

async function remove(req, res, next) {
  recommendedService
    .remove(req.params.id)
    .then(response => {
      if (response) {
        res.json([...response, req.params.id]);
      } else {
        res.status(400).json({
          message:
            "Bad request. Could not remove recommendation with id: " +
            req.params.id
        });
      }
    })
    .catch(err => next(res.status(400).json(err)));
}

async function create(req, res, next) {
  recommendedService
    .create(req.body)
    .then(recommendation => {
      if (recommendation) {
        res.json(recommendation);
      } else {
        res.status(400).json({
          message: "Bad request. Could not remove create a new recommendation."
        });
      }
    })
    .catch(err => next(res.status(400).json(err)));
}
