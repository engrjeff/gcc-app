import { GET_CELL_GROUPS_SUCCESS, CELL_GROUP_ERROR } from "../types";

const initialState = {
  loading: true,
  cellgroups: {},
  userCellgroups: {},
  error: {},
};

const cellGroupReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_CELL_GROUPS_SUCCESS: {
      return {
        ...state,
        loading: false,
        cellgroups: { ...payload },
        error: null,
      };
    }
    case CELL_GROUP_ERROR: {
      return {
        ...state,
        loading: false,
        error: payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default cellGroupReducer;
