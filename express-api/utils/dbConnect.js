const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("absenpegawai", "root", "", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
