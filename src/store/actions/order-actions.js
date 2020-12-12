import * as actionTypes from "./actions";

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

const cancelOrderSuccess = () => {
  return {
    type: actionTypes.CANCELORDER,
  };
};
const cancelOrderFail = () => {
  return {
    type: actionTypes.CANCELORDERFAIL,
  };
};
const cancelOrderStart = () => {
  return {
    type: actionTypes.CANCELORDERSTART,
  };
};

export const createOrder = (orderData) => {
  return async (dispatch) => {
    dispatch(createOrderStart());
    try {
      const response = await fetch(
        `http://localhost:5000/api/alphaomega/order/reg`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${orderData.token}`,
          },
          body: JSON.stringify({
            invoiceId: orderData.invoiceId,
            companyId: orderData.companyId,
            packageName: orderData.packageName,
            slot: orderData.slot,
          }),
        }
      );
      const responseJSON = await response.json();
      console.log(responseJSON);
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
        `http://localhost:5000/api/alphaomega/${payload.userId}/order/reg`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${payload.token}`,
          },
          body: null,
        }
      );
      const responseJSON = await response.json();

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
        `http://localhost:5000/api/alphaomega/order/${payload.orderId}/invoice`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${payload.token}`,
          },
        }
      );
      const responseJSON = await response.json();

      dispatch(getOrderInvoiceSuccess(responseJSON));
      return responseJSON;
    } catch (err) {
      dispatch(getOrderInvoiceFail());
      return err;
    }
  };
};

export const getOrderReguler = (payload) => {
  return async (dispatch) => {
    dispatch(getOrderRegulerStart());
    try {
      const response = await fetch(
        `http://localhost:5000/api/alphaomega/order/reguler`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${payload.token}`,
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

export const approveOrder = (orderData) => {
  return async (dispatch) => {
    dispatch(approveOrderStart());
    try {
      const response = await fetch(
        `http://localhost:5000/api/alphaomega/approve/reg`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${orderData.token}`,
          },
          body: JSON.stringify({
            orderId: orderData.orderId,
            companyId: orderData.companyId,
          }),
        }
      );
      const responseJSON = await response.json();
      console.log(responseJSON);
      dispatch(approveOrderSuccess(responseJSON));
      return responseJSON;
    } catch (err) {
      dispatch(approveOrderFail());
    }
  };
};

//================== ORDER EXECUTIVE SEARCH ============================

export const getWholeOrderES = (payload) => {
  return async (dispatch) => {
    dispatch(getOrderStart());
    try {
      const res = await fetch("http://localhost:5000/api/alphaomega/order/es", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${payload.token}`,
        },
      });
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

export const getOneOrderES = (payload) => {
  return async (dispatch) => {
    dispatch(getOrderStart());
    try {
      const res = await fetch(
        `http://localhost:5000/api/alphaomega/order/es/${payload.orderId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
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
      const res = await fetch("http://localhost:5000/api/alphaomega/order/es", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${payload.token}`,
        },
        body: JSON.stringify({
          companyId: payload.companyId,
          positionLevel: payload.positionLevel,
          mainTask: payload.mainTask,
          responsibility: payload.responsibility,
          authority: payload.authority,
          salaryRange: payload.salaryRange,
          experience: payload.experience,
          expertise: payload.expertise,
          specification: payload.specification,
        }),
      });
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
    dispatch(getOrderStart());
    console.log(payload);
    try {
      const res = await fetch(
        "http://localhost:5000/api/alphaomega/order/es/addcandidate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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
      dispatch(getOrderSuccess());
      return resJSON;
    } catch (err) {
      dispatch(getOrderFail());
      return err;
    }
  };
};

export const updateCandidateStatusES = (payload) => {
  return async (dispatch) => {
    dispatch(getOrderStart());
    console.log(payload);
    try {
      const res = await fetch(
        "http://localhost:5000/api/alphaomega/order/es/updatecandidate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${payload.token}`,
          },
          body: JSON.stringify({
            orderId: payload.orderId,
            candidateId: payload.candidateId,
            status: payload.status,
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

export const updateOrderStatusES = (payload) => {
  return async (dispatch) => {
    dispatch(getOrderStart());
    console.log(payload);
    try {
      const res = await fetch(
        "http://localhost:5000/api/alphaomega/order/es/updateorder",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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
      dispatch(getOrderSuccess());
      return resJSON;
    } catch (err) {
      dispatch(getOrderFail());
      return err;
    }
  };
};

export const cancelOrder = (orderData) => {
  return async (dispatch) => {
    dispatch(cancelOrderStart());
    try {
      const response = await fetch(
        `http://localhost:5000/api/alphaomega/cancel/reg`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${orderData.token}`,
          },
          body: JSON.stringify({
            orderId: orderData.orderId,
            companyId: orderData.companyId,
          }),
        }
      );
      const responseJSON = await response.json();
      console.log(responseJSON);
      dispatch(cancelOrderSuccess(responseJSON));
      return responseJSON;
    } catch (err) {
      dispatch(cancelOrderFail());
    }
  };
};

export const createOrderCandidate = (orderData) => {
  return async (dispatch) => {
    dispatch(createOrderCandidateStart());
    try {
      const response = await fetch(
        `http://localhost:5000/api/alphaomega/order/bc`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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
          }),
        }
      );
      const responseJSON = await response.json();
      console.log(responseJSON);
      dispatch(createOrderCandidateSuccess(responseJSON));
      return responseJSON;
    } catch (err) {
      dispatch(createOrderCandidateFail());
    }
  };
};

export const getOrderCandidate = (payload) => {
  return async (dispatch) => {
    dispatch(getOrderCandidateStart());
    console.log(payload);
    try {
      const response = await fetch(
        `http://localhost:5000/api/alphaomega/order/bc`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
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
        `http://localhost:5000/api/alphaomega/${payload.userId}/order/bc`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${payload.token}`,
          },
          body: null,
        }
      );
      const responseJSON = await response.json();

      dispatch(getOrderSuccess(responseJSON));
      return responseJSON;
    } catch (err) {
      dispatch(getOrderFail());
    }
  };
};
