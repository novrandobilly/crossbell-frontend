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

const Education = (props) => {
  const { applicantid } = useParams();
  const { educationindex } = useParams();

  const applicant = props.applicant.find(
    (app) => app.applicantId === applicantid
  );

  const [formState, onInputHandler] = useForm(
    {
      school: {
        value: applicant.education[educationindex].school,
        isValid: true,
      },
      degree: {
        value: applicant.education[educationindex].degree,
        isValid: true,
      },
      major: {
        value: applicant.education[educationindex].major,
        isValid: true,
      },
      location: {
        value: applicant.education[educationindex].location,
        isValid: true,
      },
      startDate: {
        value: applicant.education[educationindex].startDate,
        isValid: true,
      },
      endDate: {
        value: applicant.education[educationindex].endDate,
        isValid: true,
      },
      description: {
        value: applicant.education[educationindex].description,
        isValid: true,
      },
    },
    false
  );

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const updatedEducation = {
      applicantId: applicant.applicantId,
      educationindex: educationindex,
      school: formState.inputs.school.value,
      degree: formState.inputs.degree.value,
      major: formState.inputs.major.value,
      location: formState.inputs.location.value,
      startDate: formState.inputs.startDate.value,
      endDate: formState.inputs.endDate.value,
      description: formState.inputs.description.value,
    };
    props.onUpdateAppIntro(updatedEducation);
    props.history.push(`/ap/${applicant.applicantId}`);
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
                initValue={applicant.education[educationindex].school}
                initIsValid={true}
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
                initValue={applicant.education[educationindex].degree}
                initIsValid={true}
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
                initValue={applicant.education[educationindex].major}
                initIsValid={true}
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
                initValue={applicant.education[educationindex].location}
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
                  label="Start Date *"
                  initValue={applicant.education[educationindex].startDate}
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
                  label="End Date *"
                  initValue={applicant.education[educationindex].endDate}
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
                label="Description *"
                initValue={applicant.education[educationindex].description}
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
    onUpdateAppIntro: (updatedEducation) =>
      dispatch({
        type: actionTypes.EDITAPPLICANTEDUCATION,
        payload: { updatedEducation },
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Education));
