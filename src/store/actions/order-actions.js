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

const getOneOrderSuccess = (payload) => {
  return {
    type: actionTypes.GETORDER,
    payload: payload,
  };
};
const getOneOrderFail = () => {
  return {
    type: actionTypes.GETORDERFAIL,
  };
};
const getOneOrderStart = () => {
  return {
    type: actionTypes.GETORDERSTART,
  };
};

export const createOrder = (orderData) => {
  return async (dispatch) => {
    dispatch(createOrderStart());
    try {
      const response = await fetch(`http://localhost:5000/api/users/Order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          invoiceId: orderData.invoiceId,
          companyId: orderData.companyId,
          packageName: orderData.packageName,
          status: orderData.statu,
          createdAt: orderData.createdAt,
          approvetAt: orderData.approvetAt,
          dueDate: orderData.dueDate,
          slot: orderData.slot,
          packagePrice: orderData.packagePrice,
          amount: orderData.amount,
          totalPrice: orderData.packagePrice * orderData.amount,
        }),
      });
      const responseJSON = await response.json();
      console.log(responseJSON);
      dispatch(createOrderSuccess(responseJSON));
      return responseJSON;
    } catch (err) {
      dispatch(createOrderFail());
    }
  };
};

export const getOrder = () => {
  return async (dispatch) => {
    dispatch(getOrderStart());
    try {
      const response = await fetch(`http://localhost:5000/api/users/Order`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: null,
      });
      const responseJSON = await response.json();

      dispatch(getOrderSuccess(responseJSON));
      return responseJSON;
    } catch (err) {
      dispatch(getOrderFail());
    }
  };
};

export const getOneOrder = (orderId) => {
  return async (dispatch) => {
    dispatch(getOneOrderStart());
    try {
      const response = await fetch(
        `http://localhost:5000/api/alphaomega/feedback`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderId: orderId,
          }),
        }
      );
      const responseJSON = await response.json();
      console.log(responseJSON);
      dispatch(getOneOrderSuccess(responseJSON));
      return responseJSON;
    } catch (err) {
      dispatch(getOneOrderFail());
    }
  };
};
