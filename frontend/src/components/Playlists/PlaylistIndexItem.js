import React from 'react';
import { Link } from 'react-router-dom';

const PlaylistIndexItem = ({ playlist }) => {

  return (
    <li>
      <Link key={playlist.id} to={`/playlists/${playlist.id}`}>{playlist.name}</Link>
    </li>
  )
}

export default PlaylistIndexItem;