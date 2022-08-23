// const express = require('express');
// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');
// const { setTokenCookie, requireAuth, restoreUser, isCurrentUser} = require('../../utils/auth');
// const { User } = require('../../db/models');

// const router = express.Router();

// router.get(
//   '/',
//   restoreUser,
//   (req, res) => {
//     const { user } = req;
//     if (user) {
//       return res.json({
//         user: user.toSafeObject()
//       });
//     } else return res.json({});
//   }
// );

// // Log in
// router.post(
//   '/login',
//   async (req, res, next) => {
//     const { credential, password } = req.body;

//     const user = await User.login({ credential, password });

//     if (!user) {
//       const err = new Error('Login failed');
//       err.status = 401;
//       err.title = 'Login failed';
//       err.errors = ['The provided credentials were invalid.'];
//       return next(err);
//     }

//     await setTokenCookie(res, user);

//     return res.json({
//       user
//     });
//   }
// );

// // Log out
// router.delete(
//   '/',
//   (_req, res) => {
//     res.clearCookie('token');
//     return res.json({ message: 'success' });
//   }
// );

// /
// module.exports = router;