import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SongsIndexItem from './SongsIndexItem';
import { getSongs } from '../../store/songs';

const topFunction = () => {
  document.body.scrollTop=0;
  document.documentElement.scrollTop=0;
}

const SongsIndex = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSongs = async () => {
      await dispatch(getSongs())
    }
    fetchSongs()
  }, [])

  const songState = useSelector((state) => state.songs);
  const songs = Object.values(songState);
  console.log('songs',songs)
  return (
    songs && (
      <>
        {/* <h3>
        All Tracks
        </h3> */}
      <div className='allSongs'>
        <ul className='allSongsList'>
        {
          songs.map(song => (
            <SongsIndexItem className='song'
              song={song}
              key={song.id}
              />
          ))
        }
        </ul>
        {/* <Link to='/songs/new'>Add New Song</Link> */}
      </div>
      <button onClick={topFunction} className='scrollToTop'>
      <i className="fa-sharp fa-solid fa-chevron-up"></i>
      </button>
      </>
    )
  )
}

export default SongsIndex;