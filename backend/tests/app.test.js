import request from 'supertest';
import app from '../src/app';
import { connection } from '../src/mongo.js';

describe('Check if app server runs without error', () =>
  test('my first test', async () => {
    let response = await request(app).get('/sites');
    expect(response.statusCode).toBe(200);
  }));
