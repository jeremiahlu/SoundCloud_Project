import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PlaylistIndexItem from './PlaylistIndexItem';
import { getPlaylists } from '../../store/playlists';

const PlaylistIndex = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPlaylist = async () => {
      await dispatch(getPlaylists())
    }
    fetchPlaylist()
  }, [])

  const playlistState = useSelector((state) => state.playlist);
  const playlist = Object.values(playlistState);
  console.log('playlists', playlist)
  
  return (
    playlist && (
      <div className='allPlaylists'>
        <ul className='allPlaylistsList'>
        {
          playlist.map(playlist => (
            <PlaylistIndexItem
              playlist={playlist}
              key={playlist.id}
            />
          ))
        }
        </ul>
        <Link to='/playlist/new'>Add New Playlist</Link>
      </div>
    )
  )
}

export default PlaylistIndex;