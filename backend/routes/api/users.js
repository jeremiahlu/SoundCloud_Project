const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

const { Album, Comment, Playlist_Song, Playlist, Song} = require('../../db/models')

// Sign up
router.post(
  '/',
  async (req, res) => {
    const { firstName, lastName, email, password, username } = req.body;
    const user = await User.signup({ firstName, lastName, email, username, password });

    await setTokenCookie(res, user);

    return res.json({
      user
    });
  }
);

router.get('/api/users/:id', async(req, res) => {
  const userId = await User.findByPk(req.params.id)
  res.json(userId)
})

module.exports = router;