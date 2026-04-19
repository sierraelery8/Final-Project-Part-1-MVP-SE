const request = require("supertest");
const app = require("../app");
const User = require("../database/User");

describe("AUTH ROUTES", () => {
  const testUser = {
    email: "test@example.com",
    password: "password123",
  };

  test("Register a new user", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send(testUser);

    expect(res.statusCode).toBe(201);
    expect(res.body.email).toBe(testUser.email);
  });

  test("Prevent duplicate email registration", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send(testUser);

    expect(res.statusCode).toBe(409);
  });

  test("Login with valid credentials", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send(testUser);

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test("Reject invalid login", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({
        email: "wrong@example.com",
        password: "nope",
      });

    expect(res.statusCode).toBe(401);
  });

  test("Get current user with valid token", async () => {
    const login = await request(app)
      .post("/auth/login")
      .send(testUser);

    const token = login.body.token;

    const res = await request(app)
      .get("/auth/me")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe(testUser.email);
  });
});
