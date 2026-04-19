// app.js
require('dotenv').config();
const express = require('express');
const app = express();

// middleware
app.use(express.json());

// ROUTES
const plantRoutes = require('./routes/plantRoutes');
const userRoutes = require('./routes/userRoutes');
const careLogRoutes = require('./routes/careLogRoutes');
const authRoutes = require("./routes/authRoutes");


app.use("/auth", authRoutes);
app.use('/plants', plantRoutes);
app.use('/users', userRoutes);
app.use('/carelogs', careLogRoutes);

// basic route
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

// global error handler (centralized)
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || 'Internal server error'
  });
});

module.exports = app;
