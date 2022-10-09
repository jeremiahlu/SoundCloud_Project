import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPlaylist, editPlaylist } from '../../store/playlists';
import { useHistory, useParams } from 'react-router-dom';

const PlaylistForm = ({ formType, playlist }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const [ name, setName ] = useState('');
  const [ imageUrl, setImageUrl ] = useState('');

  const playlistSubmit = async (e) => {
    e.preventDefault();
   const form = {
      id,
      // userId,
      name,
      imageUrl
    }

    // const newSong = await dispatch(addSong(song));
     const newPlaylist = await dispatch( formType === 'Create' ? addPlaylist(form) : editPlaylist(form))
  //  console.log('here', newPlaylist)
     formType === 'Create' ?
    history.push(`/playlists/${newPlaylist.id}`):
    history.push(`/playlists/${id}`)
  }
    // console.log(playlist)
  return (
    <div className='playlist-div'>
      <form className='playlistForm-container' onSubmit={playlistSubmit}>

      <p className='playlistFormDetail-basic-info'>
              { formType } Playlist
      </p>

      {/* <div className='create-errors'>
          {errors && (
            <h2>
              {errors.message}
              {console.log('data', errors)}
            </h2>
          )}
      </div> */}
      <div className='playlistForm-detail'>

      <div className='playlistImage-div'>
        <img className='playlistForm-image' src={ playlist?.previewImage || 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg' } alt='playlist image'/>
        
        <p className='playlist-info-text'>
            Image Url
        </p>
        <div className='playlistForm-field'>
          <input 
            type='text'
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className='playlist-creator'
            required
            placeholder='Insert image'
            pattern='^(?!\s*$).+'/>
        </div>
           {/* <p className='playlistForm-errors'>{ errors.imageUrl } </p> */}
        </div>

        <div className='playlistForm-info-div'> 

        <p className='playlist-info-text'>
            Name
          </p>
        <div className='playlistForm-field'>
          <input 
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='playlist-creator'
              required
              placeholder='Playlist Name'
              pattern='^(?!\s*$).+'/>
              {/* <p className='playlistForm-errors'>{ errors.title } </p> */}
        </div>

        {/* <div className='playlistForm-field'>

<label>
Image Url
</label>  
<input 
type='text'
value={imageUrl}
onChange={(e) => setImageUrl(e.target.value)}
className='playlist-creator'
required/>
</div> */}
      
      <div className='playlistForm-submit-button-div'>
        <button className='playlistForm-submit-button' type='submit'>Save Changes</button>
      </div>
      </div>
</div>
      </form>
    </div>
  )
}

export default PlaylistForm;