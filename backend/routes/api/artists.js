const express = require('express');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { invalidCredentails } = require('../../middleware/error-handlers')
 
const { setTokenCookie, requireAuth, restoreUser, isCurrentUser} = require('../../utils/auth');
const { Album, Comment, Playlist_Song, Playlist, User, Song, sequelize } = require('../../db/models')
const { Op } = require("sequelize")

const router = express.Router();

//Get details of an Artist from an id
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  const artistAggregateData = await User.findByPk(id, {
  
    include: [
      { model: Song },
      { model: Album }
    ],
    attributes: [ 
      [sequelize.fn("COUNT", sequelize.col("Songs.id")),'totalSongs'],
      [sequelize.fn("COUNT", sequelize.col("Albums.id")), 'totalAlbums'],
    ],
    
    raw: true
  });

  const artist = await User.findByPk(id, {
    include: [
      { model: Song, attributes: [] },
      { model: Album, attributes: [] }
    ],
    attributes: { exclude: [ 'firstName', 'lastName', 'email' ] },
  });

  const artistData = artist.toJSON();

  artistData.totalSongs = artistAggregateData.totalSongs,
  artistData.totalAlbums = artistAggregateData.totalAlbums
  
  res.json(artistData);
});

module.exports = router;