import React from 'react';
import { Link } from 'react-router-dom';

const AlbumIndexItem = ({ album }) => {
  // console.log(album)
  return (
       
        <div className='album-cover-card'>
            <div className='albumImg-box'> 
            
                <img className='albumImage' src={album?.previewImage || 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg'} alt='album'/>
            </div>
            <Link className='album-link' to={`/albums/${album.id}`}>{album.title}</Link>
        </div>

  )
}

export default AlbumIndexItem;