import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { getAudio, pauseAudio } from "../../store/audio";
import {
  removePlaylist,
  editPlaylist,
  fetchPlaylistById,
  deleteSongFromPlaylist,
} from "../../store/playlists";

const PlaylistInfo = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const playlist = useSelector((state) => state.playlists[id]);
  const songs = useSelector((state) => state.playlists[id]?.Songs);
  const user = useSelector((state) => state.playlists[id]?.User?.username);
  const audioFile = useSelector((state) => state.songs[id]?.url);

  // console.log(playlist, "playlist");
  function player(audioFile) {
    // console.log(audio, "UADIO");
    return dispatch(getAudio(audioFile));
  }

  function pause(audioFile) {
    return dispatch(pauseAudio(audioFile));
  }

  const [playing, setPlaying] = useState(new Array(songs?.length).fill(false));
  const audioRefs = useRef([]);
  // console.log(audioRefs, "PLAYING");

  const togglePlayPause = (idx) => {
    // const audioElement = document.getElementById("audio");
    // console.log(audioElement, "audio");
    const newPlayingState = [...playing];
    newPlayingState[idx] = !playing[idx];
    setPlaying(newPlayingState);

    if (playing[idx]) {
      audioRefs?.current[idx]?.pause();
      // console.log(audioRefs.current[idx], "audio");
      // audioElement?.pause();
      // newPlayingState[idx] = false;
      // setPlaying(newPlayingState);
      setPlaying((prevPlaying) => {
        const newPlayingState = [...prevPlaying];
        newPlayingState[idx] = false;
        // console.log(newPlayingState);
        // console.log(prevPlaying, "prev");
        // console.log(idx);
        return newPlayingState;
      });
      // setIsPlaying(false);
      // console.log("pause");
    } else {
      audioRefs?.current[idx]?.play();
      newPlayingState[idx] = true;
      setPlaying(newPlayingState);
      // console.log(newPlayingState);
      // console.log(idx);
      // console.log("play");
    }
  };

  // console.log(artists, "artists");
  // console.log(albumSongs, "songs");

  const [isPlaying, setIsPlaying] = useState(false);
  function handlePlayPause(song) {
    const audioElement = document.getElementById("audio");
    if (!isPlaying) {
      audioElement?.play(song?.url);
      setIsPlaying(true);
      player(song?.url);
      // console.log("audioEle", audioElement.play());
    } else {
      audioElement?.pause(song?.url);
      // console.log("pause");
      setIsPlaying(false);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        await dispatch(fetchPlaylistById({ id }));
      } catch (err) {}
    })();
  }, [id]);

  const owner = useSelector((state) => state.session.user);
  const isOwner = owner.id === playlist?.userId;

  const editPlaylistRedirectHandler = () => {
    return history.push(`/playlists/${id}/edit`);
  };

  const deletePlaylistSubmit = async () => {
    // const userId = playlist.userId
    // console.log('playlist', playlist)
    try {
      // console.log('here', userId)
      await dispatch(removePlaylist(playlist));
      // console.log('here', userId)
      history.push(`/users/${owner.id}/playlists`);
    } catch (err) {
      // console.log(err)
    }
  };

  // console.log('playlist', playlist)
  return (
    playlist && (
      <>
        <div className="albumDetail-container">
          <div className="albumDetail-basic-info">
            <p>Basic Info</p>

            <Link
              className="backToExplore"
              to={`/users/${owner?.id}/playlists`}
            >
              Back to your playlists
            </Link>
          </div>

          <div className="albumsDetail">
            <div className="album-top-div">
              <img
                className="albumImage"
                src={playlist?.previewImage}
                alt="playlist image"
              />
            </div>

            <div className="album-info-div">
              <p className="album-info-text">Name</p>
              <div className="album-info">{playlist?.name}</div>

              <p className="album-info-text">Creator</p>
              <div className="album-info">{user}</div>
            </div>
          </div>

          <div className="albumSongs-div">
            <div className="albumSongs-list">
              {songs?.map((song, idx) => {
                return (
                  <div key={song.id} className="albumSong">
                    <div
                      className="albumPlay-song-btn"
                      onClick={() => {
                        player(song);
                        if (playing[idx]) {
                          pause(song);
                        } // handlePlayPause();
                        togglePlayPause(idx);
                      }}
                    >
                      {/* <i
                        className={`fa ${isPlaying ? "fa-pause" : "fa-play"}`}
                      /> */}
                      <i
                        className={`fa ${
                          playing[idx] ? "fa-pause" : "fa-play"
                        }`}
                      />
                      {/* <button onClick={() => handlePlayPause()}>
                      {playing[idx] ? "Pause" : "Play"}
                    </button> */}
                    </div>
                    {/* <audio
                      ref={(el) => (audioRefs.current[index] = el)}
                      src={song.audioUrl}
                    /> */}
                    <Link
                      to={`/songs/${song?.id}`}
                      key={idx}
                      className="albumSong-link"
                    >
                      {song?.title}
                    </Link>
                    <button
                      onClick={() =>
                        dispatch(deleteSongFromPlaylist(playlist?.id, song?.id))
                      }
                    >
                      {" "}
                      REMOVE{" "}
                    </button>
                  </div>
                );
              })}
              <div className="albumSongs-end">
                <span className="albumSongs-line"></span>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAOCAAAAAB4YAGaAAAAtElEQVR4AY3RT+uCMADG8d7/O3gKifLQQTpoHbp0+RlFET+LKDP6R5Ag08ogvKhrRIlbq/w+bKfPaSvRgklg4rQURV+mP6GGR3r0HZoUeMr0M0zaMSK8WkthnBj0dC2HOGSwaVrRGySdEOeqix1myKWGIlyoHmxM2QbI1xXhCFsM0WPnj4MNEU5wxD/GsNDnoCFCp0Zgs60w5+BehDfnAhceAvj1TFW0jewdfRpQwu7Cfy3vDqsH6oJzha+DAAAAAElFTkSuQmCC" />
                <span className="albumSongs-line"></span>
              </div>
            </div>
          </div>
          {/* <p className='playlist-info-text'>
              Description
            </p> */}
          {/* <input className='song-info-description'>
            { song.description }
            </input> */}

          {/* 
        <Link className='backToExplore' to={`/users/${owner.id}/songs`}>
          Back to your tracks
        </Link> */}

          <div>
            {isOwner && (
              <div className="playlist-owner-action-div">
                {/* <Link to={`/songs/${id}/edit`
              } className='editSongButton'>
              Edit 
              </Link> */}
                <button
                  onClick={editPlaylistRedirectHandler}
                  className="editPlaylistButton"
                >
                  <i className="fa-sharp fa-solid fa-pen-to-square"></i> Edit
                </button>

                <button
                  onClick={deletePlaylistSubmit}
                  className="deletePlaylistButton"
                >
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
  );
};

export default PlaylistInfo;
