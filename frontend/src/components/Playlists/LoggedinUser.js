import { useDispatch, useSelector } from 'react-redux';
import { React, useEffect } from 'react';
import { Link, useHistory, useParams} from 'react-router-dom';
import PlaylistIndexItem from './PlaylistIndexItem';
import { myPlaylists, getPlaylists  } from '../../store/playlists';

const MyPlaylists = ({ user }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  // console.log('user id', id)
  // const history = useHistory();

  useEffect(() => {
    const fetchUserPlaylist = async () => {
      await dispatch(myPlaylists(id)) 
    }
    fetchUserPlaylist()
  }, [dispatch])


  // useEffect(() => {
  //   const fetchPlaylist = async () => {
  //     await dispatch(getPlaylists())
  //   }
  //   fetchPlaylist()
  // }, [getPlaylists])

  const playlistState = useSelector((state) => state.playlists);
  // console.log('state', playlistState)
  const playlists = Object.values(playlistState);


  // console.log('playlists', playlists)
  return (
    // playlists && (
      <>
        { !playlists.length
          ?
          <div className='emptyPlaylists-container'>
            <img className='radio' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAACnBAMAAADd8MzuAAAAJ1BMVEUAAAD////z8/Pz8/Px8fHv7+/v7+/w8PDv7+/v7+/v7+/w8PDv7++6cvnQAAAADHRSTlMABissj5CUvdXy8/2UePAFAAAA6ElEQVR42u3coW2CURQF4IOp+gWKCepqcXXojoBo9+gCbRiAERBVYCsQTWjoHYoFEKQJ/4XkOwt87uS+J06Sx48aOetFksy+a/T8vSWT92rIYZqHaslrnnrgXV564J+seuDffPXAx1RVZeRUVYHBYDAYDAaDwWAwGAwGg8GXZ6iq/X/g4fK/sj0YDL5NuK1AwGBwO3y2YsBg8F3BKhMMdtCDwZ6pYJ+oYDAYDAaDweArHPRgMLgfVplgMBgMBoPBYDAYDAaDweC7gtt2fdqWjJZd203PPfC2b5+rbZGsbYMtmX+O7W4WyQmkQ82SS+JpNQAAAABJRU5ErkJggg=='/>
            <h2 className='noPlaylist-text'>
              You don't have any playlists yet.
            </h2>
            <Link to={'/playlists/new'} className='newPlaylist-link'>
            Lets add one.
          </Link>
          </div>
          :
          <>
          <div className='allPlaylists-container'>

          <div className='top-playlists-text'>
            <div className='just-for-you'>
              <p className='hand-picked-text'> Carefully curated, hand picked:</p> 
            </div>
              <p className='playlist-occasion-text'>Your playlists for every mood & occasion </p>
          </div>
            <div className='allPlaylists'>
            <ul className='allPlaylistsList'>
              {
                playlists.map(playlist => (
                <PlaylistIndexItem
                playlist={playlist}
                key={playlist.id}
                />
                ))
              }
            </ul>

              </div>
              <Link className='upload-playlist' to='/playlists/new'>Add New playlist</Link>
              </div>
          </>
        }
      </>
          // )
  )
}

export default MyPlaylists;