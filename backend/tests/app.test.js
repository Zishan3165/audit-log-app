import request from 'supertest';
import app from '../src/app';
import { connection } from '../src/mongo.js';

// beforeAll((done) => {
//   done();
// });

afterAll((done) => {
  // Closing the DB connection allows Jest to exit successfully.
  connection.close();
  done();
});

describe(
  'app test suite',
  () =>
    test('my first test', async () => {
      console.log('my first test');
    }),

  test('my first test', async () => {
    console.log('my first test');
    let response = await request(app).get('/sites');
    expect(response.statusCode).toBe(200);
    console.log(response.body);
  })
);
