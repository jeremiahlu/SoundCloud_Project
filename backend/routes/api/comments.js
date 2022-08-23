const express = require('express');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { invalidCredentails } = require('../../middleware/error-handlers')
 
const { setTokenCookie, requireAuth, restoreUser, isCurrentUser} = require('../../utils/auth');
const { Album, Comment, Playlist_Song, Playlist, User, Song } = require('../../db/models')

const router = express.Router();

const validateCreation = [
  check('body')
    .exists()
    .notEmpty()
    .withMessage('Comment body text is required'),
    handleValidationErrors
]

router.patch('/:commentId', requireAuth, validateCreation, restoreUser, async (req, res, next) => {
  const { commentId } = req.params;
  const { body } = req.body;

  const comment = await Comment.findByPk(commentId); 

  if (!comment) {
    const err = new Error("Comment couldn't be found");
    err.status = 404
    next(err)
  };

  if (req.user.id !== comment.dataValues.userId) {
    const err = new Error("Forbidden");
    err.status = 403;
    next(err)
  };

  await comment.update({
    body
  })
  res.json(comment)
});

router.delete('/:commentId', requireAuth, async (req, res, next) => {
  const { commentId } = req.params;
  const comment = await Comment.findByPk(commentId);

  if (!comment) {
    const err = new Error("Comment couldn't be found");
    err.status = 404
    next(err)
  };

  if (req.user.id !== comment.dataValues.userId) {
    const err = new Error("Forbidden");
    err.status = 403;
    next(err)
  } 
  else {
    await comment.destroy(comment)
    res.json({
      message: "Successfully deleted",
      statusCode: 200
    })
  }
})


module.exports = router;