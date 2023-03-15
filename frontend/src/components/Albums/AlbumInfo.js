import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Link } from "react-router-dom";
import { useState, useEffect, useRef, useContext } from "react";
import { getAudio, pauseAudio } from "../../store/audio";
import {
  removeAlbums,
  editAlbum,
  fetchAlbumById,
  fetchAlbums,
} from "../../store/albums";
import { addSongToPlaylist, myPlaylists } from "../../store/playlists";
import AudioContext from "../../context/Audio";
import SongsIndexItem from "../Songs/SongsIndexItem";

const AlbumInfo = ({ audioRef, setCurrentSong, currentSong }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const album = useSelector((state) => state.albums[id]);
  const artists = useSelector((state) => state.albums[id]?.Artist);
  const albumSongs = useSelector((state) => state.albums[id]?.Songs);
  const sessionUser = useSelector((state) => state.session.user);
  const userPlaylists = useSelector((state) => Object.values(state.playlists));
  // console.log(userPlaylists, "playlitss");
  // const song = useSelector((state) => state.albums[id]);
  const [song, setSong] = useState(currentSong);

  const [selectedPlaylistId, setSelectedPlaylistId] = useState("");
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handlePlaylistItemClick = (e, playlistId) => {
    e.stopPropagation();

    dispatch(addSongToPlaylist(sessionUser.id, playlistId, song?.id));
    setSelectedPlaylist(playlistId);
    setIsOpen(false);
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
  };
  useEffect(() => {
    setSelectedPlaylistId(null);
  }, [isOpen]);

  useEffect(() => {
    const fetchMyPlaylists = async () => {
      await dispatch(myPlaylists(sessionUser.id));
    };
    fetchMyPlaylists();
  }, [dispatch]);

  function player(song) {
    //   // setPlaying(true);
    return dispatch(getAudio(song));
  }
  const [playing, setPlaying] = useState(
    new Array(albumSongs?.length).fill(false)
  );
  const audioRefs = useRef([]);

  const togglePlayPause = (idx) => {
    const newPlayingState = [...playing];
    newPlayingState[idx] = !playing[idx];
    setPlaying(newPlayingState);
    player(albumSongs[idx]);

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

  const handlePlay = (song, idx) => {
    // setCurrentSong(song);
    // console.log(song, "allbumSong");
    if (currentSong.id === song.id) {
      if (!audioRef.current.audio.current.paused) {
        audioRef.current.audio.current.parentElement.childNodes[0].pause();
      } else {
        audioRef.current.audio.current.parentElement.childNodes[0].play();
      }
    } else {
      player(song);
      setCurrentSong(song);
    }

    togglePlayPause(idx);
  };

  useEffect(() => {
    const getAlbums = async () => {
      await dispatch(fetchAlbums());
    };
    getAlbums();
  }, []);

  const owner = useSelector((state) => state.session.user);
  const isOwner = owner.id === album?.userId;

  const addSong = () => {
    return history.push(`/songs/new`);
  };

  const editAlbumsRedirectHandler = () => {
    return history.push(`/albums/${id}/edit`);
  };

  const deleteAlbumsSubmit = async () => {
    try {
      await dispatch(removeAlbums(album));
      history.push(`/users/${owner.id}/albums`);
    } catch (err) {}
  };
  return (
    album && (
      <>
        <div className="albumDetail-container">
          <div className="albumDetail-basic-info">
            <p>Basic Info</p>

            <Link className="backToExplore" to={`/users/${owner.id}/albums`}>
              Back to your albums
            </Link>
          </div>

          <div className="albumsDetail">
            <div className="album-top-div">
              <img
                className="albumImage"
                src={album?.previewImage}
                alt="album image"
              />
              {/* {isOwner && (
              <div className='album-addsong-div'>
                <button onClick={addSong} className='album-add-song'>
                  Add your song to album
                </button>
              </div>
              )
          } */}
            </div>

            <div className="album-info-div">
              <p className="album-info-text">Name</p>
              <div className="album-info">{album?.title}</div>

              <p className="album-info-text">Creator</p>
              <div className="album-info">{artists?.username}</div>
            </div>
          </div>
          <div className="albumSongs-div">
            <div className="album-info albumDescription">
              {album?.description}
            </div>
            <div className="albumSongs-list">
              {albumSongs?.map((song, idx) => {
                return (
                  <SongsIndexItem
                    currentSong={currentSong}
                    setCurrentSong={setCurrentSong}
                    song={song}
                    key={idx}
                    // isPlaying={isPlaying}
                    // setIsPlaying={setIsPlaying}
                    playing={playing}
                    togglePlayPause={togglePlayPause}
                    audioRef={audioRef}
                    idx={idx}
                  />
                  // <div className="albumSong">
                  //   <div
                  //     className="albumPlay-song-btn"
                  //     onClick={() => handlePlay(song, idx)}
                  //   >
                  //     {/* {console.log(currentSong.id, "CS")}
                  //     {console.log(song.id, "SID")}
                  //     {console.log(
                  //       !audioRef.current.audio.current.paused,
                  //       "ARP"
                  //     )} */}
                  //     <i
                  //       className={`fa ${
                  //         currentSong?.id === song?.id &&
                  //         !audioRef?.current?.audio?.current?.paused
                  //           ? "fa-pause"
                  //           : "fa-play"
                  //       }`}
                  //     />
                  //   </div>

                  //   <div className="title">
                  //     <Link className="song-link" to={`/songs/${song?.id}`}>
                  //       <img
                  //         className="img"
                  //         src={song?.previewImage || song?.url}
                  //         alt="song"
                  //       />
                  //       <div
                  //         className={
                  //           currentSong?.id === song?.id
                  //             ? "activeSong"
                  //             : "songCard-title"
                  //         }
                  //       >
                  //         {song?.title}
                  //       </div>
                  //       {/* {artist.username} */}
                  //     </Link>

                  //     <button
                  //       className="submitBtn-playlistSongs"
                  //       title="Add to playlist"
                  //       onClick={() => setIsOpen(!isOpen)}
                  //     >
                  //       <i className="fa-solid fa-plus"></i>
                  //       {isOpen && (
                  //         <form
                  //           className="playlistSongs-div"
                  //           onSubmit={(e) => {
                  //             handleSubmit(e, song);
                  //             e.preventDefault();
                  //           }}
                  //           // ref={formRef}
                  //         >
                  //           <ul className="playlistSongs-list">
                  //             {userPlaylists?.map((playlist) => {
                  //               return (
                  //                 <li
                  //                   key={playlist.id}
                  //                   className="playlistSongs-item"
                  //                   onClick={(e) =>
                  //                     handlePlaylistItemClick(e, playlist.id)
                  //                   }
                  //                 >
                  //                   {playlist.name}
                  //                 </li>
                  //               );
                  //             })}
                  //           </ul>
                  //         </form>
                  //       )}
                  //     </button>
                  //   </div>
                  // </div>
                );
              })}
            </div>
            <div className="albumSongs-end">
              <span className="albumSongs-line"></span>
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAOCAAAAAB4YAGaAAAAtElEQVR4AY3RT+uCMADG8d7/O3gKifLQQTpoHbp0+RlFET+LKDP6R5Ag08ogvKhrRIlbq/w+bKfPaSvRgklg4rQURV+mP6GGR3r0HZoUeMr0M0zaMSK8WkthnBj0dC2HOGSwaVrRGySdEOeqix1myKWGIlyoHmxM2QbI1xXhCFsM0WPnj4MNEU5wxD/GsNDnoCFCp0Zgs60w5+BehDfnAhceAvj1TFW0jewdfRpQwu7Cfy3vDqsH6oJzha+DAAAAAElFTkSuQmCC" />
              <span className="albumSongs-line"></span>
            </div>
          </div>

          <div>
            {isOwner && (
              <div className="album-owner-action-div">
                {/* <Link to={`/songs/${id}/edit`
              } className='editSongButton'>
              Edit 
              </Link> */}

                {/* <div className='album-addsong-div'>
                <button onClick={addSong} className='album-add-song'>
                  Add your song to album
                </button>
              </div> */}

                <div className="album-editDel-buttons">
                  <button
                    onClick={editAlbumsRedirectHandler}
                    className="editAlbumButton"
                  >
                    <i className="fa-sharp fa-solid fa-pen-to-square"></i> Edit
                  </button>

                  <button
                    onClick={deleteAlbumsSubmit}
                    className="deleteAlbumButton"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    )
  );
};

export default AlbumInfo;
