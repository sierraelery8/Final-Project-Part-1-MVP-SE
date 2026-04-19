const { DataTypes } = require("sequelize");
const sequelize =
  process.env.NODE_ENV === "test"
    ? require("../config/testDatabase")
    : require("../config/database");

const User = sequelize.define("User", {
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: "user",
  },
});

module.exports = User;
