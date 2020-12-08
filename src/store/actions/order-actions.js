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
            // Authorization: `Bearer ${payload.token}`,
          },
          body: null,
        }
      );
      const responseJSON = await response.json();

      dispatch(getOrderRegulerSuccess(responseJSON));
      return responseJSON;
    } catch (err) {
      dispatch(getOrderRegulerFail());
      console.log(err);
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
