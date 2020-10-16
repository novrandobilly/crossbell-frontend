import React from "react";

import classes from "./Register.module.css";

const Register = ({ sign, role }) => {
  return (
    <>
      <form className={classes.Container}>
        <div className={classes.ContainerFlex}>
          <p className={classes.FormTitle}>Applicant Sign Up</p>

          <button
            className={classes.CompanyRegister}
            onClick={role}
            type="button"
          >

           

            Company sign up

          </button>

          <label className={classes.LabelName}>First Name</label>
          <input className={classes.Input} type="text" />

          <label className={classes.LabelName}>Last Name</label>
          <input className={classes.Input} type="text" />

          <label className={classes.LabelName}>Email</label>
          <input className={classes.Input} type="text" />

          <label className={classes.LabelName}>Password</label>
          <input className={classes.Input} type="text" />

          <button className={classes.SubmitButton}>
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
