import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import * as actionTypes from '../../../../store/actions/actions';
import * as actionCreators from '../../../../store/actions';
import { useForm } from '../../../../shared/utils/useForm';

import GoogleLoginButton from './GoogleLoginButton';
import Input from '../../../../shared/UI_Element/Input';
import Button from '@material-ui/core/Button';
import Spinner from '../../../../shared/UI_Element/Spinner/SpinnerCircle';
import Modal from '../../../../shared/UI_Element/Modal';

import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from '../../../../shared/utils/validator';

import classes from './Login.module.css';

const Login = (props) => {
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

  const onSubmitHandler = async (event) => {
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

    if (res.token) {
      props.history.push('/jobs-dashboard');
    } else {
      console.log('error');
    }
  };

  const onCancelHandler = () => {
    props.logout();
  };

  let formContent = (
    <React.Fragment>
      <div className={classes.ContainerFlex}>
        <div className={classes.Header}>
          <p className={classes.FormTitle}>Login</p>
        </div>

        <div className={classes.Content}>
          <Input
            inputType='input'
            id='email'
            InputClass='Login'
            validatorMethod={[VALIDATOR_EMAIL()]}
            onInputHandler={onInputHandler}
            label='Email'
            helperText='Please input a valid email address.'
          />

          <Input
            inputType='input'
            id='password'
            InputClass='Login'
            validatorMethod={[VALIDATOR_MINLENGTH(6)]}
            onInputHandler={onInputHandler}
            label='Password'
            type='password'
            helperText='Password contains min. 6 characters.'
          />

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
            submit
          </Button>

          <GoogleLoginButton />

          <span className={classes.Sign}>
            Don't have an account
            <button
              className={classes.ChangeSign}
              onClick={props.sign}
              type='button'
            >
              Sign Up Here
            </button>
          </span>

          <span className={classes.Sign}>
            Forgot password?
            <button className={classes.ChangeSign} type='button'>
              <Link
                style={{
                  textDecoration: 'none',
                  color: 'rgba(58, 81, 153, 1)',
                }}
                to='/forgot'
              >
                Click Here
              </Link>
            </button>
          </span>
        </div>

        <div className={classes.Footer} />
      </div>
    </React.Fragment>
  );

  if (props.auth.isLoading) {
    formContent = <Spinner />;
  }
  return (
    <form onSubmit={onSubmitHandler} className={classes.Container}>
      <Modal show={props.auth.isError} onCancel={onCancelHandler}>
        Email or Password invalid. Please try again.
      </Modal>
      {formContent}
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    isCompany: () => dispatch({ type: actionTypes.AUTHCOMPANY }),
    logout: () => dispatch({ type: actionTypes.AUTHLOGOUT }),
    loginServer: (loginData) => dispatch(actionCreators.login(loginData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
