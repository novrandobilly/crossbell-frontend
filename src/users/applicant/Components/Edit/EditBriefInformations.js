import React, { useEffect, useState, useReducer } from 'react';
import { Button } from '@mui/material';
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

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import LoadingBar from '../../../../shared/UI_Element/Spinner/LoadingBar';
import Input from '../../../../shared/UI_Element/Input';

import WorkFieldData from '../../../../shared/UI_Element/PredefinedData/WorkFieldData';
import CitiesData from '../../../../shared/UI_Element/PredefinedData/CitiesData';
import ProvinceData, { ProvinceToCity } from '../../../../shared/UI_Element/PredefinedData/ProvinceData';

import styles from './EditBriefInformations.module.scss';

const CustomTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    padding: '0',
    '& .MuiOutlinedInput-input': {
      padding: '5px',
    },
    '& fieldset': {
      border: '2px solid #f79f35',
      borderRadius: '5px',
    },
    '&.Mui-focused fieldset': {
      border: '2px solid #f79f35',
    },
    '&:hover fieldset': {
      border: '2px solid #f79f35',
    },
  },
});

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

const EditBriefInformations = props => {
  const { applicantid } = useParams();
  const [data, setData] = useState();
  const [interest, setInterest] = useState([]);
  const [locationState, dispatch] = useReducer(locationReducer, initialLocation);
  const [city, setCity] = useState(CitiesData.default);

  console.log(city);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { getOneApplicant } = props;
  useEffect(() => {
    const payload = {
      applicantId: applicantid,
      token: props.auth.token,
    };
    if (props.auth.token) {
      getOneApplicant(payload).then(res => {
        setInterest(res.applicant.interest);
        dispatch({
          type: LOC.INITFETCH,
          province: res.applicant.state,
          citySelected: res.applicant.city,
        });
        setData(res.applicant);
        ProvinceToCity(res.applicant.state, setCity);
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

      if (genderEl) genderEl.selected = true;
      outOfTownEl.checked = data.outOfTown;
      workShiftsEl.checked = data.workShifts;

      onInputHandler('interest', data.interest, true);
      onInputHandler('outOfTown', data.outOfTown, true);
      onInputHandler('gender', data.gender, !!genderEl);
      onInputHandler('workShifts', data.workShifts, true);
      onInputHandler('state', locationState.province, true);

      onInputHandler('city', locationState.citySelected, locationState.citySelected ? true : false);
    }
  }, [data, onInputHandler, locationState, city]);

  const onSubmitHandler = async event => {
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

  const onManualInputHandler = e => {
    const elementId = e.target.name;
    const elementValue = e.target.value;
    onInputHandler(elementId, elementValue, true);
  };

  const onCheckedInputHandler = e => {
    const elementId = e.target.name;
    const elementValue = e.target.checked;
    onInputHandler(elementId, elementValue, true);
  };

  //=================== State Handler ====================

  const handleStateChange = (e, value) => {
    ProvinceToCity(value, setCity);
    onInputHandler('state', value, true);
    dispatch({ type: LOC.CHGPROVINCE, province: value });
    onInputHandler('city', '', false);
  };

  const handleCityChange = (e, value) => {
    onInputHandler('city', value, true);
    dispatch({ type: LOC.CHGCITY, citySelected: value });
  };

  let formContent = <LoadingBar />;

  if (!props.isLoading && data) {
    formContent = (
      <form onSubmit={onSubmitHandler} className={styles.BiodataContainer}>
        <section className={styles.ContactInformations}>
          <Input
            inputType='input'
            id='firstName'
            InputClass='AppInput'
            validatorMethod={[VALIDATOR_REQUIRE()]}
            onInputHandler={onInputHandler}
            label={true}
            labelName='Nama Depan*'
            initValue={data.firstName}
            initIsValid={data.firstName ? true : false}
            helperText='Nama depan wajib diisi'
          />

          <Input
            inputType='input'
            id='lastName'
            InputClass='AppInput'
            validatorMethod={[VALIDATOR_REQUIRE()]}
            onInputHandler={onInputHandler}
            label={true}
            labelName='Nama Belakang*'
            initValue={data.lastName}
            initIsValid={data.lastName ? true : false}
            helperText='Nama belakang wajib diisi'
          />

          <Input
            inputType='input'
            id='headline'
            InputClass='AppInput'
            validatorMethod={[VALIDATOR_REQUIRE()]}
            onInputHandler={onInputHandler}
            label={true}
            labelName='Headline'
            initValue={data.headline}
            initIsValid={data.headline ? true : false}
            placeholder='c/o. Web Developer, Digital Marketing Associate, Finance Staff, dsb.'
          />

          <Input
            inputType='datePicker'
            id='dateOfBirth'
            validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
            onInputHandler={onInputHandler}
            maxDate={moment()}
            initValue={data.dateOfBirth ? data.dateOfBirth : null}
            initIsValid={data.dateOfBirth ? data.dateOfBirth : false}
            label={true}
            labelName='Tanggal Lahir'
            style={{ width: '100%', maxWidth: '500px' }}
            ContainerStyle={{ width: '100%', maxWidth: '500px' }}
          />

          <div id='gender' className={styles.GenderContainer} onChange={onManualInputHandler}>
            <p className={styles.GenderLabel}>Jenis Kelamin*</p>
            <select name='gender' id='gender' className={styles.GenderOptions}>
              <option value='male' id='male'>
                Pria
              </option>
              <option value='female' id='female'>
                Wanita
              </option>
            </select>
          </div>

          <Input
            inputType='input'
            id='email'
            InputClass='AppInput'
            validatorMethod={[VALIDATOR_EMAIL()]}
            onInputHandler={onInputHandler}
            label={true}
            labelName='Email*'
            initValue={data.email}
            initIsValid={data.email ? data.email : false}
            helperText='Mohon input email yang valid'
          />

          <Input
            inputType='input'
            id='phone'
            InputClass='AppInput'
            validatorMethod={[VALIDATOR_REQUIRE()]}
            onInputHandler={onInputHandler}
            label={true}
            labelName='Nomor Telepon'
            initValue={data.phone}
            initIsValid={data.phone ? data.phone : false}
            helperText='Mohon masukkan nomor telepon  yang aktif'
          />
        </section>

        <section className={styles.AddressContainer}>
          <div className={styles.RegionContainer}>
            <p>
              Provinsi <span>(Silahkan isi manual apabila tidak ada dalam pilihan)</span>
            </p>
            <Autocomplete
              id='state'
              name='state'
              freeSolo
              options={ProvinceData.sort().map(option => option)}
              onChange={handleStateChange}
              value={locationState.province}
              renderInput={params => <CustomTextField {...params} />}
            />
          </div>
          <div className={styles.RegionContainer}>
            <p>
              Kota <span>(Silahkan isi manual apabila tidak ada dalam pilihan)</span>
            </p>
            <Autocomplete
              id='city'
              name='city'
              freeSolo
              options={city.map(option => option)}
              onChange={handleCityChange}
              value={locationState.citySelected}
              renderInput={params => <CustomTextField {...params} />}
            />
          </div>

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
        </section>

        <div className={styles.ContentWrapFull}>
          <Autocomplete
            multiple
            id='interest'
            name='interest'
            options={WorkFieldData.sort().map(option => option.field)}
            getOptionLabel={option => option}
            onChange={fowHandler}
            value={interest ? interest : ''}
            style={{ margin: '0' }}
            renderInput={params => (
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

        <div className={styles.ContentWrapFull}>
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
            helperText={formState.inputs.salary.value < 0 ? 'Harapan gaji minimal 0' : 'Harapan gaji wajib diisi'}
          />
        </div>

        <div className={styles.WorkingAvailability}>
          <label onChange={onCheckedInputHandler} className={styles.CheckBox}>
            <input id='outOfTown' type='checkbox' name='outOfTown' />
            <p style={{ margin: '0', marginLeft: '4px' }}>Bersedia ditempatkan di luar kota asal</p>
          </label>
          <label onChange={onCheckedInputHandler} className={styles.CheckBox}>
            <input id='workShifts' type='checkbox' name='workShifts' />
            <p style={{ margin: '0', marginLeft: '4px' }}>Bersedia bekerja dengan sistem shift</p>
          </label>
        </div>

        <div className={styles.Footer}>
          <Link to={`/ap/${applicantid}/profile`}>
            <Button variant='outlined' type='Button' disableElevation style={{ marginRight: '16px' }}>
              Back
            </Button>
          </Link>
          <Button
            disabled={formState.inputs.interest.value.length <= 0 || !formState.formIsValid}
            variant='contained'
            color='primary'
            type='submit'>
            Save
          </Button>
        </div>
      </form>
    );
  }

  return formContent;
};

const mapStateToProps = state => {
  return {
    isLoading: state.applicant.isLoading,
    error: state.applicant.error,
    auth: state.auth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateApplicantFail: () => dispatch({ type: actionTypes.UPDATEAPPLICANTFAIL }),
    getOneApplicant: data => dispatch(actionCreators.getOneApplicant(data)),
    updateApplicantIntro: ApplicantData => dispatch(actionCreators.updateApplicantIntro(ApplicantData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditBriefInformations));
