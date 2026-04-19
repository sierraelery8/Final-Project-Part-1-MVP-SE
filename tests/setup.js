process.env.NODE_ENV = "test";
process.env.JWT_SECRET = "testsecret";

const sequelize = require("../config/testDatabase");

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});
