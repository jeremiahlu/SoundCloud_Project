import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './Songs.css'

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
            {/* <h3>
              UserId {song.userId}
            </h3> */}
            <li className='song'>
              <Link to={`/songs/${song.id}`}>{song.title}</Link>
            </li>
            <div className='songbox'> 
              <img className='img' src={song.previewImage}/>
              <div className='songdescription'>
                {song.description}
              </div>
            </div>
  
          </div>
        </span>
      </div>
    </div>
  )
}

export default SongsIndexItem;