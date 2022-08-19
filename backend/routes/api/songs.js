const express = require('express');

const { Album, Comment, Playlist_Song, Playlist, User, Song } = require('../../db/models')

const router = express.Router();

router.get('/', async (req, res) => {
  const Songs = await Song.findAll()
  res.json({Songs})
});

// Get details of a Song from an id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const songs = await Song.findByPk(id, {
    include: [
      { model: User, as: 'Artists',attributes: {exclude: ['firstName', 'lastName', 'password', 'email','createdAt', 'updatedAt']}},
      { model: Album, attributes: {exclude: ['userId', 'description','createdAt', 'updatedAt']}}
    ]
  })
  res.json(songs)
})

module.exports = router;