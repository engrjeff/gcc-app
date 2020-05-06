import {
  AUTH_REQUESTED,
  AUTH_REGISTER_SUCCESS,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOAD_USER,
  AUTH_ERROR,
  AUTH_LOGOUT,
} from "../types";

const initialState = {
  loading: false,
  isAuthenticated: false,
  token: localStorage.getItem("auth-token"),
  user: null,
  errors: null,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case AUTH_LOAD_USER:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case AUTH_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case AUTH_REGISTER_SUCCESS:
    case AUTH_LOGIN_SUCCESS:
      localStorage.setItem("auth-token", payload.data);
      return {
        ...state,
        token: payload.data,
        isAuthenticated: true,
        loading: false,
      };
    case AUTH_ERROR:
    case AUTH_LOGOUT:
      localStorage.removeItem("auth-token");
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        token: null,
        user: null,
        errors: payload,
      };
    default:
      return state;
  }
};

export default authReducer;
