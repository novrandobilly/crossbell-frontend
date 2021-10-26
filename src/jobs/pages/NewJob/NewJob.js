import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useForm } from '../../../shared/utils/useForm';

import * as actionTypes from '../../../store/actions/actions';
import * as actionCreators from '../../../store/actions';
import Modal from '../../../shared/UI_Element/Modal';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import LoadingBar from '../../../shared/UI_Element/Spinner/LoadingBar';
import TextField from '@material-ui/core/TextField';
import Input from '../../../shared/UI_Element/Input';
import { VALIDATOR_REQUIRE, VALIDATOR_MIN, VALIDATOR_ALWAYSTRUE } from '../../../shared/utils/validator';
import WorkFieldData from '../../../shared/UI_Element/PredefinedData/WorkFieldData';
import CitiesData from '../../../shared/UI_Element/PredefinedData/CitiesData';
import Slider from '@material-ui/core/Slider';

import classes from './NewJob.module.css';

const NewJob = props => {
  const [maxSlot, setMaxSlot] = useState(null);
  const [jobExperience, setJobExperience] = useState('');
  const [jobExperienceOpen, setJobExperienceOpen] = useState(false);
  const [employment, setEmployment] = useState('');
  const [employmentOpen, setEmploymentOpen] = useState(false);
  const [educationalStageOpen, setEducationalStageOpen] = useState(false);
  const [educationalStage, setEducationalStage] = useState('');

  const [requirement, setRequirement] = useState(['req']);
  const [requirementList, setRequirementList] = useState([]);
  const [rangeAge, setRangeAge] = useState([18, 35]);
  const [fieldOfWork, setFieldOfWork] = useState('');

  const filter = createFilterOptions();

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
        value: '',
        isValid: false,
      },
      placementLocation: {
        value: '',
        isValid: false,
      },
      emailRecipient: {
        value: '',
        isValid: true,
      },
      employment: {
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
      jobExperience: {
        value: null,
        isValid: false,
      },
      rangeAge: {
        value: [],
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { getOneCompany, auth } = props;
  useEffect(() => {
    const salary = document.getElementById('salary');
    const benefit = document.getElementById('benefit');

    onInputHandler('fieldOfWork', fieldOfWork?.field, fieldOfWork?.field ? true : false);
    onInputHandler('salary', salary?.value, true);
    onInputHandler('benefit', benefit?.value, true);
    onInputHandler('rangeAge', rangeAge, true);
    onInputHandler('specialRequirement', requirementList, true);

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

  const onAddSlotHandler = async event => {
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
      const res = await props.saveJobDraft(jobData, authData);
      console.log(res);
      props.history.push(`/co/order/reguler`);
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

  const handleJobExperienceClose = () => {
    setJobExperienceOpen(false);
  };

  const handleJobExperienceOpen = () => {
    setJobExperienceOpen(true);
  };

  const handleEmploymentChange = e => {
    const elementId = e.target.name;
    const elementValue = e.target.value;
    onInputHandler(elementId, elementValue, true);
    setEmployment(elementValue);
  };

  const handleEmploymentClose = () => {
    setEmploymentOpen(false);
  };

  const handleEmploymentOpen = () => {
    setEmploymentOpen(true);
  };

  const handleChange = e => {
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
      return newState;
    });
  };

  let formContent = (
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
              helperText='Judul iklan pekerjaan wajib diisi'
            />

            <Autocomplete
              id='placementLocation'
              name='placementLocation'
              options={cities.map(option => option)}
              onChange={handleLocationChange}
              style={{ margin: '0' }}
              renderInput={params => (
                // <Input
                //   params={{ ...params }}
                //   inputType='autoComplete'
                //   validatorMethod={[VALIDATOR_REQUIRE()]}
                //   label='Lokasi*'
                //   helperText='Lokasi pekerjaan wajib diisi'
                // />
                <TextField {...params} style={{ margin: '0' }} label='Lokasi*' margin='normal' variant='standard' />
              )}
            />
          </div>

          <div className={classes.ContentWrap}>
            <FormControl className={classes.formControl}>
              <InputLabel id='educationalStage' style={{ fontSize: '1rem' }}>
                Tingkat Pendidikan*
              </InputLabel>

              <Select
                labelId='educationalStage'
                id='educationalStage'
                name='educationalStage'
                open={educationalStageOpen}
                onClose={handleEducationClose}
                onOpen={handleEducationOpen}
                value={educationalStage}
                onChange={handleChange}
                style={{ fontSize: '0.9rem', textAlign: 'left' }}>
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
                }}>
                <MenuItem value='' style={{ fontSize: '0.9rem' }}>
                  <em>Pilih</em>
                </MenuItem>
                <MenuItem id={0} value='<2' style={{ fontSize: '0.9rem' }}>
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
            <FormControl className={classes.FormControl}>
              <InputLabel id='employment' style={{ fontSize: '1rem' }}>
                Jenis Kontrak*
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
                }}>
                <MenuItem value='' style={{ fontSize: '0.9rem' }}>
                  <em>Pilih</em>
                </MenuItem>
                <MenuItem id={0} value='permanent' style={{ fontSize: '0.9rem' }}>
                  Karyawan Tetap
                </MenuItem>
                <MenuItem id={0} value='contract' style={{ fontSize: '0.9rem' }}>
                  Karyawan kontrak (PKWT)
                </MenuItem>
                <MenuItem id={0} value='intern' style={{ fontSize: '0.9rem' }}>
                  Karyawan magang (Intern)
                </MenuItem>
              </Select>
            </FormControl>

            <Input
              inputType='input'
              id='emailRecipient'
              InputClass='AddJobInput'
              validatorMethod={[VALIDATOR_REQUIRE()]}
              onInputHandler={onInputHandler}
              label='Email Penerima*'
              helperText='Mohon masukkan email yang valid'
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
              getOptionLabel={option => {
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
              renderOption={option => option.field}
              freeSolo
              style={{ margin: '0', width: '100%' }}
              renderInput={params => (
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
          helperText='Deskripsi pekerjaan wajib diisi'
        />
      </div>

      <div className={classes.CheckBoxDiv}>
        <label onChange={onCheckedInputHandler} className={classes.CheckBoxLabel}>
          <input id='isHidden' type='checkbox' name='isHidden' className={classes.CheckBox} />
          <p style={{ margin: '0' }}>Rahasiakan nama perusahaan</p>
        </label>
      </div>

      <div className={classes.AdditionalContentContainer}>
        <h2 className={classes.AdditionalContentHeader}>Informasi Tambahan</h2>
        <div className={classes.AdditionalContent}>
          <Input
            inputType='input'
            id='benefit'
            InputClass='AddJobInput'
            validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
            onInputHandler={onInputHandler}
            label='Fasilitas & benefit (optional)'
            error={false}
          />

          <Input
            inputType='input'
            id='salary'
            InputClass='AddJobInput'
            validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
            onInputHandler={onInputHandler}
            label='Gaji (optional)'
            error={false}
            type='number'
            min={0}
            step='500000'
          />
        </div>

        <div className={classes.ContentFull}>
          <div className={classes.SpecialReqDiv}>
            <div className={classes.SpecialReqHeader}>
              <p className={classes.SpecialRequirement}>Persyaratan Khusus</p>
              <p className={classes.SpecialTips}>skill teknis, karakter, atau persyaratan khusus lainnya (maks 5)</p>
            </div>
            <Button
              variant='contained'
              color='primary'
              type='button'
              disableElevation
              onClick={requirement.length < 5 ? addRequirement : null}
              style={{ height: 'fit-content', alignSelf: 'flex-end' }}
              size='small'>
              Tambah Persyaratan
            </Button>
          </div>

          {requirement.map((req, i) => {
            return (
              <div className={classes.AutoAddDiv} key={i}>
                <p className={classes.ListNuber}>{i + 1}.</p>

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
        <div className={classes.DurationContent}>
          <div className={classes.SlotInput}>
            <Input
              inputType='input'
              id='slotAllocation'
              InputClass='AddJobInput'
              validatorMethod={[VALIDATOR_MIN(1)]}
              onInputHandler={onInputHandler}
              type='number'
              min={0}
              max={parseInt(maxSlot) || 0}
              step='1'
            />
            <span>bulan</span>
          </div>
          <div className={classes.RemainingSlot}>
            <h3>
              Sisa slot:{' '}
              {formState.inputs.slotAllocation.value &&
              formState.inputs.slotAllocation.value > 0 &&
              parseInt(maxSlot) > parseInt(formState.inputs.slotAllocation.value)
                ? (parseInt(maxSlot) - parseInt(formState.inputs.slotAllocation.value)).toString()
                : maxSlot}
            </h3>

            <div className={classes.SlotAddButton}>
              <Button
                disableElevation
                size='small'
                style={{ fontWeight: '600' }}
                startIcon={<AddIcon />}
                onClick={onAddSlotHandler}>
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
        }}>
        <Button variant='outlined' color='primary' type='submit' size='small' disableElevation onClick={onSaveHandler}>
          save draft
        </Button>

        {formState.inputs.slotAllocation.value <= maxSlot && (
          <Button
            variant='contained'
            color='primary'
            type='submit'
            size='small'
            disableElevation
            onClick={onSubmitHandler}
            disabled={!formState.formIsValid}
            style={{ marginLeft: '1rem' }}>
            save & publish
          </Button>
        )}
      </div>
    </div>
  );

  if (props.job.isLoading) {
    formContent = <LoadingBar />;
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
