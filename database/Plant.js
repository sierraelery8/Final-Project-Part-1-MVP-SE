const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // if you create a config file later

const Plant = sequelize.define('Plant', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  species: {
    type: DataTypes.STRING,
    allowNull: false
  },
  wateringFrequency: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Plant;
