import axios from "axios";
import { GET_CELL_GROUPS_SUCCESS, CELL_GROUP_ERROR } from "../types";

// Get all cell groups
export const getAllCellGroups = () => async (dispatch) => {
  try {
    const { data: cellgroups } = await axios.get("/api/v1/cellgroup");

    dispatch({
      type: GET_CELL_GROUPS_SUCCESS,
      payload: cellgroups,
    });
  } catch (err) {
    dispatch({
      type: CELL_GROUP_ERROR,
      payload: err.response.data,
    });
  }
};
