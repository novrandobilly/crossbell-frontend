import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter, useParams } from 'react-router-dom';
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

import styles from '../NewJob/NewJob.module.scss';

const EditUnreleasedJob = props => {
  const { jobsid } = useParams();
  const [loadedJob, setLoadedJob] = useState(null);
  const [maxSlot, setMaxSlot] = useState(null);

  const [placement, setPlacement] = useState('');
  const [inputLocation, setInputLocation] = useState('');

  const [jobExperience, setJobExperience] = useState('');
  const [employment, setEmployment] = useState('');
  const [educationalStage, setEducationalStage] = useState('');

  const [requirement, setRequirement] = useState(['req']);
  const [requirementList, setRequirementList] = useState([]);
  const [rangeAge, setRangeAge] = useState([18, 35]);
  const [fieldOfWork, setFieldOfWork] = useState([]);

  const [addSlotModal, setAddSlotModal] = useState(false);
  const openAddSlot = () => setAddSlotModal(true);
  const closeAddSlot = () => setAddSlotModal(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { getOneCompany, auth, getOneJob } = props;
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await getOneJob(jobsid);
        res.specialRequirement.forEach((requirement, i) => {
          setRequirement(prevState => [...prevState, 'req']);
        });
        setFieldOfWork({ field: res?.fieldOfWork[0] });
        setEmployment(res.employment);
        setPlacement(res.placementLocation);
        setEducationalStage(res.educationalStage);
        setJobExperience(res.jobExperience);
        setRequirementList(res.specialRequirement);
        setRangeAge(res.rangeAge);
        setLoadedJob(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchJob();

    const getSlot = async () => {
      try {
        if (auth.userId) {
          const res = await getOneCompany({ userId: auth.userId });
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
  }, [getOneCompany, auth, getOneJob, jobsid]);

  const [formState, onInputHandler] = useForm(
    {
      jobTitle: {
        value: loadedJob ? loadedJob.jobTitle : '',
        isValid: loadedJob && loadedJob.jobTitle ? true : false,
      },

      isHidden: {
        value: loadedJob ? loadedJob.isHidden : '',
        isValid: loadedJob && loadedJob.isHidden ? true : false,
      },

      jobDescriptions: {
        value: loadedJob ? loadedJob.jobDescriptions : '',
        isValid: loadedJob && loadedJob.jobDescriptions ? true : false,
      },
      educationalStage: {
        value: loadedJob ? loadedJob.educationalStage : '',
        isValid: loadedJob && loadedJob.educationalStage ? true : false,
      },

      specialRequirement: {
        value: loadedJob ? loadedJob.specialRequirement : '',
        isValid: loadedJob && loadedJob.specialRequirement ? true : false,
      },
      placementLocation: {
        value: loadedJob ? loadedJob.placementLocation : '',
        isValid: loadedJob && loadedJob.placementLocation ? true : false,
      },

      emailRecipient: {
        value: loadedJob ? loadedJob.emailRecipient : '',
        isValid: loadedJob && loadedJob.emailRecipient ? true : false,
      },

      employment: {
        value: loadedJob ? loadedJob.employment : '',
        isValid: true,
      },

      salary: {
        value: loadedJob ? loadedJob.salary : '',
        isValid: true,
      },

      jobExperience: {
        value: loadedJob ? loadedJob.jobExperience : '',
        isValid: loadedJob && loadedJob.jobExperience ? true : false,
      },

      benefit: {
        value: loadedJob ? loadedJob.benefit : '',
        isValid: true,
      },

      slotAllocation: {
        value: loadedJob ? loadedJob.slotAllocation : '',
        isValid: loadedJob && loadedJob.slotAllocation ? true : false,
      },

      rangeAge: {
        value: loadedJob ? loadedJob.rangeAge : [],
        isValid: loadedJob && loadedJob.rangeAge ? true : false,
      },

      fieldOfWork: {
        value: loadedJob ? loadedJob.fieldOfWork : [],
        isValid: loadedJob && loadedJob.fieldOfWork ? true : false,
      },
    },
    false
  );

  useEffect(() => {
    if (loadedJob) {
      const isHiddenEl = document.getElementById('isHidden');
      isHiddenEl.checked = loadedJob.isHidden;
      onInputHandler('isHidden', loadedJob.isHidden, true);
    }
  }, [loadedJob, onInputHandler]);

  useEffect(() => {
    if (loadedJob) {
      const salary = document.getElementById('salary');
      const benefit = document.getElementById('benefit');

      onInputHandler('rangeAge', rangeAge, true);
      onInputHandler('salary', salary.value, true);
      onInputHandler('employment', employment, true);
      onInputHandler('benefit', benefit.value, true);
      onInputHandler('fieldOfWork', fieldOfWork?.field, fieldOfWork?.field ? true : false);
      onInputHandler('placementLocation', placement, true);
      onInputHandler('jobExperience', jobExperience, true);
      onInputHandler('educationalStage', educationalStage, true);
      onInputHandler('specialRequirement', requirementList, true);
    }
  }, [
    jobExperience,
    onInputHandler,
    loadedJob,
    employment,
    educationalStage,
    fieldOfWork,
    placement,
    rangeAge,
    requirementList,
  ]);

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
      jobId: jobsid,
      token: props.auth.token,
      userId: props.auth.userId,
    };
    try {
      await props.releaseJob(jobData, authData);
      props.history.push(`/co/${props.auth.userId}/jobList`);
    } catch (err) {
      console.log(err);
    }
  };

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
      id: jobsid,
    };

    try {
      const res = await props.editJobDraft(jobData, authData);
      console.log(res);
      props.history.push(`/co/${props.auth.userId}/jobList`);
    } catch (err) {
      console.log(err);
    }
  };

  const onFieldOfWorkChangeHandler = (event, newValue) => {
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
    setEmployment(e.target.value);
  };

  const handleChange = e => {
    const elementId = e.target.name;
    const elementValue = e.target.value;
    onInputHandler(elementId, elementValue, true);
    setEducationalStage(e.target.value);
  };

  const handleLocationChange = (e, value) => {
    onInputHandler('placementLocation', value, true);
    setPlacement(value);
  };
  const onInputLocationHandler = (e, value) => {
    setInputLocation(value);
    onInputHandler('placementLocation', value, true);
  };

  const handleAgeChange = (event, newValue) => {
    setRangeAge(newValue);
    onInputHandler('rangeAge', newValue, true);
  };

  const onCheckedInputHandler = e => {
    const elementId = e.target.name;
    const elementValue = e.target.checked;
    onInputHandler(elementId, elementValue, true);
  };

  const addRequirement = e => {
    e.preventDefault();
    setRequirement(req => [...req, 'req']);
  };

  const onRequirementsUpdate = (event, reqIndex) => {
    let inputValue = event.target.value;
    setRequirementList(prevState => {
      let newState = [...prevState];
      newState[reqIndex] = inputValue;
      return newState;
    });
  };

  let cities = [];

  for (const key in CitiesData) {
    if (key !== 'default') cities = [...cities, ...CitiesData[key]];
  }

  let formContent = <LoadingBar />;

  if (!props.job.isLoading && loadedJob) {
    formContent = (
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
          initValue={loadedJob.jobTitle}
          initIsValid={loadedJob.jobTitle ? true : false}
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
              value={fieldOfWork}
              onChange={onFieldOfWorkChangeHandler}
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
              value={placement}
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
          initValue={loadedJob.emailRecipient}
          initIsValid={true}
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
          initIsValid={true}
          initValue={loadedJob.jobDescriptions}
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
            initValue={loadedJob.benefit}
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
            initValue={loadedJob.salary}
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
                  initValue={requirementList[i]}
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
        {/* ================================================================================================================ */}
      </form>
    );
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
        style={{ top: '25vh', maxWidth: '500px', marginLeft: '-250px', height: '20vh', overflowY: 'auto' }}>
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
    releaseJob: (jobData, authData) => dispatch(actionCreators.releaseJob(jobData, authData)),
    editJobDraft: (jobData, authData) => dispatch(actionCreators.editJobDraft(jobData, authData)),
    getOneCompany: payload => dispatch(actionCreators.getOneCompany(payload)),
    createJobFail: () => dispatch({ type: actionTypes.CREATEJOBFAIL }),
    resetJob: () => dispatch({ type: actionTypes.JOBRESET }),
    getOneJob: jobsid => dispatch(actionCreators.getOneJob(jobsid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditUnreleasedJob));
