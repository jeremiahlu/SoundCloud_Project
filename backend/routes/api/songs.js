const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth, restoreUser, isCurrentUser} = require('../../utils/auth');
const { Album, Comment, Playlist_Song, Playlist, User, Song } = require('../../db/models')
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


// Get all Songs
router.get('/', handleValidationErrors, async (req, res) => {
  const Songs = await Song.findAll()
  res.json({Songs})
});

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

  // console.log("$$$$$")
  // console.log(req.user.id)
  // console.log("$$$$$")
  // console.log(song.dataValues.userId)
  if (req.user.id !== song.dataValues.userId) {
    const err = new Error("Forbidden");
    err.status = 403;
    next(err)
  } 

    if (!song) {
    const err = new Error("Song couldn't be found");
    err.status = 404
    next(err)
  };

  // const userSongs = await Song.findAll({where: {userId: req.user.id}})
 
  // if (userSongs.includes(song)) {
  //   next()
  // } else {
  //   const err = new Error("Forbidden");
  //   err.status = 403;
  //   return next(err)
  // };
  
  await song.update({

    title: title, 
    description: description,
    url: url,
    previewImage: imageUrl,
    albumId: albumId
  })
  res.json(song)
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
  // try {
  //   res.json({
  //     message: "Successfully deleted",
  //     statusCode: 200
  //   })
  // } catch(err) {
  //   next({
  //     message: "Song couldn't be found",
  //     statusCode: 404,
  //   })
  // }
});

// Get all Comments by a Song's id
router.get('/:songId/comments', async (req, res, next) => {
  const { songId } = req.params;
  const allComments = Song.findByPk(songId, { include: [
    { model: Comment, attributes: { where: { songId }} }
  ]
});
  res.json(allComments);
})

module.exports = router;