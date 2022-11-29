const express = require("express");
const { Property } = require("../../models/index");
const router = express.Router();

//BUSQUEDA DE UNA PROPIEDAD POR "ID" - USER y ADMIN
//http://localhost:8000/api/property/:id
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

//BUSQUEDA DE TODAS LAS PROPIEDADES LISTADAS - USER y ADMIN
//http://localhost:8000/api/property
router.get("/", (req, res) => {
  Property.findAll().then((property) => res.send(property));
});

//MODIFICACION DE UNA PROPIEDAD - SOLO ADMIN
//http://localhost:8000/api/property/:id
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

//PUBLICACION DE UNA PROPIEDAD - SOLO ADMIN
//http://localhost:8000/api/property/add
router.post("/add", (req, res) => {
  Property.create(req.body).then((property) => res.status(201).send(property));
});

//ELIMINACION DE UNA PROPIEDAD - SOLO ADMIN
//http://localhost:8000/api/property/:id
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Property.destroy({ where: { id } }).then(() => res.sendStatus(204));
});

module.exports = router;

// {
//   "image": "https://dictionary.cambridge.org/es/images/full/house_noun_002_18270.jpg?version=5.0.274",
// "address": "armenia 1000",
// "price": 200000,
// "city": "buenos aires",
// "neigh": "palermo",
// "type": "casa",
// "bedrooms": 2,
// "description": "muy luminoso",
// "code": 5000
// }
