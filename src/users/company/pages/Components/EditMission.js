import React from "react";
import { useForm } from "../../../../shared/utils/useForm";

import Input from "../../../../shared/UI_Element/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../../../shared/utils/validator";

import classes from "./EditMission.module.css";

const EditMission = (props) => {
  const [formState, onInputHandler] = useForm(
    {
      mission: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState);
  };

  return (
    <>
      <form onSubmit={onSubmitHandler} className={classes.Container}>
        <div className={classes.ContainerFlex}>
          <p className={classes.FormTitle}>Edit Company Mission</p>

          <div className={classes.FormRow}>
            <div className={classes.EditLabel}>
              <Input
                inputType="textarea"
                id="mission"
                inputClass="EditProfileTextArea"
                validatorMethod={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(20)]}
                onInputHandler={onInputHandler}
                label="Mission*"
              />
            </div>
          </div>

          <button
            disabled={!formState.formIsValid}
            className={classes.SaveButton}
          >
            <span>Save</span>
          </button>
        </div>
      </form>
    </>
  );
};

export default EditMission;
