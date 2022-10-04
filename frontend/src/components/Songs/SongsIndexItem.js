import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const SongsIndexItem = ({ song }) => {
  // const dispatch = useDispatch();
  // const deleteSong = (e) => {
  //   e.preventDefault();

  //   dispatch(delSong(song.id))
  // }

  return (
    <div className='audio-container'>
      <div className='music-player'>
        <span className='cover-art'>
          <div className='title'>
            <h3>
              UserId {song.userId}
            </h3>
            <li className='song'>
              <Link to={`/songs/${song.id}`}>{song.title}</Link>
            </li>
          <img className='img' src={song.previewImage}/>
  
          </div>
        </span>
      </div>
  
    </div>
  )
}

export default SongsIndexItem;