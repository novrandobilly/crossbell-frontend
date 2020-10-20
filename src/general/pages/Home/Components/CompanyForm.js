import React, { useReducer, useCallback } from "react";

import Input from "../../../../shared/UI_Element/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../../../shared/utils/validator";

import classes from "./CompanyForm.module.css";

const ACTION = { UPDATEFORM_COMPANY: "update-form-applicant" };
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

const CompanyForm = ({ sign, role }) => {
  const [state, dispatch] = useReducer(formReducer, {
    inputs: {
      name: {
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
          <p className={classes.FormTitle}>Company Sign Up</p>

          <button
            className={classes.ApplicantRegister}
            onClick={role}
            type="button"
          >
            Applicant sign up
          </button>

          <Input
            inputType="input"
            id="name"
            inputClass="Register"
            validatorMethod={[VALIDATOR_REQUIRE()]}
            onInputHandler={onInputHandler}
            label="Company Name*"
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

          <span className={classes.sign}>
            Already have an account?
            <button className={classes.ChangeSign} onClick={sign} type="button">
              Sign In Here
            </button>
          </span>
        </div>
      </form>
    </>
  );
};
export default CompanyForm;
