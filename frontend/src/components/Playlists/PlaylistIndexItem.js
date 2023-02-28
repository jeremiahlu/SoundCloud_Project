import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const PlaylistIndexItem = ({ playlist }) => {
  // const [ imgSrc, setImgSrc ] = useState('Invalid Image Source')
  // const [imageUrl, setImageUrl ] = useState('')
  // console.log('here', playlist)
  return (
    // <div className='playlistImg'>
    //   <li className='playlist-name'>
    //     <Link className='playlistLink' key={playlist.id} to={`/playlists/${playlist.id}`}>{playlist.name}</Link>
    //   </li>
    //   <img className='img' src={playlist.imageUrl} alt='playlist image'/>
    // </div>
    <div className='audio-container'>
      
      <div className='playlist-card'>
   
        <div className='cover-art'>
            <div className='playlistImg-box'> 
              <img className='img' src={playlist.previewImage || 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg'} alt='playlist'/>
            </div>
            {/* <div className='description-container'> */}
              {/* <p className='description-text'>
                Description:
              </p> */}
            {/* <div className='title'> */}
              {/* <li> */}
                <Link className='playlist-link' to={`/playlists/${playlist.id}`}>{playlist.name}</Link>
              {/* </li> */}
            {/* </div> */}
              {/* <div className='song-description'>
                {song.description}
              </div> */}
            {/* </div> */}
  
        </div>
      </div>
    </div>
  )
}

export default PlaylistIndexItem;