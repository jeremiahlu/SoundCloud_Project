import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { removePlaylist, editPlaylist, fetchPlaylistById } from '../../store/playlists';
// import EditSongForm from './EditSong';

// frontend/src/store/playlists.js
const PlaylistInfo = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const playlist = useSelector((state) => state.playlists[id])
  // console.log(playlist)

  // const [ fetchData, setFetchData ] = useState([]);
  // console.log(song)
 // return Object.entries(state.songs).find(e => e[1].id === songId)

//  const dataFetch = async () => {
//   const res = await fetch(myPlaylists(id))
//   console.log('res', res)
//   const data = await res.json();

//   setFetchData(data)
// }

  // useEffect(() => {
  //   dataFetch()
  // }, [])
  // console.log('id', id)
  useEffect(() => {
    (async () => {
      try {
        await dispatch(fetchPlaylistById({id}))
        // console.log('err', id)
      } catch (err) {
      }
    })()
  }, [dispatch, id])

  // useEffect(() => {
  //   if (playlist) (async() => await dispatch(fetchPlaylistById(playlist?.id)))()
  //   console.log('playlist', playlist)
  // }, [dispatch, playlist])

 const owner = useSelector(
  (state) => state.session.user);
 const isOwner = owner.id === playlist?.userId
  // console.log('owner', owner)

  const editPlaylistRedirectHandler = () => {
    return (
      history.push(`/playlists/${id}/edit`)
    )
  }

  const deletePlaylistSubmit = async () => {
    // const userId = playlist.userId
    // console.log('playlist', playlist)
    try {
      // console.log('here', userId)
      await dispatch(removePlaylist(playlist));
      // console.log('here', userId)
      history.push(`/users/${owner.id}/playlists`)
    } catch (err) {
        // console.log(err)
    }
  }
// console.log('playlist', playlist)
  return (
    playlist && (
      <>
      <div className='playlistDetail-container'>
          <div className='playlistDetail-basic-info'>
            <p>
              Basic Info
            </p>

        <Link className='backToExplore' to={`/users/${owner.id}/playlists`}>
          Back to your playlists
        </Link>
          </div>

        <div className='playlistDetail'>
          
          <img className='playlistImage' src={playlist.previewImage} alt='playlist image'/>

          <div className='playlist-info-div'>
            
              <p className='playlist-info-text'>
                ID 
              </p>
              <div className='playlist-info'>
              { playlist.id }
            </div>

            <p className='playlist-info-text'>
              Name 
            </p>
            <div className='playlist-info'>
            { playlist.name } 
            </div>

            <p className='playlist-info-text'>
            Creator
            </p>
            <div className='playlist-info'>
            { playlist.userId }
            </div>
            
            {/* <p className='playlist-info-text'>
              Description
            </p> */}
            {/* <input className='song-info-description'>
            { song.description }
            </input> */}
            
          </div>
        </div>
{/* 
        <Link className='backToExplore' to={`/users/${owner.id}/songs`}>
          Back to your tracks
        </Link> */}

        <div> 
          {isOwner && (
            <div className='owner-action-div'> 
              {/* <Link to={`/songs/${id}/edit`
              } className='editSongButton'>
              Edit 
              </Link> */}
              <button onClick={editPlaylistRedirectHandler}
              className='editPlaylistButton'>
                <i className="fa-sharp fa-solid fa-pen-to-square"></i> Edit
              </button>

              <button onClick={deletePlaylistSubmit} className='deletePlaylistButton'>
              Delete
              </button>
            </div>
          )}
        </div>

      </div>
      </>
    )
    // playlist && (
    //   <div className='playlistDetail-container'>
    //     <img className='playlistImage' src={playlist.imageUrl} alt='playlist image'/>
        
    //     <p className='playlist-info'> 
    //     ID: { playlist.id }
    //     </p>
    //     <p className='playlist-info'> 
    //     Playlist: { playlist.name } 
    //     </p>
    //     <p className='playlist-info'> 
    //     Owner: { owner.id }
    //     </p>

    //     <Link className='owner-playlists' to={`/users/${owner.id}/playlists`}>
    //           Back to your playlists
    //         </Link>

    //     <div> 
    //       {isOwner && (
    //         <div className='owner-action-div'>
    //           {/* <Link to={`/playlists/${id}/edit`
    //           } className='editPlaylistButton'>
    //           Edit 
    //         </Link> */}
    //           <button onClick={editRedirectHandler} className='editPlaylistButton'>
    //             Edit
    //           </button>

    //           <button onClick={deleteSubmit} className='deletePlaylistButton'>
    //           Delete
    //           </button>
    //         </div>
    //       )}
    //     </div>

    //   </div>
    // )
  )
}

export default PlaylistInfo;