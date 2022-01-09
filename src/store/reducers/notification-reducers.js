import * as actionTypes from '../actions/actions';

const initNotificationState = {
  notifications: [],
  isLoading: false,
  error: false,
};

const notificationReducers = (state = initNotificationState, action) => {
  switch (action.type) {
    case actionTypes.FETCHNOTIFICATIONSTART: {
      return {
        ...state,
        isLoading: true,
        error: false,
        success: false,
      };
    }

    case actionTypes.FETCHNOTIFICATIONSUCCESS: {
      return {
        ...state,
        notifications: [...action.notifications],
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

    default:
      return state;
  }
};

export default notificationReducers;
