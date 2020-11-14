import * as actionTypes from "../actions/actions";

const initialState = {
  isLoggedIn: false,
  isCompany: false,
  isAdmin: false,
};

const authReducers = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTHLOGIN: {
      return {
        ...state,
        isLoggedIn: true,
        isCompany: false,
      };
    }
    case actionTypes.AUTHLOGOUT: {
      return {
        ...state,
        isLoggedIn: false,
        isCompany: false,
        isAdmin: false,
      };
    }
    case actionTypes.AUTHCOMPANY: {
      return {
        ...state,
        isCompany: true,
      };
    }
    case actionTypes.AUTHADMIN: {
      return {
        ...state,
        isLogin: true,
        isAdmin: true,
      };
    }
    default: {
      return state;
    }
  }
};

export default authReducers;
