import {
  CELL_GROUPS_REQUESTED,
  CELL_GROUP_ERROR,
  GET_CELL_GROUPS_SUCCESS,
  GET_CURRENT_USER_CELL_GROUPS_SUCCESS,
} from "../types";

const initialState = {
  loading: false,
  cellgroups: {},
  userCellgroups: {},
  error: {},
};

const cellGroupReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CELL_GROUPS_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case GET_CELL_GROUPS_SUCCESS:
      return {
        ...state,
        loading: false,
        cellgroups: { ...payload },
        error: null,
      };
    case GET_CURRENT_USER_CELL_GROUPS_SUCCESS:
      return {
        ...state,
        loading: false,
        userCellgroups: { ...payload },
        error: null,
      };
    case CELL_GROUP_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default cellGroupReducer;
