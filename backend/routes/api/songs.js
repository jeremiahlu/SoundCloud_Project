const express = require('express');

const { Album, Comment, Playlist_Song, Playlist, User, Song } = require('../../db/models')

const router = express.Router();

router.get('/', async (req, res) => {
  const title = await Song.findAll()
  res.json(title)
});

module.exports = router;