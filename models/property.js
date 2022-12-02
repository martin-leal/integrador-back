const S = require("sequelize");
const db = require("../db/index");
const Op = S.Op;

class Property extends S.Model {} // propiedades

Property.init(
  {
    image: {
      type: S.STRING,
      allowNull: false,
    },
    address: {
      type: S.STRING,
      allowNull: false,
    },
    price: {
      type: S.INTEGER,
      allowNull: false,
    },
    city: {
      type: S.STRING,
      allowNull: false,
    },
    neigh: {
      type: S.STRING,
      allowNull: false,
    },
    type: {
      type: S.STRING,
      allowNull: false,
    },
    bedrooms: {
      type: S.INTEGER,
      allowNull: false,
    },
    description: {
      type: S.STRING,
    },
    code: {
      type: S.INTEGER,
    },
  },
  { sequelize: db, modelName: "property" }
);

module.exports = Property;
