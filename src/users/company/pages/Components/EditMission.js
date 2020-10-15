import React from "react";

import classes from "./EditMission.module.css";

const EditMission = (props) => {
  const onSaveHandler = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <form className={classes.Container}>
        <div className={classes.ContainerFlex}>
          <p className={classes.FormTitle}>Edit Company Mission</p>

          <div className={classes.FormRow}>
            <div className={classes.EditLabel}>
              <label className={classes.LabelName}>Mission</label>
              <textarea className={classes.InputArea} type="text" />
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

export default EditMission;
