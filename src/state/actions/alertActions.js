import { SHOW_ALERT, HIDE_ALERT } from "../types";

// show alert
export const showAlert = (alert, timeout = 2000) => (dispatch) => {
  dispatch({
    type: SHOW_ALERT,
    payload: alert,
  });

  setTimeout(() => {
    dispatch(hideAlert());
  }, timeout);
};

// hide alert
export const hideAlert = () => (dispatch) => {
  dispatch({
    type: HIDE_ALERT,
  });
};
