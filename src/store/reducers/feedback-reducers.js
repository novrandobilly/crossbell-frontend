import * as actionTypes from '../actions/actions';

const initJobState = {
  // feedback: [
  //   {
  //     feedId: "AAA001",
  //     userId: "AAA",
  //     feed:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //     createdAt: "12/12/2020",
  //     datePosted: "5 days ago",
  //   },
  //   {
  //     feedId: "BBB001",
  //     userId: "BBB",
  //     feed:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //     createdAt: "12/12/2020",
  //     datePosted: "15 days ago",
  //   },
  //   {
  //     feedId: "CCC001",
  //     userId: "CCC",
  //     feed:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //     createdAt: "12/12/2020",
  //     datePosted: "25 days ago",
  //   },
  //   {
  //     feedId: "AAA002",
  //     userId: "AAA",
  //     feed:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //     createdAt: "12/12/2020",
  //     datePosted: "5 days ago",
  //   },
  //   {
  //     feedId: "BBB002",
  //     userId: "BBB",
  //     feed:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //     createdAt: "12/12/2020",
  //     datePosted: "15 days ago",
  //   },
  //   {
  //     feedId: "CCC003",
  //     userId: "CCC",
  //     feed:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //     createdAt: "12/12/2020",
  //     datePosted: "25 days ago",
  //   },
  // ],
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

    // case actionTypes.CREATEFEEDBACKSUCCESS: {
    //   return {
    //     ...state,
    //     feedback: state.feedback.concat(action.payload),
    //   };
    // }

    // case actionTypes.DELETEFEEDBACK: {
    //   let feedArray = [...state.feedback];

    //   feedArray = feedArray.filter((feeds) => feeds.feedId !== action.payload);
    //   return {
    //     ...state,
    //     feedback: feedArray,
    //   };
    // }

    default:
      return state;
  }
};

export default feedbackReducers;
