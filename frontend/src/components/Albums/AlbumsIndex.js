import './albums.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlbumsIndexItem from './AlbumsIndexItem';
import { fetchAlbums } from '../../store/albums';

const AlbumsIndex = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getAlbums = async () => {
      await dispatch(fetchAlbums())
    }
    getAlbums()
  }, [])

  const albumsState = useSelector((state) => state.albums);
  // console.log('here', albumsState)
  const album = Object.values(albumsState);

  // const slidesContainer = document.getElementById("slides-container");
  // const slide = document.querySelector(".slide");
  // const prevButton = document.getElementById("slide-arrow-prev");
  // const nextButton = document.getElementById("slide-arrow-next");

  // nextButton.addEventListener("click", (event) => {
  //   const slideWidth = slide.clientWidth;
  //     slidesContainer.scrollLeft += slideWidth;
  // });
  // prevButton.addEventListener("click", () => {
  // const slideWidth = slide.clientWidth;
  // slidesContainer.scrollLeft -= slideWidth;
  // });

  return (
    album && (
    <>
      <div className='albums-sc-exclusives'>
        <div className='album-ff'> Fan Favorites </div>
        <div className='album-ff-secondary'>
          Top albums then and now
        </div>
      </div>

      <div className='albums-container'>
          <ul className='userAlbums-List' id='slides-container'>
          {
            album.map(album => (
              <AlbumsIndexItem
              album={album}
              key={album.id}
              className='slide'
              />
              ))
            }
          </ul>
      </div>
    </>
    )
  )
}

export default AlbumsIndex;