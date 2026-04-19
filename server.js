require("dotenv").config();
const app = require("./app");
const sequelize = require("./config/database");

async function start() {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");

    await sequelize.sync();
    console.log("Models synchronized");

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Failed to start server:", err);
  }
}

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
}

module.exports = app;
