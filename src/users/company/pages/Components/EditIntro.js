import React from "react";

import classes from "./EditIntro.module.css";

const EditIntro = (props) => {
  const onSaveHandler = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <form className={classes.Container}>
        <div className={classes.ContainerFlex}>
          <p className={classes.FormTitle}>Edit Company Intro</p>

          <div className={classes.FormRow}>
            <div className={classes.EditLabel}>
              <label className={classes.LabelName}>Name*</label>
              <input className={classes.Input} type="text" />

              <label className={classes.LabelName}>size*</label>
              <input className={classes.Input} type="text" />

              <label className={classes.LabelName}>Industry*</label>
              <input className={classes.Input} type="text" />

              <label className={classes.LabelName}>Address*</label>
              <input className={classes.Input} type="text" />

              <label className={classes.LabelName}>Websites</label>
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
export default EditIntro;
