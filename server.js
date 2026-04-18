// server.js
require('dotenv').config();
const app = require('./app');
const sequelize = require('./config/database');

// import models (ensures Sequelize registers them)
require('./database/User');
require('./database/Plant');
require('./database/CareLog');

// test DB connection + sync
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');

    await sequelize.sync();
    console.log('Models synchronized');

    const PORT = process.env.PORT || 3000;

    if (process.env.NODE_ENV !== 'test') {
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    }
  } catch (error) {
    console.error('Unable to start server:', error);
    process.exit(1);
  }
}

startServer();

module.exports = app;
