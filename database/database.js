const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("icecream", "user", "123", {
  dialect: "sqlite",
  host: "./database/icecream.db",
});

module.exports = sequelize;
