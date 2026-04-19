const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

// ROUTES
app.use("/auth", require("./routes/authRoutes"));
app.use("/plants", require("./routes/plantRoutes"));
app.use("/carelogs", require("./routes/careLogRoutes"));

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || "Internal server error",
  });
});

module.exports = app;
