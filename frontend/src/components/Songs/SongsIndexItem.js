import React from 'react';
import { Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
import './Songs.css'

const SongsIndexItem = ({ song }) => {
  // const dispatch = useDispatch();
  // const deleteSong = (e) => {
  //   e.preventDefault();

  //   dispatch(delSong(song.id))
  // }

  return (

    <div className='audio-container'>
      <div className='song-card'>

        <div className='cover-art'>
            <div className='songImg-box'> 
            {console.log(song)}
              <img className='img' src={song.previewImage || song.url} alt='song'/>
            </div>
            <div className='description-container'>
              {/* <p className='description-text'>
                Description:
              </p> */}
            <div className='title'>
              <li>
                <Link className='song-link'to={`/songs/${song.id}`}>{song.title}</Link>
              </li>
            </div>
              {/* <div className='song-description'>
                {song.description}
              </div> */}
            </div>
  
        </div>
      </div>
    </div>
  )
}

export default SongsIndexItem;