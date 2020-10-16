import React from "react";

import classes from "./NewJob.module.css";

const NewJob = (props) => {
  const onSaveHandler = (event) => {
    event.preventDefault();
  };

  const [category, setCategory] = React.useState("Type");

  const handleCategoryChange = (category) => {
    setCategory(category);
  };

  return (
    <>
      <form className={classes.Container}>
        <div className={classes.ContainerFlex}>
          <p className={classes.FormTitle}>New Job Ads</p>

          <div className={classes.FormRow}>
            <div className={classes.EditLabel}>
              <label className={classes.LabelName}>Job Title*</label>
              <input className={classes.Input} type="text" />

              <label className={classes.LabelName}>Job Description*</label>
              <input className={classes.Input} type="text" />

              <label className={classes.LabelName}>Job Qualification*</label>
              <input className={classes.Input} type="text" />

              <label className={classes.LabelName}>
                Technical Requirement*
              </label>
              <input className={classes.Input} type="text" />

              <label className={classes.LabelName}>Placement*</label>
              <input className={classes.Input} type="text" />

              <label className={classes.LabelName}>Job Level*</label>
              <select
                name="category"
                value={category}
                onChange={(event) => handleCategoryChange(event.target.value)}
                className={classes.DropDown}
              >
                <option id="0">Entry Level</option>
                <option id="1">Junior Apprentice</option>
                <option id="2">Associate/ Supervisor</option>
                <option id="3">Mid-Senior/ Manager</option>
                <option id="4">Director/ Executive</option>
              </select>

              <label className={classes.LabelName}>Employment Type*</label>
              <select
                name="category"
                value={category}
                onChange={(event) => handleCategoryChange(event.target.value)}
                className={classes.DropDown}
              >
                <option id="0">Full Time</option>
                <option id="1">Contract</option>
                <option id="2">Internship</option>
              </select>

              <label className={classes.LabelName}>Salary</label>
              <input className={classes.Input} type="text" />

              <label className={classes.LabelName}>Benefits</label>
              <input className={classes.Input} type="text" />
            </div>
          </div>
          <button className={classes.SaveButton} onClick={onSaveHandler}>
            <span>Save</span>
          </button>
        </div>
      </form>
    </>
  );
};
export default NewJob;
