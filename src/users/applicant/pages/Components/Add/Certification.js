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

import classes from "./Certification.module.css";

const Certification = (props) => {
  const { applicantid } = useParams();

  const applicant = props.applicant.find(
    (app) => app.applicantId === applicantid
  );

  const [formState, onInputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      organization: {
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

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const updatedCertification = {
      applicantId: applicant.applicantId,
      title: formState.inputs.title.value,
      organization: formState.inputs.organization.value,
      startDate: formState.inputs.startDate.value,
      endDate: formState.inputs.endDate.value,
      description: formState.inputs.description.value,
    };
    props.onUpdateAppCertification(updatedCertification);
    props.history.push(`/ap/${applicant.applicantId}`);
  };

  return (
    <>
      <form onSubmit={onSubmitHandler} className={classes.Container}>
        <div className={classes.ContainerFlex}>
          <p className={classes.FormTitle}>Certification</p>

          <div className={classes.FormRow}>
            <div className={classes.EditLabel}>
              <Input
                inputType="input"
                id="title"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="Certification Title *"
                placeholder="Ex: Certified Cooperative Communicator"
              />
            </div>

            <div className={classes.EditLabel}>
              <Input
                inputType="input"
                id="organization"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="Issuing Organization*"
                placeholder="Ex: National Rural Electric Cooperative Association"
              />
            </div>

            {/* Tambahin logic dan button untuk sertifikasi seumur hidup */}

            <div className={classes.Period}>
              <div className={classes.EditLabel}>
                <Input
                  inputType="input"
                  id="startDate"
                  inputClass="DateInput"
                  validatorMethod={[VALIDATOR_REQUIRE()]}
                  onInputHandler={onInputHandler}
                  label="Issue Date*"
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
                  label="Expiration Date*"
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
    onUpdateAppCertification: (updatedCertification) =>
      dispatch({
        type: actionTypes.CREATEAPPLICANTCERTIFICATION,
        payload: { updatedCertification },
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Certification));
