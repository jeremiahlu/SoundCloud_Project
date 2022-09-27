import { csrfFetch } from "./csrf";

const initialState = { user: null }

const SET = 'session/set_session'
export const setSession = user => ({
  type: SET,
  payload: user
});

const REMOVE = 'session/remove_session'
export const removeSession = () => ({
  type: REMOVE
});

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const res = await csrfFetch('/api/users/login', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password
    })
  })
  const data = await res.json();
  console.log('here', data)

  localStorage.setItem('userId', data.id)
  if(res.ok) dispatch(setSession(data))
  return res 
}

export const signup = (user) => async (dispatch) => {
  const { firstName, lastName, username, email, password } = user;
  const res = await csrfFetch('/api/users/sign-up', {
    method: 'POST',
    body: JSON.stringify({
      firstName,
      lastName,
      username,
      email,
      password
    })
  })
  const data = await res.json();
  localStorage.setItem('userId', data.id)
  if(res.ok) dispatch(setSession(data))
  return res
}

export const logout = () => async (dispatch) => {
  if(localStorage.getItem('userId')){
  const res = await csrfFetch('/api/users/logout', { method: 'DELETE'});
  dispatch(removeSession());
  localStorage.clear()
  return res;
}
}

export const restoreUser = () => async dispatch => {
  if(localStorage.getItem('userId')){
    const res = await csrfFetch(`/api/users/${localStorage.getItem('userId')}`);
    const data = await res.json();
    dispatch(setSession(data));
    return res;
  }
};

const sessionReducer = ( state = initialState, action ) => {
  let newState = { ...state }
  switch (action.type) {
    case SET: 
    newState.user = action.payload 
    return newState

    case REMOVE:
    newState.user = null
     return newState

    default:
      return state;
  }
};

export default sessionReducer;