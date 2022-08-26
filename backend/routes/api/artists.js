const express = require('express');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { invalidCredentails } = require('../../middleware/error-handlers')
 
const { setTokenCookie, requireAuth, restoreUser, isCurrentUser} = require('../../utils/auth');
const { Album, Comment, PlaylistSong, Playlist, User, Song, sequelize } = require('../../db/models')
const { Op } = require("sequelize")

const router = express.Router();

//Get details of an Artist from an id
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;

  const userSongs = await Song.findAll({where: {userId:id}});
  const userAlbums = await Album.findAll({where: {userId: id}});

  const totalSongs = userSongs.length
  const totalAlbums = userAlbums.length
  const artist = await User.findByPk(id, {
    attributes: { exclude: [ 'firstName', 'lastName', 'email' ] }
  });
  
  artist.dataValues['totalSongs'] = totalSongs
  artist.dataValues['totalAlbums'] = totalAlbums
  console.log(artist.toJSON())
  res.json(artist)
});

module.exports = router;