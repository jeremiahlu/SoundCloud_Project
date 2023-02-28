import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PlaylistIndexItem from './PlaylistIndexItem';
import { getPlaylists } from '../../store/playlists';
import './Playlist.css';

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
  // console.log('playlists', playlist)
  
  return (
    playlist && (
      <div className='allPlaylists-container'>

        {/* <div className='top-playlists-container'> 
         <div className='top-playlists-text'>
            <div className='just-for-you'>
              <p className='top-charts-text'> Top Charts: Certified Bangers </p> 
            </div>
              <p className='most-played-text'>The most played tracks on SoundCloud this week</p>
          </div> */}
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
         </div>
        </div>
      // </div>

    )
  )
}

export default PlaylistIndex;