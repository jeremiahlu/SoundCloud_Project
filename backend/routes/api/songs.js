const express = require("express");
const {
  singlePublicFileUpload,
  multiplePublicFileUpload,
  singleMulterUpload,
  multipleMulterUpload,
} = require("../../awsS3");
const { check, query } = require("express-validator");
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
const { Op } = require("sequelize");

const router = express.Router();

// const validateCreation = [
//   check("title").exists().notEmpty().withMessage("Song title is required"),
//   check("url")
//     .exists()
//     .notEmpty()
//     // .isURL({ require_tld: false })
//     .withMessage("Audio is required"),
//   // check('albumId')
//   // .exists()
//   // .notEmpty()
//   // .isURL({ require_tld: false })
//   // .withMessage("Album couldn't be found"),
//   // check('previewImage')
//   //   .isURL()
//   //   .withMessage('Invalid image source'),
//   handleValidationErrors,
// ];
const mime = require("mime");
const addFilesToBody = (req, res, next) => {
  // console.log(
  // console.log(req.files, "files");
  // console.log(req.body, "body");
  Object.keys(req.files).forEach((key) => {
    req.body[key] = req.files[key];
  }),
    // "*&!!!!!!!!!!!!!!!!!!!!!!"
    // );
    next();
};

const validateCreation = [
  addFilesToBody,
  check("title").exists().notEmpty().withMessage("Song title is required"),
  check("url")
    .exists()
    .notEmpty()
    .custom((value, { req }) => {
      // console.log(req.body["url"].mimetype, "MIME!!!!!!!!!!!!");

      const allowedTypes = ["audio/mpeg", "audio/mp3"];
      if (!allowedTypes.includes(req.files["url"][0].mimetype)) {
        // if (
        //   req.files["url"][0].mimetype !== "audio/mp3" ||
        //   req.files["url"][0].mimetype !== "audio/mpeg"
        // ) {
        throw new Error("Audio must be an mp3 file");
      }
      return true;
    })
    .withMessage("Audio is required and must be an mp3 file"),
  check("previewImage")
    .custom((value, { req }) => {
      // console.log(req.files["previewImage"][0].mimetype, "MIME!!!!!!!!!!!!");
      // const mimeType = mime.getType(value);
      const allowedTypes = ["image/png", "image/jpeg", "image/svg+xml"];

      if (!allowedTypes.includes(req.files["previewImage"][0].mimetype)) {
        throw new Error("Preview image must be a PNG, JPEG or SVG file ");
      }
      return true;
    })
    .withMessage("Preview image must be a PNG, JPEG or SVG file"),
  handleValidationErrors,
];
const validateCommentCreation = [
  check("body")
    .exists()
    .notEmpty()
    .withMessage("Comment body text is required"),
  handleValidationErrors,
];

const validateSongQuery = [
  query("page")
    .optional()
    .isInt({ min: 0, max: 10 })
    .withMessage("Page must be greater than or equal to 0"),
  query("size")
    .optional()
    .isInt({ min: 0, max: 20 })
    .withMessage("Size must be greater than or equal to 0"),
  query("createdAt").optional().isString().withMessage("CreatedAt is invalid"),
  handleValidationErrors,
];

// Get all Songs
// router.get("/", handleValidationErrors, async (req, res) => {
//   const Songs = await Song.findAll();
//   res.json({ Songs });
// });
router.get("/", async (req, res, next) => {
  const Songs = await Song.findAll({
    include: [
      {
        model: User,
        as: "Artist",
        attributes: {
          exclude: ["password", "createdAt", "updatedAt", "email"],
        },
      },
      {
        model: Album,
        attributes: {
          exclude: ["userId", "description", "createdAt", "updatedAt"],
        },
      },
    ],
  });
  res.json({ Songs });
});

// Get details of a Song from an id
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const songs = await Song.findByPk(id, {
    include: [
      {
        model: User,
        as: "Artist",
        attributes: {
          exclude: ["password", "email", "createdAt", "updatedAt"],
        },
      },
      {
        model: Album,
        attributes: {
          exclude: ["userId", "description", "createdAt", "updatedAt"],
        },
      },
    ],
  });
  // const user = await User.findByPk(songs.dataValues.userId);
  // const fullName = user.dataValues.firstName + " " + user.dataValues.lastName;

  const songObject = songs.toJSON();
  songObject.artist = songObject.Artist;
  delete songObject.Artist;
  // console.log(songObject, "SONGOBJ$@#!");
  // console.log(songs, "SONGS!!!!");

  if (!songs) {
    const err = new Error("Song couldn't be found");
    err.status = 404;
    next(err);
  }

  res.json({ songs, songObject });
  // res.json(songs);
});

