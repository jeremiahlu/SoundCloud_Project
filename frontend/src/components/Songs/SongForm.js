import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSong, editSong } from '../../store/songs';
import { useHistory, useParams } from 'react-router-dom';
import { myAlbums } from '../../store/albums';
import * as sessionActions from '../../store/session';


const SongForm = ({ formType }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  // const album = useSelector((state) => state.albums)
  // const songActions = useSelector(state => state.song);

  const albums = useSelector((state) => Object.values(state.albums));
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    const fetchUserAlbum= async () => {
      await dispatch(myAlbums(sessionUser.id)) 
    }
    fetchUserAlbum()
  }, [dispatch])

  const [ title, setTitle ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ url, setUrl ] = useState('');
  const [ imageUrl, setImageUrl ] = useState('');
  const [ albumId, setAlbumId ] = useState(null);
  const [ errors, setErrors ] = useState({});

  // const owner = useSelector(
  //   (state) => state.session.user);
  // const isOwner = owner.id === album?.userId;
  // // const userAlbums = owner.albums[id];

  const songSubmit = async (e) => {
    e.preventDefault();

    setTitle(title.trim())
    // setAlbumId(albumId.trim())
    setImageUrl(imageUrl.trim())

   const song = {
      // id,
      title,
      description,
      url,
      imageUrl,
      albumId: albumId || null
    }
    console.log('song', song)
    // const newSong = await dispatch(addSong(song));
 try {
   const newSong = await dispatch( formType === 'Create' ? addSong(song) : editSong(song))
   
   formType === 'Create' ?
   history.push(`/songs/${newSong.id}`):
   history.push(`/songs/${id}`)
   
  } catch (res) {
    // setErrors([])
      const data = await res.json()
      // const err = Object.values(data.errors)
      const err = data.errors
      
      if (data && data.message) setErrors(err)
   
      // return (data.errors.url)
   }
  }   
  // const userAlbums = myAlbums(session.user.id)
    return (
      <div className='song-div'>
      <form className='songForm-container' onSubmit={songSubmit}>
        
            <p className='songFormDetail-basic-info'>
              { formType } Song
            </p>
        <div className='createSong-errors'>
          {errors && (
            <h2>
              {errors?.message}
            
            </h2>
          )}
        </div>

       <div className='songForm-detail'>

            <div className='songImage-div'>
        <img className='songForm-image' src='https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg' alt='song image'/>
        
        <p className='song-info-text'>
            Image Url
        </p>
        <div className='songForm-field'>
          <input 
            type='text'
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className='song-creator'
            required
            placeholder='Insert image (example: "https://...") '
            pattern='https://.*'/>
        </div>
           <p className='songForm-errors'>{ errors?.previewImage } </p>
        </div>
      
        <div className='songForm-info-div'> 

         <p className='song-info-text'>
            Title
          </p>
        <div className='songForm-field'>
          <input 
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='song-creator'
              required
              placeholder='Title'
              pattern='^(?!\s*$).+'
              />
              <p className='songForm-errors'>{ errors?.title } </p>
        </div>

          <p className='song-info-text'>
            Description
          </p>
        <div className='songForm-field'>
          <input 
            type='text'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='song-creator' 
            // required
            placeholder='Optional'/>
            {/* <p className='songForm-errors'> { errors.description } </p> */}
        </div>

        <p className='song-info-text'>
            URL
          </p> 
        <div className='songForm-field'>
          <input 
            type='text'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className='song-creator'
            required
            pattern='https://.*'
            placeholder='Insert audio (example: "https://...")'
            />
            {/* /> */}
        </div>
            <p className='songForm-errors'> { errors?.url } </p>

       {/* <p className='songForm-text'>
            Image Url
          </p>
        <div className='songForm-field'>
          <input 
            type='text'
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className='song-creator'
            required
            placeholder='Insert image'/>
           <p className='songForm-errors'>{ errors.imageUrl } </p>
        </div>  */}

        <p className='song-info-text'>
          Album
          </p>  
        <div className='songForm-field'>
        {/* <input 
            type='text'
            value={albumId}
            onChange={(e) => setAlbumId(e.target.value)}
            className='song-creator'
            // required
            placeholder='Optional'
            pattern='^(?!\s*$).+'
            /> */}
          
  
          <select 
          // type='text'
          value={albumId}
          onChange={(e) => setAlbumId(e.target.value)}
          className='song-creator select-dropdown'
          required
          >
            <option value='' disabled>
              Select Album
            </option>  
            <option value=''>
              N/A
            </option>
         
              {  
                albums?.map((album) => (
                    <option key={album.id}
                    value={album.id}>
                      {album.title}
                    </option>
                  ))
               }
          </select>

        </div>
        { 
          // errors?.albumId &&
          <p className='songForm-errors'>{ errors?.albumId } </p>
        }

        <div className='songForm-submit-button-div'>
          <button className='songForm-submit-button' type='submit'>Save Changes</button>
        </div>
      </div>
    </div>
      </form>
    </div>
  )
}

export default SongForm;