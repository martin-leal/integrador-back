const S = require("sequelize");
const db = require("../db/index");
const bc = require("bcrypt");

class User extends S.Model {
  //LLAMADA EN EL HOOK
  createHash(string, salt) {
    //Esta función crea el hash que se almacena en el campo "password" del usuario en la base de datos.
    //Parámetros: password ingresado por usuario y "salt" que se genera de forma aleatoria.
    return bc.hash(string, salt);
  }
}

User.init(
  {
    name: {
      type: S.STRING,
      allowNull: false,
    },
    lastname: {
      type: S.STRING,
      allowNull: false,
    },
    phone: {
      type: S.INTEGER,
      allowNull: false,
    },
    email: {
      type: S.STRING,
      allowNull: false,
      unique: true,
      isEmail: true,
    },
    password: {
      type: S.STRING,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "user" }
);

User.addHook("beforeCreate", (User) => {
  User.salt = bc.genSaltSync();
  return User.createHash(User.password.toString(), User.salt)
    .then((result) => {
      User.password = result;
    })
    .catch((err) => console.log(err));
});

module.exports = User;
