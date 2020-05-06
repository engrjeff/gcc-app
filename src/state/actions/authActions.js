import setAuthToken from "../utils/setAuthToken";
import {
  API_CALL_BEGAN,
  AUTH_REQUESTED,
  AUTH_REGISTER_SUCCESS,
  AUTH_LOGIN_SUCCESS,
  AUTH_ERROR,
  AUTH_LOGOUT,
  AUTH_LOAD_USER,
} from "../types";

// load user
export const loadUser = () => async (dispatch) => {
  const token = localStorage.getItem("auth-token");
  if (token) {
    setAuthToken(token);
  }

  dispatch({
    type: API_CALL_BEGAN,
    payload: {
      url: "/api/v1/auth/me",
      onStart: AUTH_REQUESTED,
      onSuccess: AUTH_LOAD_USER,
      onError: AUTH_ERROR,
      expectError: false,
    },
  });
};

// register user
export const register = ({ name, email, password }) => async (dispatch) => {
  const data = { name, email, password };
  const afterSuccess = () => dispatch(loadUser());
  const afterError = () =>
    setTimeout(
      () =>
        dispatch({
          type: AUTH_ERROR,
          payload: null,
        }),
      3000
    );

  dispatch({
    type: API_CALL_BEGAN,
    payload: {
      url: "/api/v1/auth/register",
      method: "post",
      data,
      onStart: AUTH_REQUESTED,
      onSuccess: AUTH_REGISTER_SUCCESS,
      onError: AUTH_ERROR,
      afterSuccess,
      afterError,
      expectError: true,
    },
  });
};

// log in user
export const login = ({ email, password }) => async (dispatch) => {
  const data = { email, password };
  const afterSuccess = () => dispatch(loadUser());
  const afterError = () =>
    setTimeout(
      () =>
        dispatch({
          type: AUTH_ERROR,
          payload: null,
        }),
      3000
    );

  dispatch({
    type: API_CALL_BEGAN,
    payload: {
      url: "/api/v1/auth/login",
      method: "post",
      data,
      onStart: AUTH_REQUESTED,
      onSuccess: AUTH_LOGIN_SUCCESS,
      onError: AUTH_ERROR,
      afterSuccess,
      afterError,
      expectError: true,
    },
  });
};

// logout and clear everything
export const logout = () => (dispatch) => {
  dispatch({
    type: AUTH_LOGOUT,
  });
};
