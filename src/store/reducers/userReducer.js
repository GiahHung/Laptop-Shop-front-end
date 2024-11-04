import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoggedIn: false,
  userInfo: null,
  users: [],
  totalPage: "",
  roleIds: [],
  errCode: [],
  errMessage: [],
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      //   console.log("check action:::::::::", action);
      return {
        ...state,
        isLoggedIn: true,
        userInfo: action.userInfo,
      };

    case actionTypes.LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        userInfo: null,
      };
    case actionTypes.PROCESS_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        userInfo: null,
      };
    case actionTypes.FETCH_ALL_USER_SUCCESS:
      //console.log("check action:::::::::", action);
      state.users = action.data1;
      state.totalPage = action.data2;
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_USER_FAIL:
      state.users = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_SUCCESS:
      state.roleIds = action.data;
      return {
        ...state,
      };

    case actionTypes.FETCH_ROLE_FAIL:
      state.roleIds = [];
      return {
        ...state,
      };
    case actionTypes.REGISTER_SUCCESS:
      state.errCode = action.data2;
      state.errMessage = action.data1;
      return {
        ...state,
      };

    case actionTypes.REGISTER_FAIL:
      state.errCode = [];
      state.errMessage = [];
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default userReducer;
