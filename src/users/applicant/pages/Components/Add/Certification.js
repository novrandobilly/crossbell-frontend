import React, { useState } from "react";
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

import classes from "./Certification.module.css";

const Certification = (props) => {
  const { applicantid } = useParams();
  const push = props.push;
  const [expiry, setExpiry] = useState(false);

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

  const expiryHandler = (event) => {
    setExpiry(!expiry);
    formState.inputs.endDate.isValid = true;
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (expiry) {
      const updatedCertification = {
        applicantId: applicantid,
        title: formState.inputs.title.value,
        organization: formState.inputs.organization.value,
        startDate: formState.inputs.startDate.value,
        endDate: formState.inputs.endDate.value,
        description: formState.inputs.description.value,
      };
      try {
        const res = await props.updateApplicantCertification(
          updatedCertification
        );

        if (res) {
          console.log(res);
        } else {
          console.log("no res detected");
        }
        !push && props.history.push(`/ap/${applicantid}`);
      } catch (err) {
        console.log(err);
      }
    } else {
      const updatedCertification = {
        applicantId: applicantid,
        title: formState.inputs.title.value,
        organization: formState.inputs.organization.value,
        startDate: formState.inputs.startDate.value,
        endDate: "12/12/40000",
        description: formState.inputs.description.value,
      };
      try {
        const res = await props.updateApplicantCertification(
          updatedCertification
        );
        if (res) {
          console.log(res);
        } else {
          console.log("no res detected");
        }
        !push && props.history.push(`/ap/${applicantid}`);
      } catch (err) {
        console.log(err);
      }
    }
  };
  let formContent = (
    <>
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

          <div className={classes.CheckboxDiv}>
            <input
              type="checkbox"
              className={classes.Checkbox}
              onChange={expiryHandler}
            />
            <label className={classes.CheckboxText}>No expiry date</label>
          </div>

          <div className={classes.Period}>
            <div className={classes.EditLabel}>
              <Input
                inputType="input"
                id="startDate"
                inputClass="DateInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="Issue Date (MM/ DD/ YYYY)*"
                placeholder="DD/MM/YYYY"
              />
            </div>

            {!expiry ? (
              <div className={classes.EditLabel}>
                <Input
                  inputType="input"
                  id="endDate"
                  inputClass="DateInput"
                  validatorMethod={[VALIDATOR_REQUIRE()]}
                  onInputHandler={onInputHandler}
                  label="Expiration Date (MM/ DD/ YYYY)*"
                  placeholder="DD/MM/YYYY"
                />
              </div>
            ) : (
              <div />
            )}
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
    <div style={!push ? { marginTop: "6rem" } : { marginTop: "0" }}>
      <form onSubmit={onSubmitHandler} className={classes.Container}>
        {formContent}
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateApplicantCertification: (ApplicantData) =>
      dispatch(actionCreators.updateApplicantCertification(ApplicantData)),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(Certification));
