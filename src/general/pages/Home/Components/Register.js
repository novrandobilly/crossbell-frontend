import React from "react";

import classes from "./Register.module.css";

const Register = ({ toggled }) => {
  return (
    <>
      <form className={classes.Container}>
        <div className={classes.ContainerFlex}>
          <p className={classes.FormTitle}>Register</p>

          <label className={classes.LabelName}>First Name</label>
          <input className={classes.Input} type="text" />

          <label className={classes.LabelName}>Last Name</label>
          <input className={classes.Input} type="text" />

          <label className={classes.LabelName}>Email</label>
          <input className={classes.Input} type="text" />

          <label className={classes.LabelName}>Pasword</label>
          <input className={classes.Input} type="text" />

          <button className={classes.SubmitButton}>
            <span>Submit</span>
          </button>

          <span className={classes.sign}>
            Already have an account?
            <button
              className={classes.ChangeSign}
              onClick={toggled}
              type="button"
            >
              Sign In Here
            </button>
          </span>
        </div>
      </form>
    </>
  );
};
export default Register;
