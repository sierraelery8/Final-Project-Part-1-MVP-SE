const request = require("supertest");
const app = require("../app");
const sequelize = require("../config/testDatabase");

let token;
let plantId;

beforeAll(async () => {
  await sequelize.sync({ force: true });

  // Register user
  await request(app)
    .post("/auth/register")
    .send({
      email: "careloguser@example.com",
      password: "password123",
    });

  // Login user
  const loginRes = await request(app)
    .post("/auth/login")
    .send({
      email: "careloguser@example.com",
      password: "password123",
    });

  token = loginRes.body.token;

  // Create plant
  const plantRes = await request(app)
    .post("/plants")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "Aloe Vera",
      species: "Aloe",
      wateringFrequency: 7,
    });

  plantId = plantRes.body.id;
});

describe("CareLog Tests", () => {
  test("Create a care log (authorized)", async () => {
    const res = await request(app)
      .post(`/carelogs/${plantId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        action: "Watered",
        notes: "Gave it a good soak",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.action).toBe("Watered");
  });

  test("Reject unauthorized care log creation", async () => {
    const res = await request(app)
      .post(`/carelogs/${plantId}`)
      .send({
        action: "Fertilized",
      });

    expect(res.statusCode).toBe(401);
  });

  test("Get care logs for a plant", async () => {
    const res = await request(app)
      .get(`/carelogs/${plantId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
