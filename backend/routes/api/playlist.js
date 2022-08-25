const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth, restoreUser, isCurrentUser} = require('../../utils/auth');
const { Album, Comment, playlistSong, Playlist, User, Song } = require('../../db/models')

const router = express.Router();

const validateCreation = [
  check('name')
    .exists()
    .notEmpty()
    .withMessage('Playlist name is required'),
    handleValidationErrors
]
//Create a Playlist
router.post('/', [ validateCreation, requireAuth ] , async (req, res, next) => {
  const { name, imageUrl } = req.body;
  const newPlaylist = await Playlist.create({
    userId: req.user.id,
    name,
    previewImage: imageUrl
  })
  res.json(newPlaylist)
});

// Add a Song to a Playlist based on the Playlists's id 
router.post('/:playlistId/songs',  requireAuth , async (req, res, next) => {
  const { songId } = req.body;
  const { playlistId } = req.params;

  const findPlaylist = await Playlist.findOne({ where: {id: playlistId} });
  
  if (!findPlaylist) {
    const err = new Error("Playlist couldn't be found");
    err.status = 404
    next(err)
  };

  if (req.user.id !== findPlaylist.dataValues.userId) {
    const err = new Error("Forbidden");
    err.status = 403;
    next(err)
  };

  const findSong = await Song.findOne({ where: {id: songId}});

  if (!findSong) {
    const err = new Error("Song couldn't be found");
    err.status = 404
    next(err)
  }
  
  const newSong = await findPlaylist.addSong([songId]);

  console.log(newSong)

  const inPlaylist = await playlistSong.findOne({ where: {
    songId: req.body.songId, 
    playlistId: req.params.playlistId 
  }
  })
  console.log(inPlaylist)
  
  res.json(inPlaylist)
})


//Get details of a Playlist from an id
router.get('/:playlistId', async (req, res, next) => {
   const { playlistId } = req.params;

   const playlist = await Playlist.findByPk(playlistId, {
    include: [
      { model: Song, through: { model: playlistSong, attributes: []} }
    ]
   });

   if (!playlist) {
    const err = new Error("Playlist couldn't be found");
    err.status = 404
    next(err)
  };
  res.json(playlist)

})

// Edit a Playlist 
router.patch('/:playlistId', validateCreation, async (req, res, next) => {
  const { playlistId } = req.params;

  const {
    name,
    imageUrl
  } = req.body;

  const playlist = await Playlist.findByPk(playlistId);
  
  if (!playlist) {
  const err = new Error("Playlist couldn't be found");
  err.status = 404
  next(err)
};

  if (req.user.id !== playlist.dataValues.userId) {
    const err = new Error("Forbidden");
    err.status = 403;
    next(err)
  } 


  await playlist.update({
    name: name,
    previewImage: imageUrl
  })

  res.json(playlist)
})

// Delete a Playlist 
router.delete('/:playlistId', async (req, res, next) => {
  const { playlistId } = req.params;
  const playlist = await Playlist.findByPk(playlistId);

  if (!playlist) {
    const err = new Error("Playlist couldn't be found")
    err.status = 404
    next(err)
  };

  if (req.user.id !== playlist.dataValues.userId) {
    const err = new Error("Forbidden");
    err.status = 403;
    next(err)
  }

  else {
    await playlist.destroy(playlist)
    res.json({
      message: "Successfully deleted",
      statusCode: 200
    })
  }
})

module.exports = router;