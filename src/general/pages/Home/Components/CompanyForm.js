import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useForm } from '../../../../shared/utils/useForm';
import * as actionTypes from '../../../../store/actions/actions';
import * as actionCreators from '../../../../store/actions/index';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import Modal from '../../../../shared/UI_Element/Modal';
import Input from '../../../../shared/UI_Element/Input';
import SpinnerCircle from '../../../../shared/UI_Element/Spinner/SpinnerCircle';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from '../../../../shared/utils/validator';

import classes from './CompanyForm.module.css';

const CompanyForm = (props) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [formState, onInputHandler] = useForm(
    {
      companyName: {
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
    const newCompany = {
      companyName: formState.inputs.companyName.value,
      email: formState.inputs.email.value,
      password: formState.inputs.password.value,
    };

    try {
      const res = await props.createCompany(newCompany);

      if (!res.token) {
        throw new Error(res.message);
      }
      props.login({
        token: res.token,
        userId: res.userId,
        isCompany: res.isCompany,
      });
      props.history.push(`/co/${res.userId}/compro`);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  let formContent = (
    <React.Fragment>
      <div className={classes.ContainerFlex}>
        <div className={classes.Header}>
          <p className={classes.FormTitle}>Company Register</p>
        </div>

        <div className={classes.Content}>
          <Input
            inputType='input'
            id='companyName'
            InputClass='Register'
            validatorMethod={[VALIDATOR_REQUIRE()]}
            onInputHandler={onInputHandler}
            label='Nama Perusahaan*'
            helperText='Mohon masukkan nama perusahaan yang valid'
          />

          <Input
            inputType='input'
            id='email'
            InputClass='Register'
            validatorMethod={[VALIDATOR_EMAIL()]}
            onInputHandler={onInputHandler}
            label='Email Perusahaan*'
            helperText='Mohon masukkan alamat email yang valid'
          />

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

          <span className={classes.sign}>
            Sudah punya akun?
            <button
              className={classes.ChangeSign}
              onClick={props.sign}
              type='button'
            >
              Sign In Here
            </button>
          </span>
        </div>

        <div className={classes.Footer}>
          <Button
            color='primary'
            onClick={props.role}
            disableElevation
            startIcon={<ArrowBackIcon />}
          >
            Applicant Register
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
    setErrorMessage(null);
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
