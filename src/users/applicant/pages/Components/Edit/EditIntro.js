import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams, withRouter } from "react-router-dom";
import { useForm } from "../../../../../shared/utils/useForm";

import * as actionCreators from "../../../../../store/actions/index";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
} from "../../../../../shared/utils/validator";

import SpinnerCircle from "../../../../../shared/UI_Element/Spinner/SpinnerCircle";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Input from "../../../../../shared/UI_Element/Input";
import SaveButton from "../../../../../shared/UI_Element/SaveButton";

import classes from "./EditIntro.module.css";

const EditIntro = (props) => {
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
      firstName: {
        value: data.firstName,
        isValid: true,
      },

      lastName: {
        value: data.lastName,
        isValid: true,
      },

      email: {
        value: data.email,
        isValid: true,
      },

      headline: {
        value: data.headline,
        isValid: true,
      },

      address: {
        value: data.address,
        isValid: true,
      },

      city: {
        value: data.city,
        isValid: true,
      },

      state: {
        value: data.state,
        isValid: true,
      },

      zip: {
        value: data.zip,
        isValid: true,
      },

      phone: {
        value: data.phone,
        isValid: true,
      },

      website: {
        value: data.website,
        isValid: true,
      },
    },
    false
  );

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const ApplicantData = {
      applicantId: applicantid,
      firstName: formState.inputs.firstName.value,
      lastName: formState.inputs.lastName.value,
      headline: formState.inputs.headline.value,
      email: formState.inputs.email.value,
      address: formState.inputs.address.value,
      city: formState.inputs.city.value,
      state: formState.inputs.state.value,
      zip: formState.inputs.zip.value,
      phone: formState.inputs.phone.value,
      website: formState.inputs.website.value,
    };

    try {
      const res = await props.updateApplicantIntro(ApplicantData);
      if (res) {
        console.log(res);
      } else {
      }
      props.history.push(`/ap/${applicantid}`);
    } catch (err) {
      console.log(err);
    }
  };

  let formContent = (
    <React.Fragment>
      <div className={classes.ContainerFlex}>
        <p className={classes.FormTitle}>About Me</p>

        <div className={classes.FormRow}>
          <div className={classes.EditLabel}>
            <div className={classes.ProfilePicture}>
              <AccountCircleIcon
                style={{
                  fontSize: "15rem",
                  marginBottom: "1rem",
                }}
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
              initValue={data.firstName}
              initIsValid={true}
            />

            <Input
              inputType="input"
              id="lastName"
              inputClass="AddJobInput"
              validatorMethod={[VALIDATOR_REQUIRE()]}
              onInputHandler={onInputHandler}
              label="Last Name*"
              initValue={data.lastName}
              initIsValid={true}
            />

            <Input
              inputType="input"
              id="headline"
              inputClass="AddJobInput"
              validatorMethod={[VALIDATOR_REQUIRE()]}
              onInputHandler={onInputHandler}
              label="Headline*"
              initValue={data.headline}
              initIsValid={true}
            />

            <Input
              inputType="input"
              id="address"
              inputClass="AddJobInput"
              validatorMethod={[VALIDATOR_REQUIRE()]}
              onInputHandler={onInputHandler}
              label="Address*"
              initValue={data.address}
              initIsValid={true}
            />

            <Input
              inputType="input"
              id="city"
              inputClass="AddJobInput"
              validatorMethod={[VALIDATOR_REQUIRE()]}
              onInputHandler={onInputHandler}
              label="City*"
              initValue={data.city}
              initIsValid={true}
            />

            <Input
              inputType="input"
              id="state"
              inputClass="AddJobInput"
              validatorMethod={[VALIDATOR_REQUIRE()]}
              onInputHandler={onInputHandler}
              label="State*"
              initValue={data.state}
              initIsValid={true}
            />

            <Input
              inputType="input"
              id="zip"
              inputClass="AddJobInput"
              validatorMethod={[VALIDATOR_REQUIRE()]}
              onInputHandler={onInputHandler}
              label="Zip*"
              initValue={data.zip}
              initIsValid={true}
            />

            <Input
              inputType="input"
              id="email"
              inputClass="AddJobInput"
              validatorMethod={[VALIDATOR_EMAIL()]}
              onInputHandler={onInputHandler}
              label="Email*"
              initValue={data.email}
              initIsValid={true}
            />

            <Input
              inputType="input"
              id="phone"
              inputClass="AddJobInput"
              validatorMethod={[VALIDATOR_REQUIRE()]}
              onInputHandler={onInputHandler}
              label="Phone*"
              initValue={data.phone}
              initIsValid={true}
            />

            <Input
              inputType="input"
              id="website"
              inputClass="AddJobInput"
              validatorMethod={[VALIDATOR_REQUIRE()]}
              onInputHandler={onInputHandler}
              label="Website"
              initValue={data.website}
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
    </React.Fragment>
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
    updateApplicantIntro: (ApplicantData) =>
      dispatch(actionCreators.updateApplicantIntro(ApplicantData)),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(EditIntro));
