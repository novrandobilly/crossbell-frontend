import * as actionTypes from './actions';

const fetchNotificationStart = () => {
  return {
    type: actionTypes.FETCHNOTIFICATIONSTART,
  };
};
const fetchNotificationSuccess = ({ notifications }) => {
  return {
    type: actionTypes.FETCHNOTIFICATIONSUCCESS,
    notifications,
  };
};
const fetchNotificationFail = () => {
  return {
    type: actionTypes.FETCHNOTIFICATIONFAIL,
  };
};

export const getAdminNotifications = (payload) => {
  return async (dispatch) => {
    dispatch(fetchNotificationStart());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/alphaomega/${payload.adminId}/notifications`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${payload.token}`,
          },
          body: null,
        }
      );
      const responseJSON = await response.json();
      // console.log(responseJSON);
      if (!response.ok) {
        throw new Error(responseJSON.message);
      }
      dispatch(fetchNotificationSuccess({ notifications: [...responseJSON.notifications] }));
      return responseJSON;
    } catch (err) {
      dispatch(fetchNotificationFail());
      return err;
    }
  };
};

export const getCompanyNotifications = (payload) => {
  return async (dispatch) => {
    dispatch(fetchNotificationStart());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/co/${payload.companyId}/notifications`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${payload.token}`,
          },
          body: null,
        }
      );
      const responseJSON = await response.json();
      if (!response.ok) {
        throw new Error(responseJSON.message);
      }
      dispatch(fetchNotificationSuccess({ notifications: [...responseJSON.notifications] }));
      return responseJSON;
    } catch (err) {
      dispatch(fetchNotificationFail());
      return err;
    }
  };
};
