const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

const errorHandle = (err, req, res, next) => {
  console.log(err)
  return res.status(500).json({ message: err.message });
};

module.exports = {
  logger,
  errorHandle,
};
