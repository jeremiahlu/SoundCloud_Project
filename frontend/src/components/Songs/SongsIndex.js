import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef, useContext } from "react";
// import { Link } from 'react-router-dom';
import SongsIndexItem from "./SongsIndexItem";
import { getSongs } from "../../store/songs";
import AudioContext from "../../context/Audio";
import AudioPlayer from "../AudioPlayer";
import { getAudio, pauseAudio } from "../../store/audio";

const SongsIndex = ({
  isPlaying,
  setIsPlaying,
  audioRef,
  setCurrentSong,
  currentSong,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSongs = async () => {
      await dispatch(getSongs());
    };
    fetchSongs();
  }, []);

  function player(audioFile) {
    return dispatch(getAudio(audioFile));
  }

  // function pause(audioFile) {
  //   // console.log("HIT");
  //   return dispatch(pauseAudio(audioFile));
  // }
  const songState = useSelector((state) => state.songs);
  const songs = Object.values(songState);

  const [playing, setPlaying] = useState(new Array(songs?.length).fill(false));
  const audioRefs = useRef([]);

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

  // useEffect(() => {
  //   console.log(audioRef.current, "current");
  // }, [audioRef.current]);

  // console.log(audioRef.current, "current");
  return (
    songs && (
      <div className="allSongs-container">
        <img src="https://connorgroup.com/static/4bb1b295ecca0123d20cd18be8066649/cd40e/Concerts_near_San_Antonio-scaled.jpg" />
        <div className="top-charts-container">
          <div className="top-charts-text">
            <div className="just-for-you">
              <p className="top-charts-text"> Top Charts: Certified Bangers </p>
            </div>
            <p className="most-played-text">
              The most played tracks on SoundStrata this week
            </p>
          </div>
          <div className="allSongs">
            <ul className="allSongsList">
              {songs.map((song, idx) => (
                <SongsIndexItem
                  currentSong={currentSong}
                  setCurrentSong={setCurrentSong}
                  song={song}
                  key={idx}
                  isPlaying={isPlaying}
                  setIsPlaying={setIsPlaying}
                  playing={playing}
                  togglePlayPause={togglePlayPause}
                  audioRef={audioRef}
                  idx={idx}
                />
              ))}
            </ul>
          </div>
        </div>

        {/* <AudioPlayer /> */}
        {/* <button onClick={topFunction} className='scrollToTop'>
          <i className="fa-sharp fa-solid fa-chevron-up"></i>
        </button> */}
      </div>
    )
  );
};

export default SongsIndex;
