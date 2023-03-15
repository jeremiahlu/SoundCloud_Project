import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  forwardRef,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
// import {
//   RHAP_UI,
//   MAIN_LAYOUT,
//   AUDIO_PRELOAD_ATTRIBUTE,
//   TIME_FORMAT,
// } from "./constants";
import { getAudio } from "../../store/audio";
import "./AudioPlayer.css";
import AudioContext from "../../context/Audio";
import cloud from "./cloud.png";

function Audio({ songs, setAudioElement }, props) {
  // const Audio = forwardRef((ref))
  const dispatch = useDispatch();
  const [currentTime, setCurrentTime] = useState(0);
  const { id } = useParams();
  const song = useSelector((state) => state.songs[id]);
  const songAudio = useSelector((state) => state.audio.song);
  const playerStatus = useSelector((state) => state.audio.status);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef();
  console.log(audioRef.current, "audioREF");

  useEffect(() => {
    if (playerStatus === "error") {
      console.error("Something went wrong with the AudioPlayer!!!!");
    } else if (playerStatus === 'play' && audioRef.current.audio.current.paused) {
      audioRef.current.audio.current.play();
    } else if (playerStatus === 'pause' && !audioRef.current.audio.current.paused) {
      audioRef.current.audio.current.pause();
    }
  }, [audioRef.current, playerStatus])

  return (
    <div className="audio-player-div">
      {/* <button onClick={handleTest}>hit</button> */}
      <div className="audio-player-info">
        {/* <div className="audio-player-title">{songAudio?.title}</div> */}

        <img
          className="audio-player-image"
          src={songAudio?.previewImage || cloud}
        />
      </div>
      <AudioPlayer
        ref={audioRef}
        className="audio-player"
        id="audio"
        src={songAudio?.url}
        header={songAudio?.title || "No title selected"}
        volume=".25"
        onPlay={() => dispatch(syncPlayerStatus('play'))}
        onPause={() => dispatch(syncPlayerStatus('pause'))}
        onError={() => dispatch(syncPlayerStatus('error'))}
        progressJumpStep={10000} // jump 10s when clicking on progress bar
        defaultJumpTime={{ forward: 10, backward: 10 }} // also jump 10s when using arrow keys
        // loop="true"
        // showFilledProgress={true}
        customProgressBarSection={[
          RHAP_UI.CURRENT_TIME, // show current time
          <progress
            key="progress"
            className="rhap_progress-bar progress-bar"
            max="1"
            value={progress}
            style={{
              background: `linear-gradient(to right, #58bba9 0%, #58bba9 ${
                progress * 100
              }%, #b3b3b3 ${progress * 100}%, #b3b3b3 100%)`,
              // width: `${progress * 100}%`,
            }}
          />, // use a custom progress bar
          RHAP_UI.DURATION, // show duration
        ]}
      >
        {/* <img src={songAudio?.previewImage} />{" "} */}
      </AudioPlayer>
      {/* {console.log("hit first")} */}
      {/* <div className="player-controls">
        <button className="play-button" onClick={handlePlayPause}>
       
          <i className={`fa ${isPlaying ? "fa-pause" : "fa-play"}`} />
        </button>
        <div className="progress-bar">
          <div
            className="progress"
            style={{ width: `${(currentTime / props.duration) * 100}%` }}
          />
        </div>
        <div className="current-time">{formatTime(currentTime)}</div>
       
      </div>
      <audio id="audio" src={song?.url} onTimeUpdate={handleTimeUpdate} /> */}
    </div>
  );
}

// function formatTime(time) {
//   const minutes = Math.floor(time / 60);
//   const seconds = Math.floor(time % 60)
//     .toString()
//     .padStart(2, "0");
//   return `${minutes}:${seconds}`;
// }

export default Audio;
