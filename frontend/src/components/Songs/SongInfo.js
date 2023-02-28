import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Link } from 'react-router-dom';
// import { useState } from 'react';
import { removeSong, editSong, fetchSongById } from '../../store/songs';
// import EditSongForm from './EditSong';
import { useState, useEffect } from 'react';

const SongInfo = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const song = useSelector((state) => state.songs[id])

  useEffect(() => {
    (async () => {
      try {
        await dispatch(fetchSongById({id}))
        // console.log('err', id)
      } catch (err) {
      }
    })()
  }, [dispatch, id])

  // console.log(song)
 // return Object.entries(state.songs).find(e => e[1].id === songId)
//  const owner = useSelector(
//   (state) => state.session.user.id === song?.userId);
  const owner = useSelector(
    (state) => state.session.user);
  const isOwner = owner.id === song?.userId;

  const editSongRedirectHandler = () => {
    return (
      history.push(`/songs/${id}/edit`)
    )
  }

  const deleteSongSubmit = async () => {
    try {
      await dispatch(removeSong(song));
      history.push(`/users/${owner.id}/songs`)
    } catch (err) {

    }
  }

  return (
    song && (
      <>
      <div className='songDetail-container'>
          <div className='songDetail-basic-info'>
            <p>
              Basic Info
            </p>

        <Link className='backToExplore' to={`/users/${owner.id}/songs`}>
          Back to your tracks
        </Link>
          </div>

        <div className='songDetail'>
          
          <img className='songImage' src={song.previewImage || song.url} alt='song image'/>

          <div className='song-info-div'>
            
              <p className='song-info-text'>
                ID 
              </p>
              <div className='song-info'>
              { song.id }
            </div>

            <p className='song-info-text'>
              Title 
            </p>
            <div className='song-info'>
            { song.title } 
            </div>

            <p className='song-info-text'>
            Artist
            </p>
            <div className='song-info'>
            { song.userId }
            </div>
            
            <p className='song-info-text'>
              Description
            </p>
            <div className='song-info'>
            { song.description }
            </div>
            
            
          </div>
        </div>
{/* 
        <Link className='backToExplore' to={`/users/${owner.id}/songs`}>
          Back to your tracks
        </Link> */}

        <div> 
          {isOwner && (
            <div className='owner-action-div'> 
              <button onClick={editSongRedirectHandler}
              className='editSongButton'>
                <i className="fa-sharp fa-solid fa-pen-to-square"></i> Edit
              </button>

              <button onClick={deleteSongSubmit} className='deleteSongButton'>
              Delete
              </button>
            </div>
          )}
        </div>

      </div>
      </>
    )
  )
}

export default SongInfo;