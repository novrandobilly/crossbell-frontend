import * as actionTypes from './actions';

const adminStart = () => {
  return {
    type: actionTypes.AUTHADMINSTART,
  };
};

const adminFinish = (payload) => {
  return {
    type: actionTypes.AUTHADMINFINISH,
    payload,
  };
};

const adminFail = () => {
  return {
    type: actionTypes.AUTHADMINFAIL,
  };
};

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

const fetchCompanyStart = () => {
  return {
    type: actionTypes.FETCHCOMPANYSTART,
  };
};
const fetchCompanySuccess = () => {
  return {
    type: actionTypes.FETCHCOMPANYSUCCESS,
  };
};
const fetchCompanyFail = () => {
  return {
    type: actionTypes.FETCHCOMPANYFAIL,
  };
};

const getAdminStart = () => {
  return {
    type: actionTypes.GETADMINSTART,
  };
};
const getAdminSuccess = () => {
  return {
    type: actionTypes.GETADMIN,
  };
};
const getAdminFail = () => {
  return {
    type: actionTypes.GETADMINFAIL,
  };
};

const updateAdminSuccess = (payload) => {
  return {
    type: actionTypes.UPDATEADMINSUCCESS,
    payload: payload,
  };
};
const updateAdminFail = () => {
  return {
    type: actionTypes.UPDATEADMINFAIL,
  };
};
const updateAdminStart = () => {
  return {
    type: actionTypes.UPDATEADMINSTART,
  };
};

export const admReg = (payload) => {
  return async (dispatch) => {
    dispatch(adminStart());
    const newAdminData = {
      NIK: payload.NIK,
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      password: payload.password,
      gender: payload.gender,
      dateOfBirth: payload.dateOfBirth,
      address: payload.address,
      phoneNumber: payload.phoneNumber,
      role: payload.role,
      verificationKey: payload.verificationKey,
    };
    console.log(newAdminData);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/alphaomega/admreg`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newAdminData),
        }
      );
      const responseJSON = await res.json();
      console.log(responseJSON);
      if (!res.ok) {
        throw new Error('Admin sign up failed');
      }
      dispatch(adminFinish(responseJSON));
      return responseJSON;
    } catch (err) {
      dispatch(adminFail());
      return err;
    }
  };
};

export const admSignIn = (loginData) => {
  return async (dispatch) => {
    dispatch(adminStart());
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/alphaomega/admsign`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: loginData.email,
            password: loginData.password,
          }),
        }
      );
      const resJSON = await res.json();
      if (!resJSON.token) {
        throw new Error(resJSON.message);
      }

      dispatch(
        adminFinish({
          token: resJSON.token,
          userId: resJSON.userId,
          isAdmin: resJSON.isAdmin,
        })
      );
      return resJSON;
    } catch (err) {
      console.log(err);
      dispatch(adminFail());
      return err;
    }
  };
};

export const getAllApplicant = (payload) => {
  return async (dispatch) => {
    dispatch(getAllApplicantStart());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/alphaomega/applicants`,
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

      dispatch(getAllApplicantSuccess(responseJSON));
      return responseJSON;
    } catch (err) {
      dispatch(getAllApplicantFail);
      return err;
    }
  };
};

export const getWholeCompanies = (payload) => {
  return async (dispatch) => {
    dispatch(fetchCompanyStart());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/alphaomega/companies`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${payload.token}`,
          },
        }
      );
      const responseJSON = await response.json();
      if (!response.ok) {
        throw new Error(responseJSON.message);
      }

      dispatch(fetchCompanySuccess());
      return responseJSON;
    } catch (err) {
      dispatch(fetchCompanyFail());
      return err;
    }
  };
};

export const getAllJob = (payload) => {
  return async (dispatch) => {
    dispatch(getAllJobStart());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/jobs`,
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
      dispatch(getAllJobSuccess(responseJSON));
      return responseJSON;
    } catch (err) {
      dispatch(getAllJobFail);
    }
  };
};

//=======================================================================

export const activateCompany = (payload) => {
  return async (dispatch) => {
    dispatch(fetchCompanyStart());
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/alphaomega/${payload.companyId}/activate`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${payload.token}`,
          },
        }
      );
      const resJSON = await res.json();
      if (!res.ok) {
        throw new Error(resJSON.message);
      }
      dispatch(fetchCompanySuccess());
      return resJSON;
    } catch (err) {
      console.log(err);
      dispatch(fetchCompanyFail());
      return err;
    }
  };
};

export const blockCompany = (payload) => {
  return async (dispatch) => {
    dispatch(fetchCompanyStart());
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/alphaomega/${payload.companyId}/block`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${payload.token}`,
          },
        }
      );
      const resJSON = await res.json();
      if (!res.ok) {
        throw new Error(resJSON.message);
      }
      dispatch(fetchCompanySuccess());
      return resJSON;
    } catch (err) {
      console.log(err);
      dispatch(fetchCompanyFail());
      return err;
    }
  };
};

export const sentApplicantBC = (InputBC) => {
  return async (dispatch) => {
    // dispatch(getAdminStart());
    console.log(InputBC);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/alphaomega/order/bc/applicant`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${InputBC.token}`,
          },
          body: JSON.stringify({
            orderId: InputBC.orderId,
            applicantId: InputBC.applicantId,
          }),
        }
      );
      const responseJSON = await response.json();
      console.log(responseJSON);
      dispatch(getAdminSuccess(responseJSON));
      return responseJSON;
    } catch (err) {
      dispatch(getAdminFail());
    }
  };
};

export const updateAdminIntro = (payload) => {
  return async (dispatch) => {
    dispatch(updateAdminStart());
    console.log('from action', payload);
    try {
      const formData = new FormData();
      formData.append('picture', payload.picture);
      formData.append('role', payload.role);
      formData.append('email', payload.email);
      formData.append('address', payload.address);
      formData.append('phoneNumber', payload.phoneNumber);

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/alphaomega/${payload.userId}/profile`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${payload.token}`,
          },
          body: formData,
        }
      );
      const responseJSON = await response.json();
      console.log(response, responseJSON);
      if (!response.ok) {
        throw new Error(responseJSON.message);
      }
      dispatch(updateAdminSuccess(responseJSON.foundAdmin));
      return responseJSON.foundAdmin;
    } catch (err) {
      console.log(err, typeof err);
      dispatch(updateAdminFail());
      return err;
    }
  };
};

export const getAdmin = (payload) => {
  return async (dispatch) => {
    dispatch(getAdminStart());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/alphaomega/${payload.userId}/profile`,
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
      dispatch(getAdminSuccess(responseJSON));
      return responseJSON;
    } catch (err) {
      dispatch(getAdminFail());
    }
  };
};

export const updatePromo = (payload) => {
  return async (dispatch) => {
    dispatch(getAdminStart());
    console.log(payload);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/alphaomega/order/promo`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${payload.token}`,
          },
          body: JSON.stringify({
            promoReg: payload.promoReg,
            promoBC: payload.promoBC,
          }),
        }
      );
      const responseJSON = await response.json();
      console.log(responseJSON);
      dispatch(getAdminSuccess(responseJSON));
      return responseJSON;
    } catch (err) {
      dispatch(getAdminFail());
    }
  };
};

export const getPromo = (payload) => {
  return async (dispatch) => {
    dispatch(getAdminStart());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/alphaomega/order/promo`,
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
      console.log(responseJSON);
      dispatch(getAdminSuccess(responseJSON));
      return responseJSON;
    } catch (err) {
      dispatch(getAdminFail());
    }
  };
};
