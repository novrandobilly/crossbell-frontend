import * as actionTypes from './actions';

const createFeedbackSuccess = (payload) => {
  return {
    type: actionTypes.CREATEFEEDBACKSUCCESS,
    payload: payload,
  };
};
const createFeedbackFail = () => {
  return {
    type: actionTypes.CREATEFEEDBACKFAIL,
  };
};
const createFeedbackStart = () => {
  return {
    type: actionTypes.CREATEFEEDBACKSTART,
  };
};

const getFeedbackSuccess = (payload) => {
  return {
    type: actionTypes.GETFEEDBACKSUCCESS,
    payload: payload,
  };
};
const getFeedbackFail = () => {
  return {
    type: actionTypes.GETFEEDBACKFAIL,
  };
};
const getFeedbackStart = () => {
  return {
    type: actionTypes.GETFEEDBACKSTART,
  };
};

const deleteFeedbackSuccess = (payload) => {
  return {
    type: actionTypes.DELETEFEEDBACK,
    payload: payload,
  };
};
const deleteFeedbackFail = () => {
  return {
    type: actionTypes.DELETEFEEDBACKFAIL,
  };
};
const deleteFeedbackStart = () => {
  return {
    type: actionTypes.DELETEFEEDBACKSTART,
  };
};

export const createFeed = (feedData) => {
  return async (dispatch) => {
    dispatch(createFeedbackStart());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/feedback`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: feedData.name,
            email: feedData.email,
            phone: feedData.phone,
            feed: feedData.feed,
          }),
        }
      );
      const responseJSON = await response.json();
      console.log(responseJSON);
      dispatch(createFeedbackSuccess(responseJSON));
      return responseJSON;
    } catch (err) {
      dispatch(createFeedbackFail());
    }
  };
};

export const getFeedback = (payload) => {
  return async (dispatch) => {
    dispatch(getFeedbackStart());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/feedback`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${payload}`,
          },
          body: null,
        }
      );
      const responseJSON = await response.json();

      dispatch(getFeedbackSuccess(responseJSON));
      return responseJSON;
    } catch (err) {
      dispatch(getFeedbackFail());
    }
  };
};

export const deleteFeed = (feedData) => {
  return async (dispatch) => {
    dispatch(deleteFeedbackStart());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/alphaomega/feedback`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            feedId: feedData,
          }),
        }
      );
      const responseJSON = await response.json();
      console.log(responseJSON);
      dispatch(deleteFeedbackSuccess(responseJSON));
      return responseJSON;
    } catch (err) {
      dispatch(deleteFeedbackFail());
    }
  };
};
