import React from "react";

import classes from "./CompanyForm.module.css";

const Register = ({ toggled }) => {
  return (
    <>
      <form className={classes.Container}>
        <div className={classes.ContainerFlex}>
          <p className={classes.FormTitle}>Company Sign Up</p>

          <label className={classes.LabelName}>Company name</label>
          <input className={classes.Input} type="text" />

          <label className={classes.LabelName}>Company email</label>
          <input className={classes.Input} type="text" />

          <label className={classes.LabelName}>Password</label>
          <input className={classes.Input} type="text" />

          <button className={classes.SubmitButton}>
            <span>Submit</span>
          </button>

          <span className={classes.sign}>
            Sign for applicant account?
            <button
              className={classes.ChangeSign}
              onClick={toggled}
              type="button"
            >
              Click here
            </button>
          </span>

          <span className={classes.sign}>
            Already have an account?
            <button className={classes.ChangeSign} type="button">
              Sign In Here
            </button>
          </span>
        </div>
      </form>
    </>
  );
};
export default Register;
