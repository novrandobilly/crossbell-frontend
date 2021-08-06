import * as actionTypes from '../actions/actions';

const initJobState = {
  isLoading: false,
  error: false,
  success: false,
};

const feedbackReducers = (state = initJobState, action) => {
  switch (action.type) {
    case actionTypes.GETFEEDBACKSUCCESS:
    case actionTypes.DELETEFEEDBACK:
    case actionTypes.FEEDBACKRESET: {
      return {
        ...state,
        isLoading: false,
        error: false,
        success: false,
      };
    }

    case actionTypes.CREATEFEEDBACKSTART:
    case actionTypes.GETFEEDBACKSTART:
    case actionTypes.DELETEFEEDBACKSTART: {
      return {
        ...state,
        isLoading: true,
        error: false,
        success: false,
      };
    }

    case actionTypes.CREATEFEEDBACKFAIL:
    case actionTypes.GETFEEDBACKFAIL:
    case actionTypes.DELETEFEEDBACKFAIL: {
      return {
        ...state,
        isLoading: false,
        error: true,
        success: false,
      };
    }

    case actionTypes.CREATEFEEDBACKSUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: false,
        success: true,
      };
    }

    default:
      return state;
  }
};

export default feedbackReducers;
