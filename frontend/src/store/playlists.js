import { csrfFetch } from "./csrf";

// const initialState = {};
// console.log(initialState)

const FETCH = "/playlists/fetch";
const fetchPlaylists = (playlists) => ({
  type: FETCH,
  playlists,
});

const GET = "/playlists/get";
const getMyPlaylists = (playlists) => ({
  type: GET,
  playlists,
});

const CREATE = "/playlists/create";
const createPlaylist = (playlist) => ({
  type: CREATE,
  playlist,
});

const DELETE = "/playlists/delete";
const delPlaylist = (playlist) => ({
  type: DELETE,
  playlist,
});

const UPDATE = "/playlists/update";
const updatePlaylist = (playlist) => ({
  type: UPDATE,
  playlist,
});

const GETID = "/playlists/getid";
const getPlaylistId = (playlist) => ({
  type: GETID,
  playlist,
});

const ADD_SONG = "/playlists/id/addSong";
const addSong = (playlistSong) => ({
  type: ADD_SONG,
  payload: playlistSong,
});

const DELETE_SONG = "/playlists/id/delSong";
const deleteSong = (songId, playlistId) => ({
  type: DELETE_SONG,
  payload: { songId, playlistId },
});

// export const addSongToPlaylist = (playlistId, songId) => async (dispatch) => {
//   const res = await csrfFetch(`/api/playlists/${playlistId}/songs`, {
//     method: "POST",
//     body: JSON.stringify(songId),
//   });
//   const data = await res.json();
//   console.log(data, "DATA");
//   if (res.ok) {
//     dispatch(addSong(data));
//     return data;
//   }
// };
export const addSongToPlaylist =
  (userId, playlistId, songId) => async (dispatch) => {
    const res = await csrfFetch(`/api/playlists/${playlistId}/songs`, {
      method: "POST",
      body: JSON.stringify({ songId, userId: userId.id }),
    });
    const data = await res.json();
    // console.log(data, "DATA");
    if (res.ok) {
      dispatch(addSong(data));
      // return data;
    }
  };

export const deleteSongFromPlaylist =
  (playlistId, songId) => async (dispatch) => {
    const res = await csrfFetch(
      `/api/playlists/${playlistId}/songs/${songId}`,
      {
        method: "DELETE",
      }
    );
    const data = await res.json();

    if (res.ok) {
      dispatch(deleteSong(songId, playlistId));
      // return data;
    }
  };

export const getPlaylists = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/users/${id}/playlists`);

  const { Playlists } = await res.json();

  if (res.ok) {
    const data = {};
    Playlists.forEach((playlist) => (data[playlist.id] = playlist));
    dispatch(fetchPlaylists(data));
  }
  return Playlists;
};

export const addPlaylist = (playlist) => async (dispatch) => {
  const res = await csrfFetch("/api/playlists", {
    method: "POST",
    body: JSON.stringify(playlist),
  });
  const data = await res.json();
  if (res.ok) {
    dispatch(createPlaylist(data));
    return data;
  }
};

export const editPlaylist = (playlist) => async (dispatch) => {
  const res = await csrfFetch(`/api/playlists/${playlist.id}`, {
    method: "PATCH",
    body: JSON.stringify(playlist),
  });
  const data = await res.json();
  if (res.ok) {
    dispatch(updatePlaylist(playlist));
    return data;
  }
};

export const myPlaylists = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/users/${id}/playlists`);
  // console.log('user', id)
  const { Playlists } = await res.json();

  if (res.ok) {
    const obj = {};
    Playlists.forEach((playlist) => {
      obj[playlist.id] = playlist;
    });

    dispatch(getMyPlaylists(obj));
  }
};

export const removePlaylist = (playlist) => async (dispatch) => {
  const res = await csrfFetch(`/api/playlists/${playlist.id}`, {
    method: "DELETE",
  });
  const data = await res.json();

  if (res.ok) {
    dispatch(delPlaylist(playlist));
    return data;
  }
};

export const fetchPlaylistById = (playlist) => async (dispatch) => {
  const res = await csrfFetch(`/api/playlists/${playlist.id}`, {
    method: "GET",
  });
  const data = await res.json();
  if (res.ok) {
    dispatch(getPlaylistId(data));
    return data;
  }
};

const playlistReducer = (state = {}, action) => {
  let newState = { ...state };

  // console.log('action', action)
  // console.log('payload', action.payload)

  switch (action.type) {
    case ADD_SONG:
      return newState;

    case DELETE_SONG:
      const { songId, playlistId } = action.payload;
      const songs = newState[playlistId].Songs;

      const filtered = songs.filter((song) => song.id !== songId);
      newState[playlistId].Songs = filtered;

      return newState;

    case FETCH:
      return { ...state, ...action.playlists };

    case CREATE:
      newState[action.playlist.id] = action.playlist;
      return newState;

    case UPDATE:
      newState = { ...state, [action.playlist.id]: action.playlist };
      return newState;

    case GET:
      return { ...state, ...action.playlists };

    case GETID:
      // console.log(action.playlist.Songs, "hti");
      return {
        ...state,
        [action.playlist.id]: {
          // ...state[action.playlist.id],
          ...action.playlist,
        },
      };

    case DELETE:
      delete newState[action.playlist.id];
      return newState;

    default:
      return state;
  }
};

export default playlistReducer;
