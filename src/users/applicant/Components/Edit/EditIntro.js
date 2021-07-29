import React, { useEffect, useState, useReducer } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { useParams, withRouter, Link } from 'react-router-dom';
import { useForm } from '../../../../shared/utils/useForm';

import * as actionTypes from '../../../../store/actions/actions';
import * as actionCreators from '../../../../store/actions/index';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_ALWAYSTRUE,
  VALIDATOR_MIN,
} from '../../../../shared/utils/validator';

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Modal from '../../../../shared/UI_Element/Modal';
import SpinnerCircle from '../../../../shared/UI_Element/Spinner/SpinnerCircle';
import Cities from '../../../../shared/UI_Element/CitiesData';
import Input from '../../../../shared/UI_Element/Input';
import WorkFieldData from '../../../../shared/UI_Element/WorkFieldData';
import LocationData from '../../../../shared/UI_Element/LocationData';

import classes from './EditIntro.module.css';

const initialLocation = {
  province: '',
  citySelected: '',
};

const LOC = {
  INITFETCH: 'initialFetch',
  CHGPROVINCE: 'changeProvince',
  CHGCITY: 'changeCity',
};

const locationReducer = (state, action) => {
  switch (action.type) {
    case LOC.INITFETCH:
      return {
        province: action.province,
        citySelected: action.citySelected,
      };
    case LOC.CHGPROVINCE:
      return {
        province: action.province,
        citySelected: '',
      };
    case LOC.CHGCITY:
      return {
        ...state,
        citySelected: action.citySelected,
      };
    default:
      return state;
  }
};

