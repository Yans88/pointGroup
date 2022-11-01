'use strict';

function errorHandler(error, req, res, next) {
  if (error.name === 'UnauthorizedError') {
    // JWT AUTHENTICATION ERROR
    return res.status(401).json({ message: 'The user is not authorized' });
  }

  if (error.name === 'ValidationError') {
    // VALIDATION ERROR
    return res.status(401).json({ message: err });
  }

  // DEFAULT TO 500 SERVER ERROR
  return res.status(500).json(error);
}

module.exports = errorHandler;
