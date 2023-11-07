const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/dbConnect");

class Absen extends Model {}

Absen.init(
  {
    user_nip: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.ENUM("IN", "OUT"),
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
    modelName: "Absen",
  }
);

module.exports = Absen;
