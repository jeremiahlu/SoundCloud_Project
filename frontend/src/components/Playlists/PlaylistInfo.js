import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Link } from 'react-router-dom';
// import { useState } from 'react';
import { removePlaylist, editPlaylist } from '../../store/playlists';
// import EditSongForm from './EditSong';
const PlaylistInfo = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const playlist = useSelector((state) => state.playlists[id])
  // console.log(song)
 // return Object.entries(state.songs).find(e => e[1].id === songId)
 const owner = useSelector(
  (state) => state.session.user.id === playlist.userId);
  // console.log('owner', owner)

  const deleteSubmit = async () => {

    await dispatch(removePlaylist(playlist));
    history.push(`/users/${playlist.userId}/playlists`)
  }

  return (
    playlist && (
      <section>
        <img className='playlistImage' src={playlist.previewImage} alt='playlist image'/>
        <br/>
        ID: { playlist.id }
        <br/>
        Title: { playlist.title } 
        <br/>
        Artist: { playlist.userId }
        <br/>
        <Link to={`/users/${playlist.userId}/playlists`}>
          Back to your playlists
        </Link>
        <div> 
          {owner && (
            <>
              <Link to={`/playlists/${id}/edit`
              } className='editPlaylistButton'>
              Edit 
              </Link>

              <button onClick={deleteSubmit} className='deletePlaylistButton'>
              Delete
              </button>
            </>
          )}
        </div>
      </section>
    )
  )
}

export default PlaylistInfo;