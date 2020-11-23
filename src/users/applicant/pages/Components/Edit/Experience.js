import React, { useEffect, useState } from "react";
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
  const { experienceindex } = useParams();

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { getOneApplicant } = props;
  useEffect(() => {
    getOneApplicant(applicantid).then((res) => {
      setData(res.applicant.experience[experienceindex]);
      setIsLoading(false);
    });
  }, [getOneApplicant, setIsLoading, applicantid, experienceindex]);

  const [formState, onInputHandler] = useForm(
    {
      prevTitle: {
        value: data.prevTitle,
        isValid: true,
      },
      prevCompany: {
        value: data.prevCompany,
        isValid: true,
      },
      prevLocation: {
        value: data.prevLocation,
        isValid: true,
      },
      startDate: {
        value: data.startDate,
        isValid: true,
      },
      endDate: {
        value: data.endDate,
        isValid: true,
      },
      description: {
        value: data.description,
        isValid: true,
      },
    },
    false
  );

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const updatedExperience = {
      applicantId: applicantid,
      index: experienceindex,
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

      props.history.push(`/ap/${applicantid}`);
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
              initValue={data.prevTitle}
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
              initValue={data.prevCompany}
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
              initValue={data.prevLocation}
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
                initValue={data.startDate}
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
                initValue={data.endDate}
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
              initValue={data.description}
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
    </>
  );
  if (isLoading) {
    formContent = <SpinnerCircle />;
  }

  return (
    <form onSubmit={onSubmitHandler} className={classes.Container}>
      {formContent}
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOneApplicant: (data) => dispatch(actionCreators.getOneApplicant(data)),
    updateApplicantExperience: (ApplicantData) =>
      dispatch(actionCreators.updateApplicantExperience(ApplicantData)),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(Experience));
