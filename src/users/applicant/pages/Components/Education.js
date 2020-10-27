import React from "react";
import { useForm } from "../../../../shared/utils/useForm";

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../../../shared/utils/validator";

import Input from "../../../../shared/UI_Element/Input";
import SaveButton from "../../../../shared/UI_Element/SaveButton";

import classes from "./Experience.module.css";

const EditDetails = (props) => {
  const [formState, onInputHandler] = useForm(
    {
      school: {
        value: "",
        isValid: false,
      },
      degree: {
        value: "",
        isValid: false,
      },
      major: {
        value: "",
        isValid: false,
      },
      location: {
        value: "",
        isValid: false,
      },
      status: {
        value: "",
        isValid: false,
      },
      startDate: {
        value: "",
        isValid: false,
      },
      endDate: {
        value: "",
        isValid: false,
      },
      description: {
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
          <p className={classes.FormTitle}>Education</p>

          <div className={classes.FormRow}>
            <div className={classes.EditLabel}>
              <Input
                inputType="input"
                id="school"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="School *"
                placeholder="Ex: University of Indonesia"
              />
            </div>

            <div className={classes.EditLabel}>
              <Input
                inputType="input"
                id="degree"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="Degree *"
                placeholder="Ex: Bachelor of Engineering"
              />
            </div>

            <div className={classes.EditLabel}>
              <Input
                inputType="input"
                id="major"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="Field of Study *"
                placeholder="Ex: International Relations"
              />
            </div>

            {/* gani pake dropdown button  */}
            <div className={classes.EditLabel}>
              <Input
                inputType="input"
                id="status"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="Status *"
                placeholder="Ex: Graduated/ Under graduate"
              />
            </div>

            <div className={classes.EditLabel}>
              <Input
                inputType="input"
                id="location"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="Location *"
                placeholder="Ex: Depok, West Java"
              />
            </div>

            <div className={classes.Period}>
              <div className={classes.EditLabel}>
                <Input
                  inputType="input"
                  id="startDate"
                  inputClass="DateInput"
                  validatorMethod={[VALIDATOR_REQUIRE()]}
                  onInputHandler={onInputHandler}
                  label="Start Date *"
                  placeholder="DD/MM/YYYY"
                />
              </div>

              <div className={classes.EditLabel}>
                <Input
                  inputType="input"
                  id="endDate"
                  inputClass="DateInput"
                  validatorMethod={[VALIDATOR_REQUIRE()]}
                  onInputHandler={onInputHandler}
                  label="End Date *"
                  placeholder="DD/MM/YYYY"
                />
              </div>
            </div>

            <div className={classes.EditLabel}>
              <Input
                inputType="textarea"
                id="description"
                inputClass="EditProfileTextArea"
                validatorMethod={[VALIDATOR_MINLENGTH(20)]}
                onInputHandler={onInputHandler}
                label="Description *"
              />
            </div>
          </div>

          <SaveButton
            btnClass="SaveButton"
            disabled={!formState.formIsValid}
            placeholder="Save"
          />
        </div>
      </form>
    </>
  );
};

export default EditDetails;
