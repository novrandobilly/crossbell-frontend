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

const Experience = (props) => {
  const { applicantid } = useParams();

  const [formState, onInputHandler] = useForm(
    {
      prevTitle: {
        value: "",
        isValid: false,
      },
      prevCompany: {
        value: "",
        isValid: false,
      },
      prevLocation: {
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
    const updatedExperience = {
      applicantId: applicantid,
      prevTitle: formState.inputs.prevTitle.value,
      prevCompany: formState.inputs.prevCompany.value,
      prevLocation: formState.inputs.prevLocation.value,
      startDate: formState.inputs.startDate.value,
      endDate: formState.inputs.endDate.value,
      description: formState.inputs.description.value,
    };

    try {
      const res = await props.updateApplicantExperience(updatedExperience);
      if (res) {
        console.log(res);
      } else {
        console.log("no res detected");
      }
    } catch (err) {
      console.log(err);
    }
  };

  let formContent = (
    <>
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
              placeholder="Ex: Marketing Chief"
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
              placeholder="Ex: Bandung, West Java"
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
                label="End Date*"
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
    </>
  );

  if (props.isLoading) {
    formContent = <SpinnerCircle />;
  }

  return (
    <form onSubmit={onSubmitHandler} className={classes.Container}>
      {formContent}
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    applicant: state.applicant.applicants,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateApplicantExperience: (ApplicantData) =>
      dispatch(actionCreators.updateApplicantExperience(ApplicantData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Experience));
