import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Link } from 'react-router-dom';
// import { useState } from 'react';
import { removeSong, editSong } from '../../store/songs';
// import EditSongForm from './EditSong';

const SongInfo = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const song = useSelector((state) => state.songs[id])
  // console.log(song)
 // return Object.entries(state.songs).find(e => e[1].id === songId)
 const owner = useSelector(
  (state) => state.session.user.id === song?.userId);

  const deleteSubmit = async () => {
    await dispatch(removeSong(song));
    history.push('/songs')
  }

  return (
    song && (
      <section>
        <img className='songImage' src={song.previewImage} alt='song image'/>
        <br/>
        ID: { song.id }
        <br/>
        Title: { song.title } 
        <br/>
        Artist: { song.userId }
        <br/>
        Description: { song.description }
        <br/>
        <Link to={`/songs`}>
          Back to tracks
        </Link>
        <div> 
          {owner && (
            <>
              <Link to={`/songs/${id}/edit`
              } className='editSongButton'>
              Edit 
              </Link>

              <button onClick={deleteSubmit} className='deleteSongButton'>
              Delete
              </button>
            </>
          )}
        </div>
      </section>
    )
  )
}

export default SongInfo;