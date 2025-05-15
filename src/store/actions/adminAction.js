import actionTypes from "./actionTypes";
import {  toast } from "react-toastify";
import { handleGetAllCodeService } from "../../services/userServices";
import {
  handleGetAllProductService,
  handleGetProductByCategoryService,
  createProductService,
  deleteProductService,
  editProductService,
  handleGetOrderService,
  handleGetTransactionService,
  handleUpdateStatusService,
} from "../../services/adminServices";

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
      console.log("FETCH_HOT_FAIL: ", e);
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

export const fetchPaymentId = () => {
  return async (dispatch, getState) => {
    try {
      let res = await handleGetAllCodeService("payment");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_PAYMENT_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_PAYMENT_FAIL,
        });
      }
    } catch (e) {
      console.log("FETCH_PAYMENT_FAIL: ", e);
      dispatch({
        type: actionTypes.FETCH_PAYMENT_FAIL,
      });
    }
  };
};

export const fetchRevenueId = () => {
  return async (dispatch, getState) => {
    try {
      let res = await handleGetAllCodeService("revenue");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_REVENUE_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_REVENUE_FAIL,
        });
      }
    } catch (e) {
      console.log("FETCH_REVENUE_FAIL: ", e);
      dispatch({
        type: actionTypes.FETCH_REVENUE_FAIL,
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

export const fetchMouseBrand = () =>{
  return async (dispatch, getState) => {
    try {
      let res = await handleGetAllCodeService("mouseBrand");
      if(res && res.errCode === 0){
        dispatch({
          type: actionTypes.FETCH_MOUSE_BRAND_SUCCESS,
          data: res.data
        })
      }else{
        dispatch({
          type: actionTypes.FETCH_MOUSE_BRAND_FAIL
        })
      }
    } catch (e) {
      console.log("FETCH_MOUSE_BRAND_FAIL",e);
      dispatch({
        type: actionTypes.FETCH_MOUSE_BRAND_FAIL,
      })
    }
  }
}

export const fetchPrintBrand = () =>{
  return async (dispatch, getState) => {
    try {
      let res = await handleGetAllCodeService("printBrand");
      if(res && res.errCode === 0){
        dispatch({
          type: actionTypes.FETCH_PRINT_BRAND_SUCCESS,
          data: res.data
        })
      }else{
        dispatch({
          type: actionTypes.FETCH_PRINT_BRAND_FAIL
        })
      }
    } catch (e) {
      console.log("FETCH_PRINT_BRAND_FAIL",e);
      dispatch({
        type: actionTypes.FETCH_PRINT_BRAND_FAIL,
      })
    }
  }
}
export const fetchMouseCategory = () =>{
  return async (dispatch, getState) => {
    try {
      let res = await handleGetAllCodeService("mouseCategory");
      if(res && res.errCode === 0){
        dispatch({
          type: actionTypes.FETCH_MOUSE_CATEGORY_SUCCESS,
          data: res.data
        })
      }else{
        dispatch({
          type: actionTypes.FETCH_MOUSE_CATEGORY_FAIL
        })
      }
    } catch (e) {
      console.log("FETCH_MOUSE_CATEGORY_FAIL",e);
      dispatch({
        type: actionTypes.FETCH_MOUSE_CATEGORY_FAIL,
      })
    }
  }
}

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

export const createProduct = (data,page, limit,category) => {
  return async (dispatch, getState) => {
    try {
      let res = await createProductService(data);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.CREATE_PRODUCT_SUCCESS,
        });
        toast.success("Thành công");
        dispatch(fetchAllProduct(page, limit,category));
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

export const deleteProduct = (id,page, limit,category) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteProductService(id);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.DELETE_PRODUCT_SUCCESS,
        });
        toast.success("Thành công");
        dispatch(fetchAllProduct(page, limit,category));
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

export const updateProduct = (data,page, limit,category) => {
  return async (dispatch, getState) => {
    try {
      let res = await editProductService(data);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.UPDATE_PRODUCT_SUCCESS,
        });
        toast.success("Thành công");
        dispatch(fetchAllProduct(page, limit,category));
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

export const fetchPc = () => {
  return async (dispatch, getState) => {
    try {
      let res = await handleGetProductByCategoryService(5,"c1");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_PC_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_PC_FAIL,
        });
      }
    } catch (e) {
      console.log("FETCH_PC_FAIL: ", e);
      dispatch({
        type: actionTypes.FETCH_PC_FAIL,
      });
    }
  };
};

