import * as actionTypes from '../actions/actions';

const initialState = {
  isLoading: false,
  error: false,
};

const applicantReducers = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DELETEITEMSTART:
    case actionTypes.GETAPPLICANTSTART:
    case actionTypes.CREATEAPPLICANTSTART:
    case actionTypes.UPDATEAPPLICANTSTART: {
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    }
    case actionTypes.DELETEITEM:
    case actionTypes.APPLICANTRESET:
    case actionTypes.GETAPPLICANT:
    case actionTypes.UPDATEAPPLICANT:
    case actionTypes.CREATEAPPLICANTSUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: false,
      };
    }

    case actionTypes.DELETEITEMFAIL:
    case actionTypes.UPDATEAPPLICANTFAIL:
    case actionTypes.GETAPPLICANTFAIL:
    case actionTypes.CREATEAPPLICANTFAIL: {
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

export default applicantReducers;
