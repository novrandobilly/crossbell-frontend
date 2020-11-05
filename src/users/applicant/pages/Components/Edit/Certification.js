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
  const { certificationindex } = useParams();

  const applicant = props.applicant.find(
    (app) => app.applicantId === applicantid
  );

  const [formState, onInputHandler] = useForm(
    {
      title: {
        value: applicant.certification[certificationindex].title,
        isValid: true,
      },
      organization: {
        value: applicant.certification[certificationindex].organization,
        isValid: true,
      },
      startDate: {
        value: applicant.certification[certificationindex].startDate,
        isValid: true,
      },
      endDate: {
        value: applicant.certification[certificationindex].endDate,
        isValid: true,
      },
      description: {
        value: applicant.certification[certificationindex].description,
        isValid: true,
      },
    },
    false
  );

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const updatedCertification = {
      applicantId: applicant.applicantId,
      certificationindex: certificationindex,
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
                initValue={applicant.certification[certificationindex].title}
                initIsValid={true}
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
                initValue={
                  applicant.certification[certificationindex].organization
                }
                initIsValid={true}
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
                  initValue={
                    applicant.certification[certificationindex].startDate
                  }
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
                  label="Expiration Date*"
                  initValue={
                    applicant.certification[certificationindex].endDate
                  }
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
                initValue={
                  applicant.certification[certificationindex].description
                }
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
    onUpdateAppCertification: (updatedCertification) =>
      dispatch({
        type: actionTypes.EDITAPPLICANTCERTIFICATION,
        payload: { updatedCertification },
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Certification));
