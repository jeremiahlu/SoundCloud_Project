import { csrfFetch } from "./csrf";

const initialState = { user: null }

const SET = 'session/set_session'
export const setSession = user => ({
  type: SET,
  user
});

const REMOVE = 'session/remove_session'
export const removeSession = () => ({
  type: REMOVE
});

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const res = await csrfFetch('api/users/login', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password
    })
  })
  const data = await res.json();
  if(res.ok) dispatch(setSession(data))
  return res 
}

export const logout = () => async (dispatch) => {
  const res = await csrfFetch('/api/users/logout', { method: 'DELETE'});
  if (res.ok) dispatch(removeSession());
}

const sessionReducer = ( state = initialState, action ) => {
  let newState = { ...state }
  switch (action.type) {
    case SET: 
    newState.user = action.payload 
    return newState

    case REMOVE:
      delete newState[action.payload]
     return newState

    default:
      return state;
  }
};

export default sessionReducer;