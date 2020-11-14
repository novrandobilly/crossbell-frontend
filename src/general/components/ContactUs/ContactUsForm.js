import React from "react";
import { useForm } from "../../../shared/utils/useForm";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import * as actionTypes from "../../../store/actions/actions";
import Input from "../../../shared/UI_Element/Input";
import Button from "../../../shared/UI_Element/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
  VALIDATOR_NUMSTR,
} from "../../../shared/utils/validator";

import classes from "./ContactUsForm.module.css";

const ContactUsForm = (props) => {
  const [formState, onInputHandler] = useForm(
    {
      nama: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      phone: {
        value: "",
        isValid: false,
      },
      message: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const applicant = props.applicant.find(
    (app) => app.email === formState.inputs.email.value
  );

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const newFeed = {
      feedId: formState.inputs.message.value.slice(0, 3).toUpperCase(),
      userId: applicant.applicantId,
      email: formState.inputs.email.value,
      phone: formState.inputs.phone.value,
      feed: formState.inputs.message.value,
      createdAt: "12/12/2020",
    };
    props.onCreateFeed(newFeed);
    props.history.push("/ad/alphaomega/customer-supports");
  };

  return (
    <div className={classes.ContactUsContainer}>
      <form onSubmit={onSubmitHandler} className={classes.ContactUsForm}>
        <Input
          inputType="input"
          placeholder="Nama"
          id="nama"
          onInputHandler={onInputHandler}
          validatorMethod={[VALIDATOR_REQUIRE()]}
        />
        <Input
          inputType="input"
          placeholder="Email"
          id="email"
          onInputHandler={onInputHandler}
          validatorMethod={[VALIDATOR_EMAIL()]}
        />
        <Input
          inputType="input"
          placeholder="No Telephone"
          id="phone"
          onInputHandler={onInputHandler}
          validatorMethod={[VALIDATOR_NUMSTR()]}
        />
        <Input
          inputType="textarea"
          placeholder="Pesan..."
          rows="10"
          id="message"
          onInputHandler={onInputHandler}
          validatorMethod={[VALIDATOR_MINLENGTH(10)]}
        />

        <Button disabled={!formState.formIsValid} btnType={"Dark"}>
          Submit
        </Button>

        <Link to={`/ad/alphaomega/customer-supports`}>
          <button>Preview</button>
        </Link>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    applicant: state.applicant.applicants,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateFeed: (createFeed) =>
      dispatch({
        type: actionTypes.CREATEFEEDBACK,
        payload: createFeed,
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ContactUsForm));
