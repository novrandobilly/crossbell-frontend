import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import * as actionTypes from '../../../store/actions/actions';
import * as actionCreators from '../../../store/actions';
import { useForm } from '../../../shared/utils/useForm';

import GoogleLoginButton from './GoogleLoginButton';
import Input from '../../../shared/UI_Element/Input';
import LoadingBar from '../../../shared/UI_Element/Spinner/LoadingBar';
import Modal from '../../../shared/UI_Element/Modal';

import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../../../shared/utils/validator';

import classes from './Login.module.css';

const Login = props => {
  const [formState, onInputHandler] = useForm(
    {
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

  const onSubmitHandler = async event => {
    event.preventDefault();

    const loginData = {
      email: formState.inputs.email.value,
      password: formState.inputs.password.value,
    };

    let res;
    try {
      res = await props.loginServer(loginData);
      if (!res) {
        throw new Error('Error');
      }
    } catch (err) {
      console.log(err);
    }
    if (res.token && !res.isCompany) {
      props.onSucceedLogin();
      props.history.push(`/ap/${res.userId}/profile`);
    } else if (res.token && res.isCompany) {
      props.onSucceedLogin();
      props.history.push(`/co/${res.userId}/profile`);
    } else {
      console.log('error');
    }
  };

  const onCancelHandler = () => {
    props.logout();
  };

  let formContent = (
    <div className={classes.LoginContainer}>
      <div className={classes.InputBox}>
        <Input
          inputType='input'
          id='email'
          InputClass='Login'
          validatorMethod={[VALIDATOR_EMAIL()]}
          onInputHandler={onInputHandler}
          label='Email'
          helperText='Silahkan gunakan email yang valid.'
        />
      </div>
      <div className={classes.InputBox}>
        <Input
          inputType='input'
          id='password'
          InputClass='Login'
          validatorMethod={[VALIDATOR_MINLENGTH(6)]}
          onInputHandler={onInputHandler}
          label='Password'
          type='password'
          helperText='Silahkan isi password anda.'
        />
      </div>

      {props.auth.isLoading ? (
        <LoadingBar width='15px' />
      ) : (
        <button type='submit' className={classes.SubmitButton} disabled={!formState.formIsValid}>
          Masuk
        </button>
      )}
      <GoogleLoginButton />

      <p className={classes.AdditionalLinks}>
        Tidak punya akun?{' '}
        <span className={classes.RegistrationSwitch} onClick={props.onSwitchToRegister}>
          Daftar sekarang
        </span>
      </p>

      <p className={classes.AdditionalLinks}>
        Lupa password?{' '}
        <Link className={classes.ForgotPasswordLink} to='/forgot' onClick={props.onForgotPassword}>
          Klik disini
        </Link>
      </p>
    </div>
  );

  return (
    <form onSubmit={onSubmitHandler} className={classes.Container}>
      <Modal show={props.auth.isError} onCancel={onCancelHandler} style={{ top: '25vh' }}>
        Email or Password invalid. Please try again.
      </Modal>
      {formContent}
    </form>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    isCompany: () => dispatch({ type: actionTypes.AUTHCOMPANY }),
    logout: () => dispatch({ type: actionTypes.AUTHLOGOUT }),
    loginServer: loginData => dispatch(actionCreators.login(loginData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
