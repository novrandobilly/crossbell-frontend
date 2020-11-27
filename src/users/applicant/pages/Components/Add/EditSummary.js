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

import classes from "./EditSummary.module.css";

const EditSummary = (props) => {
  const { applicantid } = useParams();
  let push = props.push;

  const [formState, onInputHandler] = useForm(
    {
      details: {
        value: "",
        isValid: false,
      },
      dateOfBirth: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const updatedSummary = {
      applicantId: applicantid,
      details: formState.inputs.details.value,
      dateOfBirth: formState.inputs.dateOfBirth.value,
    };

    try {
      const res = await props.updateApplicantSummary(updatedSummary);
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
            />
          </div>

          <div className={classes.EditLabel}>
            <Input
              inputType="input"
              id="dateOfBirth"
              inputClass="AddJobInput"
              validatorMethod={[VALIDATOR_REQUIRE()]}
              onInputHandler={onInputHandler}
              label="Date of Birth (MM/ DD/ YYYY)*"
              placeholder="MM/DD/YYYY "
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
    updateApplicantSummary: (ApplicantData) =>
      dispatch(actionCreators.updateApplicantSummary(ApplicantData)),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(EditSummary));
