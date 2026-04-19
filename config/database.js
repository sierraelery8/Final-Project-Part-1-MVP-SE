const { Sequelize } = require("sequelize");

let sequelize;

if (process.env.NODE_ENV === "production") {
  // use PostgreSQL on Render
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  });
} else {
  // use SQLite locally
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database/database.sqlite"
  });
}

module.exports = sequelize;
