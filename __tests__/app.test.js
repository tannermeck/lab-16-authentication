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

  it('logs in to the existing user with a response of the user id', async () => {
    await request(app)
      .post('/api/auth/signup')
      .send({ email: 'tanner1@alchemy1.com', password: '123' });
    await request(app)
      .post('/api/auth/signup')
      .send({ email: 'tanner2@alchemy2.com', password: '456' });
    await request(app)
      .post('/api/auth/signup')
      .send({ email: 'tanner3@alchemy3.com', password: '789' });
    return request(app)
      .post('/api/auth/login')
      .send({ email: 'tanner3@alchemy3.com', password: '789' })
      .then((response) => {
        expect(response.body).toEqual({ id: '3' });
      });
  });



  afterAll(() => {
    pool.end();
  });
});
