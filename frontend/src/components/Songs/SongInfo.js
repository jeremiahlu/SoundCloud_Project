import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Link } from "react-router-dom";
// import { useState } from 'react';
import {
  removeSong,
  editSong,
  fetchSongById,
  getSongs,
} from "../../store/songs";
import { getAudio } from "../../store/audio";
// import EditSongForm from './EditSong';
import { useState, useEffect } from "react";
import Audio from "../AudioPlayer";
import { FaPlay } from "react-icons/fa";

const SongInfo = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const song = useSelector((state) => state.songs[id]);
  const artist = useSelector((state) => state.songs[id]?.Artist);
  const album = useSelector((state) => state.songs[id]?.Album);
  const audioFile = useSelector((state) => state.songs[id]?.url);
  // console.log(audioFile, "audiofile");
  // const audio = useSelector((state) => state.audio.song);
  // console.log(audio, "audio");
  // const artist = useSelector((state) => state.songObject.artist.username);
  // const [artist, setArtist] = useState(null);

  function player(audioFile) {
    // console.log(audio, "UADIO");
    return dispatch(getAudio(audioFile));
  }

  useEffect(() => {
    const fetchSongs = async () => {
      await dispatch(getSongs());
    };
    fetchSongs();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(fetchSongById({ id }));
      } catch (err) {}
    })();
  }, [dispatch, id]);

  // console.log(song, "SONG");
  // return Object.entries(state.songs).find(e => e[1].id === songId)
  //  const owner = useSelector(
  //   (state) => state.session.user.id === song?.userId);
  const owner = useSelector((state) => state.session.user);
  const isOwner = owner.id === song?.userId;

  const editSongRedirectHandler = () => {
    return history.push(`/songs/${id}/edit`);
  };
  // console.log(artist, "SONG11111");

  const deleteSongSubmit = async () => {
    try {
      await dispatch(removeSong(song));
      history.push(`/users/${owner.id}/songs`) || history.push(`/songs`);
    } catch (err) {}
  };

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

  return (
    song && (
      <>
        {/* <div className="songDetail-container"> */}
        {/* <div className="songDetail-basic-info">
            <p>Basic Info</p>

            <Link className="backToExplore" to={`/users/${owner.id}/songs`}>
              Back to your tracks
            </Link>
          </div> */}

        <div className="songDetail">
          {/* <div className="song-info-div"> */}
          {/* <p className="song-info-text">ID</p>
              <div className="song-info">{song.id}</div> */}
          <div className="songInfo-div">
            <p className="song-info-text">Title</p>
            <div className="song-info">{song?.title}</div>

            <p className="song-info-text">Artist</p>
            <div className="song-info">{artist?.username}</div>

            <p className="song-info-text">Description</p>
            <div className="song-info">{song?.description || "N/A"}</div>
            <button
              className="play-song-btn"
              onClick={() => {
                player(song);
                handlePlayPause();
              }}
            >
              <i className={`fa ${isPlaying ? "fa-pause" : "fa-play"}`} />
            </button>
          </div>
          <img
            className="songImage"
            src={song?.previewImage || song?.url}
            alt="song image"
          />
          {/* </div> */}
        </div>

        <Audio
          id="audio"
          // duration= {}
          onClick={() => player(audioFile)}
          songs={song}
          src={audioFile}
        />
        {/* 
        <Link className='backToExplore' to={`/users/${owner.id}/songs`}>
          Back to your tracks
        </Link> */}

        <div>
          {isOwner && (
            <div className="owner-action-div">
              <button
                onClick={editSongRedirectHandler}
                className="editSongButton"
              >
                <i className="fa-sharp fa-solid fa-pen-to-square"></i> Edit
              </button>

              <button onClick={deleteSongSubmit} className="deleteSongButton">
                Delete
              </button>
            </div>
          )}
        </div>
        {/* </div> */}
      </>
    )
  );
};

export default SongInfo;
