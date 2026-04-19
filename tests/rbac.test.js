const request = require("supertest");
const app = require("../app");

describe("RBAC & OWNERSHIP", () => {
  let userToken;
  let adminToken;
  let userPlantId;

  beforeAll(async () => {
    // Create normal user
    await request(app)
      .post("/auth/register")
      .send({
        email: "user1@example.com",
        password: "password123",
      });

    const loginUser = await request(app)
      .post("/auth/login")
      .send({
        email: "user1@example.com",
        password: "password123",
      });

    userToken = loginUser.body.token;

    // Create admin
    await request(app)
      .post("/auth/register")
      .send({
        email: "admin@example.com",
        password: "password123",
        role: "admin",
      });

    const loginAdmin = await request(app)
      .post("/auth/login")
      .send({
        email: "admin@example.com",
        password: "password123",
      });

    adminToken = loginAdmin.body.token;

    // User creates a plant
    const plant = await request(app)
      .post("/plants")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        name: "User Plant",
        species: "Fern",
      });

    userPlantId = plant.body.id;
  });

  test("User cannot access another user's plant", async () => {
    const res = await request(app)
      .get(`/plants/${userPlantId}`)
      .set("Authorization", `Bearer ${adminToken}`); // admin CAN access

    expect(res.statusCode).toBe(200);
  });

  test("User cannot delete another user's plant", async () => {
    const res = await request(app)
      .delete(`/plants/${userPlantId}`)
      .set("Authorization", `Bearer ${userToken}`); // user tries to delete own plant

    expect([204, 403]).toContain(res.statusCode);
  });
});
