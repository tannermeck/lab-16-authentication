const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');

describe('lab-16-authentication routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should post a user using /signup route', async () => {
    return request(app)
      .post('/api/auth/signup')
      .send({ email: 'tanner@alchemy.com', password: 'password' })
      .then((response) => {
        console.log(response.body);
        expect(response.body).toEqual({ id: '1' });
      });
  });
  it('if the same email already exists, a 400 message is sent', async () => {
    await request(app)
      .post('/api/auth/signup')
      .send({ email: 'tanner@alchemy.com', password: '123' });
    return request(app)
      .post('/api/auth/signup')
      .send({ email: 'tanner@alchemy.com', password: '456' })
      .then((response) => {
        expect(response.status).toEqual(400);
      });
  });

  afterAll(() => {
    pool.end();
  });
});
