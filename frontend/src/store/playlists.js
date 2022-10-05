import { csrfFetch } from "./csrf";

const initialState = {};
// console.log(initialState)

const FETCH = '/playlists/fetch';
const fetchPlaylists = (playlists) => ({
  type: FETCH,
  playlists
});

const GET = '/playlists/get';
const getMyPlaylists = (playlists) => ({
  type: GET,
  playlists
})

const CREATE = '/playlists/create';
const createPlaylist = (playlist) => ({
  type: CREATE,
  playlist
});

const DELETE = '/playlists/delete';
const delPlaylist = (playlist) => ({
  type: DELETE,
  playlist 
})

const UPDATE = '/playlists/update';
const updatePlaylist = (playlist) => ({
  type: UPDATE,
  playlist
})

export const getPlaylists = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/users/${id}/playlists`);
  // console.log('here', res)
  const { Playlists } = await res.json();
  // console.log('here', Songs)
   
  if (res.ok) {
    const data = {}
    Playlists.forEach((playlist) => (data[playlist.id] = playlist));
    dispatch(fetchPlaylists(data))
  }
  return Playlists;
}

export const addPlaylist = (playlist) => async (dispatch) => {
  const res = await csrfFetch('/api/playlists', {
    method: 'POST',
    body: JSON.stringify(playlist),
  });
  const data = await res.json();
  if (res.ok) {
    dispatch(createPlaylist(data))
    return data;
  } 
}

export const editPlaylist = (playlist) => async (dispatch) => {
  const res = await csrfFetch(`/api/playlists/${playlist.id}`, {
    method: 'PATCH',
    body: JSON.stringify(playlist),
  });
  const data = await res.json();
  if (res.ok) {
    dispatch(updatePlaylist(playlist))
    return data
  }
}

export const myPlaylists = ( id ) => async (dispatch) => {
  const res = await csrfFetch(`/api/users/${id}/playlists`)
  // console.log('user', id)
  const { Playlists } = await res.json();

  if (res.ok) {
    const obj = {}
    Playlists.forEach((playlist) => { obj[playlist.id] = playlist });

    dispatch(getMyPlaylists(obj))
  }
}

export const removePlaylist = (playlist) => async (dispatch) => {
  // console.log('song', song)
  // console.log('here', song.id)
  const res= await csrfFetch(`/api/playlists/${playlist.id}`, {
    method: 'DELETE',
  })
  const data = await res.json();

  if(res.ok) {
    dispatch(delPlaylist(playlist))
    return data;
  }
}

const playlistReducer = (state = {}, action) => {
  let newState = { ...state }
  
  // console.log('action', action)
  // console.log('payload', action.payload)
  
  switch (action.type) {
    case FETCH:
      return { ...state , ...action.playlists } 
      
    case CREATE:
      newState[action.playlist.id] = action.playlist
      return newState;
        
    case UPDATE:
      newState = { ...state, [action.playlist.id]: action.playlist
      }
      return newState;
   
     case GET:
      return { ...state , ...action.playlists}
          
    case DELETE: 
      delete newState[action.playlist]
      return newState

    default: 
      return state;
  }
}

export default playlistReducer;