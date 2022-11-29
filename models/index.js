const User = require("./user");
const Property = require("./property");
//const Favorite = require("./favorite")
//const Visit = require("./visit")

// RELACIONES ENTRE TABLAS - CHEQUEAR

User.belongsToMany(Property, { through: "favorites" });
Property.belongsToMany(User, { through: "favorites" });

// User.hasMany(Visit)
// Visit.belongsTo(User)

// User.hasMany(Favorite)
// Favorite.belongsTo(User)

// Property.hasMany(Favorite)
// Favorite.belongsTo(Property)

module.exports = {
  User,
  Property,
};
