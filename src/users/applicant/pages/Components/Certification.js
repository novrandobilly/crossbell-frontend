import React from "react";
import { useForm } from "../../../../shared/utils/useForm";

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../../../shared/utils/validator";

import Input from "../../../../shared/UI_Element/Input";
import SaveButton from "../../../../shared/UI_Element/SaveButton";

import classes from "./Certification.module.css";

const EditDetails = (props) => {
  const [formState, onInputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      organization: {
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
          <p className={classes.FormTitle}>Certification</p>

          <div className={classes.FormRow}>
            <div className={classes.EditLabel}>
              <Input
                inputType="input"
                id="title"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="Certification Title *"
                placeholder="Ex: Certified Cooperative Communicator"
              />
            </div>

            <div className={classes.EditLabel}>
              <Input
                inputType="input"
                id="organization"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="Issuing Organization*"
                placeholder="Ex: National Rural Electric Cooperative Association"
              />
            </div>

            {/* Tambahin logic dan button untuk sertifikasi seumur hidup */}

            <div className={classes.Period}>
              <div className={classes.EditLabel}>
                <Input
                  inputType="input"
                  id="startDate"
                  inputClass="DateInput"
                  validatorMethod={[VALIDATOR_REQUIRE()]}
                  onInputHandler={onInputHandler}
                  label="Issue Date*"
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
                  label="Expiration Date*"
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
                label="Description*"
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