// Create a Song
router.post(
  "/",

  multipleMulterUpload("previewImage", "url"),

  validateCreation,
  async (req, res, next) => {
    const { title, description, albumId } = req.body;

    const imageUrl = await singlePublicFileUpload(req.files["previewImage"][0]);

    const url = await singlePublicFileUpload(req.files["url"][0]);

    const findAlbum = await Album.findByPk(albumId);
    if (!findAlbum && req.body.albumId !== null) {
      const err = new Error("Album couldn't be found");
      err.status = 404;
      next(err);
    } else if (!req.files) {
      // res.status(400).send({ error: req.fileError.message });
      const err = new Error({ error: req.fileError.message });
      next(err);
    } else {
      const newSong = await Song.create({
        userId: req.user.id,
        albumId,
        title,
        description,
        url,
        previewImage: imageUrl,
      });

      res.json(newSong);
    }
  }
);

// Edit a Song
router.patch(
  "/:id",
  multipleMulterUpload("previewImage", "url"),
  // requireAuth,
  // restoreUser,
  validateCreation,
  // singleMulterUpload("previewImage"),
  // singleMulterUpload("url"),
  async (req, res, next) => {
    const { id } = req.params;
    const {
      title,
      description,
      // url,
      // previewImage: imageUrl,
      albumId,
    } = req.body;
    // console.log(req, "body");

    const imageUrl = await singlePublicFileUpload(req.files["previewImage"][0]);

    const url = await singlePublicFileUpload(req.files["url"][0]);
    // console.log('here', req.body)
    // console.log(imageUrl, " IMAGEURL");
    // console.log(url, " URL");
    const song = await Song.findByPk(id);

    if (!song) {
      const err = new Error("Song couldn't be found");
      err.status = 404;
      next(err);
    }

    const findAlbum = await Album.findByPk(albumId);
    if (!findAlbum && req.body.albumId !== null) {
      const err = new Error("Album couldn't be found");
      err.status = 404;
      next(err);
    }
    if (req.user.id !== song.dataValues.userId) {
      const err = new Error("Forbidden");
      err.status = 403;
      next(err);
    } else {
      await song.update({
        title: title,
        description: description,
        url: url,
        previewImage: imageUrl,
        albumId: albumId,
      });
      res.json(song);
    }
  }
);

// Delete a Song
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  const song = await Song.findByPk(id);

  if (!song) {
    const err = new Error("Song couldn't be found");
    err.status = 404;
    next(err);
  }

  if (req.user.id !== song.dataValues.userId) {
    const err = new Error("Forbidden");
    err.status = 403;
    next(err);
  } else {
    await song.destroy(song);
    res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  }
});

// Get all Comments by a Song's id
router.get("/:songId/comments", async (req, res, next) => {
  const { songId } = req.params;
  const song = await Song.findByPk(songId);

  if (!song) {
    const err = new Error("Song couldn't be found");
    err.status = 404;
    next(err);
  }

  const Comments = await song.getComments({
    include: [
      {
        model: User,
        attributes: {
          exclude: [
            "firstName",
            "lastName",
            "email",
            "password",
            "previewImage",
            "createdAt",
            "updatedAt",
          ],
        },
      },
    ],
  });
  res.json({ Comments });
});

//Create a Comment for a Song based on the Song's id
router.post(
  "/:songId/comments",
  validateCommentCreation,
  async (req, res, next) => {
    const { songId } = req.params;
    const { body } = req.body;
    const song = await Song.findByPk(songId);
    const userId = req.user.id;

    if (!song) {
      const err = new Error("Song couldn't be found");
      err.status = 404;
      next(err);
    }

    const newComment = await song.createComment({
      userId,
      body,
    });

    res.json(newComment);
  }
);

// Add Query Filter to Get All Songs
router.get("/", validateSongQuery, async (req, res, next) => {
  let { page, size } = req.query;
  size = size ? size : 20;
  page = page ? page : 0;

  let search = {};
  for (const param in req.query) {
    if (param !== "page" && param !== "size") {
      search[param] = req.query[param];
    }
  }

  const Songs = await Song.findAll({
    where: {
      ...search,
    },
    limit: size,
    offset: page,
  });

  res.json({ Songs, page, size });
});
module.exports = router;
