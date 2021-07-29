import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter, useParams } from 'react-router-dom';
import { useForm } from '../../shared/utils/useForm';

import * as actionTypes from '../../store/actions/actions';
import * as actionCreators from '../../store/actions';
import Modal from '../../shared/UI_Element/Modal';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Autocomplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Spinner from '../../shared/UI_Element/Spinner/SpinnerCircle';
import Input from '../../shared/UI_Element/Input';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MIN,
  VALIDATOR_ALWAYSTRUE,
  VALIDATOR_EMAIL,
} from '../../shared/utils/validator';
import WorkFieldData from '../../shared/UI_Element/WorkFieldData';
import CitiesData from '../../shared/UI_Element/CitiesData';
import Slider from '@material-ui/core/Slider';

import classes from './NewJob.module.css';

const EditUnreleasedJob = (props) => {
  const { jobsid } = useParams();
  const [loadedJob, setLoadedJob] = useState(null);
  const [maxSlot, setMaxSlot] = useState(null);

  const [placement, setPlacement] = useState('');
  const [jobExperience, setJobExperience] = useState('');
  const [jobExperienceOpen, setJobExperienceOpen] = useState(false);
  const [employment, setEmployment] = useState('');
  const [employmentOpen, setEmploymentOpen] = useState(false);
  const [educationalStageOpen, setEducationalStageOpen] = useState(false);
  const [educationalStage, setEducationalStage] = useState('');

  const [requirement, setRequirement] = useState(['req']);
  const [requirementList, setRequirementList] = useState([]);
  const [rangeAge, setRangeAge] = useState([18, 35]);
  const [fieldOfWork, setFieldOfWork] = useState([]);

  const filter = createFilterOptions();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { getOneCompany, auth, getOneJob } = props;
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await getOneJob(jobsid);
        res.specialRequirement.forEach((requirement, i) => {
          setRequirement((prevState) => [...prevState, 'req']);
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
          setMaxSlot(res.company.slotREG);
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

  const checkMyInput = () => {
    if (formState && formState.slotAllocation) {
      let inputfield = document.getElementById('slotAllocation');
      let inputval = inputfield.value;
      let numeric = inputval.replace(/[^0-9]+/, 0);
      if (numeric.length !== inputval.length || numeric % 2 !== 0) {
        inputfield.value = '0';
      }
    }
  };

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
      onInputHandler('fieldOfWork', fieldOfWork?.field, true);
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

  const onSubmitHandler = async (event) => {
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
      if (formState.inputs.slotAllocation.value % 2 !== 0) {
        throw new Error('Slot allocation harus genap');
      }
      const res = await props.releaseJob(jobData, authData);
      console.log(res);
      props.history.push(`/co/${props.auth.userId}/jobList`);
    } catch (err) {
      console.log(err);
    }
  };

  const onSaveHandler = async (event) => {
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
      if (formState.inputs.slotAllocation.value % 2 !== 0) {
        throw new Error('Slot allocation harus genap');
      }
      const res = await props.editJobDraft(jobData, authData);
      console.log(res);
      props.history.push(`/co/${props.auth.userId}/jobList`);
    } catch (err) {
      console.log(err);
    }
  };

  const onAddSlotHandler = async (event) => {
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
      jobsid: jobsid,
      token: props.auth.token,
      userId: props.auth.userId,
    };

    try {
      const res = await props.editJobDraft(jobData, authData);
      console.log(res);
      props.history.push(`/co/order/reguler`);
    } catch (err) {
      console.log(err);
    }
  };

  const onAutoCompleteHandler = (event, newValue) => {
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

  const onFilterHandler = (options, params) => {
    const filtered = filter(options, params);

    if (params.inputValue !== '') {
      filtered.push({
        inputValue: params.inputValue,
        field: `Tambahkan "${params.inputValue}"`,
      });
    }

    return filtered;
  };

  const handleJobExperienceChange = (e) => {
    const elementId = e.target.name;
    const elementValue = e.target.value;
    onInputHandler(elementId, elementValue, true);
    setJobExperience(e.target.value);
  };

  const handleJobExperienceClose = () => {
    setJobExperienceOpen(false);
  };

  const handleJobExperienceOpen = () => {
    setJobExperienceOpen(true);
  };

  const handleEmploymentChange = (e) => {
    const elementId = e.target.name;
    const elementValue = e.target.value;
    onInputHandler(elementId, elementValue, true);
    setEmployment(e.target.value);
  };

  const handleEmploymentClose = () => {
    setEmploymentOpen(false);
  };

  const handleEmploymentOpen = () => {
    setEmploymentOpen(true);
  };

  const handleChange = (e) => {
    const elementId = e.target.name;
    const elementValue = e.target.value;
    onInputHandler(elementId, elementValue, true);
    setEducationalStage(e.target.value);
  };

  const handleEducationClose = () => {
    setEducationalStageOpen(false);
  };

  const handleEducationOpen = () => {
    setEducationalStageOpen(true);
  };

  const handleLocationChange = (e, value) => {
    onInputHandler('placementLocation', value, true);
    setPlacement(value);
  };

  const handleAgeChange = (event, newValue) => {
    setRangeAge(newValue);
    onInputHandler('rangeAge', newValue, true);
  };

  const onCheckedInputHandler = (e) => {
    const elementId = e.target.name;
    const elementValue = e.target.checked;
    onInputHandler(elementId, elementValue, true);
  };

  const addRequirement = (e) => {
    e.preventDefault();
    setRequirement((req) => [...req, 'req']);
    // onInputHandler(`requirement_${requirement.length}`, '', true);
  };

  const onRequirementsUpdate = (event, reqIndex) => {
    let inputValue = event.target.value;
    setRequirementList((prevState) => {
      let newState = [...prevState];
      newState[reqIndex] = inputValue;
      return newState;
    });
  };

  let cities = [];

  for (const key in CitiesData) {
    if (key !== 'default') cities = [...cities, ...CitiesData[key]];
  }

  let formContent = <Spinner />;

  if (!props.job.isLoading && loadedJob) {
    formContent = (
      <div className={classes.ContainerFlex}>
        <p className={classes.FormTitle}>Form Iklan Lowongan Pekerjaan</p>

        <div className={classes.Content}>
          <div className={classes.ContentLeft}>
            <div className={classes.ContentWrap}>
              <Input
                inputType='input'
                id='jobTitle'
                InputClass='AddJobInput'
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label='Judul*'
                initValue={loadedJob.jobTitle}
                initIsValid={loadedJob.jobTitle ? true : false}
                helperText='Judul pekerjaan wajib diisi'
              />

              <Autocomplete
                id='placementLocation'
                name='placementLocation'
                options={cities.map((option) => option)}
                onChange={handleLocationChange}
                style={{ margin: '0' }}
                value={
                  formState.inputs.placementLocation.value
                    ? formState.inputs.placementLocation.value
                    : ''
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    style={{ margin: '0' }}
                    label='Lokasi*'
                    margin='normal'
                    variant='standard'
                  />
                )}
              />
            </div>

            <div className={classes.ContentWrap}>
              <FormControl className={classes.formControl}>
                <InputLabel
                  id='educationalStageLabel'
                  style={{ fontSize: '1rem' }}
                >
                  Tingkat Pendidikan*
                </InputLabel>

                <Select
                  id='educationalStage'
                  name='educationalStage'
                  open={educationalStageOpen}
                  onClose={handleEducationClose}
                  onOpen={handleEducationOpen}
                  value={educationalStage}
                  onChange={handleChange}
                  style={{ fontSize: '0.9rem', textAlign: 'left' }}
                >
                  <MenuItem value={'SMA'} style={{ fontSize: '0.9rem' }}>
                    SMA
                  </MenuItem>
                  <MenuItem value={'SMK'} style={{ fontSize: '0.9rem' }}>
                    SMK
                  </MenuItem>
                  <MenuItem value={'D3'} style={{ fontSize: '0.9rem' }}>
                    D3
                  </MenuItem>
                  <MenuItem value={'S1'} style={{ fontSize: '0.9rem' }}>
                    S1
                  </MenuItem>
                  <MenuItem value={'S2'} style={{ fontSize: '0.9rem' }}>
                    S2
                  </MenuItem>
                  <MenuItem value={'S3'} style={{ fontSize: '0.9rem' }}>
                    S3
                  </MenuItem>
                </Select>
              </FormControl>

              <FormControl className={classes.FormControl}>
                <InputLabel id='jobExperience' style={{ fontSize: '1rem' }}>
                  Pengalaman Kerja*
                </InputLabel>

                <Select
                  id='jobExperience'
                  name='jobExperience'
                  open={jobExperienceOpen}
                  onClose={handleJobExperienceClose}
                  onOpen={handleJobExperienceOpen}
                  value={jobExperience}
                  onChange={handleJobExperienceChange}
                  style={{
                    fontSize: '0.9rem',
                    textAlign: 'left',
                  }}
                >
                  <MenuItem value='' style={{ fontSize: '0.9rem' }}>
                    <em>Pilih</em>
                  </MenuItem>
                  <MenuItem id={0} value='>2' style={{ fontSize: '0.9rem' }}>
                    Kurang dari 2 tahun
                  </MenuItem>
                  <MenuItem id={0} value='2-5' style={{ fontSize: '0.9rem' }}>
                    2 - 5 tahun
                  </MenuItem>
                  <MenuItem id={0} value='5-10' style={{ fontSize: '0.9rem' }}>
                    5 - 10 tahun
                  </MenuItem>
                  <MenuItem id={0} value='>10' style={{ fontSize: '0.9rem' }}>
                    Lebih dari 10 tahun
                  </MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className={classes.ContentWrap}>
              <FormControl
                className={classes.FormControl}
                style={{ marginTop: '0' }}
              >
                <InputLabel id='employmentLabel' style={{ fontSize: '1rem' }}>
                  Status karyawan*
                </InputLabel>

                <Select
                  id='employment'
                  name='employment'
                  open={employmentOpen}
                  onClose={handleEmploymentClose}
                  onOpen={handleEmploymentOpen}
                  value={employment}
                  onChange={handleEmploymentChange}
                  style={{
                    fontSize: '0.9rem',
                    textAlign: 'left',
                  }}
                >
                  <MenuItem
                    id={0}
                    value='permanent'
                    style={{ fontSize: '0.9rem' }}
                  >
                    Karyawan Tetap
                  </MenuItem>
                  <MenuItem
                    id={0}
                    value='contract'
                    style={{ fontSize: '0.9rem' }}
                  >
                    Karyawan kontrak (PKWT)
                  </MenuItem>
                  <MenuItem
                    id={0}
                    value='intern'
                    style={{ fontSize: '0.9rem' }}
                  >
                    Karyawan magang (Intern)
                  </MenuItem>
                </Select>
              </FormControl>

              <Input
                inputType='input'
                id='emailRecipient'
                InputClass='AddJobInput'
                validatorMethod={[VALIDATOR_EMAIL()]}
                onInputHandler={onInputHandler}
                label='Email Penerima*'
                helperText='Mohon masukkan email yang valid'
                initValue={loadedJob.emailRecipient}
                initIsValid={loadedJob.emailRecipient ? true : false}
              />
            </div>

            <div className={classes.ContentWrap}>
              <Autocomplete
                value={fieldOfWork}
                onChange={onAutoCompleteHandler}
                filterOptions={onFilterHandler}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                id='fieldOfWork'
                name='fieldOfWork'
                ccc='true'
                options={WorkFieldData}
                getOptionLabel={(option) => {
                  // Value selected with enter, right from the input
                  if (typeof option === 'string') {
                    return option;
                  }
                  // Add "xxx" option created dynamically
                  if (option.inputValue) {
                    return option.inputValue;
                  }
                  // Regular option
                  return option.field;
                }}
                renderOption={(option) => option.field}
                freeSolo
                style={{ margin: '0', width: '100%' }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    style={{ margin: '0' }}
                    label='Bidang Pekerjaan*'
                    margin='normal'
                    variant='standard'
                  />
                )}
              />
            </div>
          </div>
        </div>

        <div style={{ width: '95%', marginTop: '16px' }}>
          <Input
            inputType='textarea'
            id='jobDescriptions'
            InputClass='AddJobInput'
            validatorMethod={[VALIDATOR_REQUIRE()]}
            onInputHandler={onInputHandler}
            label='Deskripsi pekerjaan*'
            initValue={loadedJob.jobDescriptions || ''}
            initIsValid={loadedJob.jobDescriptions ? true : false}
            helperText='Deskripsi pekerjaan wajib diisi'
          />
        </div>

        <div className={classes.CheckBoxDiv}>
          <label
            onChange={onCheckedInputHandler}
            className={classes.CheckBoxLabel}
          >
            <input
              id='isHidden'
              type='checkbox'
              name='isHidden'
              className={classes.CheckBox}
            />
            <p style={{ margin: '0' }}>Rahasiakan nama perusahaan</p>
          </label>
        </div>

        <div className={classes.AdditionalContentContainer}>
          <h2 className={classes.AdditionalContentHeader}>
            Informasi Tambahan
          </h2>
          <div className={classes.AdditionalContent}>
            <Input
              inputType='input'
              id='benefit'
              InputClass='AddJobInput'
              validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
              onInputHandler={onInputHandler}
              label='Fasilitas & benefit (optional)'
              error={false}
              initValue={loadedJob.benefit || ''}
              initIsValid={loadedJob.benefit}
            />
            <Input
              inputType='input'
              id='salary'
              InputClass='AddJobInput'
              validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
              onInputHandler={onInputHandler}
              label='Gaji (optional)'
              error={false}
              initValue={loadedJob.salary || ''}
              initIsValid={loadedJob.salary}
              type='number'
              min={0}
              step='500000'
            />
          </div>

          <div className={classes.ContentFull}>
            <div className={classes.SpecialReqDiv}>
              <div>
                <p className={classes.SpecialRequirement}>Persyaratan Khusus</p>
                <p className={classes.SpecialTips}>
                  skill teknis, karakter, atau persyaratan khusus lainnya (maks
                  5)
                </p>
              </div>
              <Button
                variant='contained'
                color='primary'
                type='button'
                disableElevation
                onClick={requirement.length < 5 ? addRequirement : null}
                style={{ height: 'fit-content', alignSelf: 'flex-end' }}
                size='small'
              >
                Tambah Persyaratan
              </Button>
            </div>

            {requirement.map((req, i) => {
              return (
                <div className={classes.AutoAddDiv} key={i}>
                  <p className={classes.ListNuber}>{i + 1}.</p>
                  {}
                  <Input
                    inputType='input'
                    id={`requirement_${i}`}
                    validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
                    onChange={(event) => onRequirementsUpdate(event, i)}
                    initIsValid={true}
                    initValue={
                      requirementList.length > 0 ? requirementList[i] : null
                    }
                  />
                </div>
              );
            })}
          </div>

          <div className={classes.RangeAge}>
            <div className={classes.SliderDiv}>
              <p className={classes.SliderLabel}>min</p>
              <p className={classes.AgeLabel}>Syarat Usia</p>
              <p className={classes.SliderLabel}>max</p>
            </div>

            <div className={classes.SliderDiv}>
              <p className={classes.AgeNumber}>{rangeAge[0]}</p>
              <div className={classes.Slider}>
                <Slider
                  value={rangeAge}
                  onChange={handleAgeChange}
                  valueLabelDisplay='auto'
                  aria-labelledby='range-slider'
                  id='rangeAge'
                />
              </div>
              <p className={classes.AgeNumber}>{rangeAge[1]}</p>
            </div>
          </div>
        </div>

        <div className={classes.AdditionalContentContainer}>
          <h2 className={classes.AdditionalContentHeader}>Durasi Tayang</h2>
          <div className={classes.AdditionalContent}>
            <div className={classes.SlotInput}>
              <Input
                inputType='input'
                id='slotAllocation'
                InputClass='AddJobInput'
                validatorMethod={[VALIDATOR_MIN(1)]}
                onInputHandler={onInputHandler}
                type='number'
                min={0}
                max={parseInt(maxSlot) * 2 || 0}
                step='2'
                initValue={loadedJob.slot || ''}
                initIsValid={loadedJob.slot}
                defaultValue={0}
                onKeyUp={checkMyInput()}
                helperText={
                  formState.inputs.slotAllocation.value < 0
                    ? 'Input slot minimal 2'
                    : formState.inputs.slotAllocation.value % 2 !== 0
                    ? 'Input slot harus genap'
                    : 'Slot wajib diisi'
                }
              />
              <span>minggu</span>
            </div>

            <div className={classes.RemainingSlot}>
              <h3>
                Sisa slot:{' '}
                {formState.inputs.slotAllocation.value &&
                formState.inputs.slotAllocation.value > 0 &&
                formState.inputs.slotAllocation.value % 2 === 0 &&
                parseInt(maxSlot) >
                  parseInt(formState.inputs.slotAllocation.value) / 2
                  ? (
                      parseInt(maxSlot) -
                      parseInt(formState.inputs.slotAllocation.value) / 2
                    ).toString()
                  : maxSlot}
              </h3>
              <div className={classes.SlotAddButton}>
                <Button
                  disableElevation
                  size='small'
                  style={{ fontWeight: '600' }}
                  startIcon={<AddIcon />}
                  onClick={onAddSlotHandler}
                >
                  Tambah Slot
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            alignSelf: 'flex-end',
            marginRight: '1rem',
            marginTop: '2rem',
          }}
        >
          <Button
            variant='outlined'
            color='primary'
            type='submit'
            size='small'
            disableElevation
            onClick={onSaveHandler}
          >
            save draft
          </Button>

          {formState.inputs.slotAllocation.value <= maxSlot * 2 && (
            <Button
              variant='contained'
              color='primary'
              type='submit'
              size='small'
              disableElevation
              onClick={onSubmitHandler}
              disabled={!formState.formIsValid}
              style={{ marginLeft: '1rem' }}
            >
              save & publish
            </Button>
          )}
        </div>
      </div>
    );
  }

  const onCancelHandler = () => {
    props.resetJob();
  };

  return (
    <React.Fragment>
      <Modal show={props.job.error} onCancel={onCancelHandler}>
        Tidak dapat memasang iklan pekerjaan saat ini{' '}
      </Modal>
      <form className={classes.Container}>{formContent}</form>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    job: state.job,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    releaseJob: (jobData, authData) =>
      dispatch(actionCreators.releaseJob(jobData, authData)),
    editJobDraft: (jobData, authData) =>
      dispatch(actionCreators.editJobDraft(jobData, authData)),
    getOneCompany: (payload) => dispatch(actionCreators.getOneCompany(payload)),
    createJobFail: () => dispatch({ type: actionTypes.CREATEJOBFAIL }),
    resetJob: () => dispatch({ type: actionTypes.JOBRESET }),
    getOneJob: (jobsid) => dispatch(actionCreators.getOneJob(jobsid)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditUnreleasedJob));
