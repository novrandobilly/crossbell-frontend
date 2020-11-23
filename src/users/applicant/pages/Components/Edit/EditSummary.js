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

import classes from "./EditSummary.module.css";

const EditSummary = (props) => {
  const { applicantid } = useParams();

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { getOneApplicant } = props;
  useEffect(() => {
    getOneApplicant(applicantid).then((res) => {
      setData(res.applicant);
      setIsLoading(false);
    });
  }, [getOneApplicant, setIsLoading, applicantid]);

  const [formState, onInputHandler] = useForm(
    {
      details: {
        value: data.details,
        isValid: true,
      },
      dateOfBirth: {
        value: data.dateOfBirth,
        isValid: true,
      },
    },
    false
  );

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const updatedAppSummary = {
      applicantId: applicantid,
      details: formState.inputs.details.value,
      dateOfBirth: formState.inputs.dateOfBirth.value,
    };
    try {
      const res = await props.updateApplicantSummary(updatedAppSummary);
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
              initValue={data.details}
              initIsValid={true}
            />
          </div>

          <div className={classes.EditLabel}>
            <Input
              inputType="input"
              id="dateOfBirth"
              inputClass="AddJobInput"
              validatorMethod={[VALIDATOR_REQUIRE()]}
              onInputHandler={onInputHandler}
              label="Date of Birth*"
              initValue={data.dateOfBirth}
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
    updateApplicantSummary: (ApplicantData) =>
      dispatch(actionCreators.updateApplicantSummary(ApplicantData)),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(EditSummary));
