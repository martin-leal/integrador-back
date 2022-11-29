const express = require("express");
const router = express.Router();
const { User, Property } = require("../../models");

const bc = require("bcrypt");
const tokens = require("../../middleware/tokens/tokens");
const { validateToken } = require("../../middleware/tokens/tokens");

//BUSQUEDA DE TODOS LOS USUARIOS REGISTRADOS
//http://localhost:8000/api/user/
router.get("/", (req, res) => {
  User.findAll().then((users) => res.send(users));
});

// ruta POST de log in - creacion de cookie y mandar al cliente datos de usuario
// idem de log out
// /me   ruta GET / devuelve datos del usuario (salen de las cookies)

//REGISTRO DE USUARIO
//http://localhost:8000/api/user/add
router.post("/add", (req, res) => {
  User.create(req.body).then((user) => res.status(201).send(user));
});

// LOGIN DE USUARIOS
//http://localhost:8000/api/user/login

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ where: { email } }).then((foundUser) => {
    if (!foundUser) res.status(401).send("user not found");
    else {
      bc.compare(password, foundUser.password)
        .then(() => {
          let payload = { ...foundUser }; //por que puede acceder a foundUser? pq esta anidado?
          //console.log(payload);
          delete payload.password;
          delete payload.salt;
          let token = tokens.generateToken(payload); // genera el token
          res.cookie("token", token);
          return payload;
          // let verificar = tokens.validateToken(token); //verifica si funciono el jwt
          // res.send(verificar); // envia al postman al usuario
          // Devolver al front info que necesite del usuario del dataValues que devuelve.
        })
        .then((payload) => {
          payload = payload.dataValues;
          res.send(payload);
        });
    }
  });
});

//ELIMINACION DE USUARIO
//http://localhost:8000/api/user/ponerElid
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  User.destroy({ where: { id } }).then(() => res.sendStatus(204));
});

//MODIFICACION DE USUARIO
//http://localhost:8000/api/user/ponerElid
router.patch("/:id", (req, res) => {
  const { id } = req.params;
  User.update(req.body, {
    where: { id },
    returning: true,
    plain: true,
  }).then((result) => {
    let obj = { updatedUser: result[1] };
    res.send(obj);
  });
});

//LOGOUT DE USUARIO
//http://localhost:8000/api/user/logout
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.sendStatus(204);
});

//VER FAVORITOS DE USUARIO (DEBERIA IR A LA TABLA DE FAVORITES????)
//http://localhost:8000/api/user/favorites
router.get("/favorites", (req, res) => {
  //Primero deberia validar al usuario con la cookie
  const token = req.cookies.token;
  const payload = validateToken(token);
  // Aca abajo deberia completarlo con la logica que me lleve a sus favoritos
  res.send(payload);
});

// RUTA DE PERSISTENCIA "ME"
router.get("/me", (req, res) => {
  try {
    //Primero deberia validar al usuario con la cookie
    const token = req.cookies.token;
    if (!token) return res.sendStatus(401);

    const payload = validateToken(token);
    if (!payload) return res.sendStatus(401);

    res.send(payload.dataValues);
  } catch (e) {
    console.log(e);
  }
});

// RUTA DE CREACION DE FAVORITO DE USUARIO

router.post("/favorite/:id", async (req, res) => {
  const userId = req.params.id;
  const property = req.body; // lo recibe del front

  const user = await User.findByPk(userId);
  const propFav = await Property.findByPk(property.id);

  console.log(user, propFav);
  // Magic Method
  propFav.addUser(user);
  res.send("propiedad agregada");
});

// RUTA DE ELIMINACION DE FAVORITO DE USUARIO

router.post("/deleteFavorite/:id", async (req, res) => {
  const userId = req.params.id;
  const property = req.body; // lo recibe del front

  const user = await User.findByPk(userId);
  const propFav = await Property.findByPk(property.id);

  console.log(user, propFav);
  // Magic Method
  propFav.removeUser(user);
  res.send("propiedad eliminada");
});

// RUTA PARA VER FAVORITOS DE USUARIO

router.get("/getFavorite/:id", async (req, res) => {
  const userId = req.params.id;

  const user = await User.findByPk(userId);

  // Magic Method
  const properties = await user.getProperties();
  res.send(properties);
});

//
//-----------------------------------

// BUSQUEDA DE USUARIO REGISTRADO POR ID
//http://localhost:8000/api/user/ponerElid
router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  User.findOne({
    where: { id },
    returning: true,
    plain: true,
  })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;

/*
{
        "name": "xxx",
      "lastname": "yyy",
     "phone": 114455667,
     "email": "xxx@gmail.com",
     "password": 12345678,
     "role": "customer"
}
*/

/*
{
    "email": "xxx@gmail.com",
     "password": "12345678"
}
     */
