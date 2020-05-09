import {
  API_CALL_BEGAN,
  CELL_GROUPS_REQUESTED,
  CELL_GROUP_ERROR,
  GET_CELL_GROUPS_SUCCESS,
  GET_CURRENT_USER_CELL_GROUPS_SUCCESS,
} from "../types";

// Get all cell groups
export const getAllCellGroups = () => async (dispatch) => {
  dispatch({
    type: API_CALL_BEGAN,
    payload: {
      url: "/api/v1/cellgroup",
      onStart: CELL_GROUPS_REQUESTED,
      onSuccess: GET_CELL_GROUPS_SUCCESS,
      onError: CELL_GROUP_ERROR,
    },
  });
};

// Get current user's cell groups
export const getCurrentUserCellGroups = () => async (dispatch) => {
  dispatch({
    type: API_CALL_BEGAN,
    payload: {
      url: "/api/v1/cellgroup/me",
      onStart: CELL_GROUPS_REQUESTED,
      onSuccess: GET_CURRENT_USER_CELL_GROUPS_SUCCESS,
      onError: CELL_GROUP_ERROR,
    },
  });
};
