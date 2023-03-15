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

const PlaylistInfo = ({ audioRef, setCurrentSong, currentSong }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const playlist = useSelector((state) => state.playlists[id]);
  const songs = useSelector((state) => state.playlists[id]?.Songs);
  const user = useSelector((state) => state.playlists[id]?.User?.username);
  const audioFile = useSelector((state) => state.songs[id]?.url);

  // console.log(currentSong, "CURRENTSONG");
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

  // const togglePlayPause = (idx) => {

  //   const newPlayingState = [...playing];
  //   newPlayingState[idx] = !playing[idx];
  //   setPlaying(newPlayingState);

  //   if (playing[idx]) {
  //     audioRefs?.current[idx]?.pause();

  //     setPlaying((prevPlaying) => {
  //       const newPlayingState = [...prevPlaying];
  //       newPlayingState[idx] = false;

  //       return newPlayingState;
  //     });

  //   } else {
  //     audioRefs?.current[idx]?.play();
  //     newPlayingState[idx] = true;
  //     setPlaying(newPlayingState);

  //   }
  // };

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

  const togglePlayPause = (idx) => {
    const newPlayingState = [...playing];
    newPlayingState[idx] = !playing[idx];
    setPlaying(newPlayingState);
    player(songs[idx]);

    if (playing[idx]) {
      // console.log(idx, "IDX");
      audioRefs?.current[idx]?.pause();
      // audioRefs[idx]?.pause();

      setPlaying((prevPlaying) => {
        const newPlayingState = [...prevPlaying];
        newPlayingState[idx] = false;

        // console.log("paused");
        return newPlayingState;
      });
    } else {
      audioRefs?.current[idx]?.play();
      newPlayingState[idx] = true;
      setPlaying(newPlayingState);
    }
  };

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
    try {
      await dispatch(removePlaylist(playlist));
      history.push(`/users/${owner.id}/playlists`);
    } catch (err) {}
  };
  const buttonRef = useRef(null);
  const handlePlay = (song, idx) => {
    // console.log(currentSong, "CS");
    // console.log(audioRef?.current?.audio?.current, "AF");
    // console.log(song, "playlistSong");
    // e.preventDefault();
    if (currentSong?.id === song?.id) {
      if (!audioRef?.current?.audio?.current?.paused) {
        audioRef?.current?.audio?.current?.parentElement?.childNodes[0]?.pause();
      } else {
        audioRef?.current?.audio?.current?.parentElement?.childNodes[0]?.play();
      }
      // const spaceKeyEvent = new KeyboardEvent("keydown", { key: " " });
      // buttonRef.current.dispatchEvent(spaceKeyEvent);
    } else {
      player(song);
      setCurrentSong(song);
    }
    togglePlayPause(idx);
  };

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
                      onClick={() => handlePlay(song, idx)}
                      ref={buttonRef}
                    >
                      {/* {console.log(currentSong.id, "CS")}
                      {console.log(song.id, "SID")}
                      {console.log(
                        !audioRef.current.audio.current.paused,
                        "ARP"
                      )} */}
                      <i
                        className={`fa ${
                          currentSong?.id === song?.id &&
                          !audioRef?.current?.audio?.current?.paused
                            ? "fa-pause"
                            : "fa-play"
                        }`}
                      />
                    </div>
                    {/* <audio
                      ref={(el) => (audioRefs.current[index] = el)}
                      src={song.audioUrl}
                    /> */}
                    <div className="title">
                      <Link className="song-link" to={`/songs/${song?.id}`}>
                        <img
                          className="img"
                          src={song?.previewImage || song?.url}
                          alt="song"
                        />
                        <div
                          className={
                            currentSong?.id === song?.id
                              ? "activeSong"
                              : "songCard-title"
                          }
                        >
                          {song?.title}
                        </div>
                        {/* {artist.username} */}
                      </Link>
                      <button
                        className="removePlaylistSong"
                        onClick={() =>
                          dispatch(
                            deleteSongFromPlaylist(playlist?.id, song?.id)
                          )
                        }
                      >
                        <i className="fa-solid fa-x"></i>
                      </button>
                    </div>
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

          <div>
            {isOwner && (
              <div className="playlist-owner-action-div">
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
  );
};

export default PlaylistInfo;
