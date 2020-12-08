import * as actionTypes from "../actions/actions";
const initJobState = {
  isLoading: false,
  error: false,
};

const financeReducers = (state = initJobState, action) => {
  switch (action.type) {
    case actionTypes.GETORDERINVOICE:
    case actionTypes.GETORDER:
    case actionTypes.CREATEORDER: {
      return {
        ...state,
        error: false,
        isLoading: false,
      };
    }

    case actionTypes.GETORDERINVOICESTART:
    case actionTypes.GETORDERSTART:
    case actionTypes.CREATEORDERSTART: {
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    }

    case actionTypes.GETORDERINVOICEFAIL:
    case actionTypes.GETORDERFAIL:
    case actionTypes.CREATEORDERFAIL: {
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    }

    default:
      return state;
  }
};

export default financeReducers;
