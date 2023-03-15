import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSong, editSong } from "../../store/songs";
import { useHistory, useParams } from "react-router-dom";
import { myAlbums } from "../../store/albums";
import * as sessionActions from "../../store/session";
// import { singlePublicFileUpload } from "../../../../backend/awsS3";

const SongForm = ({ formType }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  // const album = useSelector((state) => state.albums)
  // const songActions = useSelector(state => state.song);

  const albums = useSelector((state) => Object.values(state.albums));
  const sessionUser = useSelector((state) => state.session.user);
  const song = useSelector((state) => state.songs[id]);

  // console.log(song, "Song");
  useEffect(() => {
    const fetchUserAlbum = async () => {
      await dispatch(myAlbums(sessionUser.id));
    };
    fetchUserAlbum();
  }, [dispatch]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [albumId, setAlbumId] = useState(null);
  const [errors, setErrors] = useState({});

  const songSubmit = async (e) => {
    e.preventDefault();

    setTitle(title.trim());
    // setAlbumId(albumId.trim())
    // setImageUrl(imageUrl.trim());
    const song = {
      title,
      description,
      url,
      previewImage: imageUrl,
      albumId: albumId || null,
    };
    // console.log(imageUrl, "imageURL");

    try {
      // imageUrl = await singlePublicFileUpload(file);
      // song.previewImage = imageUrl;
      const newSong = await dispatch(
        formType === "Create" ? addSong(song) : editSong(song, id)
      );
      formType === "Create"
        ? history.push(`/songs/${newSong.id}`)
        : history.push(`/songs/${id}`);
    } catch (res) {
      // console.log(res, "RES");
      const data = await res.json();
      const err = data.errors;
      if (data && data.message) setErrors(err);
    }
    // console.log("hit");
  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    // console.log(file, "FILE");
    if (file) {
      setImageUrl(file);
    }
  };
  const updateUrlFile = (e) => {
    const urlFile = e.target.files[0];
    // console.log(urlFile, "URL");
    if (urlFile) {
      setUrl(urlFile);
    }
  };
  // console.log(imageUrl, "image");
  // console.log(url, "url");
  // const updateFiles = (e) => {
  //       const files = e.target.files;
  //       setImages(files);
  //     };

  return (
    <div className="song-div">
      <form
        className="songForm-container"
        onSubmit={songSubmit}
        encType="multipart/form-data"
      >
        <p className="songFormDetail-basic-info">{formType} Song</p>
        <div className="createSong-errors">
          {errors && <h2>{errors?.message}</h2>}
        </div>

        <div className="songForm-detail">
          <div className="songImage-div">
            <img
              className="songForm-image"
              src={
                song?.previewImage
                  ? song?.previewImage
                  : "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg"
              }
              alt="song image"
            />
            {/* {console.log(song, "SONG!@!!!!$!$@!$")} */}
            <p className="song-info-text">Image</p>
            <div className="songForm-field">
              {/* <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="song-creator"
                required
                placeholder='Insert image (example: "https://...") '
                pattern="https://.*"
              /> */}
              <input
                className="song-creator"
                required
                type="file"
                // value={imageUrl}
                onChange={updateFile}
                name="previewImage"
              />
            </div>
            <p className="songForm-errors">{errors?.previewImage} </p>
          </div>

          <div className="songForm-info-div">
            <p className="song-info-text">Title</p>
            <div className="songForm-field">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="song-creator"
                required
                placeholder={song?.title ? song?.title : "Title"}
                pattern="^(?!\s*$).+"
              />
              <p className="songForm-errors">{errors?.title} </p>
            </div>

            <p className="song-info-text">Description</p>
            <div className="songForm-field">
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="song-creator"
                // required
                placeholder={song?.description ? song?.description : "Optional"}
              />
              {/* <p className='songForm-errors'> { errors.description } </p> */}
            </div>

            <p className="song-info-text">URL</p>
            <div className="songForm-field">
              {/* <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="song-creator"
                required
                pattern="https://.*"
                placeholder='Insert audio (example: "https://...")'
              /> */}
              <input
                className="song-creator"
                required
                type="file"
                // value={imageUrl}
                // onChange={(e) => updateFile(e, 'previewImage'))}
                onChange={updateUrlFile}
                name="url"
              />
              {/* /> */}
            </div>
            <p className="songForm-errors"> {errors?.url} </p>

            {/* <p className='songForm-text'>
            Image Url
          </p>
        <div className='songForm-field'>
          <input 
            type='text'
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className='song-creator'
            required
            placeholder='Insert image'/>
           <p className='songForm-errors'>{ errors.imageUrl } </p>
        </div>  */}

            <p className="song-info-text">Album</p>
            <div className="songForm-field">
              {/* <input 
            type='text'
            value={albumId}
            onChange={(e) => setAlbumId(e.target.value)}
            className='song-creator'
            // required
            placeholder='Optional'
            pattern='^(?!\s*$).+'
            /> */}

              <select
                // type='text'
                value={albumId}
                onChange={(e) => setAlbumId(e.target.value)}
                className="song-creator select-dropdown"
                // required
              >
                <option value="" disabled>
                  Select Album
                </option>
                <option
                  value={
                    albumId
                      ? albums.find((album) => album.id === albumId)?.title ||
                        "N/A"
                      : "N/A"
                  }
                >
                  {albumId
                    ? albums.find((album) => album.id === albumId)?.title ||
                      "N/A"
                    : "N/A"}
                </option>

                {albums?.map((album, idx) => (
                  <option key={idx} value={album?.id}>
                    {album?.title}
                  </option>
                ))}
              </select>
              {/* <p>
                Selected album:{" "}
                {albumId
                  ? albums.find((album) => album.id === albumId)?.title || "N/A"
                  : "N/A"}
              </p> */}
            </div>
            {
              // errors?.albumId &&
              <p className="songForm-errors">{errors?.albumId} </p>
            }

            <div className="songForm-submit-button-div">
              <button className="songForm-submit-button" type="submit">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SongForm;
