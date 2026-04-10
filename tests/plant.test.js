const request = require('supertest');
const app = require('../server');
const sequelize = require('../config/testDatabase');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Plant CRUD', () => {
  test('Create a plant', async () => {
    const res = await request(app)
      .post('/plants')
      .send({
        name: 'Test Plant',
        species: 'Test Species',
        wateringFrequency: 5
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Test Plant');
  });
});
