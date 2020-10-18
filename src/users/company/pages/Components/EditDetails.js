import React from "react";

import Input from '../../../../shared/UI_Element/Input';
import { VALIDATOR_REQUIRE} from '../../../../shared/utils/validator';

import classes from "./EditDetails.module.css";

const EditDetails = (props) => {
  const onSaveHandler = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <form className={classes.Container}>
        <div className={classes.ContainerFlex}>
          <p className={classes.FormTitle}>Edit Company Details</p>

          <div className={classes.FormRow}>
            <div className={classes.EditLabel}>
              <Input
                inputType='textarea'
                id='details'
                inputClass='AddJobInput'
                validatorMethod={[ VALIDATOR_REQUIRE() ]}
                label='Details*'
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

export default EditDetails;
