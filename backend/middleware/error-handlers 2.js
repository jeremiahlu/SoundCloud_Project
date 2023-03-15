const { Song, Comment, Playlist_Song, Playlist, User } = require('../db/models')

const invalidCredentials = async (req, _res, next) => {
  const { credential, password } = req.params
  const user = await User.findOne( {credential})
  if (!user) {
    const err = new Error('Invalid credentials');
    err.message = 'Invalid Credentials'
    err.statusCode = 401      
    next(err);
  } else {
    next()
  }
}

module.exports = { invalidCredentials }