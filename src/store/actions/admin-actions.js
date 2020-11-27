import * as actionTypes from "./actions";

const getAllApplicantSuccess = (payload) => {
  return {
    type: actionTypes.GETALLAPPLICANT,
    payload: payload,
  };
};
const getAllApplicantFail = () => {
  return {
    type: actionTypes.GETALLAPPLICANTFAIL,
  };
};
const getAllApplicantStart = () => {
  return {
    type: actionTypes.GETALLAPPLICANTSTART,
  };
};

const getAllCompanySuccess = (payload) => {
  return {
    type: actionTypes.GETALLCOMPANY,
    payload: payload,
  };
};
const getAllCompanyFail = () => {
  return {
    type: actionTypes.GETALLCOMPANYFAIL,
  };
};
const getAllCompanyStart = () => {
  return {
    type: actionTypes.GETALLCOMPANYSTART,
  };
};

const getAllJobSuccess = (payload) => {
  return {
    type: actionTypes.GETALLJOB,
    payload: payload,
  };
};
const getAllJobFail = () => {
  return {
    type: actionTypes.GETALLJOBFAIL,
  };
};
const getAllJobStart = () => {
  return {
    type: actionTypes.GETALLJOBSTART,
  };
};

export const getAllApplicant = () => {
  return async (dispatch) => {
    dispatch(getAllApplicantStart());
    try {
      const response = await fetch(
        `http://localhost:5000/api/alphaomega/applicants`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: null,
        }
      );
      const responseJSON = await response.json();

      dispatch(getAllApplicantSuccess(responseJSON));
      return responseJSON;
    } catch (err) {
      dispatch(getAllApplicantFail);
    }
  };
};

export const getAllCompany = () => {
  return async (dispatch) => {
    dispatch(getAllCompanyStart());
    try {
      const response = await fetch(
        `http://localhost:5000/api/alphaomega/companies`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: null,
        }
      );
      const responseJSON = await response.json();

      dispatch(getAllCompanySuccess(responseJSON));
      return responseJSON;
    } catch (err) {
      dispatch(getAllCompanyFail);
    }
  };
};

export const getAllJob = () => {
  return async (dispatch) => {
    dispatch(getAllJobStart());
    try {
      const response = await fetch(
        `http://localhost:5000/api/alphaomega/jobs`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: null,
        }
      );
      const responseJSON = await response.json();

      dispatch(getAllJobSuccess(responseJSON));
      return responseJSON;
    } catch (err) {
      dispatch(getAllJobFail);
    }
  };
};
