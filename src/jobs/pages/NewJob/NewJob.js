import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useForm } from '../../../shared/utils/useForm';

import * as actionTypes from '../../../store/actions/actions';
import * as actionCreators from '../../../store/actions';

import HeaderBanner from '../../../shared/UI_Element/HeaderBanner';
import CompanyMeeting from '../../../assets/images/CompanyMeeting.png';
import Modal from '../../../shared/UI_Element/Modal';

import Autocomplete from '@mui/material/Autocomplete';
import { CustomTextField } from '../../../shared/UI_Element/CustomMUIComponents';
import LoadingBar from '../../../shared/UI_Element/Spinner/LoadingBar';
import Input from '../../../shared/UI_Element/Input';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MIN,
  VALIDATOR_ALWAYSTRUE,
  VALIDATOR_EMAIL,
} from '../../../shared/utils/validator';
import WorkFieldData from '../../../shared/UI_Element/PredefinedData/WorkFieldData';
import CitiesData from '../../../shared/UI_Element/PredefinedData/CitiesData';
import Slider from '@material-ui/core/Slider';

import styles from './NewJob.module.scss';

const NewJob = props => {
  const [maxSlot, setMaxSlot] = useState(null);
  const [jobExperience, setJobExperience] = useState('');
  const [employment, setEmployment] = useState('');

  const [educationalStage, setEducationalStage] = useState('');
  const [inputLocation, setInputLocation] = useState('');

  const [requirement, setRequirement] = useState(['req']);
  const [requirementList, setRequirementList] = useState([]);
  const [rangeAge, setRangeAge] = useState([18, 35]);
  const [fieldOfWork, setFieldOfWork] = useState('');
  const [inputFieldOfWork, setInputFieldOfWork] = useState('');

  const [addSlotModal, setAddSlotModal] = useState(false);
  const openAddSlot = () => setAddSlotModal(true);
  const closeAddSlot = () => setAddSlotModal(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formState, onInputHandler] = useForm(
    {
      jobTitle: {
        value: '',
        isValid: false,
      },
      isHidden: {
        value: false,
        isValid: true,
      },
      jobDescriptions: {
        value: '',
        isValid: false,
      },
      educationalStage: {
        value: 'SMA/SMK',
        isValid: true,
      },
      jobExperience: {
        value: '<2',
        isValid: true,
      },
      employment: {
        value: 'permanent',
        isValid: true,
      },
      placementLocation: {
        value: '',
        isValid: false,
      },
      emailRecipient: {
        value: '',
        isValid: true,
      },

      salary: {
        value: '',
        isValid: true,
      },
      benefit: {
        value: '',
        isValid: true,
      },
      slotAllocation: {
        value: null,
        isValid: false,
      },

      rangeAge: {
        value: [18, 35],
        isValid: true,
      },
      fieldOfWork: {
        value: null,
        isValid: false,
      },
      specialRequirement: {
        value: [],
        isValid: true,
      },
    },
    false
  );

  const { getOneCompany, auth } = props;
  useEffect(() => {
    const getSlot = async () => {
      try {
        if (auth.userId) {
          const res = await getOneCompany({
            userId: auth.userId,
            token: auth.token,
          });
          setMaxSlot(
            res.company.slotREG?.filter(slot => {
              return slot.status === 'Idle';
            }).length
          );
        }
      } catch (err) {
        console.log(err);
      }
    };
    getSlot();
  }, [onInputHandler, getOneCompany, auth, rangeAge, fieldOfWork, requirementList]);

  const onSubmitHandler = async event => {
    event.preventDefault();
    if (!formState.formIsValid) {
      return props.createJobFail();
    }

    const jobData = {
      jobTitle: formState.inputs.jobTitle.value,
      isHidden: formState.inputs.isHidden.value,
      placementLocation: formState.inputs.placementLocation.value,
      jobDescriptions: formState.inputs.jobDescriptions.value,
      jobExperience: formState.inputs.jobExperience.value,
      rangeAge: formState.inputs.rangeAge.value,
      educationalStage: formState.inputs.educationalStage.value,
      specialRequirement: formState.inputs.specialRequirement.value,
      emailRecipient: formState.inputs.emailRecipient.value,
      employment: formState.inputs.employment.value,
      benefit: formState.inputs.benefit.value,
      slot: formState.inputs.slotAllocation.value,
      salary: formState.inputs.salary.value,
      fieldOfWork: formState.inputs.fieldOfWork.value,
    };
    const authData = {
      token: props.auth.token,
      userId: props.auth.userId,
    };
    try {
      await props.createJob(jobData, authData);
      props.history.push(`/co/${props.auth.userId}/jobList`);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(formState.inputs.specialRequirement.value);
  const onSaveHandler = async event => {
    event.preventDefault();
    const jobData = {
      jobTitle: formState.inputs.jobTitle.value,
      isHidden: formState.inputs.isHidden.value,
      placementLocation: formState.inputs.placementLocation.value,
      jobDescriptions: formState.inputs.jobDescriptions.value,
      jobExperience: formState.inputs.jobExperience.value,
      rangeAge: formState.inputs.rangeAge.value,
      educationalStage: formState.inputs.educationalStage.value,
      specialRequirement: formState.inputs.specialRequirement.value,
      emailRecipient: formState.inputs.emailRecipient.value,
      employment: formState.inputs.employment.value,
      benefit: formState.inputs.benefit.value,
      slot: formState.inputs.slotAllocation.value,
      salary: formState.inputs.salary.value,
      fieldOfWork: formState.inputs.fieldOfWork.value,
    };
    const authData = {
      token: props.auth.token,
      userId: props.auth.userId,
    };
    try {
      await props.saveJobDraft(jobData, authData);
      props.history.push(`/co/${props.auth.userId}/jobList`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleJobExperienceChange = e => {
    const elementId = e.target.name;
    const elementValue = e.target.value;
    onInputHandler(elementId, elementValue, true);
    setJobExperience(e.target.value);
  };

  const handleEmploymentChange = e => {
    const elementId = e.target.name;
    const elementValue = e.target.value;
    onInputHandler(elementId, elementValue, true);
    setEmployment(elementValue);
  };

  const handleChange = e => {
    const elementId = e.target.name;
    const elementValue = e.target.value;
    onInputHandler(elementId, elementValue, true);
    setEducationalStage(e.target.value);
  };

  const handleLocationChange = (e, value) => {
    onInputHandler('placementLocation', value, true);
  };
  const onInputLocationHandler = (e, value) => {
    setInputLocation(value);
    onInputHandler('placementLocation', value, true);
  };

  const onCheckedInputHandler = e => {
    const elementId = e.target.name;
    const elementValue = e.target.checked;
    onInputHandler(elementId, elementValue, true);
  };

  const handleAgeChange = (event, newValue) => {
    setRangeAge(newValue);
    onInputHandler('rangeAge', newValue, true);
  };

  const onFieldOfWorkHandler = (event, newValue) => {
    event.preventDefault();
    if (typeof newValue === 'string') {
      setFieldOfWork({
        field: newValue,
      });
      onInputHandler('fieldOfWork', newValue.field, true);
    } else if (newValue && newValue.inputValue) {
      setFieldOfWork({
        field: newValue.inputValue,
      });
      onInputHandler('fieldOfWork', newValue.inputValue.field, true);
    } else {
      setFieldOfWork(newValue);
      onInputHandler('fieldOfWork', newValue?.field || '', true);
    }
  };
  const onInputFieldOfWorkHandler = (e, value) => {
    setInputFieldOfWork(value);
    onInputHandler('fieldOfWork', value, true);
  };

  let cities = [];

  for (const key in CitiesData) {
    if (key !== 'default') cities = [...cities, ...CitiesData[key]];
  }

  const addRequirement = e => {
    e.preventDefault();
    setRequirement(req => [...req, 'req']);
    // onInputHandler(`requirement_${requirement.length}`, '', true);
  };

  const onRequirementsUpdate = (event, reqIndex) => {
    let inputValue = event.target.value;
    setRequirementList(prevState => {
      let newState = [...prevState];
      newState[reqIndex] = inputValue;
      onInputHandler('specialRequirement', newState, true);
      return newState;
    });
  };

  let formContent = (
    <form className={styles.NewJobContainer}>
      <h1 className={styles.NewJobTitle}>
        Post Iklan <span>Pekerjaan Anda</span>
      </h1>

      <Input
        inputType='input'
        id='jobTitle'
        InputClass='AddJobInput'
        validatorMethod={[VALIDATOR_REQUIRE()]}
        onInputHandler={onInputHandler}
        label={true}
        labelName='Nama Pekerjaan*'
      />

      <div className={styles.CategoryLocation}>
        <div className={styles.JobCategory}>
          <p>Kategori Pekerjaan</p>
          <Autocomplete
            id='fieldOfWork'
            name='fieldOfWork'
            freeSolo
            options={WorkFieldData.sort((a, b) => {
              const optA = a.field.toLowerCase();
              const optB = b.field.toLowerCase();
              if (optA < optB) return -1;
              if (optA > optB) return 1;
              return 0;
            })}
            getOptionLabel={option => option.field}
            onChange={onFieldOfWorkHandler}
            inputValue={inputFieldOfWork}
            onInputChange={onInputFieldOfWorkHandler}
            renderInput={params => <CustomTextField {...params} />}
          />
        </div>

        <div className={styles.JobLocation}>
          <p>Lokasi Penempatan</p>
          <Autocomplete
            id='placementLocation'
            name='placementLocation'
            options={cities.sort((a, b) => {
              const optA = a.toLowerCase();
              const optB = b.toLowerCase();
              if (optA < optB) return -1;
              if (optA > optB) return 1;
              return 0;
            })}
            onChange={handleLocationChange}
            inputValue={inputLocation}
            onInputChange={onInputLocationHandler}
            freeSolo
            renderInput={params => <CustomTextField {...params} />}
          />
        </div>
      </div>

      <div className={styles.SelectOptions}>
        <div className={styles.Degree}>
          <p>Tingkat Pendidikan</p>
          <select id='educationalStage' name='educationalStage' value={educationalStage} onChange={handleChange}>
            <option value='SMA/SMK'>SMA/SMK</option>
            <option value='D3'>D3</option>
            <option value='S1'>S1</option>
            <option value='S2'>S2</option>
            <option value='S3'>S3</option>
          </select>
        </div>

        <div className={styles.Experiences}>
          <p>Syarat Pengalaman Kerja</p>
          <select id='jobExperience' name='jobExperience' value={jobExperience} onChange={handleJobExperienceChange}>
            <option value='<2'>Kurang dari 2 tahun</option>
            <option value='2-5'>2 - 5 tahun</option>
            <option value='5-10'>5 - 10 tahun</option>
            <option value='>10'>Lebih dari 10 tahun</option>
          </select>
        </div>

        <div className={styles.ContractTypes}>
          <p>Jenis Kontrak</p>
          <select id='employment' name='employment' value={employment} onChange={handleEmploymentChange}>
            <option value='permanent'>Karyawan Tetap</option>
            <option value='contract'>Karyawan kontrak (PKWT)</option>
            <option value='intern'>Karyawan magang (Intern)</option>
          </select>
        </div>
      </div>

      <div className={styles.AgeRangeRequirements}>
        <div className={styles.SliderLegends}>
          <p className={styles.SliderMin}>Min</p>
          <h3>Persyaratan Usia</h3>
          <p className={styles.SliderMax}>Max</p>
        </div>

        <div className={styles.AgeRangeSlider}>
          <p className={styles.AgeMinValue}>{rangeAge[0]}</p>
          <div className={styles.Slider}>
            <Slider
              value={rangeAge}
              onChange={handleAgeChange}
              valueLabelDisplay='auto'
              aria-labelledby='range-slider'
              id='rangeAge'
              style={{ color: '#f79f35' }}
              min={18}
              max={100}
            />
          </div>
          <p className={styles.AgeMaxValue}>{rangeAge[1]}</p>
        </div>
      </div>

      <Input
        inputType='input'
        id='emailRecipient'
        InputClass='AddJobInput'
        validatorMethod={[VALIDATOR_EMAIL()]}
        onInputHandler={onInputHandler}
        label={true}
        labelName='Email Penerima Lamaran*'
      />
      <div className={styles.HideCompany}>
        <label onChange={onCheckedInputHandler} className={styles.CheckBoxLabel}>
          <input id='isHidden' type='checkbox' name='isHidden' className={styles.CheckBox} />
          <p>Rahasiakan nama perusahaan</p>
        </label>
      </div>

      <Input
        inputType='textarea'
        id='jobDescriptions'
        InputClass='AddJobInput'
        validatorMethod={[VALIDATOR_REQUIRE()]}
        onInputHandler={onInputHandler}
        label={true}
        labelName='Deskripsi pekerjaan*'
        rows={12}
        style={{ border: '2px solid #f79f35', outline: 'none', padding: '5px', fontSize: '19px', fontFamily: 'Lato' }}
      />

      <div className={styles.BenefitSalary}>
        <Input
          inputType='input'
          id='benefit'
          InputClass='AddJobInput'
          validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
          onInputHandler={onInputHandler}
          initIsValid={true}
          label={true}
          labelName='Fasilitas & Benefit (optional)'
        />

        <Input
          inputType='input'
          id='salary'
          InputClass='AddJobInput'
          validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
          onInputHandler={onInputHandler}
          initIsValid={true}
          label={true}
          labelName='Gaji (optional)'
          error={false}
          type='number'
          min={0}
          step='500000'
        />
      </div>

      <div className={styles.SpecialRequirementContainer}>
        <div className={styles.SpecialRequirementHeader}>
          <h3 className={styles.SpecialRequirementTitle}>Persyaratan Khusus (max. 5)</h3>
          <button type='button' onClick={requirement.length < 5 ? addRequirement : null}>
            Tambah Persyaratan
          </button>
        </div>

        {requirement.map((req, i) => {
          return (
            <div className={styles.SpecialRequirementItem} key={`specialreq_${i}`}>
              <p className={styles.ListNuber}>{i + 1}.</p>
              <Input
                inputType='input'
                id={`requirement_${i}`}
                validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
                onChange={event => onRequirementsUpdate(event, i)}
                initIsValid={true}
              />
            </div>
          );
        })}
      </div>

      <div className={styles.DurationContainer}>
        <h2>Durasi Tayang (bulan)</h2>
        <Input
          inputType='input'
          id='slotAllocation'
          InputClass='AddJobInput'
          validatorMethod={[VALIDATOR_MIN(1)]}
          onInputHandler={onInputHandler}
          type='number'
          label={false}
          min={0}
          max={parseInt(maxSlot) || 0}
          step='1'
        />
        <div className={styles.RemainingSlot}>
          <h3>
            Sisa slot:{' '}
            {formState.inputs.slotAllocation?.value > 0 &&
            parseInt(maxSlot) > parseInt(formState.inputs.slotAllocation.value)
              ? (parseInt(maxSlot) - parseInt(formState.inputs.slotAllocation.value)).toString()
              : maxSlot}
          </h3>
          <span onClick={openAddSlot}>
            <em>(Tambah Slot)</em>
          </span>
        </div>
      </div>

      <div className={styles.SubmitButtonContainer}>
        <button type='submit' onClick={onSaveHandler}>
          Simpan Draft
        </button>
        {formState.inputs.slotAllocation.value <= maxSlot && (
          <button type='submit' onClick={onSubmitHandler} disabled={!formState.formIsValid}>
            Tayangkan Iklan
          </button>
        )}
      </div>
    </form>
  );

  if (props.job.isLoading) {
    formContent = <LoadingBar />;
  }

  const onCancelHandler = () => {
    props.resetJob();
  };

  return (
    <React.Fragment>
      <HeaderBanner imageSource={CompanyMeeting} />
      <Modal
        show={addSlotModal}
        onCancel={closeAddSlot}
        headerText='Anda yakin ingin menambah slot?'
        style={{ top: '25vh', maxWidth: '500px', marginLeft: '-250px', height: '200px', overflowY: 'auto' }}>
        <p className={styles.AddSlotExplanation}>Anda akan dialihkan ke halaman penambahan slot.</p>
        <p className={styles.AddSlotExplanation}>Seluruh data yang belum tersimpan akan hilang.</p>
        <div className={styles.AddSlotButtonContainer}>
          <button type='button' onClick={closeAddSlot}>
            Batal
          </button>
          <button type='button' onClick={() => props.history.push(`/co/order/reguler`)}>
            Tambah Slot
          </button>
        </div>
      </Modal>
      <Modal show={props.job.error} onCancel={onCancelHandler}>
        Tidak dapat memasang iklan pekerjaan saat ini{' '}
      </Modal>
      {formContent}
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    job: state.job,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    createJob: (jobData, authData) => dispatch(actionCreators.createJob(jobData, authData)),
    saveJobDraft: (jobData, authData) => dispatch(actionCreators.saveJobDraft(jobData, authData)),
    getOneCompany: payload => dispatch(actionCreators.getOneCompany(payload)),
    createJobFail: () => dispatch({ type: actionTypes.CREATEJOBFAIL }),
    resetJob: () => dispatch({ type: actionTypes.JOBRESET }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewJob));
