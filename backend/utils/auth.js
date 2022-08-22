const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User } = require('../db/models');

const { secret, expiresIn } = jwtConfig;

//declares JWT cookies for login and sign up
const setTokenCookie = (res, user) => {
  const token = jwt.sign(
    { data: user.toSafeObject() },
    secret,
    { expiresIn: parseInt(expiresIn) } 
  );

  const isProduction = process.env.NODE_ENV === "production";

  res.cookie('token', token, {
    maxAge: expiresIn * 1000, 
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction && "Lax"
  });

  return token;
};

// checks to see if there is a user logged in and sets user to req.user 
const restoreUser = (req, res, next) => {

  const { token } = req.cookies;
  req.user = null;

  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
    if (err) {
      return next();
    }

    try {
      const { id } = jwtPayload.data;
      req.user = await User.scope('currentUser').findByPk(id);
    } catch (e) {
      res.clearCookie('token');
      return next();
    }

    if (!req.user) res.clearCookie('token');

    return next();
  });
};

const isCurrentUser = (req, _res, next) => {
  // const { token } = req.cookies;

  // return jwt.verify(token, secret, null, async (err, jwtPayload) => {
  //   const { id } = jwtPayload.data;
  // console.log("$$$$$$$$$")
  // console.log(jwtPayload.data.id)
  // console.log("$$$$$$$$$")
  // console.log(req.user.id)
  const { user } = req;  
  
     if (user.id !== id) {
      const err = new Error("Forbidden");
      err.status = 403;
      return next(err)
    } else {
      next()
    }

  // if (req.user.id !== Number(req.params.id)) {
  //   const err = new Error("Forbidden");
  //   err.status = 403;
  //   return next(err)
  // } else {
  //       next()
  //     }
};

//requires authentication before using endpoints
const requireAuth = function (req, _res, next) {
  if (req.user) return next();

  const err = new Error('Authentication required');
  // err.title = 'Unauthorized';
  // err.errors = ['Unauthorized'];
  err.status = 401;
  return next(err);
};


module.exports = { setTokenCookie, restoreUser, requireAuth, isCurrentUser };