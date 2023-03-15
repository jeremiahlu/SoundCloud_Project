import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { useDispatch } from 'react-redux';
import SongInfo from "./SongInfo";
import "./Songs.css";
import { addSongToPlaylist, myPlaylists } from "../../store/playlists";
import { getAudio, pauseAudio } from "../../store/audio";
import AudioContext from "../../context/Audio";

const SongsIndexItem = ({
  idx,
  playing,
  song,
  isPlaying,
  togglePlayPause,
  setIsPlaying,
  audioRef,
  currentSong,
  setCurrentSong,
}) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  // const audioRef = useRef(null);
  const formRef = useRef(null);
  // const audioRef = useContext(AudioContext);
  // console.log(audioRef, "AUDIOREF");
  // const artist = useSelector((state) => state.songs[id].Artist);
  // const [isPlaying, setIsPlaying] = useState(false);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState("");
  const [songId, setSongId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  // const [audioReference, setAudioReference] = useState(null);

  const sessionUser = useSelector((state) => state.session.user);
  const userPlaylists = useSelector((state) => Object.values(state.playlists));
  // console.log(userPlaylists, "HERE");

  // const deleteSong = (e) => {
  //   e.preventDefault();

  //   dispatch(delSong(song.id))
  // }
  // console.log(song, "SONG1");
  const audioFile = useSelector((state) => state.songs[id]?.url);
  function player(audioFile) {
    return dispatch(getAudio(audioFile));
  }

  function pause(audioFile) {
    // console.log("HIT");
    return dispatch(pauseAudio(audioFile));
  }

  function handlePlayPause(song) {
    const audioElement = audioRef.current;

    if (!audioElement?.paused) {
      audioElement?.pause();
      setIsPlaying(false);
    } else {
      audioElement?.play();
      setIsPlaying(true);
      // player(song?.url);
    }
  }

  const handleSelectChange = (e) => {
    e.preventDefault();
    // e.stopPropagation();
    setSelectedPlaylistId(e.target.value);
    // console.log(e, "E");
    // e.target.form.submit();
  };
  // console.log(formRef, " FormRef");

  const handlePlaylistItemClick = (e, playlistId) => {
    // console.log(playlistId, "playlistidD142143124214");
    e.stopPropagation();

    dispatch(addSongToPlaylist(sessionUser.id, playlistId, song?.id));
    // dispatch(myPlaylists(sessionUser.id));
  };

  const handleSubmit = (e, song) => {
    e.preventDefault();

    dispatch(
      addSongToPlaylist(
        parseInt(sessionUser.id),
        parseInt(selectedPlaylistId),
        song?.id
      )
    );
    // setIsOpen(!isOpen);
    // dispatch(myPlaylists(sessionUser.id));
    // return false;
  };
  // const handleSongIdChange = (e) => {
  //   setSongId(e.target.value);
  // };

  useEffect(() => {
    setSelectedPlaylistId(null);
  }, [isOpen]);

  useEffect(() => {
    const fetchMyPlaylists = async () => {
      await dispatch(myPlaylists(sessionUser.id));
    };
    fetchMyPlaylists();
  }, [dispatch]);
  const buttonRef = useRef(null);

  const handlePlay = () => {
    // console.log(song, "songSong");
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

  // useEffect(() => {
  //   // if (!audioRef) return;
  //   console.log(audioRef.current, "hit");
  //   // audioRef.current;
  // }, [audioRef.current]);

  return (
    <div className="audio-container">
      <div className="song-card">
        <div className="cover-art">
          <div
            className="albumPlay-song-btn"
            onClick={handlePlay}
            ref={buttonRef}
          >
            {/* <audio ref={audioRef} src={song?.url} /> */}
            {/* <i className={`fa ${isPlaying && song ? "fa-pause" : "fa-play"}`} /> */}
            {console.log(currentSong.id, "CS")}
            {console.log(song.id, "SID")}
            {console.log(!audioRef.current.audio.current.paused, "ARP")}
            <i
              className={`fa ${
                currentSong?.id === song?.id &&
                !audioRef?.current?.audio?.current?.paused
                  ? "fa-pause"
                  : "fa-play"
              }`}
            />
          </div>

          <div className="title">
            <Link className="song-link" to={`/songs/${song?.id}`}>
              <img
                className="img"
                src={song?.previewImage || song?.url}
                alt="song"
              />
              <div
                className={
                  currentSong?.id === song?.id ? "activeSong" : "songCard-title"
                }
              >
                {song?.title}
              </div>
              {/* {artist.username} */}
            </Link>

            <button
              className="submitBtn-playlistSongs"
              title="Add to playlist"
              onClick={() => setIsOpen(!isOpen)}
            >
              <i className="fa-solid fa-plus"></i>
              {isOpen && (
                <form
                  className="playlistSongs-div"
                  onSubmit={(e) => {
                    handleSubmit(e, song);
                    e.preventDefault();
                  }}
                  // ref={formRef}
                >
                  <ul className="playlistSongs-list">
                    {userPlaylists?.map((playlist) => {
                      return (
                        <li
                          key={playlist.id}
                          className="playlistSongs-item"
                          onClick={(e) =>
                            handlePlaylistItemClick(e, playlist.id)
                          }
                        >
                          {playlist.name}
                        </li>
                      );
                    })}
                  </ul>
                </form>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongsIndexItem;
