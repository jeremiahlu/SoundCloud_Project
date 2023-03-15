import { csrfFetch } from "./csrf";

const initialState = { user: null };

const SET = "session/set_session";
export const setSession = (user) => ({
  type: SET,
  payload: user,
});

const REMOVE = "session/remove_session";
export const removeSession = () => ({
  type: REMOVE,
});

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const res = await csrfFetch("/api/users/login", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  // console.log('here')
  // console.log('here', data)

  if (res.ok) {
    const data = await res.json();
    localStorage.setItem("userId", data.id);
    dispatch(setSession(data));
    return data;
  } else {
    //   const err = new Error();
    // err.message = data.message;
    //   err.status = data.statusCode;
    //   err.errors = data.errors;
    throw res;
  }
};

export const signup = (user) => async (dispatch) => {
  const {
    // images,
    previewImage,
    firstName,
    lastName,
    username,
    email,
    password,
  } = user;
  const formData = new FormData();
  formData.append("firstName", firstName);
  formData.append("lastName", lastName);
  formData.append("username", username);
  formData.append("email", email);
  formData.append("password", password);
  // formData.append("image", image);
  // if (image) {
  //   const imageUrl = await singlePublicFileUpload(image);
  //   formData.append("imageUrl", imageUrl);
  // }

  // for multiple files
  // if (images && images.length !== 0) {
  //   for (var i = 0; i < images.length; i++) {
  //     formData.append("images", images[i]);
  //   }
  // }

  // for single file
  // if (previewImage) formData.append("image", previewImage);
  const res = await csrfFetch("/api/users/sign-up", {
    method: "POST",
    // headers: {
    //   "Content-Type": "multipart/form-data",
    // },
    body: JSON.stringify({
      firstName,
      lastName,
      username,
      email,
      password,
    }),
    // body: formData,
  });
  const data = await res.json();
  localStorage.setItem("userId", data.id);
  if (res.ok) dispatch(setSession(data));
  return res;
};

export const logout = () => async (dispatch) => {
  if (localStorage.getItem("userId")) {
    const res = await csrfFetch("/api/users/logout", { method: "DELETE" });
    dispatch(removeSession());
    localStorage.clear();
    return res;
  }
};

export const restoreUser = () => async (dispatch) => {
  if (localStorage.getItem("userId")) {
    const res = await csrfFetch(`/api/users/${localStorage.getItem("userId")}`);
    const data = await res.json();
    dispatch(setSession(data));
    return res;
  }
};

const sessionReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case SET:
      newState.user = action.payload;
      return newState;

    case REMOVE:
      newState.user = null;
      return newState;

    default:
      return state;
  }
};

export default sessionReducer;
