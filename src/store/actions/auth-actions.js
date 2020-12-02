import * as actionTypes from "./actions";

const loginStart = () => {
  return {
    type: actionTypes.AUTHLOGINSTART,
  };
};
const loginSuccess = (payload) => {
  return {
    type: actionTypes.AUTHLOGIN,
    payload,
  };
};
const loginFail = () => {
  return {
    type: actionTypes.AUTHLOGINFAIL,
  };
};

export const login = (loginData) => {
  return async (dispatch) => {
    dispatch(loginStart());
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
      console.log(resJSON);
      if (!resJSON.token) {
        throw new Error("Error");
      }

      dispatch(
        loginSuccess({
          token: resJSON.token,
          userId: resJSON.userId,
          isCompany: resJSON.isCompany,
        })
      );
      return resJSON;
    } catch (err) {
      console.log(err);
      dispatch(loginFail());
      return err;
    }
  };
};
