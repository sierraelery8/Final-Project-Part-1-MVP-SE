const request = require('supertest');
const app = require('../server');
const sequelize = require('../config/testDatabase');
const User = require('../database/User');
const Plant = require('../database/Plant');
const CareLog = require('../database/CareLog');

let token;
let plantId;

beforeAll(async () => {
  await sequelize.sync({ force: true });

  // Register user
  await request(app)
    .post('/users/register')
    .send({
      username: 'careloguser',
      password: 'password123'
    });

  // login user
  const loginRes = await request(app)
    .post('/users/login')
    .send({
      username: 'careloguser',
      password: 'password123'
    });

  token = loginRes.body.token;

  // create a plant
  const plantRes = await request(app)
    .post('/plants')
    .send({
      name: 'Aloe Vera',
      species: 'Aloe',
      wateringFrequency: 7
    });

  plantId = plantRes.body.id;
});

afterAll(async () => {
  await sequelize.close();
});

describe('CareLog Tests', () => {

  test('Create a care log (authorized)', async () => {
    const res = await request(app)
      .post('/carelogs')
      .set('Authorization', `Bearer ${token}`)
      .send({
        plantId,
        action: 'Watered',
        notes: 'Gave it a good soak'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.action).toBe('Watered');
  });

  test('Reject unauthorized care log creation', async () => {
    const res = await request(app)
      .post('/carelogs')
      .send({
        plantId,
        action: 'Fertilized'
      });

    expect(res.statusCode).toBe(401);
  });

  test('Get care logs for a plant', async () => {
    const res = await request(app)
      .get(`/carelogs/plant/${plantId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

});
