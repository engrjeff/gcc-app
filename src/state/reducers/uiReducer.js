import { SHOW_LOADING, HIDE_LOADING } from "../types";

const initialState = {
  loading: false,
};

const uiReducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case SHOW_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case HIDE_LOADING: {
      return {
        ...state,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default uiReducer;
