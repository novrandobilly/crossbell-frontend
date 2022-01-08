import * as actionTypes from './actions';

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

export const getOneCompany = (payload) => {
  return async (dispatch) => {
    dispatch(getCompanyStart());
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/co/${payload.userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${payload.token}`,
        },
        body: null,
      });
      const responseJSON = await response.json();

      dispatch(getCompanySuccess(responseJSON));
      return responseJSON;
    } catch (err) {
      dispatch(getCompanyFail());
    }
  };
};

export const createCompany = (companyData) => {
  return async (dispatch) => {
    dispatch(createCompanyStart());
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/signup`, {
        // const response = await fetch(`https://crossbell-corps.herokuapp.com/api/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: companyData.companyName,
          email: companyData.email,
          password: companyData.password,
          NPWP: companyData.NPWP,
          isCompany: true,
        }),
      });
      const responseJSON = await response.json();
      // console.log(responseJSON);
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

export const updateCompanyLogo = (payload) => {
  return async (dispatch) => {
    dispatch(updateCompanyStart());
    try {
      const formData = new FormData();
      formData.append('logo', payload.logo);
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/co/${payload.companyId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
        body: formData,
      });
      const responseJSON = await response.json();
      if (!response.ok) {
        throw new Error(responseJSON.message);
      }

      dispatch(updateCompanySuccess(responseJSON.foundCompany));
      return responseJSON.foundCompany;
    } catch (err) {
      console.log(err, typeof err);
      dispatch(updateCompanyFail());
      return err;
    }
  };
};
export const updateCompanyIntro = (CompanyData) => {
  return async (dispatch) => {
    dispatch(updateCompanyStart());
    // console.log('from action', CompanyData);
    try {
      const formData = new FormData();
      formData.append('logo', CompanyData.logo);
      formData.append('companyName', CompanyData.companyName);
      formData.append('email', CompanyData.email);
      formData.append('address', CompanyData.address);
      formData.append('password', CompanyData.password);
      formData.append('industry', CompanyData.industry);
      formData.append('NPWP', CompanyData.NPWP);
      formData.append('website', CompanyData.website);

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/co/${CompanyData.companyId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${CompanyData.token}`,
        },
        body: formData,
      });
      const responseJSON = await response.json();
      // console.log(response, responseJSON);
      if (!response.ok) {
        throw new Error(responseJSON.message);
      }

      dispatch(updateCompanySuccess(responseJSON.foundCompany));
      return responseJSON.foundCompany;
    } catch (err) {
      console.log(err, typeof err);
      dispatch(updateCompanyFail());
      return err;
    }
  };
};

export const updateCompanyBriefDescriptions = (CompanyData) => {
  return async (dispatch) => {
    dispatch(updateCompanyStart());
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/co/${CompanyData.companyId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${CompanyData.token}`,
        },
        body: JSON.stringify({
          briefDescriptions: CompanyData.briefDescriptions,
        }),
      });
      const responseJSON = await response.json();
      // console.log(response, responseJSON);
      if (!response.ok) {
        throw new Error(responseJSON.message);
      }

      dispatch(updateCompanySuccess(responseJSON.foundCompany));
      return responseJSON.foundCompany;
    } catch (err) {
      console.log(err, typeof err);
      dispatch(updateCompanyFail());
      return err;
    }
  };
};

export const updateCompanyPIC = (CompanyData) => {
  return async (dispatch) => {
    dispatch(updateCompanyStart());
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/co/${CompanyData.companyId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${CompanyData.token}`,
        },
        body: JSON.stringify({
          id: CompanyData.companyId,
          picName: CompanyData.picName,
          picJobTitle: CompanyData.picJobTitle,
          picEmail: CompanyData.picEmail,
          picPhone: CompanyData.picPhone,
          picOfficePhone: CompanyData.picOfficePhone,
        }),
      });
      const responseJSON = await response.json();
      if (!response.ok) {
        throw new Error(responseJSON.message);
      }
      dispatch(updateCompanySuccess(responseJSON.foundCompany));
      return responseJSON.foundCompany;
    } catch (err) {
      dispatch(updateCompanyFail());
    }
  };
};

export const getCompanyNotifications = (payload) => {
  return async (dispatch) => {
    dispatch(getCompanyStart());
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
      dispatch(getCompanySuccess());
      return responseJSON;
    } catch (err) {
      dispatch(getCompanyFail());
      return err;
    }
  };
};

export const readNotificationCOM = (payload) => {
  return async (dispatch) => {
    dispatch(getCompanyStart());
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/co/notifications/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${payload.token}`,
        },
        body: JSON.stringify({
          notificationId: payload.notificationId,
          userId: payload.companyId,
        }),
      });
      const responseJSON = await response.json();
      if (!response.ok) {
        throw new Error(responseJSON.message);
      }
      dispatch(getCompanySuccess());
      return responseJSON;
    } catch (err) {
      dispatch(getCompanyFail());
      return err;
    }
  };
};
