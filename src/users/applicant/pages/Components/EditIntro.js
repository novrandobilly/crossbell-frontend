import React from "react";
import { useForm } from "../../../../shared/utils/useForm";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
} from "../../../../shared/utils/validator";

import Input from "../../../../shared/UI_Element/Input";
import SaveButton from "../../../../shared/UI_Element/SaveButton";

import classes from "./EditIntro.module.css";

const EditIntro = (props) => {
  const [formState, onInputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      city: {
        value: "",
        isValid: false,
      },
      state: {
        value: "",
        isValid: false,
      },
      zip: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      phone: {
        value: "",
        isValid: false,
      },
      websites: {
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
          <p className={classes.FormTitle}>About Me</p>

          <div className={classes.FormRow}>
            <div className={classes.EditLabel}>
              <div className={classes.ProfilePicture}>
                <img
                  src="https://vignette.wikia.nocookie.net/slap-on-titan5669/images/c/cf/Mikasa.png/revision/latest?cb=20161213102353"
                  alt="Profile"
                  className={classes.Picture}
                />
                <label className={classes.InputButton}>
                  <input type="file"></input>
                  <span className={classes.InputButtonText}> Upload File </span>
                </label>
              </div>

              <Input
                inputType="input"
                id="name"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="Full Name*"
              />

              <Input
                inputType="input"
                id="address"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="Address*"
              />

              <Input
                inputType="input"
                id="city"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="City*"
              />

              <Input
                inputType="input"
                id="state"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="State*"
              />

              <Input
                inputType="input"
                id="zip"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="Zip*"
              />

              <Input
                inputType="input"
                id="email"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_EMAIL()]}
                onInputHandler={onInputHandler}
                label="Email*"
              />

              <Input
                inputType="input"
                id="phone"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="Phone*"
              />

              <Input
                inputType="input"
                id="websites"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="Websites"
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
export default EditIntro;
