import React from 'react';

const test = () => {
  return (
    <React.Fragment>
      <div className={styles.Container}>
        <div className={styles.ApplicantContainer}>
          <div className={styles.ContainerLeft}>
            <Link to={`/ap/${props.id}/intro`}>
              {props.picture ? (
                <div
                  className={styles.Avatar}
                  style={{
                    backgroundImage: `url('${props.picture.url}')`,
                  }}
                />
              ) : (
                <div
                  className={styles.Avatar}
                  style={{
                    backgroundImage: `url('https://res.cloudinary.com/kalkulus/image/upload/v1616503057/Profile_w6vts3.png')`,
                  }}
                />
              )}
            </Link>

            <div className={styles.ContainerLeftDivider}>
              <p className={styles.Name}>
                {props.firstName} {props.lastName}
              </p>
              <p className={styles.Title}>{props.headline}</p>
              {(props.auth.isCompany || props.admin.isAdmin) && (
                <p className={styles.Email}>Harapan gaji: Rp.{props.salary.toLocaleString()},-</p>
              )}
              <p className={styles.Email}>{props.email}</p>
              <p className={styles.Email}>{props.phone}</p>
              <p className={styles.Address}>{props.address}</p>

              <div className={styles.ResumePreview}>
                {props.resume && (
                  <div className={styles.ResumeHolder}>
                    <img
                      className={styles.ResumePicture}
                      src={`${props.resume.url.slice(0, props.resume.url.length - 4) + '.jpg'}`}
                      alt='resume-preview'
                    />
                    <a
                      href={props.resume.url.slice(0, props.resume.url.length - 4) + '.jpg'}
                      target='_blank'
                      rel='noopener noreferrer'>
                      Preview Resume Here
                    </a>
                  </div>
                )}
              </div>
              {props.auth.userId === props.id && (
                <div>
                  <label className={styles.InputButton}>
                    <input
                      type='file'
                      name='resume'
                      id='resume'
                      onChange={onUploadHandler}
                      accept='.pdf'
                      style={{ display: 'none' }}
                    />
                    <span className={styles.InputButtonText}> Upload Resume </span>
                  </label>
                </div>
              )}

              {resumeFile && (
                <div className={styles.SaveResume}>
                  <p className={styles.FilePreview}>{resumeFile.name}</p>

                  {loadingResume ? (
                    <div className={styles.SaveText}>
                      <LoadingBar />
                    </div>
                  ) : (
                    <span className={styles.SaveText} onClick={onSubmitResumeHandler}>
                      {' '}
                      Save{' '}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className={styles.ContainerRight}>
            {props.auth.isAdmin && (
              <Link to={`/ad/alphaomega/applicants/${props.id}`}>
                <button> Jobs Applied </button>
              </Link>
            )}
            {props.auth.userId === props.id && (
              <Link to={`/ap/${props.id}/intro`}>
                <IconButton />
              </Link>
            )}
          </div>
        </div>
        <div className={styles.LangguagesDiv}>
          <div className={styles.LanguageHeader}>
            <p className={styles.LangguageTitle}>Kemampuan bahasa</p>
            <Link to={`/ap/${props.id}/language`}>
              <IconButton />
            </Link>
          </div>

          <div className={styles.LanguagesContent}>
            {props.languages.map((lang, i) => {
              return (
                <div className={styles.LanguagesBox} key={i}>
                  <p>{lang.langName}</p>
                  <p>{lang.rate}</p>
                </div>
              );
            })}
          </div>
        </div>{' '}
        {props.auth.userId === props.id && (
          <Link to={`/subscription/${props.id}`}>
            <div className={styles.SubscriptionButton}>Ubah Langganan</div>
          </Link>
        )}
      </div>

      <div className={styles.SegmentContainer}>
        <TextOnly
          id={props.id}
          labelName='Tentang Saya'
          route={`/ap/${props.id}/summary`}
          text={props.details}
          applicantid={props.id}
        />

        <RangeSegment
          id={props.id}
          labelName='Pengalaman Kerja'
          routeEdit={`/ap/${props.id}/experience`}
          routeAdd={`/ap/${props.id}/add/experience`}
          contents={props.experience.sort((a, b) => moment(b.startDate) - moment(a.startDate))}
          state='experience'
          isLoading={props.applicant.isLoading}
          token={props.auth.token}
          applicantid={props.id}
          buttonText='Tambah Pengalaman'
        />

        <RangeSegment
          id={props.id}
          labelName='Pendidikan'
          routeEdit={`/ap/${props.id}/education`}
          routeAdd={`/ap/${props.id}/add/education`}
          contents={props.education.sort((a, b) => moment(b.startDate) - moment(a.startDate))}
          state='education'
          isLoading={props.applicant.isLoading}
          token={props.auth.token}
          applicantid={props.id}
          buttonText='Tambah Pendidikan'
        />

        <RangeSegment
          id={props.id}
          labelName='Pengalaman Organisasi'
          routeEdit={`/ap/${props.id}/organization`}
          routeAdd={`/ap/${props.id}/add/organization`}
          contents={props.organization.sort((a, b) => moment(b.startDate) - moment(a.startDate))}
          state='organization'
          isLoading={props.applicant.isLoading}
          token={props.auth.token}
          applicantid={props.id}
          buttonText='Tambah Organisasi'
        />

        <RangeSegment
          id={props.id}
          labelName='Sertifikasi atau Penghargaan'
          routeEdit={`/ap/${props.id}/certification`}
          routeAdd={`/ap/${props.id}/add/certification`}
          contents={props.certification.sort((a, b) => moment(b.startDate) - moment(a.startDate))}
          state='certification'
          isLoading={props.applicant.isLoading}
          token={props.auth.token}
          applicantid={props.id}
          buttonText='Tambah Sertifikasi'
        />

        <SkillsMap
          id={props.id}
          labelName='Keterampilan'
          routeEdit={`/ap/${props.id}/skills`}
          routeAdd={`/ap/${props.id}/add/skills`}
          skills={props.skills}
          token={props.auth.token}
          applicantid={props.id}
        />
      </div>
    </React.Fragment>
  );
};

export default test;

// ============================================Edit Brief Informations=====================================================

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
import LoadingBar from '../../../../shared/UI_Element/Spinner/LoadingBar';
import Cities from '../../../../shared/UI_Element/CitiesData';
import Input from '../../../../shared/UI_Element/Input';
import WorkFieldData from '../../../../shared/UI_Element/WorkFieldData';
import LocationData from '../../../../shared/UI_Element/LocationData';

import styles from './EditBriefInformations.module.scss';

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

const EditIntro = props => {
  const { applicantid } = useParams();
  const [data, setData] = useState();
  const [interest, setInterest] = useState([]);
  const [file, setFile] = useState();
  const [locationState, dispatch] = useReducer(locationReducer, initialLocation);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [city, setCity] = useState(Cities.default);

  const ProvCityRelation = prov => {
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
      getOneApplicant(payload).then(res => {
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

  //=================== Profile Picture Handler ====================
  const onUploadHandler = e => {
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

  let formContent = <LoadingBar />;

  if (!props.isLoading && data) {
    formContent = (
      <React.Fragment>
        <div className={styles.ContainerFlex}>
          <p className={styles.FormTitle}>Data Diri Pelamar</p>

          <div className={styles.Content}>
            <div className={styles.ProfilePicture}>
              {data.picture && data.picture.url ? (
                <div
                  className={styles.Avatar}
                  style={{
                    backgroundImage: `url('${data.picture.url}')`,
                  }}
                />
              ) : file ? (
                <div
                  className={styles.Avatar}
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

              <label className={styles.InputButton}>
                <input type='file' name='picture' id='picture' onChange={onUploadHandler} accept='.jpg, .jpeg, .png' />
                <span className={styles.InputButtonText}> Upload File </span>
              </label>
              <span>
                <em style={{ color: 'gray' }}>Ukuran file max 500kb</em>
              </span>
              {formState.inputs.picture.value ? (
                formState.inputs.picture.value.size > 500000 ? (
                  <span>
                    <em style={{ color: 'red' }}>File terlalu besar. Mohon gunakan file berukuran max 500kb</em>
                  </span>
                ) : (
                  <span>
                    <em>{formState.inputs.picture.value.name}</em>
                  </span>
                )
              ) : null}
            </div>

            <div className={styles.ContentTop}>
              <div className={styles.ContentLeft}>
                <div className={styles.ContentWrap}>
                  <div className={styles.InputDiv}>
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
                  <div className={styles.InputDiv}>
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

                <div className={styles.ContentWrap}>
                  <div className={styles.InputDiv}>
                    <div>
                      <Input
                        inputType='datePicker'
                        id='dateOfBirth'
                        validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
                        onInputHandler={onInputHandler}
                        views={['year', 'month', 'date']}
                        label='Tanggal Lahir'
                        maxDate={moment()}
                        initValue={data.dateOfBirth ? data.dateOfBirth : null}
                        initIsValid={data.dateOfBirth ? data.dateOfBirth : false}
                        format='dd/MM/yyyy'
                        style={{ width: '100%' }}
                        helperText='Tanggal lahir wajib diisi'
                      />
                    </div>
                  </div>

                  <div className={styles.InputDiv}>
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

                <div className={styles.ContentWrap}>
                  <div className={styles.InputDiv}>
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

                  <div className={styles.InputDiv}>
                    <Autocomplete
                      id='state'
                      name='state'
                      options={LocationData.sort().map(option => option)}
                      onChange={handleStateChange}
                      value={locationState.province}
                      style={{ margin: '0' }}
                      renderInput={params => (
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

                <div className={styles.ContentWrap}>
                  <div className={styles.InputDiv}>
                    <Autocomplete
                      id='city'
                      name='city'
                      options={city.map(option => option)}
                      onChange={handleCityChange}
                      value={locationState.citySelected}
                      renderInput={params => (
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

                  <div className={styles.InputDiv}>
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

                <div className={styles.ContentWrap}>
                  <div className={styles.InputDiv}>
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

                  <div className={styles.InputDiv}>
                    <div id='gender' onChange={onManualInputHandler}>
                      <p className={styles.Text}>Jenis Kelamin*</p>
                      <div className={styles.RadioHolder}>
                        <label style={{ marginRight: '2rem' }} className={styles.RadioButton}>
                          <input type='radio' value='male' name='gender' id='male' /> Pria
                        </label>
                        <label className={styles.RadioButton}>
                          <input type='radio' value='female' name='gender' id='female' /> Wanita
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.ContentWrapFull}>
                  <div className={styles.InputDiv}>
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

                <div className={styles.ContentWrapFull}>
                  <div className={styles.InputDiv}>
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
                </div>

                <div className={styles.ContentWrapFull}>
                  <div className={styles.InputDiv}>
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
                        formState.inputs.salary.value < 0 ? 'Harapan gaji minimal 0' : 'Harapan gaji wajib diisi'
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.ContentBottom}>
              <label onChange={onCheckedInputHandler} className={styles.CheckBox}>
                <input id='outOfTown' type='checkbox' name='outOfTown' />
                <p style={{ margin: '0', marginLeft: '4px' }}>Bersedia ditempatkan di luar kota asal</p>
              </label>
              <label onChange={onCheckedInputHandler} className={styles.CheckBox}>
                <input id='workShifts' type='checkbox' name='workShifts' />
                <p style={{ margin: '0', marginLeft: '4px' }}>Bersedia bekerja dengan sistem shift</p>
              </label>

              <label onChange={onCheckedInputHandler} className={styles.CheckBox}>
                <input id='headhunterProgram' type='checkbox' name='headhunterProgram' />
                <p style={{ margin: '0', marginLeft: '4px' }}>Saya ingin mengikuti program headhunter Crossbell</p>
              </label>
            </div>
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
        </div>
      </React.Fragment>
    );
  }

  const onCancelHandler = () => {
    props.resetApplicant();
  };

  return (
    <form onSubmit={onSubmitHandler} className={styles.Container}>
      <Modal show={props.error} onCancel={onCancelHandler}>
        Could not update changes at the moment, please try again later
      </Modal>
      {formContent}
    </form>
  );
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
    resetApplicant: () => dispatch({ type: actionTypes.APPLICANTRESET }),
    getOneApplicant: data => dispatch(actionCreators.getOneApplicant(data)),
    updateApplicantIntro: ApplicantData => dispatch(actionCreators.updateApplicantIntro(ApplicantData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditIntro));
