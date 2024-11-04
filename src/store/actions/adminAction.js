import actionTypes from "./actionTypes";
import {  toast } from "react-toastify";
import { handleGetAllCodeService } from "../../services/userServices";
import {handleGetAllProductService,createProductService,deleteProductService,editProductService} from "../../services/adminServices"

export const fetchHotId = () => {
  return async (dispatch, getState) => {
    try {
      let res = await handleGetAllCodeService("hot");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_HOT_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_HOT_FAIL,
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

export const fetchBrandId = () => {
  return async (dispatch, getState) => {
    try {
      let res = await handleGetAllCodeService("brand");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_BRAND_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_BRAND_FAIL,
        });
      }
    } catch (e) {
      console.log("FETCH_BRAND_FAIL: ", e);
      dispatch({
        type: actionTypes.FETCH_BRAND_FAIL,
      });
    }
  };
};

export const fetchStatusProductId = () => {
  return async (dispatch, getState) => {
    try {
      let res = await handleGetAllCodeService("statusproduct");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_STATUS_PRODUCT_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_STATUS_PRODUCT_FAIL,
        });
      }
    } catch (e) {
      console.log("FETCH_STATUS_PRODUCT_FAIL: ", e);
      dispatch({
        type: actionTypes.FETCH_STATUS_PRODUCT_FAIL,
      });
    }
  };
};

export const fetchAllProduct = (page, limit,category) => {
  return async (dispatch, getState) => {
    try {
      let res = await handleGetAllProductService(page, limit,category);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_PRODUCT_SUCCESS,
          data1: res.product.product,
          data2: res.product.totalPage,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_PRODUCT_FAIL,
        });
      }
    } catch (e) {
      console.log("FETCH_ALL_PRODUCT_FAIL: ", e);
      dispatch({
        type: actionTypes.FETCH_ALL_PRODUCT_FAIL,
      });
    }
  };
}

export const createProduct = (data,page, limit) => {
  return async (dispatch, getState) => {
    try {
      let res = await createProductService(data);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.CREATE_PRODUCT_SUCCESS,
        });
        toast.success("Thành công");
        dispatch(fetchAllProduct(page, limit,'c2'));
      } else {
        toast.error("Thất bại");
        dispatch({
          type: actionTypes.CREATE_PRODUCT_FAIL,
        });
      }
    } catch (e) {
      console.log("CREATE_PRODUCT_FAIL: ", e);
      dispatch({
        type: actionTypes.CREATE_PRODUCT_FAIL,
      });
    }
  };
}

export const deleteProduct = (id,page, limit) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteProductService(id);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.DELETE_PRODUCT_SUCCESS,
        });
        toast.success("Thành công");
        dispatch(fetchAllProduct(page, limit,'c2'));
      } else {
        toast.error("Thất bại");
        dispatch({
          type: actionTypes.DELETE_PRODUCT_FAIL,
        });
      }
    } catch (e) {
      console.log("DELETE_PRODUCT_FAIL: ", e);
      dispatch({
        type: actionTypes.DELETE_PRODUCT_FAIL,
      });
    }
  };
}

export const updateProduct = (data,page, limit) => {
  return async (dispatch, getState) => {
    try {
      let res = await editProductService(data);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.UPDATE_PRODUCT_SUCCESS,
        });
        toast.success("Thành công");
        dispatch(fetchAllProduct(page, limit,'c2'));
      } else {
        toast.error("Thất bại");
        dispatch({
          type: actionTypes.UPDATE_PRODUCT_FAIL,
        });
      }
    } catch (e) {
      console.log("UPDATE_PRODUCT_FAIL: ", e);
      dispatch({
        type: actionTypes.UPDATE_PRODUCT_FAIL,
      });
    }
  };
}
