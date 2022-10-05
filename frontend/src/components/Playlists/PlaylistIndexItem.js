import React from 'react';
import { Link } from 'react-router-dom';

const PlaylistIndexItem = ({ playlist }) => {

  return (
    <div className='playlistImg'>
      <li className='playlist-name'>
        <Link className='playlistLink' key={playlist.id} to={`/playlists/${playlist.id}`}>{playlist.name}</Link>
      </li>
      <img className='img' src={playlist.previewImage} alt='playlist image'/>
    </div>
  )
}

export default PlaylistIndexItem;