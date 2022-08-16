const { Router } = require('express');
const express = require('express');
const router = express.Router();

const { Song, Comment, Playlist_Song, Playlist, User } = require('../../db/models')


module.exports = router;