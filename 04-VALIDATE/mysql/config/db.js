const sequelize = require("sequelize");

const db = new sequelize("sequelize", "root", "", {
  dialect: "mysql"
});

db.sync({ force: true });

module.exports = db;
