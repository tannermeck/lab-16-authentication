module.exports = (req, res, next) => {
  try {
    if (req.user.role !== 'ADMIN') {
      throw new Error('You are not an administrator');
    } next();
  } catch (error) {
    error.status = 403;
    next(error);
  }
};
