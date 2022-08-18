const express = require('express');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { invalidCredentails } = require('../../middleware/error-handlers')
 
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Email or username is required'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Password is required'),
  handleValidationErrors,
  // invalidCredentails
];

// router.use(invalidCredentails)
// Sign up
router.post(
  '/sign-up',
  validateSignup,
  async (req, res) => {
    console.log(req.body)
    const { firstName, lastName, email, password, username } = req.body;
    const user = await User.signup({ firstName, lastName, username, email, password });

    if (user) {
      const err = new Error('User already exists');
      err.status = 403;
      err.errors = {
        "email": "User with that email already exists"
      }
      return next(err);
    }

    const token = await setTokenCookie(res, user);
    user.dataValues.token = token;
    const result = user.dataValues
    
    return res.json(
     result
    );
  }
);


// Log in
router.post(
  '/login',
  validateLogin,
  async (req, res, next) => {
    const { credential, password } = req.body;
    
    const user = await User.login({ credential, password });

    const token = await setTokenCookie(res, user);
    user.dataValues.token = token;
    const result = user.dataValues
    return res.json(
     result
    );
  }
  );

// Log out
router.delete(
  '/logout',
  (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
  );
  
router.get('/:id', async (req, res) => {
  const id = await User.findByPk(req.params.id, {
    attributes: [ 'id', 'firstName', 'lastName', 'email', 'username'] 
  })
  // const { token } = req.cookies
  res.json(id)
});

module.exports = router;