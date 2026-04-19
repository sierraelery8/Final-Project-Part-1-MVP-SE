const { DataTypes } = require("sequelize");

const sequelize =
  process.env.NODE_ENV === "test"
    ? require("../config/testDatabase")
    : require("../config/database");

const CareLog = sequelize.define("CareLog", {
  action: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  notes: {
    type: DataTypes.STRING,
  },
  plantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = CareLog;
