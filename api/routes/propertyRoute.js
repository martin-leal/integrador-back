const express = require("express");
const { Property } = require("../../models/index");
const router = express.Router();

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Property.findOne({
    where: { id },
    returning: true,
    plain: true,
  }).then((result) => {
    res.send(result);
  });
});

router.get("/", (req, res) => {
  Property.findAll().then((products) => res.send(products));
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  Property.update(req.body, {
    where: { id },
    returning: true,
    plain: true,
  }).then((result) => {
    let obj = { updatedProperty: result[1] };
    res.send(obj);
  });
});

router.post("/add", (req, res) => {
  Property.create(req.body).then((property) => res.status(201).send(property));
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Property.destroy({ where: { id } }).then(() => res.sendStatus(204));
});

module.exports = router;

// {"image": "https://dictionary.cambridge.org/es/images/full/house_noun_002_18270.jpg?version=5.0.274",
// "address": "armenia 1000",
// "price": 200000,
// "city": "buenos aires",
// "neigh": "palermo",
// "type": "casa",
// "bedrooms": 2,
// "description": "muy luminoso",
// "code": 5000
// }
