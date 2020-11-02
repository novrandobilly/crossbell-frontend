import React from "react";
import { useForm } from "../../../../shared/utils/useForm";

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../../../shared/utils/validator";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import Input from "../../../../shared/UI_Element/Input";
import SaveButton from "../../../../shared/UI_Element/SaveButton";

import classes from "./EditSummary.module.css";

const EditDetails = (props) => {
  const { applicantid } = useParams();

  const applicant = props.applicant.find((app) => app.id === applicantid);

  const [formState, onInputHandler] = useForm(
    {
      details: {
        value: "",
        isValid: false,
      },
      dob: {
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
          <p className={classes.FormTitle}>Summary</p>

          <div className={classes.FormRow}>
            <div className={classes.EditLabel}>
              <Input
                inputType="textarea"
                id="details"
                inputClass="EditProfileTextArea"
                validatorMethod={[VALIDATOR_MINLENGTH(20)]}
                onInputHandler={onInputHandler}
                label="Details*"
                placeholder={applicant.details}
              />
            </div>

            <div className={classes.EditLabel}>
              <Input
                inputType="input"
                id="dob"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="Date of Birth*"
                placeholder={applicant.dateOfBirth}
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

const mapStateToProps = (state) => {
  return {
    applicant: state.applicant.applicants,
  };
};

export default connect(mapStateToProps)(EditDetails);
