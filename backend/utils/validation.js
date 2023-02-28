<<<<<<< HEAD
const { validationResult } = require('express-validator');

=======
// backend/utils/validation.js
const { validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
>>>>>>> cfff9181cbccbd9a4c70da7b40e4b4524072ee69
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
<<<<<<< HEAD
    const errors = validationErrors
      .array()
      .map((error) => `${error.msg}`);

    const err = Error('Bad request.');
    err.errors = errors;
    err.status = 400;
    err.title = 'Bad request.';
=======
    const result = {};
    const errors = validationErrors
      .array()
      .forEach((error) => result[error.param] = error.msg)
      

    const err = Error('Validation error');
    err.status = 400;
    err.errors = result;
    // err.title = 'Bad request.';
>>>>>>> cfff9181cbccbd9a4c70da7b40e4b4524072ee69
    next(err);
  }
  next();
};

<<<<<<< HEAD
=======


>>>>>>> cfff9181cbccbd9a4c70da7b40e4b4524072ee69
module.exports = {
  handleValidationErrors
};