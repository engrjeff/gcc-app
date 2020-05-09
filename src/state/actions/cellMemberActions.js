import {
  API_CALL_BEGAN,
  MEMBERS_REQUESTED,
  MEMBERS_ERROR,
  GET_MEMBERS_SUCCESS,
  CREATE_MEMBER_SUCCESS,
  DELETE_MEMBER_SUCCESS,
} from "../types";

import { showAlert } from "../actions/alertActions";

// Get current user's cell members
export const getCurrentUserCellMembers = () => async (dispatch) => {
  dispatch({
    type: API_CALL_BEGAN,
    payload: {
      url: "/api/v1/cellmember/me",
      onStart: MEMBERS_REQUESTED,
      onSuccess: GET_MEMBERS_SUCCESS,
      onError: MEMBERS_ERROR,
    },
  });
};

// Create cell member
export const createCellMember = (cellMember, history) => async (dispatch) => {
  const afterSuccess = () => {
    dispatch(showAlert({ content: "Disciple added!", type: "success" }));
    history.push("/me/groups/disciples");
  };
  dispatch({
    type: API_CALL_BEGAN,
    payload: {
      url: "/api/v1/cellmember",
      method: "post",
      data: cellMember,
      onStart: MEMBERS_REQUESTED,
      onSuccess: CREATE_MEMBER_SUCCESS,
      onError: MEMBERS_ERROR,
      afterSuccess,
    },
  });
};

// Delete cell member
export const deleteCellMember = (cellMemberId, history) => async (dispatch) => {
  const afterSuccess = () => {
    dispatch(showAlert({ content: "Disciple deleted!", type: "danger" }));
    history.push("/me/groups");
  };
  dispatch({
    type: API_CALL_BEGAN,
    payload: {
      url: `/api/v1/cellmember/${cellMemberId}`,
      method: "delete",
      onStart: MEMBERS_REQUESTED,
      onSuccess: DELETE_MEMBER_SUCCESS,
      onError: MEMBERS_ERROR,
      afterSuccess,
    },
  });
};
