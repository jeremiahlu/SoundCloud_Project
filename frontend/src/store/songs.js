import { csrfFetch } from "./csrf";

const initialState = {};
console.log(initialState)

const FETCH = '/songs/fetch';
const fetchSongs = (songs) => ({
  type: FETCH,
  songs
});

const GET = '/songs/get';
const getMySongs = (songs) => ({
  type: GET,
  songs
})

const CREATE = '/songs/create';
const createSong = (song) => ({
  type: CREATE,
  song
});

const DELETE = '/songs/delete';
const delSong = (song) => ({
  type: DELETE,
  song 
})

const UPDATE = '/songs/update';
const updateSong = (song) => ({
  type: UPDATE,
  song
})

export const getSongs = () => async (dispatch) => {
  const res = await csrfFetch('/api/songs');
  // console.log('here', res)
  const { Songs } = await res.json();
  // console.log('here', Songs)
   
  if (res.ok) {
    const data = {}
    Songs.forEach((song) => (data[song.id] = song));
    dispatch(fetchSongs(data))
  }
  return Songs;
}

export const addSong = (song) => async (dispatch) => {
  const res = await csrfFetch('/api/songs', {
    method: 'POST',
    body: JSON.stringify(song),
  });
  const data = await res.json();
  if (res.ok) {
    dispatch(createSong(data))
    return data;
  } 
}

export const editSong = (song) => async (dispatch) => {
  const res = await csrfFetch(`/api/songs/${song.id}`, {
    method: 'PATCH',
    body: JSON.stringify(song),
  });
  const data = await res.json();
  if (res.ok) {
    dispatch(updateSong(data))
  }
}

export const mySongs = ( id ) => async (dispatch) => {
  const res = await csrfFetch(`/api/users/${id}/songs`)
  console.log('user', id)
  const { Songs } = await res.json();

  if (res.ok) {
    const obj = {}
    Songs.forEach((song) => { obj[song.id] = song });

    dispatch(getMySongs(obj))
  }
}

export const removeSong = (song) => async (dispatch) => {
  console.log('song', song)
  console.log('here', song.id)
  const res= await csrfFetch(`/api/songs/${song.id}`, {
    method: 'DELETE',
  })
  const data = await res.json();

  if(res.ok) {
    dispatch(delSong(song))
    return data;
  }
}

const songsReducer = (state = {}, action) => {
  let newState = { ...state }
  
  // console.log('action', action)
  // console.log('payload', action.payload)
  
  switch (action.type) {
    case FETCH:
      return { newState, ...action.songs }
      
    case CREATE:
      newState[action.song.id] = action.song
      return newState;

    case UPDATE:
      newState = { ...state,
      [action.song.id]: action.song
      }
      return newState;

    case GET: 
      return { newState, ...action.songs }
   
    case DELETE: 
      delete newState[action.songs]
      return newState

    default: 
      return state;
  }
}

export default songsReducer;