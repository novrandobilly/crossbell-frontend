import React from "react";
import { connect } from "react-redux";
import { useParams, withRouter } from "react-router-dom";
import { useForm } from "../../../../../shared/utils/useForm";

import * as actionCreators from "../../../../../store/actions/index";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../../../../shared/utils/validator";

import SpinnerCircle from "../../../../../shared/UI_Element/Spinner/SpinnerCircle";
import Input from "../../../../../shared/UI_Element/Input";
import SaveButton from "../../../../../shared/UI_Element/SaveButton";

import classes from "./Experience.module.css";

const Education = (props) => {
  const { applicantid } = useParams();
  const push = props.push;

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

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const updatedEducation = {
      applicantId: applicantid,
      school: formState.inputs.school.value,
      degree: formState.inputs.degree.value,
      major: formState.inputs.major.value,
      location: formState.inputs.location.value,
      startDate: formState.inputs.startDate.value,
      endDate: formState.inputs.endDate.value,
      description: formState.inputs.description.value,
    };
    try {
      const res = await props.updateApplicantEducation(updatedEducation);
      if (res) {
        console.log(res);
      } else {
        console.log("no res detected");
      }
      !push && props.history.push(`/ap/${applicantid}`);
    } catch (err) {
      console.log(err);
    }
  };

  let formContent = (
    <>
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
                label="Start Date (MM/ DD/ YYYY)*"
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
                label="End Date (MM/ DD/ YYYY)*"
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
    </>
  );
  if (props.isLoading) {
    formContent = <SpinnerCircle />;
  }

  return (
    <div style={!push ? { marginTop: "6rem" } : { marginTop: "0" }}>
      <form onSubmit={onSubmitHandler} className={classes.Container}>
        {formContent}
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateApplicantEducation: (ApplicantData) =>
      dispatch(actionCreators.updateApplicantEducation(ApplicantData)),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(Education));
