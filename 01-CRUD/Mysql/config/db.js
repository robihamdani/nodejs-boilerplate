const sequelize = require("sequelize");

const db = new sequelize("sequelize", "root", "", {
  dialect: "mysql",
  operatorsAliases: false
});

db.sync({});

module.exports = db;
