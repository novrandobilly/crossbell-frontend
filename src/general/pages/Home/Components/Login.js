import React, { useReducer, useCallback } from "react";

import Input from "../../../../shared/UI_Element/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../../../shared/utils/validator";

import classes from "./Login.module.css";

const ACTION = { UPDATEFORM_LOGIN: "update-form-login" };
const formReducer = (state, action) => {
  switch (action.type) {
    case ACTION.UPDATEFORM:
      let formValidity = true;
      for (const key in state.inputs) {
        if (key === action.payload.id) {
          formValidity = formValidity && action.payload.isValid;
        } else {
          formValidity = formValidity && state.inputs[key].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.payload.id]: {
            value: action.payload.value,
            isValid: action.payload.isValid,
          },
        },
        formIsValid: formValidity,
      };
    default:
      return state;
  }
};

const Login = ({ sign }) => {
  const [state, dispatch] = useReducer(formReducer, {
    inputs: {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    formIsValid: false,
  });

  const onInputHandler = useCallback((id, value, isValid) => {
    dispatch({ type: ACTION.UPDATEFORM, payload: { id, value, isValid } });
  }, []);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    // console.log(state);
  };

  return (
    <>
      <form onSubmit={onSubmitHandler} className={classes.Container}>
        <div className={classes.ContainerFlex}>
          <p className={classes.FormTitle}>Login</p>

          <Input
            inputType="input"
            id="email"
            inputClass="Login"
            validatorMethod={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
            onInputHandler={onInputHandler}
            label="Email*"
          />

          <Input
            inputType="input"
            id="password"
            inputClass="Login"
            validatorMethod={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
            onInputHandler={onInputHandler}
            label="Password*"
          />

          <button
            disabled={!state.formIsValid}
            className={classes.SubmitButton}
          >
            <span>Submit</span>
          </button>

          <span className={classes.sign}>
            Don't have an account
            <button className={classes.ChangeSign} onClick={sign} type="button">
              Sign Up Here
            </button>
          </span>
        </div>
      </form>
    </>
  );
};
export default Login;
