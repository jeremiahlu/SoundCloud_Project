const express = require('express');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { invalidCredentails } = require('../../middleware/error-handlers')
 
const { setTokenCookie, requireAuth, restoreUser, isCurrentUser} = require('../../utils/auth');
const { Album, Comment, PlaylistSong, Playlist, User, Song } = require('../../db/models')

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Invalid email'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Username is required'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('First Name is required'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Last Name is required'),
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
];

// router.use(invalidCredentails)
// Sign up
router.post(
  '/sign-up',
  validateSignup,
  handleValidationErrors,
  async (req, res, next) => {
    const { firstName, lastName, email, password, username } = req.body;

    const validateEmail = await User.findOne( { where: { email:email } })

    if (validateEmail) {
      const err = new Error("User already exists");
      err.status = 403;
      err.errors = {
        email: "User with that email already exists"
      };
      next(err)
    }
    const validateUsername = await User.findOne( { where: { username:username } })

    if (validateUsername) {
      const err = new Error("User already exists");
      err.status = 403;
      err.errors = {
        username: "User with that username already exists"
      };
      next(err)
    }

    const user = await User.signup({ firstName, lastName, username, email, password });
  

    const token = await setTokenCookie(res, user);
    user.dataValues.token = token;
    const result = user.dataValues
    
    return res.json(
     result
    );
  }
);

// Log in a User
router.post(
  '/login',
  validateLogin,
  async (req, res, next) => {
    const { credential, password } = req.body;
    
    const user = await User.login({ credential, password });

    if (!user) {
      const err = new Error('Invalid credentials');
      err.message = 'Invalid credentials'
      err.status = 401      
      next(err);
    }

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

//Get the Current User
router.get('/:id', [requireAuth, restoreUser], async (req, res, next) => {

  if (req.user.id !== Number(req.params.id)) {
    const err = new Error("Forbidden");
    err.status = 403;
    return next(err)
  } 

    const id = await User.findByPk(req.params.id, {
      attributes: [ 'id', 'firstName', 'lastName', 'email', 'username'] 
    })
    
    res.json(id);
});

//Get all Songs created by the Current User
router.get('/:id/songs', async (req, res, next) => {
  const { id } = req.params
  const songs = await User.findByPk(id, { 
    attributes: [],
    include: [
    { model: Song, attributes: { exclude: [ "UserId"]} }
  ]
})

if (!songs) {
  const err = new Error("Artist couldn't be found");
    err.status = 404;
    next(err)
};

  res.json(songs)
})

//Get all Songs from an Artist from an id
router.get('/:id/songs', async (req, res, next) => {
  const { id } = req.params;

  const songs = await User.findByPk(id, { 
    attributes: [],
    include: [
    { model: Song, attributes: { exclude: [ "UserId"]} }
  ]
});

  if (!songs) {
    const err = new Error("Artist couldn't be found");
      err.status = 404;
      next(err)
  }
  res.json(songs)
})

// Get all Playlists of an Artist from an id
router.get('/:id/playlists', async (req, res, next) => {
  const { id } = req.params;
  const artist = await User.findByPk(id, {
    attributes: [],
    include: [
      { model: Playlist, attributes: ['id','userId', 'name', 'createdAt', 'updatedAt', ['imageUrl', 'previewImage']] }
    ]
  })
  if (!artist) {
    const err = new Error("Artist couldn't be found");
    err.status = 404
    next(err)
  } else {
    res.json(artist)
  }
});

// Get all Playlists created by the Current User
router.get('/:id/playlists', async (req, res, next) => {
  const { id } = req.params;
  const artist = await User.findByPk(id, {
    attributes: [],
    include: [
      { model: Playlist, attributes: ['id','userId', 'name', 'createdAt', 'updatedAt', ['imageUrl', 'previewImage']]}
    ]
  })
  if (!artist) {
    const err = new Error("Artist couldn't be found");
    err.status = 404
    next(err)
  } else {
    res.json(artist)
  }
});

// Get all Albums created by the Current User
router.get('/:id/albums', async (req, res, next) => {
  const { id } = req.params;
  const artist = await User.findByPk(id, {
    attributes: [],
    include: [
      { model: Album, attributes: ['id', 'userId', 'title', 'description', 'createdAt', 'updatedAt', 'previewImage']}
    ]
  });

  if (!artist) {
    const err = new Error("Artist couldn't be found")
    err.status = 404
    next(err)
  };

  res.json(artist)
});

// Get all Albums of an Artist from an id
router.get('/:id/albums', async (req, res, next) => {
  const { id } = req.params;
  const artist = await User.findByPk(id, {
    attributes: [],
    include: [
      { model: Album, attributes: ['id', 'userId', 'title', 'description', 'createdAt', 'updatedAt', 'previewImage']}
    ]
  });

  if (!artist) {
    const err = new Error("Artist couldn't be found")
    err.status = 404
    next(err)
  };

  res.json(artist)
})


module.exports = router;