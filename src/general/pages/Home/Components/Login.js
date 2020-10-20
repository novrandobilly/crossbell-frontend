import React from "react";
import {useForm} from '../../../../shared/utils/useForm'

import Input from "../../../../shared/UI_Element/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../../../shared/utils/validator";

import classes from "./Login.module.css";

const Login = ({ sign }) => {
  const [formState, onInputHandler] = useForm({
    email: {
      value: "",
      isValid: false,
    },
    password: {
      value: "",
      isValid: false,
    },
  }, false)

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState);
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
            disabled={!formState.formIsValid}
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
