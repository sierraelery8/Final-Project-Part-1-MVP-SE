const { DataTypes } = require("sequelize");
const sequelize =
  process.env.NODE_ENV === "test"
    ? require("../config/testDatabase")
    : require("../config/database");

const Plant = sequelize.define("Plant", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  species: {
    type: DataTypes.STRING,
  },
  wateringFrequency: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 7,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Plant;

