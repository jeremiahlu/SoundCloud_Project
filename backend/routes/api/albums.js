const { Router } = require('express');
const express = require('express');

const { Song, Comment, Playlist_Song, Playlist, User } = require('../../db/models')

const { setTokenCookie, requireAuth, restoreUser, isCurrentUser} = require('../../utils/auth');

const router = express.Router();


module.exports = router;