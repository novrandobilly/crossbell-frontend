import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { useForm } from "../../../../shared/utils/useForm";
import * as actionTypes from "../../../../store/actions/actions";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../../../shared/utils/validator";

import Input from "../../../../shared/UI_Element/Input";

import classes from "./Register.module.css";

const Register = (props, { sign, role }) => {
  const [formState, onInputHandler] = useForm(
    {
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
    false
  );

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const newApplicant = {
      applicantId: formState.inputs.firstName.value.slice(0, 3).toUpperCase(),
      firstName: formState.inputs.firstName.value,
      lastName: formState.inputs.lastName.value,
      email: formState.inputs.email.value,
      password: formState.inputs.password.value,
    };
    props.createApplicant(newApplicant);
    props.authLogin();
    props.history.push(`/ap/${newApplicant.applicantId}/res-val`);
  };

  return (
    <React.Fragment>
      <form onSubmit={onSubmitHandler} className={classes.Container}>
        <div className={classes.ContainerFlex}>
          <p className={classes.FormTitle}>Applicant Sign Up</p>

          <button
            className={classes.CompanyRegister}
            onClick={props.role}
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
            validatorMethod={[VALIDATOR_EMAIL()]}
            onInputHandler={onInputHandler}
            label="Email*"
          />

          <Input
            inputType="input"
            id="password"
            inputClass="Register"
            validatorMethod={[VALIDATOR_MINLENGTH(6)]}
            onInputHandler={onInputHandler}
            label="Password*"
            type="password"
          />

          <button
            disabled={!formState.formIsValid}
            className={classes.SubmitButton}
          >
            <span>Submit</span>
          </button>

          <span className={classes.Sign}>
            Already have an account?
            <button
              className={classes.ChangeSign}
              type="button"
              onClick={props.sign}
            >
              Sign In Here
            </button>
          </span>
        </div>
      </form>
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    createApplicant: (newApplicant) =>
      dispatch({ type: actionTypes.CREATEAPPLICANT, payload: newApplicant }),
    authLogin: () => dispatch({ type: actionTypes.AUTHLOGIN }),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(Register));
