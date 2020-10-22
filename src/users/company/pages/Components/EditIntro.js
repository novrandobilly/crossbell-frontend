import React from "react";
import { useForm } from "../../../../shared/utils/useForm";

import Input from "../../../../shared/UI_Element/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
} from "../../../../shared/utils/validator";

import classes from "./EditIntro.module.css";

const EditIntro = (props) => {
  const [formState, onInputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      size: {
        value: "",
        isValid: false,
      },
      industry: {
        value: "",
        isValid: false,
      },
      headquarter: {
        value: "",
        isValid: false,
      },
      websites: {
        value: "",
        isValid: false,
      },
      recipient: {
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
          <p className={classes.FormTitle}>Edit Company Intro</p>

          <div className={classes.FormRow}>
            <div className={classes.EditLabel}>
              <Input
                inputType="input"
                id="name"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="Name*"
              />

              <Input
                inputType="input"
                id="size"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="Size*"
              />

              <Input
                inputType="input"
                id="industry"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="Industry*"
              />

              <Input
                inputType="input"
                id="headquarter"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="Address*"
              />

              <Input
                inputType="input"
                id="websites"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="Websites*"
              />

              <Input
                inputType="input"
                id="recipient"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
                onInputHandler={onInputHandler}
                label="Email Recipient*"
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
export default EditIntro;
