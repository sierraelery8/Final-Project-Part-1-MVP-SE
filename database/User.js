const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize =
  process.env.NODE_ENV === 'test'
    ? require('../config/testDatabase')
    : require('../config/database');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user'
  }
});

// hash password before saving
User.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
});

// method for checking password
User.prototype.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = User;
