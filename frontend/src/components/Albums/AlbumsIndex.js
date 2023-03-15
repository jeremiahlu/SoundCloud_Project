import "./albums.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import AlbumsIndexItem from "./AlbumsIndexItem";
import { fetchAlbums } from "../../store/albums";

const AlbumsIndex = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getAlbums = async () => {
      await dispatch(fetchAlbums());
    };
    getAlbums();
  }, []);

  const albumsState = useSelector((state) => state.albums);
  const album = Object.values(albumsState);
  // console.log(album, "HERE");
  const rapAlbums = useSelector((state) => Object.values(state.albums));

  return (
    album && (
      <>
        <div className="albums-sc-exclusives">
          <div className="album-ff"> Fan Favorites </div>
          <div className="album-ff-secondary">Top albums then and now</div>
        </div>

        <div className="albums-container">
          <ul className="userAlbums-List" id="slides-container">
            {album?.map((album, idx) => (
              <AlbumsIndexItem album={album} key={idx} className="slide" />
            ))}
          </ul>
        </div>
        <div className="rapAlbums">
          <div className="albumByGenre"></div>
        </div>
      </>
    )
  );
};

export default AlbumsIndex;
