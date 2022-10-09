import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAlbum, editAlbum } from '../../store/albums';
import { useHistory, useParams } from 'react-router-dom';

const AlbumForm = ({ formType, album }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  // const [ name, setName ] = useState('');
  const [ previewImage, setPreviewImage ] = useState('');
  const [ userId, setUserId ] = useState('');
  const [ title, setTitle ] = useState('');
  const [ description, setDescription] = useState('');

  const albumSubmit = async (e) => {
    e.preventDefault();
   const form = {
      id,
      userId,
      title,
      description,
      previewImage
    };

    // const newAlbum = await dispatch(createAlbum(form));
     const newAlbum = await dispatch( formType === 'Create' ? createAlbum(form) : editAlbum(form))
  //  console.log('here', newPlaylist)
     formType === 'Create' ?
    history.push(`/albums/${newAlbum.id}`):
    history.push(`/albums/${id}`)
  }
    // console.log(playlist)
  return (
    <div className='album-div'>
      <form className='albumForm-container' onSubmit={albumSubmit}>

      <p className='albumFormDetail-basic-info'>
              { formType } Album
      </p>

      {/* <div className='create-errors'>
          {errors && (
            <h2>
              {errors.message}
              {console.log('data', errors)}
            </h2>
          )}
      </div> */}
      <div className='albumForm-detail'>

      <div className='albumImage-div'>
        <img className='albumForm-image' src={ album?.previewImage || 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg' } alt='album image'/>
        
        <p className='album-info-text'>
            Image Url
        </p>
        <div className='albumForm-field'>
          <input 
            type='text'
            value={previewImage}
            onChange={(e) => setPreviewImage(e.target.value)}
            className='album-creator'
            required
            placeholder='Insert image'/>
        </div>
           {/* <p className='playlistForm-errors'>{ errors.imageUrl } </p> */}
        </div>

        <div className='albumForm-info-div'> 

        <p className='album-info-text'>
            Title
          </p>
        <div className='albumForm-field'>
          <input 
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='album-creator'
              required
              placeholder='Album Name'/>
              {/* <p className='playlistForm-errors'>{ errors.title } </p> */}
        </div>

        <div className='albumForm-info-div'> 

        <p className='album-info-text'>
            Description
          </p>
        <div className='albumForm-field'>
          <input 
              type='text'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='album-creator'
              required
              placeholder='Album description'/>
              {/* <p className='playlistForm-errors'>{ errors.title } </p> */}
        </div>
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
      
      <div className='albumForm-submit-button-div'>
        <button className='albumForm-submit-button' type='submit'>Save Changes</button>
      </div>
      </div>
</div>
      </form>
    </div>
  )
}

export default AlbumForm;