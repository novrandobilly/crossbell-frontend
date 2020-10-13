import React from "react";

import classes from "./Login.module.css";

const Login = ({ toggled }) => {
  return (
    <>
      <form className={classes.Container}>
        <div className={classes.ContainerFlex}>
          <p className={classes.FormTitle}>Login</p>

          <label className={classes.LabelName}>Email</label>
          <input className={classes.Input} type="text" />

          <label className={classes.LabelName}>Pasword</label>
          <input className={classes.Input} type="text" />

          <button className={classes.SubmitButton}>
            <span>Submit</span>
          </button>

          <span className={classes.sign}>
            Don't have an account
            <button
              className={classes.ChangeSign}
              onClick={toggled}
              type="button"
            >
              Sign Up Here
            </button>
          </span>
        </div>
      </form>
    </>
  );
};
export default Login;
