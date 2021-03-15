import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { useParams, withRouter } from 'react-router-dom';
import { useForm } from '../../../../../shared/utils/useForm';

import * as actionTypes from '../../../../../store/actions/actions';
import * as actionCreators from '../../../../../store/actions/index';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_ALWAYSTRUE,
} from '../../../../../shared/utils/validator';

import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Modal from '../../../../../shared/UI_Element/Modal';
import SpinnerCircle from '../../../../../shared/UI_Element/Spinner/SpinnerCircle';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Input from '../../../../../shared/UI_Element/Input';
import WorkFieldData from '../../../../../shared/UI_Element/WorkFieldData';
import LocationData from '../../../../../shared/UI_Element/LocationData';

import classes from './EditIntro.module.css';

const EditIntro = (props) => {
  const { applicantid } = useParams();
  const [data, setData] = useState();
  const [open, setOpen] = useState([false, false, false]);

  const [interest, setInterest] = useState(['', '', '']);

  const [location, setLocation] = useState('');
  const [locationOpen, setLocationOpen] = useState(false);

  const { getOneApplicant } = props;
  useEffect(() => {
    const payload = {
      applicantId: applicantid,
      token: props.auth.token,
    };
    if (props.auth.token) {
      getOneApplicant(payload).then((res) => {
        setInterest(res.applicant.interest);
        setLocation(res.applicant.state);
        setData(res.applicant);
      });
    }
  }, [getOneApplicant, applicantid, props.auth.token]);

  const [formState, onInputHandler] = useForm(
    {
      picture: {
        value: data ? data.picture : null,
        isValid: true,
      },
      firstName: {
        value: data ? data.firstName : null,
        isValid: data && data.firstName ? true : false,
      },
      lastName: {
        value: data ? data.lastName : null,
        isValid: data && data.lastName ? true : false,
      },
      email: {
        value: data ? data.email : null,
        isValid: data && data.email ? true : false,
      },
      headline: {
        value: data ? data.headline : null,
        isValid: data && data.headline ? true : false,
      },
      dateOfBirth: {
        value: data ? data.dateOfBirth : null,
        isValid: data && data.dateOfBirth ? true : false,
      },
      gender: {
        value: data ? data.gender : null,
        isValid: data && data.gender ? true : false,
      },
      address: {
        value: data ? data.address : null,
        isValid: data && data.address ? true : false,
      },
      city: {
        value: data ? data.city : null,
        isValid: data && data.city ? true : false,
      },
      state: {
        value: data ? data.state : null,
        isValid: data && data.state ? true : false,
      },
      zip: {
        value: data ? data.zip : null,
        isValid: data && data.zip ? true : false,
      },
      phone: {
        value: data ? data.phone : null,
        isValid: data && data.phone ? true : false,
      },
      outOfTown: {
        value: data ? data.outOfTown : false,
        isValid: data && data.outOfTown ? true : false,
      },
      workShifts: {
        value: data ? data.workShifts : false,
        isValid: data && data.workShifts ? true : false,
      },
      autoSend: {
        value: data ? data.autoSend : false,
        isValid: data && data.autoSend ? true : false,
      },
      autoRemind: {
        value: data ? data.autoRemind : false,
        isValid: data && data.autoRemind ? true : false,
      },
      headhunterProgram: {
        value: data ? data.headhunterProgram : false,
        isValid: data && data.headhunterProgram ? true : false,
      },
      interest: {
        value: data ? data.interest : ['', '', ''],
        isValid: data && data.interest ? true : false,
      },
    },
    false
  );

  console.log(data);

  useEffect(() => {
    if (data) {
      const genderEl = document.getElementById(data.gender);
      const outOfTownEl = document.getElementById('outOfTown');
      const workShiftsEl = document.getElementById('workShifts');
      const autoSendEl = document.getElementById('autoSend');
      const autoRemindEl = document.getElementById('autoRemind');
      const headhunterProgramEl = document.getElementById('headhunterProgram');
      if (genderEl) genderEl.checked = true;
      outOfTownEl.checked = data.outOfTown;
      workShiftsEl.checked = data.workShifts;
      autoSendEl.checked = data.autoSend;
      autoRemindEl.checked = data.autoRemind;
      headhunterProgramEl.checked = data.headhunterProgram;
      onInputHandler('state', location, true);
      onInputHandler('gender', data.gender, true);
      onInputHandler('interest', data.interest, true);
      onInputHandler('autoSend', data.autoSend, true);
      onInputHandler('outOfTown', data.outOfTown, true);
      onInputHandler('workShifts', data.workShifts, true);
      onInputHandler('autoRemind', data.autoRemind, true);
      onInputHandler('headhunterProgram', data.headhunterProgram, true);
    }
  }, [data, onInputHandler, location]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!formState.formIsValid) {
      return props.updateApplicantFail();
    }

    const ApplicantData = {
      applicantId: applicantid,
      picture: formState.inputs.picture.value,
      firstName: formState.inputs.firstName.value,
      lastName: formState.inputs.lastName.value,
      headline: formState.inputs.headline.value,
      dateOfBirth: formState.inputs.dateOfBirth.value,
      gender: formState.inputs.gender.value,
      email: formState.inputs.email.value,
      address: formState.inputs.address.value,
      city: formState.inputs.city.value,
      state: formState.inputs.state.value,
      zip: formState.inputs.zip.value,
      phone: formState.inputs.phone.value,
      outOfTown: formState.inputs.outOfTown.value,
      workShifts: formState.inputs.workShifts.value,
      autoSend: formState.inputs.autoSend.value,
      autoRemind: formState.inputs.autoRemind.value,
      headhunterProgram: formState.inputs.headhunterProgram.value,
      interest: formState.inputs.interest.value,
      token: props.auth.token,
    };

    try {
      const res = await props.updateApplicantIntro(ApplicantData);
      if (res) {
        console.log(res);
      }
      props.history.push(`/ap/${applicantid}`);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(formState);

  const fowHandler = (e) => {
    let indexFow;
    switch (e.target.name) {
      case 'interest-1':
        indexFow = 0;
        break;
      case 'interest-2':
        indexFow = 1;
        break;
      case 'interest-3':
        indexFow = 2;
        break;
      default:
        indexFow = 0;
    }
    const elementId = 'interest';
    const elementArray = [...formState.inputs.interest.value];
    elementArray[indexFow] = e.target.value;
    setInterest(elementArray);
    onInputHandler(elementId, elementArray, true);
  };

  const handleOpen = (e) => {
    let index;
    switch (e.target.id) {
      case 'interest-1':
        index = 0;
        break;
      case 'interest-2':
        index = 1;
        break;
      case 'interest-3':
        index = 2;
        break;
      default:
        index = 0;
    }
    let openArray = [...open];
    openArray[index] = true;
    setOpen(openArray);
  };

  const handleClose = () => {
    setOpen([false, false, false]);
  };

  const onManualInputHandler = (e) => {
    const elementId = e.target.name;
    const elementValue = e.target.value;
    onInputHandler(elementId, elementValue, true);
  };

  const onCheckedInputHandler = (e) => {
    const elementId = e.target.name;
    const elementValue = e.target.checked;
    onInputHandler(elementId, elementValue, true);
  };

  //=================== Profile Picture Handler ====================
  const onUploadHandler = (e) => {
    const elementId = e.target.name;
    const elementFile = e.target.files[0];
    onInputHandler(elementId, elementFile, true);
  };

  //=================== State Handler ====================
  const onLocationHandler = (e) => {
    const elementId = e.target.name;
    const elementValue = e.target.value;
    onInputHandler(elementId, elementValue, true);
    setLocation(e.target.value);
  };

  const handleLocationClose = () => {
    setLocationOpen(false);
  };

  const handleLocationOpen = () => {
    setLocationOpen(true);
  };

  let formContent = <SpinnerCircle />;

  if (!props.isLoading && data) {
    formContent = (
      <React.Fragment>
        <div className={classes.ContainerFlex}>
          <p className={classes.FormTitle}>About Me</p>

          <div className={classes.Content}>
            <div className={classes.ProfilePicture}>
              {data.picture && data.picture.url ? (
                <div
                  className={classes.Avatar}
                  style={{
                    backgroundImage: `url('${data.picture.url}')`,
                  }}
                />
              ) : (
                <AccountCircleIcon
                  style={{
                    fontSize: '15rem',
                    marginBottom: '1rem',
                  }}
                />
              )}
              <label className={classes.InputButton}>
                <input
                  type='file'
                  name='picture'
                  id='picture'
                  onChange={onUploadHandler}
                  accept='.jpg, .jpeg, .png'
                />
                <span className={classes.InputButtonText}> Upload File </span>
              </label>
              {formState.inputs.picture.value ? (
                formState.inputs.picture.value.size > 500000 ? (
                  <span>
                    <em style={{ color: 'red' }}>
                      File is too large. Please provide max. 500kb image
                    </em>
                  </span>
                ) : (
                  <span>
                    <em>{formState.inputs.picture.value.name}</em>
                  </span>
                )
              ) : null}
            </div>

            <div className={classes.ContentTop}>
              <div className={classes.ContentLeft}>
                <div className={classes.ContentWrap}>
                  <Input
                    inputType='input'
                    id='firstName'
                    InputClass='AppInput'
                    validatorMethod={[VALIDATOR_REQUIRE()]}
                    onInputHandler={onInputHandler}
                    label='Nama depan*'
                    initValue={data.firstName}
                    initIsValid={true}
                  />

                  <Input
                    inputType='input'
                    id='lastName'
                    InputClass='AppInput'
                    validatorMethod={[VALIDATOR_REQUIRE()]}
                    onInputHandler={onInputHandler}
                    label='Nama belakang*'
                    initValue={data.lastName}
                    initIsValid={true}
                  />
                </div>

                <div className={classes.ContentWrap}>
                  <Input
                    inputType='input'
                    id='headline'
                    InputClass='AppInput'
                    validatorMethod={[VALIDATOR_REQUIRE()]}
                    onInputHandler={onInputHandler}
                    label='Gelar*'
                    initValue={data.headline}
                    initIsValid={true}
                  />

                  <Input
                    inputType='input'
                    id='email'
                    InputClass='AppInput'
                    validatorMethod={[VALIDATOR_EMAIL()]}
                    onInputHandler={onInputHandler}
                    label='Email*'
                    initValue={data.email}
                    initIsValid={true}
                  />
                </div>

                <div className={classes.ContentWrap}>
                  <Input
                    inputType='input'
                    id='phone'
                    InputClass='AppInput'
                    validatorMethod={[VALIDATOR_REQUIRE()]}
                    onInputHandler={onInputHandler}
                    label='Nomor telepon*'
                    initValue={data.phone}
                    initIsValid={true}
                  />

                  <FormControl
                    className={classes.formControl}
                    style={{ marginTop: '0rem' }}
                  >
                    <InputLabel shrink id='stateLabel'>
                      Provinsi*
                    </InputLabel>

                    <Select
                      style={{
                        fontSize: '0.9rem',
                        textAlign: 'left',
                        paddingBottom: '0.15rem',
                        color: 'black',
                      }}
                      id='state'
                      name='state'
                      open={locationOpen}
                      onClose={handleLocationClose}
                      onOpen={handleLocationOpen}
                      value={location}
                      onChange={onLocationHandler}
                    >
                      <MenuItem value='' style={{ fontSize: '0.9rem' }}>
                        <em>Kosong</em>
                      </MenuItem>
                      {LocationData.sort().map((work, i) => {
                        return (
                          <MenuItem
                            id={i}
                            value={work}
                            style={{ fontSize: '0.9rem' }}
                            key={i}
                          >
                            {work}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </div>

                <div className={classes.ContentWrap}>
                  <Input
                    inputType='input'
                    id='city'
                    InputClass='AppInput'
                    validatorMethod={[VALIDATOR_REQUIRE()]}
                    onInputHandler={onInputHandler}
                    label='Kota*'
                    initValue={data.city}
                    initIsValid={true}
                  />

                  <Input
                    inputType='input'
                    id='address'
                    InputClass='AppInput'
                    validatorMethod={[VALIDATOR_REQUIRE()]}
                    onInputHandler={onInputHandler}
                    label='Alamat saat ini*'
                    initValue={data.address}
                    initIsValid={true}
                  />
                </div>

                <div className={classes.ContentWrap}>
                  <Input
                    inputType='input'
                    id='zip'
                    InputClass='AppInput'
                    validatorMethod={[VALIDATOR_REQUIRE()]}
                    onInputHandler={onInputHandler}
                    label='Zip*'
                    initValue={data.zip}
                    initIsValid={true}
                  />

                  <FormControl
                    className={classes.formControl}
                    style={{ marginTop: '0rem' }}
                  >
                    <InputLabel shrink id='interestLabel1'>
                      Bidang minat 1*
                    </InputLabel>

                    <Select
                      labelId='interestLabel1'
                      id='interest-1'
                      name='interest-1'
                      open={open[0]}
                      onClose={handleClose}
                      onOpen={handleOpen}
                      value={interest[0] ? interest[0] : ''}
                      onChange={fowHandler}
                      style={{
                        fontSize: '0.9rem',
                        textAlign: 'left',
                        paddingBottom: '0.15rem',
                        color: 'black',
                      }}
                    >
                      <MenuItem value='' style={{ fontSize: '0.9rem' }}>
                        <em>Belum ada untuk saat ini</em>
                      </MenuItem>
                      {WorkFieldData.sort().map((work, i) => {
                        return (
                          <MenuItem
                            id={i}
                            value={work}
                            style={{ fontSize: '0.9rem' }}
                            key={i}
                          >
                            {work}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </div>

                <div className={classes.ContentWrap}>
                  <FormControl
                    className={classes.formControl}
                    style={{ marginTop: '0.5rem' }}
                  >
                    <InputLabel shrink id='interestLabel2'>
                      Bidang minat 2
                    </InputLabel>

                    <Select
                      labelId='interestLabel2'
                      id='interest-2'
                      name='interest-2'
                      open={open[1]}
                      onClose={handleClose}
                      onOpen={handleOpen}
                      value={interest[1] ? interest[1] : ''}
                      onChange={fowHandler}
                      style={{
                        fontSize: '0.9rem',
                        textAlign: 'left',
                        paddingBottom: '0.15rem',
                        color: 'black',
                      }}
                    >
                      <MenuItem value='' style={{ fontSize: '0.9rem' }}>
                        <em>Belum ada untuk saat ini</em>
                      </MenuItem>
                      {WorkFieldData.sort().map((work, i) => {
                        return (
                          <MenuItem
                            id={i}
                            value={work}
                            style={{ fontSize: '0.9rem' }}
                            key={i}
                          >
                            {work}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>

                  <FormControl
                    className={classes.formControl}
                    style={{ marginTop: '0.5rem' }}
                  >
                    <InputLabel shrink id='interestLabel3'>
                      Bidang minat 3
                    </InputLabel>

                    <Select
                      labelId='interestLabel3'
                      id='interest-3'
                      name='interest-3'
                      open={open[2]}
                      onClose={handleClose}
                      onOpen={handleOpen}
                      value={interest[2] ? interest[2] : ''}
                      onChange={fowHandler}
                      style={{
                        fontSize: '0.9rem',
                        textAlign: 'left',
                        paddingBottom: '0.15rem',
                        color: 'black',
                      }}
                    >
                      <MenuItem value='' style={{ fontSize: '0.9rem' }}>
                        <em>Belum ada untuk saat ini</em>
                      </MenuItem>
                      {WorkFieldData.sort().map((work, i) => {
                        return (
                          <MenuItem
                            id={i}
                            value={work}
                            style={{ fontSize: '0.9rem' }}
                            key={i}
                          >
                            {work}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </div>

                <div
                  className={classes.ContentWrap}
                  style={{ marginTop: '0.5rem' }}
                >
                  <div>
                    <p
                      className={classes.Text}
                      style={{ marginBottom: '0.2rem' }}
                    >
                      Tanggal Lahir*
                    </p>
                    <Input
                      inputType='customdate'
                      id='dateOfBirth'
                      validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
                      onInputHandler={onInputHandler}
                      views={['year', 'month', 'date']}
                      label='Tanggal Lahir'
                      maxDate={moment()}
                      initValue={data.dateOfBirth}
                      initIsValid={true}
                      format='dd/MM/yyyy'
                      style={{ width: '100%' }}
                    />
                  </div>

                  <div
                    id='gender'
                    onChange={onManualInputHandler}
                    style={{ marginTop: '-1rem' }}
                  >
                    <p className={classes.Text}>Jenis Kelamin*</p>
                    <div className={classes.RadioHolder}>
                      <label
                        style={{ marginRight: '2rem' }}
                        className={classes.RadioButton}
                      >
                        <input
                          type='radio'
                          value='male'
                          name='gender'
                          id='male'
                        />{' '}
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
            </div>

            <div className={classes.ContentBottom}>
              <label
                onChange={onCheckedInputHandler}
                className={classes.CheckBox}
              >
                <input id='outOfTown' type='checkbox' name='outOfTown' />
                <p style={{ margin: '0', marginLeft: '4px' }}>
                  Bersedia ditempatkan di luar kota asal
                </p>
              </label>
              <label
                onChange={onCheckedInputHandler}
                className={classes.CheckBox}
              >
                <input id='workShifts' type='checkbox' name='workShifts' />
                <p style={{ margin: '0', marginLeft: '4px' }}>
                  Bersedia bekerja dengan sistem shift
                </p>
              </label>
              <label
                onChange={onCheckedInputHandler}
                className={classes.CheckBox}
              >
                <input id='autoSend' type='checkbox' name='autoSend' />
                <p style={{ margin: '0', marginLeft: '4px' }}>
                  Saya bersedia didaftarkan kerja secara otomatis oleh Crossbell
                </p>
              </label>
              <label
                onChange={onCheckedInputHandler}
                className={classes.CheckBox}
              >
                <input id='autoRemind' type='checkbox' name='autoRemind' />
                <p style={{ margin: '0', marginLeft: '4px' }}>
                  Berikan notifikasi bila ada pekerjaan sesuai bidang minat
                </p>
              </label>
              <label
                onChange={onCheckedInputHandler}
                className={classes.CheckBox}
              >
                <input
                  id='headhunterProgram'
                  type='checkbox'
                  name='headhunterProgram'
                />
                <p style={{ margin: '0', marginLeft: '4px' }}>
                  Saya ingin mengikuti headhunter program Crossbell asal
                </p>
              </label>
            </div>
          </div>

          <div className={classes.Footer}>
            <Button
              disabled={!formState.formIsValid}
              variant='contained'
              color='primary'
              type='submit'
            >
              Save
            </Button>
          </div>
        </div>
      </React.Fragment>
    );
  }

  const onCancelHandler = () => {
    props.resetApplicant();
  };

  return (
    <form onSubmit={onSubmitHandler} className={classes.Container}>
      <Modal show={props.error} onCancel={onCancelHandler}>
        Could not update changes at the moment, please try again later
      </Modal>
      {formContent}
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.applicant.isLoading,
    error: state.applicant.error,
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateApplicantFail: () =>
      dispatch({ type: actionTypes.UPDATEAPPLICANTFAIL }),
    resetApplicant: () => dispatch({ type: actionTypes.APPLICANTRESET }),
    getOneApplicant: (data) => dispatch(actionCreators.getOneApplicant(data)),
    updateApplicantIntro: (ApplicantData) =>
      dispatch(actionCreators.updateApplicantIntro(ApplicantData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditIntro));
