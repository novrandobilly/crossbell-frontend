import React from "react";
import { connect } from "react-redux";
import { useParams, withRouter } from "react-router-dom";
import { useForm } from "../../../../../shared/utils/useForm";

import * as actionTypes from "../../../../../store/actions/actions";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
} from "../../../../../shared/utils/validator";

import Input from "../../../../../shared/UI_Element/Input";
import SaveButton from "../../../../../shared/UI_Element/SaveButton";

import classes from "./EditIntro.module.css";

const EditIntro = (props) => {
  const { applicantid } = useParams();

  const applicant = props.applicant.find(
    (app) => app.applicantId === applicantid
  );

  const [formState, onInputHandler] = useForm(
    {
      firstName: {
        value: applicant.firstName,
        isValid: true,
      },

      lastName: {
        value: applicant.lastName,
        isValid: true,
      },

      email: {
        value: applicant.email,
        isValid: true,
      },

      headline: {
        value: applicant.headline,
        isValid: true,
      },

      address: {
        value: applicant.address,
        isValid: true,
      },

      city: {
        value: applicant.city,
        isValid: true,
      },

      state: {
        value: applicant.state,
        isValid: true,
      },

      zip: {
        value: applicant.zip,
        isValid: true,
      },

      phone: {
        value: applicant.phone,
        isValid: true,
      },

      websites: {
        value: applicant.websites,
        isValid: true,
      },
    },
    false
  );

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const updatedAppIntro = {
      applicantId: applicant.applicantId,
      firstName: formState.inputs.firstName.value,
      lastName: formState.inputs.lastName.value,
      headline: formState.inputs.headline.value,
      email: formState.inputs.email.value,
      address: formState.inputs.address.value,
      city: formState.inputs.city.value,
      state: formState.inputs.state.value,
      zip: formState.inputs.zip.value,
      phone: formState.inputs.phone.value,
      websites: formState.inputs.websites.value,
    };
    props.onUpdateAppIntro(updatedAppIntro);
    props.history.push(`/ap/${applicant.applicantId}`);
  };

  return (
    <>
      <form onSubmit={onSubmitHandler} className={classes.Container}>
        <div className={classes.ContainerFlex}>
          <p className={classes.FormTitle}>About Me</p>

          <div className={classes.FormRow}>
            <div className={classes.EditLabel}>
              <div className={classes.ProfilePicture}>
                <img
                  src="https://vignette.wikia.nocookie.net/slap-on-titan5669/images/c/cf/Mikasa.png/revision/latest?cb=20161213102353"
                  alt="Profile"
                  className={classes.Picture}
                />
                <label className={classes.InputButton}>
                  <input type="file"></input>
                  <span className={classes.InputButtonText}> Upload File </span>
                </label>
              </div>

              <Input
                inputType="input"
                id="firstName"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="First Name*"
                initValue={applicant.firstName}
                initIsValid={true}
              />

              <Input
                inputType="input"
                id="lastName"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="Last Name*"
                initValue={applicant.lastName}
                initIsValid={true}
              />

              <Input
                inputType="input"
                id="headline"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="Headline*"
                initValue={applicant.headline}
                initIsValid={true}
              />

              <Input
                inputType="input"
                id="address"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="Address*"
                initValue={applicant.address}
                initIsValid={true}
              />

              <Input
                inputType="input"
                id="city"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="City*"
                initValue={applicant.city}
                initIsValid={true}
              />

              <Input
                inputType="input"
                id="state"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="State*"
                initValue={applicant.state}
                initIsValid={true}
              />

              <Input
                inputType="input"
                id="zip"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="Zip*"
                initValue={applicant.zip}
                initIsValid={true}
              />

              <Input
                inputType="input"
                id="email"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_EMAIL()]}
                onInputHandler={onInputHandler}
                label="Email*"
                initValue={applicant.email}
                initIsValid={true}
              />

              <Input
                inputType="input"
                id="phone"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="Phone*"
                initValue={applicant.phone}
                initIsValid={true}
              />

              <Input
                inputType="input"
                id="websites"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="Websites"
                initValue={applicant.websites}
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
    onUpdateAppIntro: (updatedAppIntro) =>
      dispatch({
        type: actionTypes.EDITAPPLICANTINTRO,
        payload: { updatedAppIntro },
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditIntro));
