const express = require('express');
const { check, query } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth, restoreUser, isCurrentUser} = require('../../utils/auth');
const { Album, Comment, PlaylistSong, Playlist, User, Song } = require('../../db/models')
const { Op } = require("sequelize")

const router = express.Router();

const validateCreation = [
  check('title')
    .exists()
    .notEmpty()
    .withMessage('Song title is required'),
  check('url')
    .exists()
    .notEmpty()
    .withMessage('Audio is required'),
    handleValidationErrors
]
const validateCommentCreation = [
  check('body')
  .exists()
  .notEmpty()
  .withMessage('Comment body text is required'),
  handleValidationErrors
]

const validateSongQuery = [
  query("page")
    .optional()
    .isInt( { min: 0, max: 10 })
    .withMessage("Page must be greater than or equal to 0"),
  query("size")
    .optional()
    .isInt( { min: 0, max: 20 })
    .withMessage("Size must be greater than or equal to 0"),
  query("createdAt")
    .optional()
    .isString()
    .withMessage("CreatedAt is invalid"),
    handleValidationErrors
]


// Get all Songs
// router.get('/', handleValidationErrors, async (req, res) => {
//   const Songs = await Song.findAll()
//   res.json({Songs})
// });

// Get details of a Song from an id
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;

  const songs = await Song.findByPk(id, {
    include: [
      { model: User, as: 'Artist', attributes: {exclude: ['firstName', 'lastName', 'password', 'email','createdAt', 'updatedAt']}},
      { model: Album, attributes: { exclude: ['userId', 'description','createdAt', 'updatedAt']}}
    ]
  });

  if (!songs) {
    const err = new Error("Song couldn't be found");
    err.status = 404;
    next(err)
  }

  res.json(songs)
})

// Create a Song
router.post('/', validateCreation, async (req, res, next) => {
  const { title, description, url, imageUrl, albumId } = req.body;
  
  const findAlbum = await Song.findOne({where: {albumId: req.body.albumId} })

  if (!findAlbum && req.body.albumId !== null) {
    const err = new Error("Album couldn't be found");
    err.status = 404
    next(err)
  } else {

    const newSong = await Song.create({
      userId: req.user.id,
      albumId,
      title,
      description,
      url,
      previewImage: imageUrl
    })
    
    res.json(newSong)
  }
});

// Edit a Song
router.patch('/:id', requireAuth, validateCreation, restoreUser, async (req, res, next) => {

  const { id } = req.params;
  const {
    title,
    description,
    url,
    imageUrl,
    albumId
  } = req.body;
  
  const song = await Song.findByPk(id);

  if (!song) {
  const err = new Error("Song couldn't be found");
  err.status = 404
  next(err)
};
// console.log(req.user.id)
// console.log("$$$$$$$$$$$$$$")
// console.log(song.dataValues)

  if (req.user.id !== song.dataValues.userId) {
    const err = new Error("Forbidden");
    err.status = 403;
    next(err)
  } else {


  await song.update({

    title: title, 
    description: description,
    url: url,
    previewImage: imageUrl,
    albumId: albumId
  })
  res.json(song)
}
});

// Delete a Song
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  const song = await Song.findByPk(id);

  if (!song) {
    const err = new Error("Song couldn't be found")
    err.status = 404
    next(err)
  };

  if (req.user.id !== song.dataValues.userId) {
    const err = new Error("Forbidden");
    err.status = 403;
    next(err)
  }

  else {
    await song.destroy(song)
    res.json({
      message: "Successfully deleted",
      statusCode: 200
    })
  }
});

// Get all Comments by a Song's id
router.get('/:songId/comments', async (req, res, next) => {
  const { songId } = req.params;
  const song = await Song.findByPk(songId)
  
  if (!song) {
    const err = new Error("Song couldn't be found")
    err.status = 404
    next(err)
  };

  const Comments = await song.getComments({
    include: [
      { model: User, attributes: { exclude: [ 'firstName', 'lastName', 'email', 'password', 'previewImage', 'createdAt', 'updatedAt'
      ]}}
    ]
  })
  res.json({Comments});
})

//Create a Comment for a Song based on the Song's id
router.post('/:songId/comments', validateCommentCreation, async (req, res, next) => {
  const { songId } = req.params;
  const { body } = req.body;
  const song = await Song.findByPk(songId);
  const userId = req.user.id;

  if (!song) {
    const err = new Error("Song couldn't be found")
    err.status = 404
    next(err)
  };

  const newComment = await song.createComment({
    userId,
    body
  });

  res.json(newComment)
});

// Add Query Filter to Get All Songs
router.get('/', validateSongQuery, async (req, res, next) => {
  let { page, size } = req.query;
  size = size ? size : 20;
  page = page ? page : 0;

  let search = {};
  for (const param in req.query) {
    if (param !== "page" && param !== "size") {
      search[param] = req.query[param];
    }
  }

  const Songs = await Song.findAll({
    where: {
      ...search
    },
    limit: size,
    offset: page
  });

  res.json({Songs, page, size})
})
module.exports = router;