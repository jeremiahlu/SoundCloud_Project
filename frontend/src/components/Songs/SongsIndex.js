import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
// import { Link } from 'react-router-dom';
import SongsIndexItem from "./SongsIndexItem";
import { getSongs } from "../../store/songs";

// const topFunction = () => {
//   document.body.scrollTop=0;
//   document.documentElement.scrollTop=0;
// }

const SongsIndex = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSongs = async () => {
      await dispatch(getSongs());
    };
    fetchSongs();
  }, []);

  const songState = useSelector((state) => state.songs);
  const songs = Object.values(songState);
  // console.log('songs',songs)
  return (
    songs && (
      <div className="allSongs-container">
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
              {songs.map((song) => (
                <SongsIndexItem song={song} key={song.id} />
              ))}
            </ul>
          </div>
        </div>

        {/* <button onClick={topFunction} className='scrollToTop'>
          <i className="fa-sharp fa-solid fa-chevron-up"></i>
        </button> */}
      </div>
    )
  );
};

export default SongsIndex;
