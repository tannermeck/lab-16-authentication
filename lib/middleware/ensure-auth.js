module.exports = (req, res, next) => {
  const { userId } = req.cookies;
  if (!userId) {
    throw new Error('Must signin to continue');
  }
  req.userId = userId;
  next();
};
