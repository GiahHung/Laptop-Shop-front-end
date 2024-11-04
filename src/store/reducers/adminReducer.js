import actionTypes from "../actions/actionTypes";

const initialState = {
  hotIds: [],
  statusProducts: [],
  brandIds: [],
  products: [],
  totalPages: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_HOT_SUCCESS:
      return {
        ...state,
        hotIds: action.data, // Correctly update hotIds immutably
      };

    case actionTypes.FETCH_HOT_FAIL:
      return {
        ...state,
        hotIds: [], // Return a new state with empty hotIds
      };

    case actionTypes.FETCH_STATUS_PRODUCT_SUCCESS:
      return {
        ...state,
        statusProducts: action.data, // Correctly update statusProducts immutably
      };

    case actionTypes.FETCH_STATUS_PRODUCT_FAIL:
      return {
        ...state,
        statusProducts: [], // Return a new state with empty statusProducts
      };

    case actionTypes.FETCH_BRAND_SUCCESS:
      return {
        ...state,
        brandIds: action.data, // Correctly update brandIds immutably
      };

    case actionTypes.FETCH_BRAND_FAIL:
      return {
        ...state,
        brandIds: [], // Return a new state with empty brandIds
      };
    case actionTypes.FETCH_ALL_PRODUCT_SUCCESS:
   
      return {
        ...state,
        products: action.data1,
        totalPages: action.data2 // Correctly update brandIds immutably
      };

    case actionTypes.FETCH_ALL_PRODUCT_FAIL:
      return {
        ...state,
        products: [],
        totalPages:[] // Return a new state with empty brandIds
      };

    default:
      return state;
  }
};

export default adminReducer;
