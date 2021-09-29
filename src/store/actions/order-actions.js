import * as actionTypes from './actions';

const createOrderSuccess = (payload) => {
  return {
    type: actionTypes.CREATEORDER,
    payload: payload,
  };
};
const createOrderFail = () => {
  return {
    type: actionTypes.CREATEORDERFAIL,
  };
};
const createOrderStart = () => {
  return {
    type: actionTypes.CREATEORDERSTART,
  };
};

const createOrderCandidateSuccess = (payload) => {
  return {
    type: actionTypes.CREATEORDERCANDIDATE,
    payload: payload,
  };
};
const createOrderCandidateFail = () => {
  return {
    type: actionTypes.CREATEORDERCANDIDATEFAIL,
  };
};
const createOrderCandidateStart = () => {
  return {
    type: actionTypes.CREATEORDERCANDIDATESTART,
  };
};

const getOrderSuccess = () => {
  return {
    type: actionTypes.GETORDER,
  };
};
const getOrderFail = () => {
  return {
    type: actionTypes.GETORDERFAIL,
  };
};
const getOrderStart = () => {
  return {
    type: actionTypes.GETORDERSTART,
  };
};

const getOrderRegulerSuccess = () => {
  return {
    type: actionTypes.GETORDERREGULER,
  };
};
const getOrderRegulerFail = () => {
  return {
    type: actionTypes.GETORDERREGULERFAIL,
  };
};
const getOrderRegulerStart = () => {
  return {
    type: actionTypes.GETORDERREGULERSTART,
  };
};

const getOrderCandidateSuccess = () => {
  return {
    type: actionTypes.GETORDERCANDIDATE,
  };
};
const getOrderCandidateFail = () => {
  return {
    type: actionTypes.GETORDERCANDIDATEFAIL,
  };
};
const getOrderCandidateStart = () => {
  return {
    type: actionTypes.GETORDERCANDIDATESTART,
  };
};

const getOrderInvoiceSuccess = () => {
  return {
    type: actionTypes.GETORDERINVOICE,
  };
};
const getOrderInvoiceFail = () => {
  return {
    type: actionTypes.GETORDERINVOICEFAIL,
  };
};

const getOrderInvoiceStart = () => {
  return {
    type: actionTypes.GETORDERINVOICESTART,
  };
};

const approveOrderSuccess = () => {
  return {
    type: actionTypes.APPROVEORDER,
  };
};
const approveOrderFail = () => {
  return {
    type: actionTypes.APPROVEORDERFAIL,
  };
};

const approveOrderStart = () => {
  return {
    type: actionTypes.APPROVEORDERSTART,
  };
};

export const createOrder = (orderData) => {
  return async (dispatch) => {
    dispatch(createOrderStart());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/alphaomega/order/reg`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${orderData.token}`,
          },
          body: JSON.stringify({
            invoiceId: orderData.invoiceId,
            companyId: orderData.companyId,
            packageName: orderData.packageName,
            slot: orderData.slot,
            PPH: orderData.PPH,
          }),
        }
      );
      const responseJSON = await response.json();
      if (!response.ok) {
        throw new Error(responseJSON.message);
      }
      dispatch(createOrderSuccess(responseJSON));
      return responseJSON;
    } catch (err) {
      dispatch(createOrderFail());
    }
  };
};

export const getOrder = (payload) => {
  return async (dispatch) => {
    dispatch(getOrderStart());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/alphaomega/${payload.userId}/order/reg`,
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
      dispatch(getOrderSuccess(responseJSON));
      return responseJSON;
    } catch (err) {
      dispatch(getOrderFail());
    }
  };
};

export const getOrderInvoice = (payload) => {
  return async (dispatch) => {
    dispatch(getOrderInvoiceStart());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/alphaomega/order/${payload.orderId}/invoice`,
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
      dispatch(getOrderInvoiceSuccess(responseJSON));
      return responseJSON;
    } catch (err) {
      dispatch(getOrderInvoiceFail());
      return err;
    }
  };
};

