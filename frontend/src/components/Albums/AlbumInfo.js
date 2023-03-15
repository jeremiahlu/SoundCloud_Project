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
import AudioContext from "../../context/Audio";

const AlbumInfo = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const album = useSelector((state) => state.albums[id]);
  const artists = useSelector((state) => state.albums[id]?.Artist);
  const albumSongs = useSelector((state) => state.albums[id]?.Songs);
  const audioFile = useSelector((state) => state.songs[id]?.url);
  const [currentSongIndex, setCurrentSongIndex] = useState(-1);
  // const audioRef = useContext(AudioContext);
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(
    new Array(albumSongs?.length).fill(false)
  );

  function player(audioFile) {
    setPlaying(true);
    return dispatch(getAudio(audioFile));
  }

  function pause(audioFile) {
    // console.log("HIT");
    console.log(audioRef, "audioref");
    audioRef?.current?.pause();
    setPlaying(false);
    return dispatch(pauseAudio(audioFile));
  }

  // const audioRefs = useRef([]);

  const togglePlayPause = (idx) => {
    if (currentSongIndex !== -1) {
      const newPlayingState = [...playing];
      newPlayingState[idx] = !playing[idx];
      setPlaying(newPlayingState);
      setCurrentSongIndex(-1);
    }

    console.log(audioRef, "AUREDSFREF");
    audioRef?.current?.pause();

    // console.log(newPlayingState, "playing");

    // if (playing[idx]) {
    //   console.log(idx, "IDX");
    //   audioRefs?.current[idx]?.pause();
    //   // audioRefs[idx]?.pause();

    //   setPlaying((prevPlaying) => {
    //     const newPlayingState = [...prevPlaying];
    //     newPlayingState[idx] = false;

    //     console.log("paused");
    //     return newPlayingState;
    //   });
    // } else {
    //   audioRefs?.current[idx]?.play();
    //   newPlayingState[idx] = true;
    //   setPlaying(newPlayingState);
    // }
  };

  const [isPlaying, setIsPlaying] = useState(false);

  // function handlePlayPause(song) {
  //   const audioElement = document.getElementById("audio");
  //   if (!isPlaying) {
  //     audioElement?.play(song?.url);
  //     setIsPlaying(true);
  //     player(song?.url);
  //   } else {
  //     audioElement?.pause(song?.url);

  //     pause(song?.url);
  //     setIsPlaying(false);
  //   }
  // }

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
              {/* <p className="album-info-text">ID</p>
              <div className="album-info">{album.id}</div> */}

              <p className="album-info-text">Name</p>
              <div className="album-info">{album?.title}</div>

              <p className="album-info-text">Creator</p>
              <div className="album-info">{artists?.username}</div>

              {/* <p className="playlist-info-text">Description</p> */}
            </div>
          </div>
          <div className="albumSongs-div">
            <div className="album-info albumDescription">
              {album?.description}
            </div>
            <div className="albumSongs-list">
              {albumSongs?.map((song, idx) => {
                return (
                  <div className="albumSong">
                    <div
                      // key={idx}
                      className="albumPlay-song-btn"
                      onClick={() => {
                        player(song);
                        // if (playing[idx]) {
                        //   // console.log("hitHERE");
                        //   pause(song);
                        // } // handlePlayPause();
                        togglePlayPause(idx);
                      }}
                    >
                      {/* <i
                        className={`fa ${isPlaying ? "fa-pause" : "fa-play"}`}
                      /> */}
                      <i
                        className={`fa ${
                          playing[idx] ? "fa-pause" : "fa-play"
                        }`}
                      />
                      {/* <button onClick={() => handlePlayPause()}>
                      {playing[idx] ? "Pause" : "Play"}
                    </button> */}
                    </div>
                    {/* <audio
                      ref={(el) => (audioRefs.current[index] = el)}
                      src={song.audioUrl}
                    /> */}
                    <Link
                      to={`/songs/${song?.id}`}
                      key={idx}
                      className="albumSong-link"
                    >
                      {song?.title}
                    </Link>
                  </div>
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
