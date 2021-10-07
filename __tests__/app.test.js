const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');

describe('lab-16-authentication routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should post a user using /signup route', () => {
    const user = request(app).post('/signup').send({ email: 'tanner@alchemy.com', password: 'password' });
    expect(user.body).toEqual({ id: expect.any(Number), email: 'tanner@alchemy.com' });
  });
  
  afterAll(() => {
    pool.end();
  });
});