export const fetchLaptop = () => {
  return async (dispatch, getState) => {
    try {
      let res = await handleGetProductByCategoryService(5,"c2");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_LAPTOP_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_LAPTOP_FAIL,
        });
      }
    } catch (e) {
      console.log("FETCH_LAPTOP_FAIL: ", e);
      dispatch({
        type: actionTypes.FETCH_LAPTOP_FAIL,
      });
    }
  };
};

export const fetchMouse = () => {
  return async (dispatch, getState) => {
    try {
      let res = await handleGetProductByCategoryService(5,"c4");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_MOUSE_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_MOUSE_FAIL,
        });
      }
    } catch (e) {
      console.log("FETCH_MOUSE_FAIL: ", e);
      dispatch({
        type: actionTypes.FETCH_MOUSE_FAIL,
      });
    }
  };
};

export const fetchItem = () => {
  return async (dispatch, getState) => {
    try {
      let res = await handleGetProductByCategoryService(5,"c3");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ITEM_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ITEM_FAIL,
        });
      }
    } catch (e) {
      console.log("FETCH_ITEM_FAIL: ", e);
      dispatch({
        type: actionTypes.FETCH_ITEM_FAIL,
      });
    }
  };
};

export const fetchPrinter = () => {
  return async (dispatch, getState) => {
    try {
      let res = await handleGetProductByCategoryService(5,"c5");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_PRINTER_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_PRINTER_FAIL,
        });
      }
    } catch (e) {
      console.log("FETCH_PRINTER_FAIL: ", e);
      dispatch({
        type: actionTypes.FETCH_PRINTER_FAIL,
      });
    }
  };
};

export const fetchOrder = (page,limit) => {
  return async (dispatch, getState) => {
    try {
      let res = await handleGetOrderService(page,limit);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ORDER_SUCCESS,
          data: res.order,
          data1: res.totalPage
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ORDER_FAIL,
        });
      }
    } catch (e) {
      console.log("FETCH_ORDER_FAIL: ", e);
      dispatch({
        type: actionTypes.FETCH_ORDER_FAIL,
      });
    }
  };
};

export const fetchTransaction = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await handleGetTransactionService(id);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TRANSACTION_SUCCESS,
          data: res.transaction,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_TRANSACTION_FAIL,
        });
      }
    } catch (e) {
      console.log("FETCH_TRANSACTION_FAIL: ", e);
      dispatch({
        type: actionTypes.FETCH_TRANSACTION_FAIL,
      });
    }
  };
};

export const fetchStatus = () => {
  return async (dispatch, getState) => {
    try {
      let res = await handleGetAllCodeService("status");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_STATUS_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_STATUS_FAIL,
        });
      }
    } catch (e) {
      console.log("FETCH_STATUS_FAIL: ", e);
      dispatch({
        type: actionTypes.FETCH_STATUS_FAIL,
      });
    }
  };
};

export const updateStatus = (data, page, limit) => {
  return async (dispatch, getState) => {
    try {
      let res = await handleUpdateStatusService(data);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.EDIT_STATUS_SUCCESS,
        });
        toast.success("Thành công");
        dispatch(fetchOrder(page, limit));
      } else {
        toast.error("Thất bại");
        dispatch({
          type: actionTypes.EDIT_STATUS_FAIL,
        });
      }
    } catch (e) {
      console.log("EDIT_STATUS_FAIL: ", e);
      dispatch({
        type: actionTypes.EDIT_STATUS_FAIL,
      });
    }
  };
};