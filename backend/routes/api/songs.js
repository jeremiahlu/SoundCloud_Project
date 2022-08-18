const express = require('express');

const { Album, Comment, Playlist_Song, Playlist, User, Song } = require('../../db/models')

const router = express.Router();

router.get('/', async (req, res) => {
  const Songs = await Song.findAll()
  res.json({Songs})
});

module.exports = router;