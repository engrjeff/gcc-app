import {
  PROFILE_REQUESTED,
  GET_PROFILE_SUCCESS,
  SAVE_PROFILE_SUCCESS,
  PROFILE_ERROR,
} from "../types";

const initialState = {
  loading: false,
  profile: {},
  error: null,
};

const profileReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case PROFILE_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case GET_PROFILE_SUCCESS:
    case SAVE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: payload,
        error: null,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        profile: null,
        error: payload,
      };
    default:
      return state;
  }
};

export default profileReducer;
