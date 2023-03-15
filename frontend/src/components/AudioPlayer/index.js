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
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const { id } = useParams();
  const song = useSelector((state) => state.songs[id]);
  const songAudio = useSelector((state) => state.audio.song);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  // console.log(songAudio, "SONGAUDIO");
  const [audioPlayer, setAudioPlayer] = useState("");

  // const audioRef = useContext(AudioContext);
  const audioRef = useRef(null);
  console.log(audioRef.current, "audioREF");

  useEffect(() => {
    if (audioRef && audioPlayer) {
      audioRef.setAudioElement(audioPlayer.audio.current);
    }
  }, [audioRef, audioPlayer]);

  function player(audio) {
    return dispatch(getAudio(audio));
  }

  const handleTest = () => {
    const playButton =
      audioRef.current.container.current.children[2].children[1].children[1]
        .children[1];
    playButton.click();
  };

  const playButton = useRef(
    audioRef?.current?.container?.current?.children[2]?.children[1]?.children[1]
      ?.children[1]
  );

  console.log(
    audioRef?.current?.container?.current?.children[2]?.children[1]
      ?.children[1],
    "pause"
  );
  // console.log(audio, "UADIO");
  // console.log(audioRef, "AUDIOREF");
  // console.log(audioPlayer, "player");
  // console.log(player, "PLAYER");

  // console.log(song?.url, "SONGARSARASDA");

  // function handlePlayPause(song) {
  //   const audioElement = document.getElementById("audio");
  //   if (!isPlaying) {
  //     audioElement.play(song.url);
  //     setIsPlaying(true);
  //     player(song.url);
  //     // console.log("audioEle", audioElement.play());
  //   } else {
  //     audioElement.pause(song.url);
  //     // console.log("pause");
  //     setIsPlaying(false);
  //   }
  // }
  // const audioElement = document.getElementById("audio");
  // console.log(audioRef.current, "HERE!!!!!!");
  // console.log("hit second");
  function handlePlayPause(song) {
    const audioElement = document.getElementById("audio");
    // console.log(audioElement, "HERE!!!!!!");

    audioElement?.addEventListener("timeupdate", () => {
      const currentTime = audioElement?.currentTime;
      const duration = audioElement?.duration;
      const progressPercent = (currentTime / duration) * 100;
      setProgress(progressPercent);
    });

    if (!isPlaying) {
      audioElement?.play(song);
      setIsPlaying(true);
      // setAudioElement();
      // player(song);
    } else {
      audioElement?.pause(song);
      setIsPlaying(false);
    }
    setAudioPlayer(audioElement);
  }
  // useEffect(() => {
  //   const audioElement = document.getElementById("audio");
  //   if (audioElement) {
  //     setDuration(audioElement.duration);
  //     audioElement.addEventListener("timeupdate", () => {
  //       setProgress(audioElement.currentTime / audioElement.duration);
  //     });
  //   }
  // }, []);

  // function handleTimeUpdate() {
  //   const audioElement = document.getElementById("audio");
  //   setCurrentTime(audioElement.currentTime);
  // }

  // useEffect(() => {
  //   const audioElement = document.getElementById("audio");
  //   audioElement.addEventListener("timeupdate", handleTimeUpdate);
  //   return () => {
  //     audioElement.removeEventListener("timeupdate", handleTimeUpdate);
  //   };
  // }, []);
  // console.log(audioRef.current.audio.current, "AUDIO");
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
        onClick={handlePlayPause}
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