export const getWholeOrderREG = (payload) => {
  return async (dispatch) => {
    dispatch(getOrderRegulerStart());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/alphaomega/order/reg`,
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

      if (!response.ok) {
        throw new Error(responseJSON.message);
      }

      dispatch(getOrderRegulerSuccess(responseJSON));
      return responseJSON;
    } catch (err) {
      dispatch(getOrderRegulerFail());
      console.log(err);
      return err;
    }
  };
};

export const approveOrderREG = (orderData) => {
  return async (dispatch) => {
    dispatch(approveOrderStart());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/alphaomega/approve/reg`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${orderData.token}`,
          },
          body: JSON.stringify({
            orderId: orderData.orderId,
            companyId: orderData.companyId,
          }),
        }
      );
      const responseJSON = await response.json();

      if (!response.ok) {
        throw new Error(responseJSON.message);
      }

      dispatch(approveOrderSuccess(responseJSON));
      return responseJSON;
    } catch (err) {
      dispatch(approveOrderFail());
    }
  };
};

export const updatePaymentREG = (payload) => {
  return async (dispatch) => {
    dispatch(approveOrderStart());
    try {
      const formData = new FormData();
      formData.append('paymentDate', payload.paymentDate);
      formData.append('paymentTime', payload.paymentTime);
      formData.append('orderRegId', payload.orderRegId);
      formData.append('nominal', payload.nominal);
      formData.append('payment-reguler', payload.paymentFile);

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/alphaomega/reg/payment/add`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${payload.token}`,
          },
          body: formData,
        }
      );
      const responseJSON = await response.json();
      if (!response.ok) {
        throw new Error(responseJSON.message);
      }
      dispatch(approveOrderSuccess(responseJSON));
      return responseJSON;
    } catch (err) {
      dispatch(approveOrderFail());
      return err;
    }
  };
};

//================== ORDER EXECUTIVE SEARCH ============================

export const getWholeOrderES = (payload) => {
  return async (dispatch) => {
    dispatch(getOrderStart());
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/alphaomega/order/es`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${payload}`,
          },
        }
      );
      const resJSON = await res.json();
      if (!res.ok) {
        throw new Error(resJSON.message);
      }
      dispatch(getOrderSuccess());
      return resJSON;
    } catch (err) {
      dispatch(getOrderFail());
      return err;
    }
  };
};

export const getCompanyES = (payload) => {
  return async (dispatch) => {
    dispatch(getOrderStart());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/alphaomega/${payload.userId}/order/es`,
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
      dispatch(getOrderSuccess(responseJSON));
      return responseJSON;
    } catch (err) {
      dispatch(getOrderFail());
    }
  };
};

export const getOneOrderES = (payload) => {
  return async (dispatch) => {
    dispatch(getOrderStart());
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/alphaomega/order/es/${payload.orderId}`,
        {
          method: 'GET',
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
      dispatch(getOrderSuccess());
      return resJSON;
    } catch (err) {
      dispatch(getOrderFail());
      return err;
    }
  };
};

export const createOrderES = (payload) => {
  return async (dispatch) => {
    dispatch(getOrderStart());
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/alphaomega/order/es`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${payload.token}`,
          },
          body: JSON.stringify({
            name: payload.name,
            email: payload.email,
            phone: payload.phone,
            companyName: payload.companyName,
            industry: payload.industry,
            candidateRequirement: payload.candidateRequirement,
            specialRequirement: payload.specialRequirement,
          }),
        }
      );
      console.log(res);
      const resJSON = await res.json();
      if (!res.ok) {
        throw new Error(resJSON.message);
      }
      dispatch(getOrderSuccess());
      return resJSON;
    } catch (err) {
      dispatch(getOrderFail());
      return err;
    }
  };
};

export const addCandidateES = (payload) => {
  return async (dispatch) => {
    dispatch(createOrderStart());
    console.log(payload);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/alphaomega/order/es/addcandidate`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${payload.token}`,
          },
          body: JSON.stringify({
            orderId: payload.orderId,
            candidateName: payload.candidateName,
            candidateEmail: payload.candidateEmail,
            candidateContact: payload.candidateContact,
          }),
        }
      );
      console.log(res);
      const resJSON = await res.json();
      if (!res.ok) {
        throw new Error(resJSON.message);
      }
      dispatch(createOrderSuccess());
      return resJSON;
    } catch (err) {
      dispatch(createOrderFail());
      return err;
    }
  };
};

export const updateCandidateStatusES = (payload) => {
  return async (dispatch) => {
    dispatch(approveOrderStart());
    console.log(payload);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/alphaomega/order/es/updatecandidate`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${payload.token}`,
          },
          body: JSON.stringify({
            index: payload.index,
            orderId: payload.orderId,
            candidateId: payload.candidateId,
            status: payload.status,
            note: payload.note,
          }),
        }
      );
      console.log(res);
      const resJSON = await res.json();
      if (!res.ok) {
        throw new Error(resJSON.message);
      }
      dispatch(approveOrderSuccess());
      return resJSON;
    } catch (err) {
      dispatch(approveOrderFail());
      return err;
    }
  };
};

export const updateOrderStatusES = (payload) => {
  return async (dispatch) => {
    dispatch(approveOrderStart());
    console.log(payload);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/alphaomega/order/es/updateorder`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${payload.token}`,
          },
          body: JSON.stringify({
            orderId: payload.orderId,
            status: payload.status,
          }),
        }
      );
      console.log(res);
      const resJSON = await res.json();
      if (!res.ok) {
        throw new Error(resJSON.message);
      }
      dispatch(approveOrderSuccess());
      return resJSON;
    } catch (err) {
      dispatch(approveOrderFail());
      return err;
    }
  };
};

//======================== Order Candidate ==================================

export const createOrderCandidate = (orderData) => {
  return async (dispatch) => {
    dispatch(createOrderCandidateStart());
    console.log(orderData);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/alphaomega/order/bc`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${orderData.token}`,
          },
          body: JSON.stringify({
            invoiceId: orderData.invoiceId,
            companyId: orderData.companyId,
            note: orderData.note,
            jobFunction: orderData.jobFunction,
            amount: orderData.amount,
            education: orderData.education,
            gender: orderData.gender,
            location: orderData.location,
            shift: orderData.shift,
            min: orderData.min,
            max: orderData.max,
            emailRecipient: orderData.emailRecipient,
            PPH: orderData.PPH,
          }),
        }
      );
      const responseJSON = await response.json();
      console.log(responseJSON);
      if (!response.ok) {
        throw new Error(responseJSON.message);
      }
      dispatch(createOrderCandidateSuccess(responseJSON));
      return responseJSON;
    } catch (err) {
      dispatch(createOrderCandidateFail());
    }
  };
};

export const getWholeOrderBC = (payload) => {
  return async (dispatch) => {
    dispatch(getOrderCandidateStart());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/alphaomega/order/bc`,
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
      if (!response.ok) {
        throw new Error(responseJSON.message);
      }
      dispatch(getOrderCandidateSuccess(responseJSON));
      return responseJSON;
    } catch (err) {
      dispatch(getOrderCandidateFail());
      console.log(err);
      return err;
    }
  };
};

