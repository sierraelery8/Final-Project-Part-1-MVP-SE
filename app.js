require("dotenv").config();
const express = require("express");
const app = express();

const authRoutes = require("./routes/authRoutes");
const plantRoutes = require("./routes/plantRoutes");
const errorHandler = require("./middleware/errorHandler");

app.use(express.json());

// routes
app.use("/auth", authRoutes);
app.use("/plants", plantRoutes);

// error handler (must be last)
app.use(errorHandler);

module.exports = app;
