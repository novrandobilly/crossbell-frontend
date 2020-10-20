import React, { useReducer, useCallback } from "react";

import Input from "../../../../shared/UI_Element/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../../../shared/utils/validator";

import classes from "./Register.module.css";

const ACTION = { UPDATEFORM_APPLICANT: "update-form-applicant" };
const formReducer = (state, action) => {
  switch (action.type) {
    case ACTION.UPDATEFORM_APPLICANT:
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

const Register = ({ sign, role }) => {
  const [state, dispatch] = useReducer(formReducer, {
    inputs: {
      firstName: {
        value: "",
        isValid: false,
      },
      lastName: {
        value: "",
        isValid: false,
      },
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
    dispatch({
      type: ACTION.UPDATEFORM_APPLICANT,
      payload: { id, value, isValid },
    });
  }, []);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    // console.log(state);
  };

  return (
    <>
      <form onSubmit={onSubmitHandler} className={classes.Container}>
        <div className={classes.ContainerFlex}>
          <p className={classes.FormTitle}>Applicant Sign Up</p>

          <button
            className={classes.CompanyRegister}
            onClick={role}
            type="button"
          >
            Company sign up
          </button>

          <Input
            inputType="input"
            id="firstName"
            inputClass="Register"
            validatorMethod={[VALIDATOR_REQUIRE()]}
            onInputHandler={onInputHandler}
            label="First Name*"
          />

          <Input
            inputType="input"
            id="lastName"
            inputClass="Register"
            validatorMethod={[VALIDATOR_REQUIRE()]}
            onInputHandler={onInputHandler}
            label="Last Name*"
          />

          <Input
            inputType="input"
            id="email"
            inputClass="Register"
            validatorMethod={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
            onInputHandler={onInputHandler}
            label="Company Email*"
          />

          <Input
            inputType="input"
            id="password"
            inputClass="Register"
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

          <span className={classes.Sign}>
            Already have an account?
            <button className={classes.ChangeSign} type="button" onClick={sign}>
              Sign In Here
            </button>
          </span>
        </div>
      </form>
    </>
  );
};
export default Register;
