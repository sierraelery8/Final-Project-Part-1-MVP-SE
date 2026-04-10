const { DataTypes } = require('sequelize');
const sequelize =
  process.env.NODE_ENV === 'test'
    ? require('../config/testDatabase')
    : require('../config/database');

const Plant = require('./Plant');
const User = require('./User');

const CareLog = sequelize.define('CareLog', {
  action: {
    type: DataTypes.STRING,
    allowNull: false
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
});

CareLog.belongsTo(Plant, { foreignKey: 'plantId' });
CareLog.belongsTo(User, { foreignKey: 'userId' });

module.exports = CareLog;
