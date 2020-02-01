const bypass = (req, res, next) => {
  req.bypass = {};
  next();
};

module.exports = bypass;
