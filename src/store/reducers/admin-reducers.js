import * as actionTypes from "../actions/actions";

const initialState = {
  isLoading: false,
  error: false,
  token: null,
  userId: null,
  isAdmin: false,
  isLoggedIn: false,
  tokenExpirationDate: null,
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTHADMINSTART: {
      return {
        ...state,
        isLoading: true,
        error: false,
        token: null,
        userId: null,
        isAdmin: false,
        isLoggedIn: false,
        tokenExpirationDate: null,
      };
    }
    case actionTypes.AUTHADMINFINISH: {
      const tokenExpirationDate =
        action.payload.expiration ||
        new Date(new Date().getTime() + 1000 * 60 * 60 * 3).toISOString();
      localStorage.setItem(
        "userData",
        JSON.stringify({
          userId: action.payload.userId,
          token: action.payload.token,
          isAdmin: action.payload.isAdmin,
          expiration: tokenExpirationDate,
        })
      );
      return {
        ...state,
        isLoading: false,
        error: false,
        token: action.payload.token,
        userId: action.payload.userId,
        isAdmin: action.payload.isAdmin,
        isLoggedIn: !!action.payload.token,
        tokenExpirationDate,
      };
    }
    case actionTypes.AUTHADMINFAIL: {
      return {
        ...state,
        isLoading: false,
        error: true,
        token: null,
        userId: null,
        isAdmin: false,
        isLoggedIn: false,
        tokenExpirationDate: null,
      };
    }
    case actionTypes.ADMINLOGOUT: {
      localStorage.removeItem("userData");
      return {
        ...state,
        isLoading: false,
        error: false,
        token: null,
        userId: null,
        isAdmin: false,
        isLoggedIn: false,
        tokenExpirationDate: null,
      };
    }
    case actionTypes.UPDATEADMINSTART:
    case actionTypes.GETADMINSTART: {
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    }
    case actionTypes.UPDATEADMINSUCCESS:
    case actionTypes.GETADMIN: {
      return {
        ...state,
        isLoading: false,
        error: false,
      };
    }
    case actionTypes.UPDATEADMINFAIL:
    case actionTypes.GETADMINFAIL: {
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    }

    default: {
      return state;
    }
  }
};

export default adminReducer;
