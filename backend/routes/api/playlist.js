const express = require("express");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const {
  setTokenCookie,
  requireAuth,
  restoreUser,
  isCurrentUser,
} = require("../../utils/auth");
const {
  Album,
  Comment,
  PlaylistSong,
  Playlist,
  User,
  Song,
} = require("../../db/models");

const router = express.Router();

const validateCreation = [
  check("name").exists().notEmpty().withMessage("Playlist name is required"),
  // check('previewImage')
  // .notEmpty()
  // .isURL({ require_tld: false })
  // .withMessage('Insert valid image type'),
  handleValidationErrors,
];
//Create a Playlist(imgurl:null)
router.post("/", [validateCreation, requireAuth], async (req, res, next) => {
  const { name, previewImage } = req.body;
  const newPlaylist = await Playlist.create({
    userId: req.user.id,
    name,
    previewImage,
  });
  res.json(newPlaylist);
});

// Add a Song to a Playlist based on the Playlists's id
router.post("/:playlistId/songs", requireAuth, async (req, res, next) => {
  const { songId } = req.body;
  const { playlistId } = req.params;
  const { userId } = req.user;

  const findPlaylist = await Playlist.findOne({ where: { id: playlistId } });

  if (!findPlaylist) {
    const err = new Error("Playlist couldn't be found");
    err.status = 404;
    next(err);
  }

  if (req.user.id !== findPlaylist.dataValues.userId) {
    const err = new Error("Forbidden");
    err.status = 403;
    next(err);
  }

  const findSong = await Song.findByPk(songId);

  if (!findSong) {
    const err = new Error("Song couldn't be found");
    err.status = 404;
    next(err);
  }

  await findPlaylist.addSong(findSong, { through: { userId: req.user.id } });

  // console.log("HERE", findSong)

  const inPlaylist = await PlaylistSong.findOne({
    where: {
      userId: req.user.id,
      songId,
      playlistId,
    },
  });
  // console.log(inPlaylist);

  res.json(inPlaylist);
});

// Remove a song from the playlist
router.delete("/:playlistId/songs/:songId", async (req, res, next) => {
  const { playlistId, songId } = req.params;

  try {
    // Check if the playlist and song exist
    const playlist = await Playlist.findByPk(playlistId);
    const song = await Song.findByPk(songId);
    if (!playlist || !song) {
      const err = new Error("Playlist or song not found");
      err.status = 404;
      throw err;
    }

    // Remove the song from the playlist
    await playlist.removeSong(song);

    // Get the updated playlist without the removed song
    const updatedPlaylist = await Playlist.findByPk(playlistId, {
      include: [Song],
    });

    res.json(updatedPlaylist);
  } catch (err) {
    next(err);
  }
});

//Get details of a Playlist from an id
router.get("/:playlistId", async (req, res, next) => {
  const { playlistId } = req.params;

  const playlist = await Playlist.findByPk(playlistId, {
    include: [
      {
        model: Song,
        through: { model: PlaylistSong, attributes: [] },
        include: [
          {
            model: User,
            as: "Artist",
            attributes: ["id", "username", "firstName", "lastName"],
          },
        ],
      },
      {
        model: User,
        attributes: {
          exclude: ["password", "createdAt", "updatedAt", "email"],
        },
      },
    ],
  });

  if (!playlist) {
    const err = new Error("Playlist couldn't be found");
    err.status = 404;
    next(err);
  }
  res.json(playlist);
});

// Edit a Playlist
router.patch("/:playlistId", validateCreation, async (req, res, next) => {
  const { playlistId } = req.params;

  const {
    name,
    // imageUrl
    previewImage,
  } = req.body;

  const playlist = await Playlist.findByPk(playlistId);

  if (!playlist) {
    const err = new Error("Playlist couldn't be found");
    err.status = 404;
    next(err);
  }

  if (req.user.id !== playlist.dataValues.userId) {
    const err = new Error("Forbidden");
    err.status = 403;
    next(err);
  }

  await playlist.update({
    name: name,
    // previewImage: imageUrl
    previewImage,
  });

  res.json(playlist);
});

// Delete a Playlist
router.delete("/:playlistId", async (req, res, next) => {
  const { playlistId } = req.params;
  const playlist = await Playlist.findByPk(playlistId);

  if (!playlist) {
    const err = new Error("Playlist couldn't be found");
    err.status = 404;
    next(err);
  }

  if (req.user.id !== playlist.dataValues.userId) {
    const err = new Error("Forbidden");
    err.status = 403;
    next(err);
  } else {
    await playlist.destroy(playlist);
    res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  }
});

module.exports = router;
