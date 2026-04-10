require('dotenv').config();
const express = require('express');
const { Sequelize } = require('sequelize');

const app = express();

// middleware
app.use(express.json());

// plant routes
const plantRoutes = require('./routes/plantRoutes');
app.use('/plants', plantRoutes);

// database connection (SQLite)
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database/database.sqlite'
});

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

// basic route
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
