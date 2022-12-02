const express = require("express");
const { Property } = require("../../models/index");
const router = express.Router();
const S = require("sequelize");
const Op = S.Op;

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

//SEARCH DE UNA PROPIEDAD POR ID
//http://localhost:8000/api/property/search/:id
//usarla para vista individual de la propiedad
router.post("/search/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  Property.findByPk(id).then((property) => res.send(property));
  // si no existe property devolver un 404
});

//-------------------------
//SEARCH DE UNA PROPIEDAD POR CIUDAD
//http://localhost:8000/api/property/search/city/:id
router.post("/search/city/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  Property.findAll({
    where: { city: id },
    returning: true,
    plain: true,
  }).then((property) => res.send(property));
  // si no existe property devolver un 404
});
//-----------------------------
//SEARCH DE UNA PROPIEDAD POR BARRIO
//http://localhost:8000/api/property/search/neigh/:id
router.post("/search/neigh/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  Property.findAll({
    where: { neigh: id },
    returning: true,
    plain: true,
  }).then((property) => res.send(property));
  // si no existe property devolver un 404
});

//-----------------------------
//SEARCH DE UNA PROPIEDAD POR PRECIO
//http://localhost:8000/api/property/search/price/:id
router.post("/search/price/:id", (req, res) => {
  const { id } = req.params;
  console.log(typeof id);
  console.log(id);
  Property.findAll({
    where: {
      price: {
        [Op.lt]: id,
      },
    },
    // where: { price: id },
    // returning: true,
    // plain: true,
  }).then((property) => res.send(property));
});

module.exports = router;

// {
//   "image": "https://dictionary.cambridge.org/es/images/full/house_noun_002_18270.jpg?version=5.0.274",
// "address": "santa fe 3467",
// "price": 190000,
// "city": "buenos aires",
// "neigh": "palermo",
// "type": "casa",
// "bedrooms": 4,
// "description": "frente",
// "code": 3310
// }
