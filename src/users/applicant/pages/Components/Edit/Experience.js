import React from "react";
import { connect } from "react-redux";
import { useParams, withRouter } from "react-router-dom";
import { useForm } from "../../../../../shared/utils/useForm";

import * as actionTypes from "../../../../../store/actions/actions";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../../../../shared/utils/validator";

import Input from "../../../../../shared/UI_Element/Input";
import SaveButton from "../../../../../shared/UI_Element/SaveButton";

import classes from "./Experience.module.css";

const Experience = (props) => {
  const { applicantid } = useParams();
  const { experienceindex } = useParams();

  const applicant = props.applicant.find(
    (app) => app.applicantId === applicantid
  );

  const [formState, onInputHandler] = useForm(
    {
      prevTitle: {
        value: applicant.experience[experienceindex].prevTitle,
        isValid: true,
      },
      prevCompany: {
        value: applicant.experience[experienceindex].prevCompany,
        isValid: true,
      },
      prevLocation: {
        value: applicant.experience[experienceindex].prevLocation,
        isValid: true,
      },
      startDate: {
        value: applicant.experience[experienceindex].startDate,
        isValid: true,
      },
      endDate: {
        value: applicant.experience[experienceindex].endDate,
        isValid: true,
      },
      description: {
        value: applicant.experience[experienceindex].description,
        isValid: true,
      },
    },
    false
  );

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const updatedExperience = {
      applicantId: applicant.applicantId,
      experienceindex: experienceindex,
      prevTitle: formState.inputs.prevTitle.value,
      prevCompany: formState.inputs.prevCompany.value,
      prevLocation: formState.inputs.prevLocation.value,
      startDate: formState.inputs.startDate.value,
      endDate: formState.inputs.endDate.value,
      description: formState.inputs.description.value,
    };
    props.onUpdateAppExperience(updatedExperience);
    props.history.push(`/ap/${applicant.applicantId}`);
  };

  return (
    <>
      <form onSubmit={onSubmitHandler} className={classes.Container}>
        <div className={classes.ContainerFlex}>
          <p className={classes.FormTitle}>Experience</p>

          <div className={classes.FormRow}>
            <div className={classes.EditLabel}>
              <Input
                inputType="input"
                id="prevTitle"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="Previous Title *"
                initValue={applicant.experience[experienceindex].prevTitle}
                initIsValid={true}
              />
            </div>

            <div className={classes.EditLabel}>
              <Input
                inputType="input"
                id="prevCompany"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="Company Name*"
                initValue={applicant.experience[experienceindex].prevCompany}
                initIsValid={true}
              />
            </div>

            <div className={classes.EditLabel}>
              <Input
                inputType="input"
                id="prevLocation"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="Location*"
                initValue={applicant.experience[experienceindex].prevLocation}
                initIsValid={true}
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
                  label="Start Date*"
                  initValue={applicant.experience[experienceindex].startDate}
                  initIsValid={true}
                />
              </div>

              <div className={classes.EditLabel}>
                <Input
                  inputType="input"
                  id="endDate"
                  inputClass="DateInput"
                  validatorMethod={[VALIDATOR_REQUIRE()]}
                  onInputHandler={onInputHandler}
                  label="End Date*"
                  initValue={applicant.experience[experienceindex].endDate}
                  initIsValid={true}
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
                initValue={applicant.experience[experienceindex].description}
                initIsValid={true}
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

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateAppExperience: (updatedExperience) =>
      dispatch({
        type: actionTypes.EDITAPPLICANTEXPERIENCE,
        payload: { updatedExperience },
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Experience));
