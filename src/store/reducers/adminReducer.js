import actionTypes from "../actions/actionTypes";

const initialState = {
  hotIds: [],
  statusProducts: [],
  brandIds: [],
  paymentIds: [],
  revenueId: [],
  mouseBrandIds: [],
  statusId: [],
  mouseCategoryIds: [],
  printBrandIds: [],
  products: [],
  totalPages: [],
  arrPc: [],
  arLaptop: [],
  arrMouse: [],
  arrItem: [],
  arrPrinter: [],
  arrOrder: [],
  totalOrderPage: [],
  arrTransaction: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_HOT_SUCCESS:
      return {
        ...state,
        hotIds: action.data,
      };

    case actionTypes.FETCH_HOT_FAIL:
      return {
        ...state,
        hotIds: [],
      };

    case actionTypes.FETCH_STATUS_PRODUCT_SUCCESS:
      return {
        ...state,
        statusProducts: action.data,
      };

    case actionTypes.FETCH_STATUS_PRODUCT_FAIL:
      return {
        ...state,
        statusProducts: [],
      };

    case actionTypes.FETCH_BRAND_SUCCESS:
      return {
        ...state,
        brandIds: action.data,
      };

    case actionTypes.FETCH_BRAND_FAIL:
      return {
        ...state,
        brandIds: [],
      };
    case actionTypes.FETCH_PAYMENT_SUCCESS:
      return {
        ...state,
        paymentIds: action.data,
      };

    case actionTypes.FETCH_PAYMENT_FAIL:
      return {
        ...state,
        paymentIds: [],
      };
    case actionTypes.FETCH_REVENUE_SUCCESS:
      return {
        ...state,
        revenueId: action.data,
      };

    case actionTypes.FETCH_REVENUE_FAIL:
      return {
        ...state,
        revenueId: [],
      };

    case actionTypes.FETCH_MOUSE_BRAND_SUCCESS:
      return {
        ...state,
        mouseBrandIds: action.data,
      };

    case actionTypes.FETCH_MOUSE_BRAND_FAIL:
      return {
        ...state,
        mouseBrandIds: [],
      };

    case actionTypes.FETCH_MOUSE_CATEGORY_SUCCESS:
      return {
        ...state,
        mouseCategoryIds: action.data,
      };

    case actionTypes.FETCH_MOUSE_CATEGORY_FAIL:
      return {
        ...state,
        mouseCategoryIds: [],
      };
    case actionTypes.FETCH_PRINT_BRAND_SUCCESS:
      return {
        ...state,
        printBrandIds: action.data,
      };

    case actionTypes.FETCH_PRINT_BRAND_FAIL:
      return {
        ...state,
        printBrandIds: [],
      };
    case actionTypes.FETCH_ALL_PRODUCT_SUCCESS:
      return {
        ...state,
        products: action.data1,
        totalPages: action.data2,
      };

    case actionTypes.FETCH_ALL_PRODUCT_FAIL:
      return {
        ...state,
        products: [],
        totalPages: [],
      };
    case actionTypes.FETCH_PC_SUCCESS:
      return {
        ...state,
        arrPc: action.data,
      };

    case actionTypes.FETCH_PC_FAIL:
      return {
        ...state,
        arrPc: [],
      };

    case actionTypes.FETCH_LAPTOP_SUCCESS:
      return {
        ...state,
        arrLaptop: action.data,
      };

    case actionTypes.FETCH_LAPTOP_FAIL:
      return {
        ...state,
        arrLaptop: [],
      };
    case actionTypes.FETCH_MOUSE_SUCCESS:
      return {
        ...state,
        arrMouse: action.data,
      };

    case actionTypes.FETCH_MOUSE_FAIL:
      return {
        ...state,
        arrMouse: [],
      };

    case actionTypes.FETCH_ITEM_SUCCESS:
      return {
        ...state,
        arrItem: action.data,
      };

    case actionTypes.FETCH_ITEM_FAIL:
      return {
        ...state,
        arrItem: [],
      };

    case actionTypes.FETCH_PRINTER_SUCCESS:
      return {
        ...state,
        arrPrinter: action.data,
      };

    case actionTypes.FETCH_PRINTER_FAIL:
      return {
        ...state,
        arrPrinter: [],
      };

    case actionTypes.FETCH_ORDER_SUCCESS:
      return {
        ...state,
        arrOrder: action.data,
        totalOrderPage: action.data1,
      };

    case actionTypes.FETCH_ORDER_FAIL:
      return {
        ...state,
        arrOrder: [],
        totalOrderPage: [],
      };

    case actionTypes.FETCH_TRANSACTION_SUCCESS:
      return {
        ...state,
        arrTransaction: action.data,
      };

    case actionTypes.FETCH_TRANSACTION_FAIL:
      return {
        ...state,
        arrTransaction: [],
      };
    case actionTypes.FETCH_STATUS_SUCCESS:
      return {
        ...state,
        statusId: action.data,
      };

    case actionTypes.FETCH_STATUS_FAIL:
      return {
        ...state,
        statusId: [],
      };

    default:
      return state;
  }
};

export default adminReducer;
