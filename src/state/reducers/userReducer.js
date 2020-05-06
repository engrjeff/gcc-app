import { USER_REQUESTED, GET_USERS_SUCCESS, USER_ERROR } from "../types";

const initialState = {
  users: [],
  user: null,
  error: null,
  loading: false,
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_REQUESTED:
      return { ...state, loading: true };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: payload,
        user: null,
        error: null,
      };
    case USER_ERROR:
      return {
        ...state,
        loading: false,
        users: null,
        user: null,
        error: payload,
      };
    default:
      return state;
  }
};

export default userReducer;
