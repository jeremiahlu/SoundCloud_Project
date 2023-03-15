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

const PLAY_AUDIO = "/songs/play";
export const playAudio = () => ({
  type: PLAY_AUDIO,
});

const SYNC_PLAYER_STATUS = "/songs/sync";
export const syncPlayerStatus = (status) => ({
  type: SYNC_PLAYER_STATUS,
  status,
});

const audioPlayerReducer = (state = {}, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_AUDIO:
      newState = {};
      newState.song = action.song;
      return newState;
    case SYNC_PLAYER_STATUS:
      newState.status = action.status;
      return newState;
    case PAUSE_AUDIO:
      newState.status = 'pause';
      return newState;
    case PLAY_AUDIO:
      newState.status = 'play';
      return newState;
    default:
      return state;
  }
};

export default audioPlayerReducer;
