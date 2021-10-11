const { Router } = require('express');
const UserService = require('../services/UserService.js');
const ensureAuth = require('../middleware/ensure-auth.js');
const ensureAdmin = require('../middleware/ensure-admin.js');
const Auth = require('../models/Auth.js');

module.exports = Router()
  .post('/signup', async (req, res, next) => {
    try {
      const signupUser = await UserService.create({ ...req.body, roleTitle: 'CUSTOMER' });
      res.cookie('connected', signupUser.authToken(), {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 12,
      });
      
      res.send(signupUser);
    } catch (error) {
      error.status = 400;
      next(error);
    }
  })
  .post('/login', async (req, res, next) => {
    try {
      const loginUser = await UserService.credential(req.body);  
      res.cookie('connected', loginUser.authToken(), {
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
      res.send(req.user);
    } catch (error) {
      next(error);
    }
  })
  .delete('/:id', ensureAuth, ensureAdmin, async (req, res, next) => {
    try {
      const id = req.params.id;
      const user = await Auth.deleteById(id);
      res.send(user);
    } catch (error) {
      next(error);
    }
  });
