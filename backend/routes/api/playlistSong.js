const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth, restoreUser, isCurrentUser} = require('../../utils/auth');
const { Album, Comment, PlaylistSong, Playlist, User, Song } = require('../../db/models')
const { Op } = require("sequelize")

const router = express.Router();
//Add a Song to a Playlist based on the Playlists's id
// router.post('/:playlistId/songs',  requireAuth , async (req, res, next) => {
//   const { songId } = req.body;
//   const { playlistId } = req.params;

//   // const findPlaylist = await Playlist.findOne({ where: {id: playlistId} });

//   const findPlaylist = await PlaylistSong.findOne({ where: {playlistId} });

//   if (req.user.id !== findPlaylist.dataValues.userId) {
//     const err = new Error("Forbidden");
//     err.status = 403;
//     next(err)
//   } 
//   if (!findPlaylist) {
//     const err = new Error("Playlist couldn't be found");
//     err.status = 404
//     next(err)
//   };

//   const newSong = await findPlaylist.createSong({
//    playlistId,
//    songId
//   })
//   res.json(newSong)
// })
module.exports = router;