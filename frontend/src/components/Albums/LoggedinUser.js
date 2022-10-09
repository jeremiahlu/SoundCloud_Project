import { useDispatch, useSelector } from 'react-redux';
import { React, useEffect } from 'react';
import { Link, useHistory, useParams} from 'react-router-dom';
import AlbumsIndexItem from './AlbumsIndexItem';
import { myAlbums, getAlbums } from '../../store/albums';

const MyAlbums = ({ user }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  // console.log('user id', id)
  // const history = useHistory();


  // useEffect(() => {
  //   const fetchPlaylist = async () => {
  //     await dispatch(getPlaylists())
  //   }
  //   fetchPlaylist()
  // }, [getPlaylists])

  const albums = useSelector((state) => Object.values(state.albums));

  useEffect(() => {
    const fetchUserAlbum= async () => {
      await dispatch(myAlbums(id)) 
    }
    fetchUserAlbum()
  }, [dispatch])

  // console.log('state', albumState)
  
  // const albums = albumState ? (albumState) : [];
  // console.log('albums', albums)

  // console.log('playlists', playlists)
  // return null;
  return (
    // playlists && (
      <>
        { !albums?.length
          ?
          <div className='emptyAlbums-container'>
            <img className='radio' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAACnBAMAAADd8MzuAAAAJ1BMVEUAAAD////z8/Pz8/Px8fHv7+/v7+/w8PDv7+/v7+/v7+/w8PDv7++6cvnQAAAADHRSTlMABissj5CUvdXy8/2UePAFAAAA6ElEQVR42u3coW2CURQF4IOp+gWKCepqcXXojoBo9+gCbRiAERBVYCsQTWjoHYoFEKQJ/4XkOwt87uS+J06Sx48aOetFksy+a/T8vSWT92rIYZqHaslrnnrgXV564J+seuDffPXAx1RVZeRUVYHBYDAYDAaDwWAwGAwGg8GXZ6iq/X/g4fK/sj0YDL5NuK1AwGBwO3y2YsBg8F3BKhMMdtCDwZ6pYJ+oYDAYDAaDweArHPRgMLgfVplgMBgMBoPBYDAYDAaDweC7gtt2fdqWjJZd203PPfC2b5+rbZGsbYMtmX+O7W4WyQmkQ82SS+JpNQAAAABJRU5ErkJggg=='/>
            <h2 className='noAlbums-text'>
              You don't have any albums yet.
            </h2>
            <Link to={'/albums/new'} className='newAlbum-link'>
            Lets add one.
          </Link>
          </div>
          :
          <>
          <div className='albums-sc-exclusives'>
            <div className='album-ff'> Your creations: Mixtapes & Albums </div>
            <div className='album-ff-secondary'>
              Let your sound be heard
            </div>
          </div>
    
          <div className='albums-container'>
              <ul className='userAlbums-List' id='slides-container'>
              {
                albums.map(album => (
                  <AlbumsIndexItem
                  album={album}
                  key={album.id}
                  className='slide'
                  />
                  ))
                }
              </ul>
          </div>
        </>
        }
        <Link className='upload-album' to='/albums/new'>Add New Album</Link>
      </>
          // )
  )
}

export default MyAlbums;