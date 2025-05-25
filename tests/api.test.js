const request = require('supertest');
const app = require('../index');
const mongoose = require('mongoose');

describe('API Endpoints', () => {
  //  SUCCESS TESTS

  test('POST /api/add - success', async () => {
    const res = await request(app)
      .post('/api/add')
      .send({
        userid: 123123,
        description: 'test item',
        category: 'food',
        sum: 42
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.category).toBe('food');
  });

  test('GET /api/report - success', async () => {
    const res = await request(app).get('/api/report?id=123123&year=2025&month=5');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('costs');
    expect(Array.isArray(res.body.costs)).toBe(true);
  });

  test('GET /api/users/:id - success', async () => {
    const res = await request(app).get('/api/users/123123');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('first_name');
    expect(res.body).toHaveProperty('total');
  });

  test('GET /api/about - success', async () => {
    const res = await request(app).get('/api/about');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('first_name');
    expect(res.body[0]).toHaveProperty('last_name');
  });

  //  ERROR TESTS

  test('POST /api/add - missing fields', async () => {
    const res = await request(app).post('/api/add').send({
      userid: 123123,
      category: 'food',
      sum: 10
      // missing "description"
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  test('GET /api/report - missing query params', async () => {
    const res = await request(app).get('/api/report?id=123123&month=5');
    // missing year

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  test('GET /api/users/:id - user not found', async () => {
    const res = await request(app).get('/api/users/999999'); // assuming this user doesn't exist

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error');
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
