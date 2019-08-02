const Sequelize = require("sequelize");
const db = require("../config/db");

const Orang = db.define(
  "orang",
  {
    username: { type: Sequelize.STRING },
    email: { type: Sequelize.STRING },
    password: { type: Sequelize.STRING }
  },
  { freezeTableName: true }
);

module.exports = Orang;
