import * as actionTypes from "./actions";

const createCompanySuccess = (payload) => {
  return {
    type: actionTypes.CREATECOMPANY,
    payload: payload,
  };
};
const createCompanyFail = () => {
  return {
    type: actionTypes.CREATECOMPANYFAIL,
  };
};
const createCompanyStart = () => {
  return {
    type: actionTypes.CREATECOMPANYSTART,
  };
};

const getCompanySuccess = (payload) => {
  return {
    type: actionTypes.GETCOMPANY,
    payload: payload,
  };
};
const getCompanyFail = () => {
  return {
    type: actionTypes.GETCOMPANYFAIL,
  };
};
const getCompanyStart = () => {
  return {
    type: actionTypes.GETCOMPANYSTART,
  };
};

const updateCompanySuccess = (payload) => {
  return {
    type: actionTypes.UPDATECOMPANY,
    payload: payload,
  };
};
const updateCompanyFail = () => {
  return {
    type: actionTypes.UPDATECOMPANYFAIL,
  };
};
const updateCompanyStart = () => {
  return {
    type: actionTypes.UPDATECOMPANYSTART,
  };
};

export const createCompany = (companyData) => {
  return async (dispatch) => {
    dispatch(createCompanyStart());
    try {
      const response = await fetch(`http://localhost:5000/api/users/signup`, {
        // const response = await fetch(`https://crossbell-corps.herokuapp.com/api/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyName: companyData.companyName,
          email: companyData.email,
          password: companyData.password,
          isCompany: true,
        }),
      });
      const responseJSON = await response.json();
      console.log(responseJSON);
      if (!response.ok) {
        throw new Error(responseJSON.message);
      }
      dispatch(createCompanySuccess(responseJSON));
      return responseJSON;
    } catch (err) {
      dispatch(createCompanyFail());
      return err;
    }
  };
};

export const getOneCompany = (payload) => {
  return async (dispatch) => {
    dispatch(getCompanyStart());
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/co/${payload.userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: null,
        }
      );
      const responseJSON = await response.json();

      dispatch(getCompanySuccess(responseJSON));
      return responseJSON;
    } catch (err) {
      dispatch(getCompanyFail);
    }
  };
};

export const updateCompanyIntro = (CompanyData) => {
  return async (dispatch) => {
    dispatch(updateCompanyStart());
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/co/${CompanyData.companyId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: CompanyData.companyId,
            dateOfBirth: CompanyData.dateOfBirth,
            logo: CompanyData.logo,
            companyName: CompanyData.companyName,
            email: CompanyData.email,
            password: CompanyData.password,
            size: CompanyData.size,
            industry: CompanyData.industry,
            address: CompanyData.address,
            website: CompanyData.website,
            emailRecipient: CompanyData.emailRecipient,
            details: CompanyData.details,
            mission: CompanyData.mission,
          }),
        }
      );
      const responseJSON = await response.json();

      dispatch(updateCompanySuccess(responseJSON.foundCompany));
      return responseJSON.foundCompany;
    } catch (err) {
      dispatch(updateCompanyFail);
    }
  };
};

export const updateCompanyDetail = (CompanyData) => {
  return async (dispatch) => {
    dispatch(updateCompanyStart());
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/co/${CompanyData.companyId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: CompanyData.companyId,
            details: CompanyData.details,
          }),
        }
      );
      const responseJSON = await response.json();

      dispatch(updateCompanySuccess(responseJSON.foundCompany));
      return responseJSON.foundCompany;
    } catch (err) {
      dispatch(updateCompanyFail);
    }
  };
};

export const updateCompanyMission = (CompanyData) => {
  return async (dispatch) => {
    dispatch(updateCompanyStart());
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/co/${CompanyData.companyId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: CompanyData.companyId,
            mission: CompanyData.mission,
          }),
        }
      );
      const responseJSON = await response.json();

      dispatch(updateCompanySuccess(responseJSON.foundCompany));
      return responseJSON.foundCompany;
    } catch (err) {
      dispatch(updateCompanyFail);
    }
  };
};

//=======================================================================

const loginSuccess = () => {
  return {
    type: actionTypes.AUTHLOGIN,
  };
};

export const login = (loginData) => {
  return async (dispatch) => {
    //login
    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password,
        }),
      });

      const resJSON = await res.json();

      dispatch(loginSuccess);
      return resJSON;
    } catch (err) {
      console.log(err);
    }

    //login success
    //login fail
  };
};

//=======================================================================
