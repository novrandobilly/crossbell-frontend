import React from "react";

import classes from "./CompanyForm.module.css";

const CompanyForm = ({ sign, role }) => {
  return (
    <>
      <form className={classes.Container}>
        <div className={classes.ContainerFlex}>
          <p className={classes.FormTitle}>Company Sign Up</p>

          <button
            className={classes.ApplicantRegister}
            onClick={role}
            type="button"
          >
            Applicant sign up
          </button>

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
