// backend/utils/validation.js
const { validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const result = {};
    const errors = validationErrors
      .array()
      .forEach((error) => result[error.param] = error.msg)
      

    const err = Error('Validation error');
    err.status = 400;
    err.errors = result;
    // err.title = 'Bad request.';
    next(err);
  }
  next();
};

module.exports = {
  handleValidationErrors
};