const errorHandler = (err, req, res, next) => {
  console.error("Caught in Error Handler:", err.stack); 

  const statusCode = res.statusCode ? (res.statusCode === 200 ? 500 : res.statusCode) : 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal server error.',
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
};

module.exports = errorHandler; 