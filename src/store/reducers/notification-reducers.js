import * as actionTypes from '../actions/actions';

const initialState = {
  isLoading: false,
  error: false,
  adminNotification: 0,
  applicantNotification: 0,
  companyNotification: 0,
  notification: [],
};

const notificationReducers = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCHNOTIFICATIONSTART: {
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    }

    case actionTypes.FETCHNOTIFICATIONSUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: false,
      };
    }

    case actionTypes.FETCHNOTIFICATIONFAIL: {
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    }

    case actionTypes.ADMINNOTIFICATIONUPDATE: {
      return {
        ...state,
        adminNotification: action.payload.length,
        applicantNotification: 0,
        companyNotification: 0,
        notification: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default notificationReducers;
