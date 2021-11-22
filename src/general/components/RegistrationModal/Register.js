import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { useForm } from '../../../shared/utils/useForm';
import * as actionTypes from '../../../store/actions/actions';
import * as actionCreators from '../../../store/actions/index';

import Modal from '../../../shared/UI_Element/Modal';
import Input from '../../../shared/UI_Element/Input';
import LoadingBar from '../../../shared/UI_Element/Spinner/LoadingBar';
import GoogleLoginButton from './GoogleLoginButton';

import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../../../shared/utils/validator';

import classes from './Register.module.css';

const Register = props => {
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
      confirmPassword: {
        value: '',
        isValid: false,
      },
      tosAgreement: {
        value: false,
        isValid: false,
      },
    },
    false
  );

  const onSubmitHandler = async event => {
    event.preventDefault();
    const newApplicant = {
      firstName: formState.inputs.firstName.value,
      lastName: formState.inputs.lastName.value,
      email: formState.inputs.email.value,
      password: formState.inputs.password.value,
    };

    try {
      const res = await props.createApplicant(newApplicant);
      if (!res.token) {
        throw new Error(res.message);
      }
      props.login({
        token: res.token,
        userId: res.userId,
        isCompany: res.isCompany,
      });
      props.onSucceedRegister();
      props.history.push(`/ap/${res.userId}/profile`);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };
  const onAgreementChange = event => {
    const agreement = event.target.checked;
    const id = event.target.id;
    onInputHandler(id, agreement, agreement);
  };

  let formContent = (
    <div className={classes.ContainerFlex}>
      <div className={classes.Content}>
        <div className={classes.InputBox}>
          <Input
            inputType='input'
            id='firstName'
            InputClass='Register'
            validatorMethod={[VALIDATOR_REQUIRE()]}
            onInputHandler={onInputHandler}
            label='Nama depan*'
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
            label='Nama belakang*'
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
            label='Email*'
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
            label='Password*'
            type='password'
            helperText='Password minimal mengandung 6 karakter'
          />
        </div>

        <div className={classes.InputBox}>
          <Input
            inputType='input'
            id='confirmPassword'
            InputClass='Register'
            validatorMethod={[VALIDATOR_MINLENGTH(6)]}
            onInputHandler={onInputHandler}
            label='Password Confirmation*'
            type='password'
            helperText='Password belum sesuai mohon coba lagi'
          />
        </div>
        <div className={classes.TosAgreement}>
          <input id='tosAgreement' onChange={onAgreementChange} type='checkbox' />{' '}
          <span onClick={() => props.onCancelAuth()}>
            Saya mengetahui dan menyetujui <Link to='/syarat-ketentuan'>Syarat & Ketentuan</Link> dan{' '}
            <Link to='/kebijakan-privasi'>Kebijakan Privasi</Link> yang berlaku
          </span>
        </div>

        <button
          className={classes.RegisterButton}
          disabled={
            !formState.formIsValid || formState.inputs.password.value !== formState.inputs.confirmPassword.value
          }>
          Register
        </button>
        <GoogleLoginButton buttonText='Signup with Google' />
        <p className={classes.AdditionalLinks}>
          Sudah punya akun?{' '}
          <span className={classes.LoginSwitch} onClick={props.onSwitchToLogin}>
            Masuk disini
          </span>
        </p>
      </div>
    </div>
  );

  if (props.isLoading) {
    formContent = <LoadingBar />;
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

const mapStateToProps = state => {
  return {
    isLoading: state.applicant.isLoading,
    error: state.applicant.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetApplicant: () => dispatch({ type: actionTypes.APPLICANTRESET }),
    createApplicant: newApplicant => dispatch(actionCreators.createApplicant(newApplicant)),
    login: payload => dispatch({ type: actionTypes.AUTHLOGIN, payload }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));
