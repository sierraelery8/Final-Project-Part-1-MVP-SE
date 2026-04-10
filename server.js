require('dotenv').config();
const express = require('express');
const app = express();

// middleware
app.use(express.json());

const sequelize = require('./config/database');

// import models 
require('./database/User');
require('./database/Plant');
require('./database/CareLog');

// test DB connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
testConnection();

// ROUTES
const plantRoutes = require('./routes/plantRoutes');
const userRoutes = require('./routes/userRoutes');
const careLogRoutes = require('./routes/careLogRoutes');

app.use('/plants', plantRoutes);
app.use('/users', userRoutes);
app.use('/carelogs', careLogRoutes);

// basic route
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

// global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// start server 
const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
