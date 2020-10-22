import React from "react";
import { useForm } from "../../../../shared/utils/useForm";

import Input from "../../../../shared/UI_Element/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../../../shared/utils/validator";

import classes from "./CompanyForm.module.css";

const CompanyForm = ({ sign, role }) => {
  const [formState, onInputHandler] = useForm(
    {
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
    false
  );

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState);
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
            type="password"
          />

          <button
            disabled={!formState.formIsValid}
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
