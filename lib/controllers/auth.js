const { Router } = require('express');
const UserService = require('../services/UserService.js');

module.exports = Router()
  .post('/signup', async (req, res, next) => {
    try {
      const signupUser = await UserService.create(req.body);
      res.send(signupUser);
    } catch (error) {
      error.status = 400;
      next(error);
    }
  });
