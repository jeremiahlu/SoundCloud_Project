import { csrfFetch } from "./csrf";

// const initialState = {};
// console.log(initialState)

const FETCH = "/songs/fetch";
const fetchSongs = (songs) => ({
  type: FETCH,
  songs,
});

const GET = "/songs/get";
const getMySongs = (songs) => ({
  type: GET,
  songs,
});

const CREATE = "/songs/create";
const createSong = (song) => ({
  type: CREATE,
  song,
});

const DELETE = "/songs/delete";
const delSong = (song) => ({
  type: DELETE,
  song,
});

const UPDATE = "/songs/update";
const updateSong = (song) => ({
  type: UPDATE,
  song,
});

const GETID = "/songs/getid";
const getSongId = (song) => ({
  type: GETID,
  song,
});

export const getSongs = () => async (dispatch) => {
  const res = await csrfFetch("/api/songs");
  // console.log('here', res)
  const { Songs } = await res.json();
  // console.log('here', Songs)

  if (res.ok) {
    const data = {};
    Songs.forEach((song) => (data[song.id] = song));
    dispatch(fetchSongs(data));
  }
  return Songs;
};

export const addSong = (song) => async (dispatch) => {
  // console.log('song here', song)
  const { title, description, url, previewImage, albumId } = song;
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  // formData.append("url", url);
  formData.append("albumId", albumId);
  // console.log(title, "TITLE");
  // console.log(url, "AUDIO");
  // formData.append("previewImage", previewImage);
  // console.log(previewImage, "hit");

  if (previewImage) formData.append("previewImage", previewImage);
  if (url) formData.append("url", url);
  // console.log(formData, "FORMDATA$@!$");
  const res = await csrfFetch("/api/songs", {
    method: "POST",
    headers: { "Content-Type": "multipart/form-data" },
    // body: JSON.stringify(formData),
    body: formData,
  });

  // console.log("hitttttt");
  const data = await res.json();
  if (res.ok) {
    dispatch(createSong(data));

    return data;
  } else {
    throw res;
  }
};

export const editSong = (song, songId) => async (dispatch) => {
  const { title, description, url, previewImage, albumId } = song;
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  // formData.append("url", url);
  formData.append("albumId", albumId);
  // console.log(title, "TITLE");
  // console.log(url, "AUDIO");
  // formData.append("previewImage", previewImage);
  // console.log(previewImage, "hit");

  if (previewImage) formData.append("previewImage", previewImage);
  if (url) formData.append("url", url);

  const res = await csrfFetch(`/api/songs/${songId}`, {
    method: "PATCH",
    headers: { "Content-Type": "multipart/form-data" },
    body: formData,
  });
  // const res = await csrfFetch(`/api/songs/${songId}`, {
  //   method: "PATCH",
  //   body: JSON.stringify(song),
  // });
  const data = await res.json();
  if (res.ok) {
    dispatch(updateSong(data));
  }
};

export const mySongs = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/users/${id}/songs`);
  // console.log('user', id)
  const { Songs } = await res.json();
  // console.log('here', Songs)

  if (res.ok) {
    const obj = {};
    Songs.forEach((song) => {
      obj[song.id] = song;
    });

    dispatch(getMySongs(obj));
  }
};

export const removeSong = (song) => async (dispatch) => {
  // console.log('song', song)
  // console.log('here', song.id)
  const res = await csrfFetch(`/api/songs/${song.id}`, {
    method: "DELETE",
  });
  const data = await res.json();

  if (res.ok) {
    dispatch(delSong(song));
    return data;
  }
};

export const fetchSongById = (song) => async (dispatch) => {
  const res = await csrfFetch(`/api/songs/${song.id}`, {
    method: "GET",
  });
  const data = await res.json();
  // console.log(data, "DATA");
  if (res.ok) {
    dispatch(getSongId(data));
    return data;
  }
};

const songsReducer = (state = {}, action) => {
  let newState = { ...state };

  // console.log('action', action)
  // console.log('payload', action.payload)

  switch (action.type) {
    case FETCH:
      return { ...state, ...action.songs };

    case CREATE:
      newState[action.song.id] = action.song;
      return newState;

    case UPDATE:
      newState = { ...state, [action.song.id]: action.song };
      return newState;

    case GET:
      return { ...action.songs };

    case GETID:
      return {
        ...state,
        [action.song.id]: {
          ...state[action.song.id],
          ...action.song,
          ...state[action.song.songs.Artist.username],
        },
      };
    // console.log(action.song.songs.Artist.username, "ACITON");

    case DELETE:
      // console.log('action here', action.song)
      delete newState[action.song.id];
      return newState;

    default:
      return state;
  }
};

export default songsReducer;
