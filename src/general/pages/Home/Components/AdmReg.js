import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useForm } from '../../../../shared/utils/useForm';
import moment from 'moment';
import * as actionTypes from '../../../../store/actions/actions';
import * as actionCreators from '../../../../store/actions/index';

import Button from '@material-ui/core/Button';
import Modal from '../../../../shared/UI_Element/Modal';
import Input from '../../../../shared/UI_Element/Input';
import SpinnerCircle from '../../../../shared/UI_Element/Spinner/SpinnerCircle';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_ALWAYSTRUE,
} from '../../../../shared/utils/validator';

import classes from './AdmReg.module.css';

const Register = (props) => {
  const [formState, onInputHandler] = useForm(
    {
      NIK: {
        value: '',
        isValid: false,
      },
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
      gender: {
        value: '',
        isValid: false,
      },
      dateOfBirth: {
        value: '',
        isValid: false,
      },
      address: {
        value: '',
        isValid: false,
      },
      phoneNumber: {
        value: '',
        isValid: false,
      },
      role: {
        value: '',
        isValid: false,
      },
      verificationKey: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  console.log(formState);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const newAdmin = {
      NIK: formState.inputs.NIK.value,
      firstName: formState.inputs.firstName.value,
      lastName: formState.inputs.lastName.value,
      email: formState.inputs.email.value,
      password: formState.inputs.password.value,
      gender: formState.inputs.gender.value,
      dateOfBirth: formState.inputs.dateOfBirth.value,
      address: formState.inputs.address.value,
      phoneNumber: formState.inputs.phoneNumber.value,
      role: formState.inputs.role.value,
      verificationKey: formState.inputs.verificationKey.value,
    };

    try {
      const res = await props.admReg(newAdmin);
      console.log(res);
      if (res.token) {
        props.history.push(`/jobs-dashboard`);
      } else {
        throw new Error('Error nih bro');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onManualInputHandler = (e) => {
    const elementId = e.target.name;
    const elementValue = e.target.value;

    onInputHandler(elementId, elementValue, true);
  };

  let formContent = (
    <React.Fragment>
      <div className={classes.ContainerFlex}>
        <p className={classes.FormTitle}>Admin Sign Up</p>

        <div className={classes.Content}>
          <div className={classes.ContentTop}>
            <div className={classes.ContentLeft}>
              <Input
                inputType='input'
                id='email'
                InputClass='Register'
                validatorMethod={[VALIDATOR_EMAIL()]}
                onInputHandler={onInputHandler}
                label='Email*'
                helperText='Alamat email tidak valid'
              />

              <Input
                inputType='input'
                id='NIK'
                InputClass='Register'
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label='NIK*'
                helperText='Tuliskan NIK sesuai KTP'
              />

              <Input
                inputType='input'
                id='firstName'
                InputClass='Register'
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label='Nama Depan*'
                helperText='Tuliskan nama depan sesuai KTP'
              />

              <Input
                inputType='input'
                id='role'
                InputClass='Register'
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label='Pekerjaan*'
                helperText='Tuliskan pekerjaan sesuai KTP'
              />

              <div style={{ marginTop: '1.2rem' }}>
                <p className={classes.Text} style={{ marginBottom: '0.2rem' }}>
                  Tanggal Lahir*
                </p>
                <Input
                  inputType='customdate'
                  className={classes.Register}
                  id='dateOfBirth'
                  validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
                  onInputHandler={onInputHandler}
                  initIsValid={true}
                  label='Tanggal Lahir'
                  maxDate={moment()}
                  views={['year', 'month', 'date']}
                  format='dd/MM/yyyy'
                  style={{ width: '100%' }}
                  helperText='Tuliskan tanggal lahir sesuai KTP'
                />
              </div>
            </div>

            <div className={classes.ContentRight}>
              <Input
                inputType='input'
                id='password'
                InputClass='Register'
                validatorMethod={[VALIDATOR_MINLENGTH(8)]}
                onInputHandler={onInputHandler}
                label='Password*'
                type='password'
                helperText='Password minimal 8 karakter'
              />

              <Input
                inputType='input'
                id='lastName'
                InputClass='Register'
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label='Nama Belakang*'
                helperText='Tuliskan nama belakang sesuai KTP'
              />

              <Input
                inputType='input'
                id='phoneNumber'
                InputClass='Register'
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label='Nomor Telepon*'
                helperText='Nomor telepon tidak valid'
              />

              <Input
                inputType='input'
                id='address'
                InputClass='Register'
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label='Alamat*'
                helperText='Tuliskan alamat sesuai KTP'
              />

              <div
                id='gender'
                onChange={onManualInputHandler}
                style={{ marginTop: '1.3rem' }}
              >
                <p className={classes.Text}>Jenis Kelamin*</p>
                <div className={classes.RadioHolder}>
                  <label
                    style={{ marginRight: '2rem' }}
                    className={classes.RadioButton}
                  >
                    <input type='radio' value='male' name='gender' id='male' />{' '}
                    Pria
                  </label>
                  <label className={classes.RadioButton}>
                    <input
                      type='radio'
                      value='female'
                      name='gender'
                      id='female'
                    />{' '}
                    Wanita
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className={classes.ContentBottom}>
            <Input
              inputType='input'
              id='verificationKey'
              InputClass='Register'
              validatorMethod={[VALIDATOR_REQUIRE()]}
              onInputHandler={onInputHandler}
              label='Kode Verifikasi*'
              type='password'
              helperText='Kode verifikasi yang dimasukkan salah'
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

            <span className={classes.Sign}>
              <button
                className={classes.ChangeSign}
                type='button'
                onClick={props.switchSignIn}
              >
                Admin Sign In
              </button>
            </span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );

  if (props.isLoading) {
    formContent = <SpinnerCircle />;
  }

  const onCancelHandler = () => {
    props.admLogout();
  };

  return (
    <form onSubmit={onSubmitHandler} className={classes.Container}>
      <Modal show={props.admin.error} onCancel={onCancelHandler}>
        Mohon periksa kembali input yang dimasukkan
      </Modal>
      {formContent}
    </form>
  );
};
const mapStateToProps = (state) => {
  return {
    admin: state.admin,
    isLoading: state.admin.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    admLogout: () => dispatch({ type: actionTypes.ADMINLOGOUT }),
    admReg: (payload) => dispatch(actionCreators.admReg(payload)),
    login: (payload) => dispatch({ type: actionTypes.AUTHLOGIN, payload }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Register));
