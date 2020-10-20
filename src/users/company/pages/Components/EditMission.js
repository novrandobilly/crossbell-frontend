import React from "react";

import Input from "../../../../shared/UI_Element/Input";
import { VALIDATOR_REQUIRE } from "../../../../shared/utils/validator";

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
              <Input
                inputType="textarea"
                id="mission"
                inputClass="EditProfileTextArea"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                label="Mission*"
              />
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
