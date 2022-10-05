import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSong, editSong } from '../../store/songs';
import { useHistory, useParams } from 'react-router-dom';

const SongForm = ({ formType }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const [ title, setTitle ] = useState('');
  const [ description, setDescription ] = useState('some description');
  const [ url, setUrl ] = useState('');
  const [ imageUrl, setImageUrl ] = useState('');
  const [ albumId, setAlbumId ] = useState('');
  const [ errors, setErrors ] = useState([]);

  const songSubmit = async (e) => {
    e.preventDefault();
   const song = {
      id,
      title,
      description,
      url,
      imageUrl,
      albumId
    }

    // const newSong = await dispatch(addSong(song));
    try {
      const newSong = await dispatch( formType === 'Create' ? addSong(song) : editSong(song))
      // console.log(newSong)
      
      formType === 'Create' ?
      history.push(`/songs/${newSong.id}`):
      history.push(`/songs/${id}`)

    } catch (res) {
      const data = await res.json()
      const err = [data.message]
      if (data && data.message) setErrors(...err)
      // console.log(data.errors.url)
      // return (data.errors.url)
    };
   }

  //  useEffect(() => {

  //  })

  return (
    <div className='song-div'>
      <form className='songForm-container' onSubmit={songSubmit}>

        <div className='errors'>
          { errors && (
            <h2 className='song-error'>
              Error: Submission failed
            </h2>
          )}
        </div>

        <h2> {formType} Song</h2>
        {/* <div>
          Song {id}
        </div> */}
        <div className='songForm-field'>
        <label>
          Title
        </label>
          <input 
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='song-creator'/>
            <p> { errors.title } </p>
        </div>

        <div className='songForm-field'>
        <label>
          Description
        </label>
          <input 
            type='text'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='song-creator' />
            <p> { errors.description } </p>
        </div>

        <div className='songForm-field'>
        <label>
          URL
        </label>  
          <input 
            type='text'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className='song-creator'/>
            <p> { errors.url } </p>
        </div>

        <div className='songForm-field'>
        <label>
          Image Url
        </label>  
          <input 
            type='text'
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className='song-creator'/>
            <p> { errors.imageUrl } </p>
        </div>

        <div className='songForm-field'>
        <label>
          Album
        </label>  
          <input 
            type='text'
            value={albumId}
            onChange={(e) => setAlbumId(e.target.value)}
            className='song-creator'/>
            <p> { errors.albumId } </p>
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default SongForm;