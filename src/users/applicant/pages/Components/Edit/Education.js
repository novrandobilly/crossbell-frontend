import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams, withRouter } from "react-router-dom";
import { useForm } from "../../../../../shared/utils/useForm";
import moment from "moment";

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
  const { educationindex } = useParams();

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { getOneApplicant } = props;
  useEffect(() => {
    getOneApplicant(applicantid).then((res) => {
      setData(res.applicant.education[educationindex]);
      setIsLoading(false);
    });
  }, [getOneApplicant, setIsLoading, applicantid, educationindex]);

  const [formState, onInputHandler] = useForm(
    {
      school: {
        value: data.school,
        isValid: true,
      },
      degree: {
        value: data.degree,
        isValid: true,
      },
      major: {
        value: data.major,
        isValid: true,
      },
      location: {
        value: data.location,
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
    const updatedEducation = {
      applicantId: applicantid,
      index: educationindex,
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
      props.history.push(`/ap/${applicantid}`);
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
              initValue={data.school}
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
              initValue={data.degree}
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
              initValue={data.major}
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
              initValue={data.location}
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
                label="Start Date (MM/ DD/ YYYY)*"
                initValue={moment(data.startDate).format("MM/ DD/ YYYY")}
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
                label="End Date (MM/ DD/ YYYY)*"
                initValue={moment(data.endDate).format("MM/ DD/ YYYY")}
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
    updateApplicantEducation: (ApplicantData) =>
      dispatch(actionCreators.updateApplicantEducation(ApplicantData)),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(Education));
