import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { removeAlbums, editAlbum, fetchAlbumById, fetchAlbums } from '../../store/albums';

const AlbumInfo = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const album = useSelector((state) => state.albums[id])

  useEffect(() => {
    const getAlbums = async () => {
      await dispatch(fetchAlbums())
    }
    getAlbums()
  }, [])
    // useEffect(() => {
    //   (async () => {
    //     try {
    //       await dispatch(fetchAlbumById(album?.id))
    //     } catch (err) {
    //     }
    //   })()
    // }, [dispatch, album])

  
 const owner = useSelector(
  (state) => state.session.user);
 const isOwner = owner.id === album?.userId

  const addSong = () => {
    return (
      history.push(`/songs/new`)
    )
  }

  const editAlbumsRedirectHandler = () => {
    return (
      history.push(`/albums/${id}/edit`)
    )
  }

  const deleteAlbumsSubmit = async () => {
  
    try {
      await dispatch(removeAlbums(album));
      history.push(`/users/${owner.id}/albums`)
    } catch (err) {
    }
  }
  return (
  
    album && (
      <>
      <div className='albumDetail-container'>
          <div className='albumDetail-basic-info'>
            <p>
              Basic Info
            </p>

        <Link className='backToExplore' to={`/users/${owner.id}/albums`}>
          Back to your albums
        </Link>
          </div>

        <div className='albumsDetail'>

          <div className='album-top-div'>
          <img className='albumImage' src={album?.previewImage} alt='album image'/>
          {/* {isOwner && (
              <div className='album-addsong-div'>
                <button onClick={addSong} className='album-add-song'>
                  Add your song to album
                </button>
              </div>
              )
          } */}
          </div>

          <div className='album-info-div'>
            
              <p className='album-info-text'>
                ID 
              </p>
              <div className='album-info'>
              { album.id }
            </div>

            <p className='album-info-text'>
              Name 
            </p>
            <div className='album-info'>
            { album.title } 
            </div>

            <p className='album-info-text'>
            Creator
            </p>
            <div className='album-info'>
            { album.userId }
            </div>
            
            <p className='playlist-info-text'>
              Description
            </p> 
            <div className='album-info'>
            { album.description }
            </div> 
            
          </div>
        </div>

        <div> 
          {isOwner && (
            <div className='album-owner-action-div'> 
              {/* <Link to={`/songs/${id}/edit`
              } className='editSongButton'>
              Edit 
              </Link> */}
          
              {/* <div className='album-addsong-div'>
                <button onClick={addSong} className='album-add-song'>
                  Add your song to album
                </button>
              </div> */}

              <div className='album-editDel-buttons'> 
              <button onClick={editAlbumsRedirectHandler}
              className='editAlbumButton'>
                <i className="fa-sharp fa-solid fa-pen-to-square"></i> Edit
              </button>

              <button onClick={deleteAlbumsSubmit} className='deleteAlbumButton'>
              Delete
              </button>
              </div>
            </div>
          )}
        </div>

      </div>
      </>
    )

  )
}

export default AlbumInfo;