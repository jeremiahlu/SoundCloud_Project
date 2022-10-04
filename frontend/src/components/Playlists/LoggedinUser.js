import { useDispatch, useSelector } from 'react-redux';
import { React, useEffect } from 'react';
import { Link, useHistory, useParams} from 'react-router-dom';
import PlaylistIndexItem from './PlaylistIndexItem';
import { myPlaylists } from '../../store/playlists';

const MyPlaylists = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  // console.log('user id', id)
  // const history = useHistory();

  useEffect(() => {
    dispatch(myPlaylists(id))
  }, [dispatch])

  const playlistState = useSelector((state) => state.playlists);
  // console.log('state', playlistState)
  const playlists = Object.values(playlistState);


  console.log('playlists', playlists)
  return (
    playlists && (
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
        <Link to='/playlists/new'>Add New playlist</Link>
      </div>
    )
  )
}

export default MyPlaylists;