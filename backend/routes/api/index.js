const router = require('express').Router();
// const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const songsRouter = require('./songs.js');
const playlistRouter = require('./playlist.js');
const playlistSongsRouter = require('./playlist_songs.js');
const commentRouter = require('./comments.js');
const albumRouter = require('./albums.js');
const artistRouter = require('./artists.js');

const { restoreUser } = require("../../utils/auth.js");


router.use(restoreUser);

// router.use('/session', sessionRouter);

router.use('/users', usersRouter);
router.use('/songs', songsRouter);
router.use('/playlists', playlistRouter);
router.use('/playlist_songs', playlistSongsRouter);
router.use('/comments', commentRouter);
router.use('/albums', albumRouter);

router.use('/artists', artistRouter);


// router.post('/test', (req, res) => {
  //   res.json( { requestBody: req.body });
// });

// const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require('../../db/models');
// router.get('/set-token-cookie', async (_req, res) => {
//   const user = await User.findOne({
//       where: {
//         username: 'Demo-lition'
//       }
//     });
//   setTokenCookie(res, user);
//   return res.json({ user });
// });


// router.use(restoreUser);

// router.get(
  //   '/restore-user',
  //   (req, res) => {
    //     return res.json(req.user);
    //   }
    // );
    
    // const { requireAuth } = require('../../utils/auth.js');
    // router.get(
      //   '/require-auth',
      //   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router