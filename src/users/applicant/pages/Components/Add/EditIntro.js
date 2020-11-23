import React, { useEffect, useState } from "react";
import { useForm } from "../../../../../shared/utils/useForm";
import { withRouter, useParams } from "react-router-dom";
import { connect } from "react-redux";

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

  const [formState, onInputHandler] = useForm(
    {
      firstName: {
        value: data.firstName,
        isValid: data.firstName ? true : false,
      },

      lastName: {
        value: data.lastName,
        isValid: data.lastName ? true : false,
      },

      headline: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      city: {
        value: "",
        isValid: false,
      },
      state: {
        value: "",
        isValid: false,
      },
      zip: {
        value: "",
        isValid: false,
      },
      email: {
        value: data.email,
        isValid: data.email ? true : false,
      },
      phone: {
        value: "",
        isValid: false,
      },
      websites: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const ApplicantData = {
      applicantId: data.id,
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

    try {
      const res = await props.updateApplicantIntro(ApplicantData);
      if (res) {
        console.log(res);
      } else {
        console.log("no response");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const { getOneApplicant } = props;
  useEffect(() => {
    getOneApplicant(applicantid).then((res) => {
      setData(res.applicant);
      setIsLoading(false);
    });
  }, [getOneApplicant, setIsLoading, applicantid]);

  let formContent = (
    <>
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
              placeholder="Ex: Full stack developer"
            />

            <Input
              inputType="input"
              id="address"
              inputClass="AddJobInput"
              validatorMethod={[VALIDATOR_REQUIRE()]}
              onInputHandler={onInputHandler}
              label="Address*"
              placeholder="Ex: Cilandak Street no.188, South Jakarta"
            />

            <Input
              inputType="input"
              id="city"
              inputClass="AddJobInput"
              validatorMethod={[VALIDATOR_REQUIRE()]}
              onInputHandler={onInputHandler}
              label="City*"
              placeholder="Ex: South Jakarta"
            />

            <Input
              inputType="input"
              id="state"
              inputClass="AddJobInput"
              validatorMethod={[VALIDATOR_REQUIRE()]}
              onInputHandler={onInputHandler}
              label="State*"
              placeholder="Ex: West Java"
            />

            <Input
              inputType="input"
              id="zip"
              inputClass="AddJobInput"
              validatorMethod={[VALIDATOR_REQUIRE()]}
              onInputHandler={onInputHandler}
              label="Zip*"
              placeholder="Ex: 16869"
            />

            <Input
              inputType="input"
              id="email"
              inputClass="AddJobInput"
              validatorMethod={[VALIDATOR_EMAIL()]}
              onInputHandler={onInputHandler}
              label="Email*"
              placeholder="Ex: Dwi_haryo@hotmail.com"
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
              placeholder="Ex: 08179192342"
            />

            <Input
              inputType="input"
              id="websites"
              inputClass="AddJobInput"
              validatorMethod={[VALIDATOR_REQUIRE()]}
              onInputHandler={onInputHandler}
              label="Websites"
              placeholder="Ex: https://www.facebook.com/dwikun"
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
    updateApplicantIntro: (ApplicantData) =>
      dispatch(actionCreators.updateApplicantIntro(ApplicantData)),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(EditIntro));
