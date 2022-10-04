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
     const newSong = await dispatch( formType === 'Create' ? addSong(song) : editSong(song))
     console.log(newSong)
   
     formType === 'Create' ?
    history.push(`/songs/${newSong.id}`):
    history.push(`/songs/${id}`)
  }

  return (
    <div className='song-div'>
      <form className='song-form' onSubmit={songSubmit}>
        <div className='songForm'>

        <h2>{formType}</h2>
        <div>
          Song {id}
        </div>
        <label>
          Title
        </label>
          <input 
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='song-creator'/>
        <label>
          Description
        </label>
          <input 
            type='text'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='song-creator' />
        <label>
          URL
        </label>  
          <input 
            type='text'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className='song-creator'/>
        <label>
          Image Url
        </label>  
          <input 
            type='text'
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className='song-creator'/>
        <label>
          Album
        </label>  
          <input 
            type='text'
            value={albumId}
            onChange={(e) => setAlbumId(e.target.value)}
            className='song-creator'/>
        <input type='submit' value={formType} />
            </div>
      </form>
    </div>
  )
}

export default SongForm;