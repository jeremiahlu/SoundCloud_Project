const express = require('express');
const router = express.Router();

const { Album, Song, Playlist_Song, Playlist, User } = require('../../db/models')

module.exports = router;