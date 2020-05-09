import { SHOW_ALERT, HIDE_ALERT } from "../types";

// content: null,
// type: null

const alertReducer = (state = null, action) => {
  const { type, payload } = action;
  switch (type) {
    case SHOW_ALERT:
      return {
        ...state,
        ...payload,
      };
    case HIDE_ALERT:
      return null;
    default:
      return state;
  }
};

export default alertReducer;
