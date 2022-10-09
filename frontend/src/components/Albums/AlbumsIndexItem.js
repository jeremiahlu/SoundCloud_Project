import React from 'react';
import { Link } from 'react-router-dom';

const AlbumIndexItem = ({ album }) => {
  // console.log(album)
  return (
       
        <div className='album-cover-card'>
            <div className='albumImg-box'> 
              <img className='album-img' src={album?.previewImage} alt='album'/>
            </div>
            <Link className='album-link' to={`/albums/${album.id}`}>{album.title}</Link>
        </div>

  )
}

export default AlbumIndexItem;