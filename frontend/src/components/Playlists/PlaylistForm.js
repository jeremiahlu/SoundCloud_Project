import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPlaylist, editPlaylist } from '../../store/playlists';
import { useHistory, useParams } from 'react-router-dom';

const PlaylistForm = ({ formType }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const [ name, setName ] = useState('');
  const [ imageUrl, setImageUrl ] = useState('');

  const playlistSubmit = async (e) => {
    e.preventDefault();
   const playlist = {
      id,
      // userId,
      name,
      imageUrl
    }

    // const newSong = await dispatch(addSong(song));
     const newPlaylist = await dispatch( formType === 'Create' ? addPlaylist(playlist) : editPlaylist(playlist))
   
     formType === 'Create' ?
    history.push(`/playlists/${newPlaylist.id}`):
    history.push(`/playlists/${id}`)
  }

  return (
    <div className='playlist-div'>
      <form className='playlist-form' onSubmit={playlistSubmit}>
        <h2>{formType}</h2>
        <div>
          Playlist #{id}
        </div>
        <label>
          Name
        </label>
          <input 
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='playlist-creator'/>
        <label>
          Image Url
        </label>  
          <input 
            type='text'
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className='playlist-creator'/>
      
        <input type='submit' value={formType} />
      </form>
    </div>
  )
}

export default PlaylistForm;