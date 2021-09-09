import * as actionTypes from '../actions/actions';
const initJobState = {
  isLoading: false,
  error: false,
  indexIsLoading: false,
};

const financeReducers = (state = initJobState, action) => {
  switch (action.type) {
    case actionTypes.APPROVEORDER:
    case actionTypes.GETORDERINVOICE:
    case actionTypes.GETORDERCANDIDATE:
    case actionTypes.CREATEORDERCANDIDATE:
    case actionTypes.GETORDER:
    case actionTypes.CREATEORDER:
    case actionTypes.ORDERRESET: {
      return {
        ...state,
        error: false,
        isLoading: false,
      };
    }
    case actionTypes.APPROVEORDERSTART:
    case actionTypes.GETORDERCANDIDATESTART:
    case actionTypes.CREATEORDERCANDIDATESTART:
    case actionTypes.GETORDERINVOICESTART:
    case actionTypes.GETORDERSTART:
    case actionTypes.CREATEORDERSTART: {
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    }
    case actionTypes.APPROVEORDERFAIL:
    case actionTypes.GETORDERCANDIDATEFAIL:
    case actionTypes.CREATEORDERCANDIDATEFAIL:
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