const EditIntro = (props) => {
  const { applicantid } = useParams();
  const [data, setData] = useState();

  const [interest, setInterest] = useState([]);

  const [file, setFile] = useState();

  const [locationState, dispatch] = useReducer(
    locationReducer,
    initialLocation
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [city, setCity] = useState(Cities.default);

  const ProvCityRelation = (prov) => {
    switch (prov) {
      case 'Aceh':
        setCity(Cities.Aceh);
        break;

      case 'Sumatera Utara':
        setCity(Cities.SumUt);
        break;

      case 'Sumatera Barat':
        setCity(Cities.SumBar);
        break;

      case 'Riau':
        setCity(Cities.Riau);
        break;

      case 'Kepulauan Riau':
        setCity(Cities.KepulauanRiau);
        break;

      case 'Jambi':
        setCity(Cities.Jambi);
        break;

      case 'Sumatera Selatan':
        setCity(Cities.SumSel);
        break;

      case 'Kepulauan Bangka Belitung':
        setCity(Cities.BangkaBelitung);
        break;

      case 'Bengkulu':
        setCity(Cities.Bengkulu);
        break;

      case 'Lampung':
        setCity(Cities.Lampung);
        break;

      case 'DKI Jakarta':
        setCity(Cities.Jakarta);
        break;

      case 'Banten':
        setCity(Cities.Banten);
        break;

      case 'Jawa Barat':
        setCity(Cities.JawaBarat);
        break;

      case 'Jawa Tengah':
        setCity(Cities.JawaTengah);
        break;

      case 'DI Yogyakarta':
        setCity(Cities.Yogyakarta);
        break;

      case 'Jawa Timur':
        setCity(Cities.JawaTimur);
        break;

      case 'Bali':
        setCity(Cities.Bali);
        break;

      case 'Nusa Tenggara Barat':
        setCity(Cities.NTB);
        break;

      case 'Nusa Tenggara Timur':
        setCity(Cities.NTT);
        break;

      case 'Kalimantan Barat':
        setCity(Cities.KalBar);
        break;

      case 'Kalimantan Timur':
        setCity(Cities.KalTim);
        break;

      case 'Kalimantan Tengah':
        setCity(Cities.KalTengh);
        break;

      case 'Kalimantan Utara':
        setCity(Cities.KalUt);
        break;

      case 'Kalimantan Selatan':
        setCity(Cities.KalSel);
        break;

      case 'Gorontalo':
        setCity(Cities.Gorontalo);
        break;

      case 'Sulawesi Barat':
        setCity(Cities.SulBar);
        break;

      case 'Sulawesi Timur':
        setCity(Cities.SumTim);
        break;

      case 'Sulawesi Tengah':
        setCity(Cities.SulTengah);
        break;

      case 'Sulawesi Tenggara':
        setCity(Cities.SulTenggara);
        break;

      case 'Sulawesi Selatan':
        setCity(Cities.SulSel);
        break;

      case 'Maluku':
        setCity(Cities.Maluku);
        break;

      case 'Maluku Utara':
        setCity(Cities.MalukuUtara);
        break;

      case 'Papua':
        setCity(Cities.Papua);
        break;

      case 'Papua Barat':
        setCity(Cities.PapuaBarat);
        break;

      default: {
        return Cities.default;
      }
    }
  };

  const { getOneApplicant } = props;
  useEffect(() => {
    const payload = {
      applicantId: applicantid,
      token: props.auth.token,
    };
    if (props.auth.token) {
      getOneApplicant(payload).then((res) => {
        setInterest(res.applicant.interest);
        dispatch({
          type: LOC.INITFETCH,
          province: res.applicant.state,
          citySelected: res.applicant.city,
        });
        setData(res.applicant);
        ProvCityRelation(res.applicant.state);
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
        value: locationState.city ? locationState.city : null,
        isValid: locationState.city ? true : false,
      },
      state: {
        value: locationState.province ? locationState.province : null,
        isValid: locationState.province ? true : false,
      },
      zip: {
        value: data ? data.zip : null,
        isValid: data && data.zip ? true : false,
      },
      phone: {
        value: data ? data.phone : null,
        isValid: data && data.phone ? true : false,
      },
      salary: {
        value: data ? data.salary : null,
        isValid: data && data.salary ? true : false,
      },
      outOfTown: {
        value: data ? data.outOfTown : false,
        isValid: data && data.outOfTown ? true : false,
      },
      workShifts: {
        value: data ? data.workShifts : false,
        isValid: data && data.workShifts ? true : false,
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

  useEffect(() => {
    if (data) {
      const genderEl = document.getElementById(data.gender);
      const outOfTownEl = document.getElementById('outOfTown');
      const workShiftsEl = document.getElementById('workShifts');
      const headhunterProgramEl = document.getElementById('headhunterProgram');

      if (genderEl) genderEl.checked = true;
      outOfTownEl.checked = data.outOfTown;
      workShiftsEl.checked = data.workShifts;
      headhunterProgramEl.checked = data.headhunterProgram;

      onInputHandler('interest', data.interest, true);
      onInputHandler('outOfTown', data.outOfTown, true);
      onInputHandler('gender', data.gender, !!genderEl);
      onInputHandler('workShifts', data.workShifts, true);
      onInputHandler('state', locationState.province, true);
      onInputHandler('headhunterProgram', data.headhunterProgram, true);
      onInputHandler(
        'city',
        locationState.citySelected,
        locationState.citySelected ? true : false
      );
    }
  }, [data, onInputHandler, locationState, city]);

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
      salary: formState.inputs.salary.value,
      workShifts: formState.inputs.workShifts.value,
      headhunterProgram: formState.inputs.headhunterProgram.value,
      interest: formState.inputs.interest.value,
      token: props.auth.token,
    };

    try {
      await props.updateApplicantIntro(ApplicantData);

      props.history.push(`/ap/${applicantid}/profile`);
    } catch (err) {
      console.log(err);
    }
  };

  const fowHandler = (e, value) => {
    let elementArray = [...interest];
    elementArray = value;
    setInterest(elementArray);
    onInputHandler('interest', elementArray, true);
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
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  //=================== State Handler ====================

  const handleStateChange = (e, value) => {
    ProvCityRelation(value);
    onInputHandler('state', value, true);
    dispatch({ type: LOC.CHGPROVINCE, province: value });
    onInputHandler('city', '', false);
  };

  const handleCityChange = (e, value) => {
    onInputHandler('city', value, true);
    dispatch({ type: LOC.CHGCITY, citySelected: value });
  };

  let formContent = <SpinnerCircle />;

  if (!props.isLoading && data) {
    formContent = (
      <React.Fragment>
        <div className={classes.ContainerFlex}>
          <p className={classes.FormTitle}>Data Diri Pelamar</p>

          <div className={classes.Content}>
            <div className={classes.ProfilePicture}>
              {data.picture && data.picture.url ? (
                <div
                  className={classes.Avatar}
                  style={{
                    backgroundImage: `url('${data.picture.url}')`,
                  }}
                />
              ) : file ? (
                <div
                  className={classes.Avatar}
                  style={{
                    backgroundImage: `url('${file}')`,
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
              <span>
                <em style={{ color: 'gray' }}>Ukuran file max 500kb</em>
              </span>
              {formState.inputs.picture.value ? (
                formState.inputs.picture.value.size > 500000 ? (
                  <span>
                    <em style={{ color: 'red' }}>
                      File terlalu besar. Mohon gunakan file berukuran max 500kb
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
                  <div className={classes.InputDiv}>
                    <Input
                      inputType='input'
                      id='firstName'
                      InputClass='AppInput'
                      validatorMethod={[VALIDATOR_REQUIRE()]}
                      onInputHandler={onInputHandler}
                      label='Nama depan*'
                      initValue={data.firstName}
                      initIsValid={data.firstName ? true : false}
                      helperText='Nama depan wajib diisi'
                    />
                  </div>
                  <div className={classes.InputDiv}>
                    <Input
                      inputType='input'
                      id='lastName'
                      InputClass='AppInput'
                      validatorMethod={[VALIDATOR_REQUIRE()]}
                      onInputHandler={onInputHandler}
                      label='Nama belakang*'
                      initValue={data.lastName}
                      initIsValid={data.lastName ? true : false}
                      helperText='Nama belakang wajib diisi'
                    />
                  </div>
                </div>

                <div className={classes.ContentWrap}>
                  <div className={classes.InputDiv}>
                    <div>
                      <Input
                        inputType='customdate'
                        id='dateOfBirth'
                        validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
                        onInputHandler={onInputHandler}
                        views={['year', 'month', 'date']}
                        label='Tanggal Lahir'
                        maxDate={moment()}
                        initValue={data.dateOfBirth ? data.dateOfBirth : null}
                        initIsValid={
                          data.dateOfBirth ? data.dateOfBirth : false
                        }
                        format='dd/MM/yyyy'
                        style={{ width: '100%' }}
                        helperText='Tanggal lahir wajib diisi'
                      />
                    </div>
                  </div>

                  <div className={classes.InputDiv}>
                    <Input
                      inputType='input'
                      id='email'
                      InputClass='AppInput'
                      validatorMethod={[VALIDATOR_EMAIL()]}
                      onInputHandler={onInputHandler}
                      label='Email*'
                      initValue={data.email}
                      initIsValid={data.email ? data.email : false}
                      helperText='Mohon input email yang valid'
                    />
                  </div>
                </div>

                <div className={classes.ContentWrap}>
                  <div className={classes.InputDiv}>
                    <Input
                      inputType='input'
                      id='phone'
                      InputClass='AppInput'
                      validatorMethod={[VALIDATOR_REQUIRE()]}
                      onInputHandler={onInputHandler}
                      label='Nomor telepon*'
                      initValue={data.phone}
                      initIsValid={data.phone ? data.phone : false}
                      helperText='Mohon masukkan nomor telepon  yang aktif'
                    />
                  </div>

                  <div className={classes.InputDiv}>
                    <Autocomplete
                      id='state'
                      name='state'
                      options={LocationData.sort().map((option) => option)}
                      onChange={handleStateChange}
                      value={locationState.province}
                      style={{ margin: '0' }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          style={{ margin: '0' }}
                          label='Provinsi*'
                          margin='normal'
                          variant='standard'
                        />
                      )}
                    />
                  </div>
                </div>

                <div className={classes.ContentWrap}>
                  <div className={classes.InputDiv}>
                    <Autocomplete
                      id='city'
                      name='city'
                      options={city.map((option) => option)}
                      onChange={handleCityChange}
                      value={locationState.citySelected}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          style={{ margin: '0' }}
                          label='Kota*'
                          margin='normal'
                          variant='standard'
                        />
                      )}
                    />
                  </div>

                  <div className={classes.InputDiv}>
                    <Input
                      inputType='input'
                      id='address'
                      InputClass='AppInput'
                      validatorMethod={[VALIDATOR_REQUIRE()]}
                      onInputHandler={onInputHandler}
                      label='Alamat saat ini*'
                      initValue={data.address}
                      initIsValid={data.address ? data.address : false}
                      helperText='Alamat wajib diisi'
                    />
                  </div>
                </div>

                <div className={classes.ContentWrap}>
                  <div className={classes.InputDiv}>
                    <Input
                      inputType='input'
                      id='zip'
                      InputClass='AppInput'
                      validatorMethod={[VALIDATOR_REQUIRE()]}
                      onInputHandler={onInputHandler}
                      label='Kode Pos*'
                      initValue={data.zip}
                      initIsValid={data.zip ? data.zip : false}
                      helperText='Kode pos wajib diisi'
                    />
                  </div>

                  <div className={classes.InputDiv}>
                    <div id='gender' onChange={onManualInputHandler}>
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

                <div className={classes.ContentWrapFull}>
                  <div className={classes.InputDiv}>
                    <Input
                      inputType='input'
                      id='headline'
                      InputClass='AppInput'
                      validatorMethod={[VALIDATOR_REQUIRE()]}
                      onInputHandler={onInputHandler}
                      label='Headline*'
                      initValue={data.headline}
                      initIsValid={data.headline ? true : false}
                      helperText='Headline wajib diisi'
                    />
                  </div>
                </div>

                <div className={classes.ContentWrapFull}>
                  <div className={classes.InputDiv}>
                    <Autocomplete
                      multiple
                      id='interest'
                      name='interest'
                      options={WorkFieldData.sort().map(
                        (option) => option.field
                      )}
                      getOptionLabel={(option) => option}
                      onChange={fowHandler}
                      value={interest ? interest : ''}
                      style={{ margin: '0' }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          style={{ margin: '0' }}
                          label='Bidang pekerejaan yang diminati'
                          margin='normal'
                          variant='standard'
                        />
                      )}
                    />
                  </div>
                </div>

                <div className={classes.ContentWrapFull}>
                  <div className={classes.InputDiv}>
                    <Input
                      inputType='input'
                      id='salary'
                      validatorMethod={[VALIDATOR_MIN(0)]}
                      onInputHandler={onInputHandler}
                      error={false}
                      label='Harapan Gaji*'
                      initValue={data.salary}
                      initIsValid={data.salary ? true : false}
                      type='number'
                      min={0}
                      step='100000'
                      helperText={
                        formState.inputs.salary.value < 0
                          ? 'Harapan gaji minimal 0'
                          : 'Harapan gaji wajib diisi'
                      }
                    />
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
                <input
                  id='headhunterProgram'
                  type='checkbox'
                  name='headhunterProgram'
                />
                <p style={{ margin: '0', marginLeft: '4px' }}>
                  Saya ingin mengikuti program headhunter Crossbell
                </p>
              </label>
            </div>
          </div>

          <div className={classes.Footer}>
            <Link to={`/ap/${applicantid}/profile`}>
              <Button
                variant='outlined'
                type='Button'
                disableElevation
                style={{ marginRight: '16px' }}
              >
                Back
              </Button>
            </Link>
            <Button
              disabled={
                formState.inputs.interest.value.length <= 0 ||
                !formState.formIsValid
              }
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
