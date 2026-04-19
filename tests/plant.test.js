const request = require("supertest");
const app = require("../app");

describe("PLANT ROUTES", () => {
  let token;
  let plantId;

  beforeAll(async () => {
    await request(app)
      .post("/auth/register")
      .send({
        email: "plantuser@example.com",
        password: "password123",
      });

    const login = await request(app)
      .post("/auth/login")
      .send({
        email: "plantuser@example.com",
        password: "password123",
      });

    token = login.body.token;
  });

  test("Create a plant", async () => {
    const res = await request(app)
      .post("/plants")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Snake Plant",
        species: "Sansevieria",
        wateringFrequency: 7,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Snake Plant");
    plantId = res.body.id;
  });

  test("Get all plants for user", async () => {
    const res = await request(app)
      .get("/plants")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test("Update a plant", async () => {
    const res = await request(app)
      .put(`/plants/${plantId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Updated Plant" });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Updated Plant");
  });

  test("Delete a plant", async () => {
    const res = await request(app)
      .delete(`/plants/${plantId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(204);
  });
});
