import {
  API_CALL_BEGAN,
  USER_REQUESTED,
  GET_USERS_SUCCESS,
  USER_ERROR,
} from "../types";

// GET ALL USERS
export const getAllUsers = (params = {}) => (dispatch) => {
  dispatch({
    type: API_CALL_BEGAN,
    payload: {
      url: "/api/v1/user",
      params,
      onStart: USER_REQUESTED,
      onSuccess: GET_USERS_SUCCESS,
      onError: USER_ERROR,
    },
  });
};
