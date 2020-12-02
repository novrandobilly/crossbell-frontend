import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams, withRouter } from "react-router-dom";
import { useForm } from "../../../../../shared/utils/useForm";

import * as actionTypes from "../../../../../store/actions/actions";
import * as actionCreators from "../../../../../store/actions/index";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
} from "../../../../../shared/utils/validator";

import Modal from "../../../../../shared/UI_Element/Modal";
import SpinnerCircle from "../../../../../shared/UI_Element/Spinner/SpinnerCircle";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Input from "../../../../../shared/UI_Element/Input";
import SaveButton from "../../../../../shared/UI_Element/SaveButton";

import classes from "./EditIntro.module.css";

const EditIntro = (props) => {
  const { applicantid } = useParams();

  const [data, setData] = useState();

  const { getOneApplicant } = props;
  useEffect(() => {
    getOneApplicant(applicantid).then((res) => {
      setData(res.applicant);
    });
  }, [getOneApplicant, applicantid]);

  const [formState, onInputHandler] = useForm(
    {
      firstName: {
        value: data ? data.firstName : null,
        isValid: data && data.firstName ? true : false,
      },

      lastName: {
        value: data ? data.lastName : null,
        isValid: data && data.lastName ? true : false,
      },

      email: {
        value: data ? data.email : null,
        isValid: data && data.email ? true : false,
      },

      headline: {
        value: data ? data.headline : null,
        isValid: data && data.headline ? true : false,
      },

      address: {
        value: data ? data.address : null,
        isValid: data && data.address ? true : false,
      },

      city: {
        value: data ? data.city : null,
        isValid: data && data.city ? true : false,
      },

      state: {
        value: data ? data.state : null,
        isValid: data && data.state ? true : false,
      },

      zip: {
        value: data ? data.zip : null,
        isValid: data && data.zip ? true : false,
      },

      phone: {
        value: data ? data.phone : null,
        isValid: data && data.phone ? true : false,
      },

      website: {
        value: data ? data.website : null,
        isValid: data && data.website ? true : false,
      },
    },
    false
  );

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!formState.formIsValid) {
      return props.updateApplicantFail();
    }

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
      }

      props.history.push(`/ap/${applicantid}`);
    } catch (err) {
      console.log(err);
    }
  };

  let formContent = <SpinnerCircle />;

  if (!props.isLoading && data) {
    formContent = (
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
  }

  const onCancelHandler = () => {
    props.resetApplicant();
  };

  return (
    <form onSubmit={onSubmitHandler} className={classes.Container}>
      <Modal show={props.error} onCancel={onCancelHandler}>
        Could not update changes at the moment, please try again later
      </Modal>
      {formContent}
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.applicant.isLoading,
    error: state.applicant.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateApplicantFail: () =>
      dispatch({ type: actionTypes.UPDATEAPPLICANTFAIL }),
    resetApplicant: () => dispatch({ type: actionTypes.APPLICANTRESET }),
    getOneApplicant: (data) => dispatch(actionCreators.getOneApplicant(data)),
    updateApplicantIntro: (ApplicantData) =>
      dispatch(actionCreators.updateApplicantIntro(ApplicantData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditIntro));
