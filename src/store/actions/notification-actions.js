import * as actionTypes from './actions';

const fetchNotificationSuccess = (payload) => {
  return {
    type: actionTypes.FETCHNOTIFICATIONSUCCESS,
    payload: payload,
  };
};
const fetchNotificationFail = () => {
  return {
    type: actionTypes.FETCHNOTIFICATIONFAIL,
  };
};
const fetchNotificationStart = () => {
  return {
    type: actionTypes.FETCHNOTIFICATIONSTART,
  };
};
const adminNotificationUpdate = (payload) => {
  return {
    type: actionTypes.ADMINNOTIFICATIONUPDATE,
    payload: payload,
  };
};

export const notificationUpdate = (payload) => {
  return async (dispatch) => {
    dispatch(fetchNotificationStart());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/alphaomega/${payload.userId}/profile`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${payload.token}`,
          },
          body: JSON.stringify({
            notificationId: payload.notificationId,
          }),
        }
      );
      const responseJSON = await response.json();
      if (!response.ok) {
        throw new Error(responseJSON.message);
      }
      dispatch(fetchNotificationSuccess());
      const newNotif = responseJSON.foundAdmin.notifications.filter((notif) => {
        return notif.isOpened === false;
      });
      dispatch(adminNotificationUpdate(newNotif));
      return responseJSON.foundAdmin;
    } catch (err) {
      console.log(err, typeof err);
      dispatch(fetchNotificationFail());
      return err;
    }
  };
};
