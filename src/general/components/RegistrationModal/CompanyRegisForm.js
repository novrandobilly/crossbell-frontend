import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { useForm } from '../../../shared/utils/useForm';
import * as actionTypes from '../../../store/actions/actions';
import * as actionCreators from '../../../store/actions/index';

import Modal from '../../../shared/UI_Element/Modal';
import Input from '../../../shared/UI_Element/Input';
import Login from './Login';
import LoadingBar from '../../../shared/UI_Element/Spinner/LoadingBar';
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../../../shared/utils/validator';

import classes from './CompanyRegisForm.module.css';

const CompanyRegisForm = props => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [loginCompany, setLoginCompany] = useState(false);

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
      tosAgreement: {
        value: false,
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
      props.history.push(`/co/${res.userId}/profile`);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const onAgreementChange = event => {
    const agreement = event.target.checked;
    const id = event.target.id;
    onInputHandler(id, agreement, agreement);
  };

  const onCompanyLogin = () => setLoginCompany(true);
  const onCompanyCancelLogin = () => setLoginCompany(false);

  const onCancelHandler = () => {
    props.resetCompany();
    setErrorMessage(null);
  };

  return (
    <Fragment>
      <Modal show={loginCompany} onCancel={onCompanyCancelLogin} headerText='Login Perusahaan'>
        <Login
          onSwitchToRegister={onCompanyCancelLogin}
          onForgotPassword={onCompanyCancelLogin}
          onSucceedLogin={onCompanyCancelLogin}
        />
      </Modal>

      <form onSubmit={onSubmitHandler} className={classes.FormContainer}>
        <Modal show={props.error} onCancel={onCancelHandler}>
          {errorMessage && errorMessage}
        </Modal>
        <h1 className={classes.FormTitle}>Registrasi Perusahaan</h1>
        <div className={classes.InputContainer}>
          <div className={classes.InputBox}>
            <Input
              inputType='input'
              id='companyName'
              InputClass='Register'
              validatorMethod={[VALIDATOR_REQUIRE()]}
              onInputHandler={onInputHandler}
              label={true}
              labelName='Nama Perusahaan*'
              helperText='Silahkan input nama perusahaan anda.'
            />
          </div>

          <div className={classes.InputBox}>
            <Input
              inputType='input'
              id='email'
              InputClass='Register'
              validatorMethod={[VALIDATOR_EMAIL()]}
              onInputHandler={onInputHandler}
              label={true}
              labelName='Email Perusahaan*'
              helperText='Silahkan input email perusahaan yang valid.'
            />
          </div>

          <div className={classes.InputBox}>
            <Input
              inputType='input'
              id='NPWP'
              InputClass='Register'
              validatorMethod={[VALIDATOR_MINLENGTH(6)]}
              onInputHandler={onInputHandler}
              label={true}
              labelName='NPWP*'
              helperText='Silahkan isi nomor NPWP perusahaan.'
            />
          </div>

          <div className={classes.InputBox}>
            <Input
              inputType='input'
              id='password'
              InputClass='Register'
              validatorMethod={[VALIDATOR_MINLENGTH(6)]}
              onInputHandler={onInputHandler}
              label={true}
              labelName='Password*'
              type='password'
              helperText='Password minimal 6 karakter'
            />
          </div>

          <div className={classes.InputBox}>
            <Input
              inputType='input'
              id='confirmPassword'
              InputClass='Register'
              validatorMethod={[VALIDATOR_MINLENGTH(6)]}
              onInputHandler={onInputHandler}
              label={true}
              labelName='Password Confirmation*'
              type='password'
              helperText='Password tidak sesuai'
            />
          </div>
          <div className={classes.TosAgreement}>
            <input id='tosAgreement' onChange={onAgreementChange} type='checkbox' />{' '}
            <span>
              Saya mengetahui dan menyetujui <Link to='/syarat-ketentuan'>Syarat & Ketentuan</Link> dan{' '}
              <Link to='/kebijakan-privasi'>Kebijakan Privasi</Link> yang berlaku
            </span>
          </div>

          {props.isLoading ? (
            <LoadingBar />
          ) : (
            <button
              className={classes.SubmitButton}
              type='submit'
              disabled={
                !formState.formIsValid || formState.inputs.password.value !== formState.inputs.confirmPassword.value
              }
              style={{
                marginTop: '1rem',
              }}>
              Daftar
            </button>
          )}

          <span className={classes.AdditionalLinks}>
            Sudah punya akun?{' '}
            <span className={classes.LoginFormLink} onClick={onCompanyLogin}>
              Masuk di sini
            </span>
          </span>
        </div>
      </form>
    </Fragment>
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
    login: payload => dispatch({ type: actionTypes.AUTHLOGIN, payload }),
    authCompany: () => dispatch({ type: actionTypes.AUTHCOMPANY }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CompanyRegisForm));
