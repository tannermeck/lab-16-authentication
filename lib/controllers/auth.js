const { Router } = require('express');
const Auth = require('../models/Auth.js');

module.exports = Router()
  .post('/signup', async (req, res, next) => {
    try {
      const newUser = await Auth.insert(req.body);
      res.send(newUser.toJSON());
    } catch (error) {
      next(error);
    }
  });
