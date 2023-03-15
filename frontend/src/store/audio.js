import { csrfFetch } from "./csrf";

const GET_AUDIO = "/songs/fetch";
export const getAudio = (song) => ({
  type: GET_AUDIO,
  song,
});

const PAUSE_AUDIO = "/songs/pause";
export const pauseAudio = () => ({
  type: PAUSE_AUDIO,
});

const audioPlayerReducer = (state = {}, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_AUDIO:
      newState = {};
      newState["song"] = action.song;
      return newState;

    case PAUSE_AUDIO:
      if (newState.song && newState.song.audio) {
        newState.song.audio.pause();
      }
      // console.log(newState.song.audio.pause(), "NEWSONG");
      return newState;

    default:
      return state;
  }
};

export default audioPlayerReducer;
