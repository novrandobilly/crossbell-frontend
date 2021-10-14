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
import LoadingBar from '../../../../shared/UI_Element/Spinner/LoadingBar';
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../../../../shared/utils/validator';

import classes from './CompanyForm.module.css';

const CompanyForm = props => {
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
      NPWP: {
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
    },
    false
  );

  const onSubmitHandler = async event => {
    event.preventDefault();
    const newCompany = {
      companyName: formState.inputs.companyName.value,
      email: formState.inputs.email.value,
      password: formState.inputs.password.value,
      NPWP: formState.inputs.NPWP.value,
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
        <div className={classes.Footer}>
          <Button color='primary' onClick={props.role} disableElevation startIcon={<ArrowBackIcon />}>
            Daftar Sebagai Pelamar
          </Button>
        </div>
        <div className={classes.Header}>
          <p className={classes.FormTitle}>Registrasi perusahaan</p>
        </div>

        <div className={classes.Content}>
          <div className={classes.InputBox}>
            <Input
              inputType='input'
              id='companyName'
              InputClass='Register'
              validatorMethod={[VALIDATOR_REQUIRE()]}
              onInputHandler={onInputHandler}
              label='Nama Perusahaan*'
              helperText='Mohon masukkan nama perusahaan yang valid'
            />
          </div>

          <div className={classes.InputBox}>
            <Input
              inputType='input'
              id='email'
              InputClass='Register'
              validatorMethod={[VALIDATOR_EMAIL()]}
              onInputHandler={onInputHandler}
              label='Email Perusahaan*'
              helperText='Mohon masukkan alamat email yang valid'
            />
          </div>

          <div className={classes.InputBox}>
            <Input
              inputType='input'
              id='NPWP'
              InputClass='Register'
              validatorMethod={[VALIDATOR_MINLENGTH(6)]}
              onInputHandler={onInputHandler}
              label='NPWP*'
              helperText='NPWP wajib diisi'
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
              helperText={'Password belum sesuai, mohon coba lagi'}
            />
          </div>

          <Button
            variant='contained'
            color='primary'
            type='submit'
            disableElevation
            disabled={!formState.formIsValid || formState.inputs.password.value !== formState.inputs.confirmPassword.value}
            style={{
              marginTop: '1rem',
            }}>
            Register
          </Button>

          <span className={classes.sign}>
            Sudah punya akun?
            <button className={classes.ChangeSign} onClick={props.sign} type='button'>
              masuk di sini
            </button>
          </span>
        </div>
      </div>
    </React.Fragment>
  );

  if (props.isLoading) {
    formContent = <LoadingBar />;
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

const mapStateToProps = state => {
  return {
    isLoading: state.company.isLoading,
    error: state.company.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createCompany: newCompany => dispatch(actionCreators.createCompany(newCompany)),
    resetCompany: () => dispatch({ type: actionTypes.COMPANYRESET }),
    // createCompany: newCompany => dispatch({ type: actionTypes.CREATECOMPANY, payload: newCompany }),
    login: payload => dispatch({ type: actionTypes.AUTHLOGIN, payload }),
    authCompany: () => dispatch({ type: actionTypes.AUTHCOMPANY }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CompanyForm));
