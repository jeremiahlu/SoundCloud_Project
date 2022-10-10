const express = require('express');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { invalidCredentails } = require('../../middleware/error-handlers')
 
const { setTokenCookie, requireAuth, restoreUser, isCurrentUser} = require('../../utils/auth');
const { Album, Comment, PlaylistSong, Playlist, User, Song } = require('../../db/models')

const router = express.Router();

const validateCreation = [
  check('title')
    .exists()
    .notEmpty()
    .withMessage('Song title is required'),
    // check('imageUrl')
    // .notEmpty()
    // .withMessage('Invalid image input')
    // ,
    handleValidationErrors
]
const validateAlbumEdit = [
  check('title')
    .exists()
    .notEmpty()
    .withMessage('Album title is required'),
    handleValidationErrors
]

// Get all Albums
router.get('/', async (req, res, next) => {
  const Albums = await Album.findAll()
  res.json({Albums});
});

// Get details of an Album from an id (ALIAS ISSUE)
router.get('/:albumId', async (req, res, next) => {
  const { albumId } = req.params;
  console.log(typeof albumId ,'------')
  const album = await Album.findByPk(Number(albumId), {
    include: [
      { model: User, as: "Artist", attributes: { exclude: ['firstName', 'lastName','password','createdAt','updatedAt','email']}},
      { model: Song }
    ]
  });
  
  if (!album || album === null) {
    console.log('album', album)
    const err = new Error("Album couldn't be found");
    err.status = 404;
    next(err)
  } else {
   return res.json({album})
  }
});

// Create an Album 
router.post('/', [validateAlbumEdit, validateCreation], async (req, res, next) => {
  const { title, description, previewImage} = req.body;
  const newAlbum = await Album.create({
    userId: req.user.id,
    title,
    description,
    previewImage
  });

  res.json(newAlbum);
});

// Edit an Album
router.patch('/:albumId', [validateAlbumEdit, requireAuth, restoreUser],  async (req, res, next) => {
  const { albumId } = req.params;
  const {
    title, description, imageUrl } = req.body;

  const findAlbum = await Album.findByPk(albumId);
  
  if (!findAlbum) {
    const err = new Error("Album couldn't be found");
    err.status = 404
    next(err)
  };
  
  if (req.user.id !== findAlbum.dataValues.userId) {
    const err = new Error("Forbidden");
    err.status = 403;
    next(err)
  }  else {

    await findAlbum.update({
      title,
      description,
      previewImage: imageUrl
    })
    
    res.json(findAlbum);
  }
})

//Delete an Album 
router.delete('/:albumId', [ requireAuth, restoreUser ], async (req, res, next) => {
  const { albumId } = req.params;
  const album = await Album.findByPk(albumId);

  if (!album) {
    const err = new Error("Album couldn't be found");
    err.status = 404
    next(err)
  };
  
  if (req.user.id !== album.dataValues.userId) {
    const err = new Error("Forbidden");
    err.status = 403;
    next(err)
  } else {
    await album.destroy(album)
    res.json({
      message: "Successfully deleted",
      statusCode: 200
    })
  }
})

module.exports = router;