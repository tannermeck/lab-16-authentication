const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const { connected } = req.cookies;
    req.user = jwt.verify(connected, process.env.AUTH_SECRET);
    next(); 
  } catch (error) {
    error.status = 401;
    next(error);
  } 
};
