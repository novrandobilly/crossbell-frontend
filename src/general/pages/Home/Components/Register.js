import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useForm } from '../../../../shared/utils/useForm';
import * as actionTypes from '../../../../store/actions/actions';
import * as actionCreators from '../../../../store/actions/index';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Button from '@material-ui/core/Button';
import Modal from '../../../../shared/UI_Element/Modal';
import Input from '../../../../shared/UI_Element/Input';
import SpinnerCircle from '../../../../shared/UI_Element/Spinner/SpinnerCircle';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from '../../../../shared/utils/validator';

import classes from './Register.module.css';

const Register = (props) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [formState, onInputHandler] = useForm(
    {
      firstName: {
        value: '',
        isValid: false,
      },
      lastName: {
        value: '',
        isValid: false,
      },
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const newApplicant = {
      firstName: formState.inputs.firstName.value,
      lastName: formState.inputs.lastName.value,
      email: formState.inputs.email.value,
      password: formState.inputs.password.value,
    };

    try {
      const res = await props.createApplicant(newApplicant);
      console.log(res);
      if (!res.token) {
        throw new Error(res.message);
      }
      props.login({
        token: res.token,
        userId: res.userId,
        isCompany: res.isCompany,
      });
      props.history.push(`/ap/${res.userId}/res-val`);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  let formContent = (
    <React.Fragment>
      <div className={classes.ContainerFlex}>
        <div className={classes.Footer}>
          <Button
            color='primary'
            onClick={props.role}
            disableElevation
            endIcon={<ArrowForwardIcon />}
          >
            Daftar sebagai perusahaan
          </Button>
        </div>
        <div className={classes.Header}>
          <p className={classes.FormTitle}>Registrasi pelamar</p>
        </div>
        <div className={classes.Content}>
          <div className={classes.InputBox}>
            <Input
              inputType='input'
              id='firstName'
              InputClass='Register'
              validatorMethod={[VALIDATOR_REQUIRE()]}
              onInputHandler={onInputHandler}
              label='Nama depan'
              helperText='Mohon masukkan nama depan yang valid'
            />
          </div>

          <div className={classes.InputBox}>
            <Input
              inputType='input'
              id='lastName'
              InputClass='Register'
              validatorMethod={[VALIDATOR_REQUIRE()]}
              onInputHandler={onInputHandler}
              label='Nama belakang'
              helperText='Mohon masukkan nama belakang yang valid'
            />
          </div>

          <div className={classes.InputBox}>
            <Input
              inputType='input'
              id='email'
              InputClass='Register'
              validatorMethod={[VALIDATOR_EMAIL()]}
              onInputHandler={onInputHandler}
              label='Email'
              helperText='Mohon masukkan alamat email yang valid'
            />
          </div>

          <div className={classes.InputBox}>
            <Input
              inputType='input'
              id='password'
              InputClass='Register'
              validatorMethod={[VALIDATOR_MINLENGTH(6)]}
              onInputHandler={onInputHandler}
              label='Password'
              type='password'
              helperText='Password minimal mengandung 6 karakter'
            />
          </div>

          <Button
            variant='contained'
            color='primary'
            type='submit'
            disableElevation
            disabled={!formState.formIsValid}
            style={{
              marginTop: '1rem',
            }}
          >
            Register
          </Button>

          <span className={classes.Sign}>
            Sudah punya akun?
            <button
              className={classes.ChangeSign}
              type='button'
              onClick={props.sign}
            >
              masuk di sini
            </button>
          </span>
        </div>
      </div>
    </React.Fragment>
  );

  if (props.isLoading) {
    formContent = <SpinnerCircle />;
  }

  const onCancelHandler = () => {
    props.resetApplicant();
  };

  return (
    <form onSubmit={onSubmitHandler} className={classes.Container}>
      <Modal show={props.error} onCancel={onCancelHandler}>
        {errorMessage && errorMessage}
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
    resetApplicant: () => dispatch({ type: actionTypes.APPLICANTRESET }),
    createApplicant: (newApplicant) =>
      dispatch(actionCreators.createApplicant(newApplicant)),
    login: (payload) => dispatch({ type: actionTypes.AUTHLOGIN, payload }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Register));
