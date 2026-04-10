const request = require('supertest');
const app = require('../server');
const sequelize = require('../config/testDatabase');
const User = require('../database/User');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('User Authentication', () => {

  test('Register a new user', async () => {
    const res = await request(app)
      .post('/users/register')
      .send({
        username: 'testuser',
        password: 'password123'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.username).toBe('testuser');
  });

  test('Prevent duplicate usernames', async () => {
    const res = await request(app)
      .post('/users/register')
      .send({
        username: 'testuser',
        password: 'password123'
      });

    expect(res.statusCode).toBe(400);
  });

  test('Login with correct credentials', async () => {
    const res = await request(app)
      .post('/users/login')
      .send({
        username: 'testuser',
        password: 'password123'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test('Reject login with wrong password', async () => {
    const res = await request(app)
      .post('/users/login')
      .send({
        username: 'testuser',
        password: 'wrongpassword'
      });

    expect(res.statusCode).toBe(401);
  });

});
