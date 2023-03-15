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

const Audio = forwardRef(
  ({ songs, setAudioElement, currentSong }, audioRef) => {
    // const Audio = forwardRef((ref))
    const dispatch = useDispatch();
    // const [isPlaying, setIsPlaying] = useState(false);
    // const [currentTime, setCurrentTime] = useState(0);
    const { id } = useParams();
    const song = useSelector((state) => state.songs[id]);
    const songAudio = useSelector((state) => state.audio.song);
    const [progress, setProgress] = useState(0);
    // const [duration, setDuration] = useState(0);

    const [audioPlayer, setAudioPlayer] = useState("");

    // const audioRef = useContext(AudioContext);
    // const audioRef = useRef(null);
    // console.log(audioRef.current, "audioREF");

    useEffect(() => {
      if (audioRef && audioPlayer) {
        audioRef.setAudioElement(audioPlayer.audio.current);
      }
    }, [audioRef, audioPlayer]);

    function player(audio) {
      return dispatch(getAudio(audio));
    }

    // const handleTest = () => {
    //   const playButton =
    //     audioRef.current.container.current.children[2].children[1].children[1]
    //       .children[1];
    //   playButton.click();
    // };

    // const playButton = useRef(
    //   audioRef?.current?.container?.current?.children[2]?.children[1]
    //     ?.children[1]?.children[1]
    // );

    // function handlePlayPause(song) {
    //   const audioElement = document.getElementById("audio");

    //   audioElement?.addEventListener("timeupdate", () => {
    //     const currentTime = audioElement?.currentTime;
    //     const duration = audioElement?.duration;
    //     const progressPercent = (currentTime / duration) * 100;
    //     setProgress(progressPercent);
    //   });

    //   if (!isPlaying) {
    //     audioElement?.play(song);
    //     setIsPlaying(true);
    //     // setAudioElement();
    //     // player(song);
    //   } else {
    //     audioElement?.pause(song);
    //     setIsPlaying(false);
    //   }
    //   setAudioPlayer(audioElement);
    // }

    return (
      <div className="audio-player-div">
        <div className="audio-player-info">
          {/* {console.log(songAudio, "songAudio")} */}
          <img
            className="audio-player-image"
            src={songAudio?.previewImage || cloud}
          />
        </div>
        <AudioPlayer
          ref={audioRef}
          className="audio-player"
          id="audio"
          src={currentSong?.url}
          header={songAudio?.title || "No title selected"}
          volume=".25"
          progressJumpStep={10000}
          defaultJumpTime={{ forward: 10, backward: 10 }}
          customProgressBarSection={[
            RHAP_UI.CURRENT_TIME,
            <progress
              key="progress"
              className="rhap_progress-bar progress-bar"
              max="1"
              value={progress}
              style={{
                background: `linear-gradient(to right, #58bba9 0%, #58bba9 ${
                  progress * 100
                }%, #b3b3b3 ${progress * 100}%, #b3b3b3 100%)`,
              }}
            />,
            RHAP_UI.DURATION,
          ]}
        ></AudioPlayer>
      </div>
    );
  }
);

export default Audio;
