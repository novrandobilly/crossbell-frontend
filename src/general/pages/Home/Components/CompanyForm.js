import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { useForm } from "../../../../shared/utils/useForm";
import * as actionTypes from "../../../../store/actions/actions";
import * as actionCreators from "../../../../store/actions/index";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Button from "@material-ui/core/Button";
import Modal from "../../../../shared/UI_Element/Modal";
import Input from "../../../../shared/UI_Element/Input";
import SpinnerCircle from "../../../../shared/UI_Element/Spinner/SpinnerCircle";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../../../shared/utils/validator";

import classes from "./CompanyForm.module.css";

const CompanyForm = (props) => {
  const [formState, onInputHandler] = useForm(
    {
      companyName: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const newCompany = {
      companyName: formState.inputs.companyName.value,
      email: formState.inputs.email.value,
      password: formState.inputs.password.value,
    };

    try {
      const res = await props.createCompany(newCompany);
      console.log(res);
      if (!res.token) {
        throw new Error("It's error dude!");
      }
      props.login({
        token: res.token,
        userId: res.userId,
        isCompany: res.isCompany,
      });
      props.history.push(`/co/${res.userId}/compro`);
    } catch (err) {
      console.log(err);
    }
  };

  let formContent = (
    <React.Fragment>
      <div className={classes.ContainerFlex}>
        <div className={classes.Header}>
          <p className={classes.FormTitle}>Company Sign Up</p>
        </div>

        <div className={classes.Content}>
          <Input
            inputType="input"
            id="companyName"
            inputClass="Register"
            validatorMethod={[VALIDATOR_REQUIRE()]}
            onInputHandler={onInputHandler}
            label="Company Name*"
          />

          <Input
            inputType="input"
            id="email"
            inputClass="Register"
            validatorMethod={[VALIDATOR_EMAIL()]}
            onInputHandler={onInputHandler}
            label="Company Email*"
          />

          <Input
            inputType="input"
            id="password"
            inputClass="Register"
            validatorMethod={[VALIDATOR_MINLENGTH(6)]}
            onInputHandler={onInputHandler}
            label="Password*"
            type="password"
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            disableElevation
            disabled={!formState.formIsValid}
            style={{
              marginTop: "1rem",
            }}
          >
            submit
          </Button>

          <span className={classes.sign}>
            Already have an account?
            <button
              className={classes.ChangeSign}
              onClick={props.sign}
              type="button"
            >
              Sign In Here
            </button>
          </span>
        </div>

        <div className={classes.Footer}>
          <Button
            color="primary"
            onClick={props.role}
            disableElevation
            style={{
              padding: "0",
              fontSize: "0.7rem",
              alignSelf: "flex-start",
              backgroundColor: "transparent",
              marginLeft: "1.5rem",
            }}
            startIcon={<ArrowBackIcon />}
          >
            Applicant sign up
          </Button>
        </div>
      </div>
    </React.Fragment>
  );

  if (props.isLoading) {
    formContent = <SpinnerCircle />;
  }

  const onCancelHandler = () => {
    props.resetCompany();
  };

  return (
    <form onSubmit={onSubmitHandler} className={classes.Container}>
      <Modal show={props.error} onCancel={onCancelHandler}>
        Invalid registration value. Please try again.
      </Modal>
      {formContent}
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.company.isLoading,
    error: state.company.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createCompany: (newCompany) =>
      dispatch(actionCreators.createCompany(newCompany)),
    resetCompany: () => dispatch({ type: actionTypes.COMPANYRESET }),
    // createCompany: newCompany => dispatch({ type: actionTypes.CREATECOMPANY, payload: newCompany }),
    login: (payload) => dispatch({ type: actionTypes.AUTHLOGIN, payload }),
    authCompany: () => dispatch({ type: actionTypes.AUTHCOMPANY }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CompanyForm));
