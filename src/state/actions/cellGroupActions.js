import {
  API_CALL_BEGAN,
  CELL_GROUPS_REQUESTED,
  GET_CELL_GROUPS_SUCCESS,
  CELL_GROUP_ERROR,
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
