import actionTypes from "./actionTypes";
import { toast } from "react-toastify";
import {
  handleGetAllUserService,
  handleGetAllCodeService,
  createUserService,
  deleteUserService,
  editUserService,
  handleGetCartService,
  addToCartService,
  handleEastCartService,
  deleteCartService,
  increaseQuantityService,
  decreaseQuantityService,
  handleGetAllProductService,
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

export const fetchCart = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await handleGetCartService(userId);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_CART_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_CART_FAIL,
        });
      }
    } catch (e) {
      console.log("FETCH_CART_FAIL: ", e);
      dispatch({
        type: actionTypes.FETCH_CART_FAIL,
      });
    }
  };
};

export const eastCart = (userId, localProduct) => {
  return async (dispatch, getState) => {
    try {
      let res = await handleEastCartService(userId, localProduct);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.EAST_CART_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.EAST_CART_FAIL,
        });
      }
    } catch (e) {
      console.log("EAST_CART_FAIL: ", e);
      dispatch({
        type: actionTypes.EAST_CART_FAIL,
      });
    }
  };
};

export const addProductToCart = (data, userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await addToCartService(data);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.ADD_TO_CART_SUCCESS,
        });
        toast.success("Sản phẩm đã được thêm vào giỏ hàng");
        dispatch(fetchCart(userId));
      } else {
        toast.error("Thất bại");
        dispatch({
          type: actionTypes.ADD_TO_CART_FAIL,
        });
      }
    } catch (e) {
      console.log("ADD_TO_CART_FAIL: ", e);
      dispatch({
        type: actionTypes.ADD_TO_CART_FAIL,
      });
    }
  };
};

export const deleteProductInCart = (productId, userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteCartService(productId);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.DELETE_PRODUCT_IN_CART_SUCCESS,
        });

        dispatch(fetchCart(userId));
      } else {
        dispatch({
          type: actionTypes.DELETE_PRODUCT_IN_CART_FAIL,
        });
      }
    } catch (e) {
      console.log("DELETE_PRODUCT_IN_CART_FAIL: ", e);
      dispatch({
        type: actionTypes.DELETE_PRODUCT_IN_CART_FAIL,
      });
    }
  };
};

export const increaseQuantity = (data, userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await increaseQuantityService(data);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.INCREASE_QUANTITY_SUCCESS,
        });

        dispatch(fetchCart(userId));
      } else {
        dispatch({
          type: actionTypes.INCREASE_QUANTITY_FAIL,
        });
      }
    } catch (e) {
      console.log("INCREASE_QUANTITY_FAIL: ", e);
      dispatch({
        type: actionTypes.INCREASE_QUANTITY_FAIL,
      });
    }
  };
};

export const decreaseQuantity = (data, userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await decreaseQuantityService(data);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.DECREASE_QUANTITY_SUCCESS,
        });

        dispatch(fetchCart(userId));
      } else {
        dispatch({
          type: actionTypes.DECREASE_QUANTITY_FAIL,
        });
      }
    } catch (e) {
      console.log("DECREASE_QUANTITY_FAIL: ", e);
      dispatch({
        type: actionTypes.DECREASE_QUANTITY_FAIL,
      });
    }
  };
};

export const processLogout = () => {
  return async (dispatch) => {
    sessionStorage.removeItem("accessToken");
    dispatch({ type: actionTypes.PROCESS_LOGOUT });
  };
};

export const fetchAllProductCategory = (category) => {
  return async (dispatch, getState) => {
    try {
      let res = await handleGetAllProductService(category);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_PRODUCT_CATEGORY_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_PRODUCT_CATEGORY_FAIL,
        });
      }
    } catch (e) {
      console.log("FETCH_ALL_PRODUCT_CATEGORY_FAIL: ", e);
      dispatch({
        type: actionTypes.FETCH_ALL_PRODUCT_CATEGORY_FAIL,
      });
    }
  };
};
