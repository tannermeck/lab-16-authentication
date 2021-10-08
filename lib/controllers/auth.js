const { Router } = require('express');
const UserService = require('../services/UserService.js');
const Auth = require('../models/Auth.js');
const ensureAuth = require('../middleware/ensure-auth.js');

module.exports = Router()
  .post('/signup', async (req, res, next) => {
    try {
      const signupUser = await UserService.create(req.body);
      res.send(signupUser);
    } catch (error) {
      error.status = 400;
      next(error);
    }
  })
  .post('/login', async (req, res, next) => {
    try {
      const loginUser = await UserService.credential(req.body);

      res.cookie('userId', loginUser.id, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 12,
      });

      res.send(loginUser);
    } catch (error) {
      error.status = 401;
      next(error);
    }
  })
  .get('/me', ensureAuth, async (req, res, next) => {
    try {
      const id = req.userId;
      const user = await Auth.getUser(id);
      res.send(user);
    } catch (error) {
      next(error);
    }
  });
