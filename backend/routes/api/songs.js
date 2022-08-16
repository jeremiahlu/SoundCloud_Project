const express = require('express');
const router = express.Router();

const { Album, Comment, Playlist_Song, Playlist, User} = require('../../db/models')

router.get('/songs', async (req, res) => {
  const title = await Song.findAll()
  res.json(title)
});

module.exports = router;