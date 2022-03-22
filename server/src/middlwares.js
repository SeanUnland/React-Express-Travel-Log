// below is the not-found midleware, typically this should be the last middlware registered
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl} `);
  res.status(404);
  next(error);
};

// error handling middleware, must have 4 parameters
const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : error.stack,
  });
};

module.exports = {
  notFound,
  errorHandler,
};
