import actionTypes from "./actionTypes";
import { toast } from "react-toastify";
import {
  handleGetAllUserService,
  handleGetAllCodeService,
  createUserService,
  deleteUserService,
  editUserService,
} from "../../services/userServices";

export const fetchAllUser = (page, limit) => {
  return async (dispatch, getState) => {
    try {
      let res = await handleGetAllUserService(page, limit);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_USER_SUCCESS,
          data1: res.user.user,
          data2: res.user.totalPage,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_USER_FAIL,
        });
      }
    } catch (e) {
      console.log("FETCH_ALL_USER_FAIL: ", e);
      dispatch({
        type: actionTypes.FETCH_ALL_USER_FAIL,
      });
    }
  };
};

export const fetchRoleId = () => {
  return async (dispatch, getState) => {
    try {
      let res = await handleGetAllCodeService("ROLE");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ROLE_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ROLE_FAIL,
        });
      }
    } catch (e) {
      console.log("FETCH_ROLE_FAIL: ", e);
      dispatch({
        type: actionTypes.FETCH_ROLE_FAIL,
      });
    }
  };
};

export const createUser = (data, page, limit) => {
  return async (dispatch, getState) => {
    try {
      let res = await createUserService(data);
      console.log("create user: ", res);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.REGISTER_SUCCESS,
        });
        toast.success("Thành công");
        dispatch(fetchAllUser(page, limit));
      } else {
        toast.error("Thất bại");
        dispatch({
          type: actionTypes.REGISTER_FAIL,
        });
      }
    } catch (e) {
      console.log("REGISTER_FAIL: ", e);
      dispatch({
        type: actionTypes.REGISTER_FAIL,
      });
    }
  };
};

export const deleteUser = (id, page, limit) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserService(id);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.DELETE_USER_SUCCESS,
        });
        toast.success("Thành công");
        dispatch(fetchAllUser(page, limit));
      } else {
        toast.error("Thất bại");
        dispatch({
          type: actionTypes.DELETE_USER_FAIL,
        });
      }
    } catch (e) {
      console.log("EDIT_USER_FAIL: ", e);
      dispatch({
        type: actionTypes.DELETE_USER_FAIL,
      });
    }
  };
};

export const editUser = (id, page, limit) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserService(id);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.EDIT_USER_SUCCESS,
        });
        toast.success("Thành công");
        dispatch(fetchAllUser(page, limit));
      } else {
        toast.error("Thất bại");
        dispatch({
          type: actionTypes.EDIT_USER_FAIL,
        });
      }
    } catch (e) {
      console.log("DELETE_USER_FAIL: ", e);
      dispatch({
        type: actionTypes.EDIT_USER_FAIL,
      });
    }
  };
};

export const userLoginSuccess = (userInfo) => ({
  type: actionTypes.LOGIN_SUCCESS,
  userInfo: userInfo,
});

export const userLoginFail = () => ({
  type: actionTypes.LOGIN_FAIL,
});

export const processLogout = () => ({
  type: actionTypes.PROCESS_LOGOUT,
});