export const getCompanyBC = (payload) => {
  return async (dispatch) => {
    dispatch(getOrderStart());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/alphaomega/${payload.userId}/order/bc`,
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
      dispatch(getOrderSuccess(responseJSON));
      return responseJSON;
    } catch (err) {
      dispatch(getOrderFail());
    }
  };
};

export const deleteCandidateES = (payload) => {
  return async (dispatch) => {
    dispatch(getOrderStart());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/alphaomega/order/es/deletecandidate`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${payload.token}`,
          },
          body: JSON.stringify({
            candidateESId: payload.candidateESId,
            orderId: payload.orderId,
          }),
        }
      );
      const responseJSON = await response.json();
      if (!response.ok) {
        throw new Error(responseJSON.message);
      }
      console.log(responseJSON);
      dispatch(getOrderSuccess(responseJSON));
      return responseJSON;
    } catch (err) {
      dispatch(getOrderFail());
    }
  };
};

export const approveOrderBC = (orderData) => {
  return async (dispatch) => {
    dispatch(approveOrderStart());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/alphaomega/approve/bc`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${orderData.token}`,
          },
          body: JSON.stringify({
            orderId: orderData.orderId,
            companyId: orderData.companyId,
          }),
        }
      );
      const responseJSON = await response.json();
      if (!response.ok) {
        throw new Error(responseJSON.message);
      }
      console.log(responseJSON);
      dispatch(approveOrderSuccess(responseJSON));
      return responseJSON;
    } catch (err) {
      dispatch(approveOrderFail());
    }
  };
};

export const updatePaymentBC = (payload) => {
  return async (dispatch) => {
    dispatch(approveOrderStart());
    try {
      const formData = new FormData();
      formData.append('paymentDate', payload.paymentDate);
      formData.append('paymentTime', payload.paymentTime);
      formData.append('orderBcId', payload.orderBcId);
      formData.append('nominal', payload.nominal);
      formData.append('payment-reguler', payload.paymentFile);

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/alphaomega/reg/payment/add`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${payload.token}`,
          },
          body: formData,
        }
      );
      const responseJSON = await response.json();
      if (!response.ok) {
        throw new Error(responseJSON.message);
      }
      dispatch(approveOrderSuccess(responseJSON));
      return responseJSON;
    } catch (err) {
      dispatch(approveOrderFail());
      return err;
    }
  };
};
