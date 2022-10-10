import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAlbum, editAlbum } from '../../store/albums';
import { useHistory, useParams } from 'react-router-dom';

const AlbumForm = ({ formType, album }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const [ previewImage, setPreviewImage ] = useState('');
  const [ userId, setUserId ] = useState('');
  const [ title, setTitle ] = useState('');
  const [ description, setDescription] = useState('');
  const [ errors, setErrors ] = useState({})

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
    try {

     const newAlbum = await dispatch( formType === 'Create' ? createAlbum(form) : editAlbum(form))

     formType === 'Create' ?
    history.push(`/albums/${newAlbum.id}`):
    history.push(`/albums/${id}`)
  } catch (res) {
    // setErrors([])
      const data = await res.json()
      // const err = Object.values(data.errors)
      const err = data.errors
      // console.log('data', data)
      // console.log('errors', err)
      if (data && data.message) setErrors(err)
      // console.log('errors', errors) 
  
      // console.log('here', errors.albumId)
      // return (data.errors.url)
   }
  }

  return (
    <div className='album-div'>
      <form className='albumForm-container' onSubmit={albumSubmit}>

      <p className='albumFormDetail-basic-info'>
              { formType } Album
      </p>

      <div className='createPlaylist-errors'>
          {errors && (
            <h2>
              {errors?.message}
            </h2>
          )}
        </div>
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
            placeholder='Insert image'
            pattern='https://.*'/>
        </div>
           <p className='playlistForm-errors'>{ errors?.previewImage } </p>
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
              placeholder='Album Name'
              pattern='^(?!\s*$).+'/>
              <p className='playlistForm-errors'>{ errors.title } </p>
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