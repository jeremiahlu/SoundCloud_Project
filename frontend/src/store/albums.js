import { csrfFetch } from "./csrf";

const SET_ALBUMS = '/albums/SET_ALBUMS';
const setAlbums = (albums) => ({
  type: SET_ALBUMS,
  albums
});

const GET = '/albums/get'
const getMyAlbums = (albums) => ({
  type: GET,
  albums
})

const CREATE = '/albums/create';
const addAlbum = (album) => ({
  type: CREATE,
  album
})

const DELETE = '/albums/delete';
const delAlbum = (album) => ({
  type: DELETE,
  album
})

const UPDATE = '/albums/update';
const updateAlbum = (album) => ({
  type: UPDATE,
  album
})

const GETID = '/albums/get';
const getAlbumById = (album) => ({
  type: GETID,
  album
});

export const fetchAlbums = () => async (dispatch) => {
  const res = await csrfFetch('/api/albums');
  // console.log('here', res)
  const { Albums } = await res.json();
  // console.log('data' , data)
  // console.log('here', Songs)
   
  if (res.ok) {
    const data = {}
    Albums.forEach((album) => (data[album.id] = album));
    dispatch(setAlbums(data))
  }
  return Albums;
}

export const createAlbum = (album) => async (dispatch) => {
  const res = await csrfFetch('/api/albums', {
    method: 'POST',
    body: JSON.stringify(album),
  });
  const data = await res.json();
  if (res.ok) {
    dispatch(addAlbum(data))
    return data;
  } 
}

export const editAlbum = (album) => async (dispatch) => {
  const res = await csrfFetch(`/api/albums/${album.id}`, {
    method: 'PATCH',
    body: JSON.stringify(album),
  });
  const data = await res.json();
  if (res.ok) {
    dispatch(updateAlbum(album))
    return data
  }
}

export const myAlbums = ( id ) => async (dispatch) => {
  const res = await csrfFetch(`/api/users/${id}/albums`)
  // console.log('user', id)
  const { Albums } = await res.json();

  if (res.ok) {
    const obj = {}
    Albums.forEach((album) => { obj[album.id] = album });

    dispatch(getMyAlbums(obj))
  }
}

export const removeAlbums = (album) => async (dispatch) => {
 
  const res = await csrfFetch(`/api/albums/${album.id}`, {
    method: 'DELETE',
  })
  const data = await res.json();

  if(res.ok) {
    dispatch(delAlbum(album))
    return data;
  }
}

export const fetchAlbumById = (album) => async (dispatch) => {
  const res =  await csrfFetch(`/api/albums/${album.id}`, {
    method: 'GET',
  })
  const data = await res.json();

  if(res.ok) {
    dispatch(getAlbumById(data))
    return data
  }
}

const albumReducer = ( state = {}, action ) => {
  let newState = { ...state }

  switch (action.type) {
    
    case SET_ALBUMS:
      return { ...state, ...action.albums }

    case CREATE:
        newState[action.album.id] = action.album
        return newState;

    case UPDATE:
      {console.log('here', action.album)}
      newState = { ...state, [action.album.id]: action.album
      }
      return newState;
    
    case GET:
      return { ...action.albums}
  
    case GETID:
      return {
        ...state, [action.album.id] : {...state[action.album.id], ...action.album}
      }

    case DELETE: 
    delete newState[action.album.id]
    return newState

     // return {
      //   ...state, 
      //   [action.album.id] : {...state[action.album.id], ...action.album}
      // }
    // case GETID:
    //   console.log('here', action)
    //   console.log('here', action.album)

    //   newState[action.album.id] = {...state[action.album.id]}
      
    //   newState[action.album.id] = action.album
      
    //   return newState;

    default: 
    return state;
  }

}

export default albumReducer;