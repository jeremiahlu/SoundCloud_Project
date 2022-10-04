import { useDispatch, useSelector } from 'react-redux';
import { React, useEffect } from 'react';
import { Link, useHistory, useParams} from 'react-router-dom';
import SongsIndexItem from './SongsIndexItem';
import { mySongs } from '../../store/songs';

const MySongs = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  console.log('user id', id)
  // const history = useHistory();

  useEffect(() => {
    // const fetchMySongs = async () => {
    //   await dispatch(mySongs(id))
    // }
    // // fetchMySongs()
    dispatch(mySongs(id))
  }, [dispatch])

  const songState = useSelector((state) => state.songs);
  const songs = Object.values(songState);
  console.log(songs)

  return (
    songs && (
      <div className='allSongs'>
        <ul className='allSongsList'>
        {
          songs.map(song => (
            <SongsIndexItem
              song={song}
              key={song.id}
            />
          ))
        }
        </ul>
        {/* <Link to='/songs/new'>Upload</Link> */}
      </div>
    )
  )
}

export default MySongs;