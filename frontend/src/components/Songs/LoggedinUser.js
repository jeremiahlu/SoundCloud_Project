import { useDispatch, useSelector } from 'react-redux';
import { React, useEffect, useState } from 'react';
import { Link, useHistory, useParams} from 'react-router-dom';
import SongsIndexItem from './SongsIndexItem';
import { mySongs } from '../../store/songs';

const MySongs = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  // const history = useHistory();
  // const [ fetchData, setFetchData ] = useState([]);
  
  useEffect(() => {
    // const fetchMySongs = async () => {
      //   await dispatch(mySongs(id))
      // }
      // // fetchMySongs()
      const fetchUserSongs = async () => {
        await dispatch(mySongs(id))
      }
      fetchUserSongs()
    }, [dispatch])
    
  // const dataFetch = async () => {
  //   const res = await fetch(mySongs(id))
  //   const data = await res.json();

  //   setFetchData(data)
  // }
  

  // useEffect(() => {
  //   dataFetch()
  // }, [])

  const songState = useSelector((state) => state.songs);
  const songs = Object.values(songState);

  return (
    // songs && ( 
      <>
        { !songs.length 
          ? 
          <div className='emptySongs-container'>
            <img className='static' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAACnBAMAAADd8MzuAAAAJ1BMVEUAAADt7e3v7+/u7u7u7u7v7+/V1dXu7u7v7+/v7+/u7u7u7u7t7e1+coy7AAAADXRSTlMAK4/V8v8GlP29LPOQA9OSagAAAOlJREFUeAHt3CVCBQEUBdCLdxIR3QEkIgvAXRuVRMatswESGVkC68It/jQPOfeP20mjf+Yl6R2dbzgTA0myfTzfeJZ2k+7L+YIsb6VnviQ76auBLzJSA89krAaezX0NvJqXbhrOiwkGg8FgMBgMBoP/E9zV+gpgMBgMBr9MmPq3MBgMBoPB3wb+Hvzd+1MwGAwGf+uDwWDwN/IlLcCfmQKDweDKIxcYDHbvBAaDwWB/hjQAg8FgMLjgfS4wGAwGg30LAwaDwWAwGFxW16euktFDDTyT6xp4v6w+V1lFsroabMnVeNPu7UDyBMXh8J9inpNdAAAAAElFTkSuQmCC'/>
            <h2 className='seemsQuiet-text'> Seems a little quiet over here </h2>
           
            <Link className='loggedin-upload-song' to='/songs/new'> Upload a track to share it with your followers </Link>
          </div>
          :
          <>
          <div className='my-tracks'>
            My Tracks
          </div>
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
          </div> 
          <button className='upload-button'>
           <a className='upload-song' href='/songs/new'> Upload a Song </a>
          </button>
          </>
        }
      </>
    // )
  )
}

export default MySongs;