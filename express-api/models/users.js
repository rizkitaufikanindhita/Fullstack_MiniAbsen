const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/dbConnect");

class User extends Model {}

User.init(
  {
    nip: {
      type: DataTypes.INTEGER,
      unique: true,
    },
    nama: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    createdAt: {
      type: DataTypes.BIGINT,
      defaultValue: new Date().getTime(),
    },
    updatedAt: {
      type: DataTypes.BIGINT,
      defaultValue: new Date().getTime(),
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

module.exports = User;
