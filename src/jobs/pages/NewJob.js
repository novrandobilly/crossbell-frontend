import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Spinner from '../../shared/UI_Element/Spinner/SpinnerCircle';
import Input from '../../shared/UI_Element/Input';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MIN,
  VALIDATOR_ALWAYSTRUE,
} from '../../shared/utils/validator';
import WorkFieldData from '../../shared/UI_Element/WorkFieldData';

import classes from './NewJob.module.css';

const NewJob = (props) => {
  const [maxSlot, setMaxSlot] = useState(null);
  const [employment, setEmployment] = useState('');
  const [employmentOpen, setEmploymentOpen] = useState(false);
  const [educationalStageOpen, setEducationalStageOpen] = useState(false);
  const [educationalStage, setEducationalStage] = useState('');

  const [formState, onInputHandler] = useForm(
    {
      jobTitle: {
        value: '',
        isValid: false,
      },
      jobDescriptions: {
        value: '',
        isValid: false,
      },
      educationalStage: {
        value: '',
        isValid: false,
      },
      technicalRequirement: {
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
      fieldOfWork: {
        value: ['', '', ''],
        isValid: false,
      },
    },
    false
  );

  const { getOneCompany, auth } = props;
  useEffect(() => {
    const employment = document.getElementById('employment');
    const salary = document.getElementById('salary');
    const benefit = document.getElementById('benefit');

    if (employment) onInputHandler('employment', employment.value, true);
    if (salary) onInputHandler('salary', salary.value, true);
    if (benefit) onInputHandler('benefit', benefit.value, true);

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
  }, [onInputHandler, getOneCompany, auth]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!formState.formIsValid) {
      return props.createJobFail();
    }

    const jobData = {
      jobTitle: formState.inputs.jobTitle.value,
      placementLocation: formState.inputs.placementLocation.value,
      jobDescriptions: formState.inputs.jobDescriptions.value,
      educationalStage: formState.inputs.educationalStage.value,
      technicalRequirement: formState.inputs.technicalRequirement.value,
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
    console.log(jobData);
    try {
      const res = await props.createJob(jobData, authData);
      console.log(res);
      props.history.push('/jobs-dashboard');
    } catch (err) {
      console.log(err);
    }
  };

  const onSaveHandler = async (event) => {
    event.preventDefault();
    const jobData = {
      jobTitle: formState.inputs.jobTitle.value,
      placementLocation: formState.inputs.placementLocation.value,
      jobDescriptions: formState.inputs.jobDescriptions.value,
      educationalStage: formState.inputs.educationalStage.value,
      technicalRequirement: formState.inputs.technicalRequirement.value,
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
    console.log(jobData);
    try {
      const res = await props.saveJobDraft(jobData, authData);
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
      placementLocation: formState.inputs.placementLocation.value,
      jobDescriptions: formState.inputs.jobDescriptions.value,
      educationalStage: formState.inputs.educationalStage.value,
      technicalRequirement: formState.inputs.technicalRequirement.value,
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
    console.log(jobData);
    try {
      const res = await props.saveJobDraft(jobData, authData);
      console.log(res);
      props.history.push(`/co/order/reguler`);
    } catch (err) {
      console.log(err);
    }
  };

  const fowHandler = (e, value) => {
    let elementArray = value;
    onInputHandler('fieldOfWork', elementArray, true);
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

            <Input
              inputType='input'
              id='placementLocation'
              InputClass='AddJobInput'
              validatorMethod={[VALIDATOR_REQUIRE()]}
              onInputHandler={onInputHandler}
              label='Lokasi Penempatan*'
              helperText='Lokasi penempatan wajib diisi'
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

            <Input
              inputType='input'
              id='technicalRequirement'
              InputClass='AddJobInput'
              validatorMethod={[VALIDATOR_REQUIRE()]}
              onInputHandler={onInputHandler}
              label='Persyaratan teknis*'
              helperText='Persyaratan teknis wajib diisi'
            />
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
                }}
              >
                <MenuItem value='' style={{ fontSize: '0.9rem' }}>
                  <em>Pilih</em>
                </MenuItem>
                <MenuItem
                  id={0}
                  value='permanent'
                  style={{ fontSize: '0.9rem' }}
                >
                  Permanen
                </MenuItem>
                <MenuItem
                  id={0}
                  value='contract'
                  style={{ fontSize: '0.9rem' }}
                >
                  Kontrak
                </MenuItem>
                <MenuItem id={0} value='intern' style={{ fontSize: '0.9rem' }}>
                  Intern/Magang
                </MenuItem>
              </Select>
            </FormControl>

            <Input
              inputType='input'
              id='emailRecipient'
              InputClass='AddJobInput'
              validatorMethod={[VALIDATOR_REQUIRE()]}
              onInputHandler={onInputHandler}
              label='Email penerima*'
              helperText='Mohon masukkan email yang valid'
            />
          </div>

          <div className={classes.ContentWrap}>
            <Autocomplete
              multiple
              id='fieldOfWork'
              name='fieldOfWork'
              options={WorkFieldData.sort().map((option) => option)}
              getOptionLabel={(option) => option}
              onChange={fowHandler}
              style={{ margin: '0', width: '100%' }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  style={{ margin: '0' }}
                  label='Bidang minat*'
                  margin='normal'
                  variant='standard'
                />
              )}
            />
          </div>
        </div>
      </div>

      <div style={{ width: '95%', marginTop: '2rem' }}>
        <Input
          inputType='textarea'
          id='jobDescriptions'
          InputClass='AddJobInput'
          validatorMethod={[VALIDATOR_REQUIRE()]}
          onInputHandler={onInputHandler}
          label='Deskripsi pekerjaan*'
        />
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
            label='Keuntungan (optional)'
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
            step='1000'
          />
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
              max={parseInt(maxSlot) * 2 || 0}
              step='2'
            />
            <span>minggu</span>
          </div>
          <div className={classes.RemainingSlot}>
            <h3>
              Sisa slot:{' '}
              {formState.inputs.slotAllocation.value &&
              formState.inputs.slotAllocation.value > 0 &&
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

  if (props.job.isLoading) {
    formContent = <Spinner />;
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
    createJob: (jobData, authData) =>
      dispatch(actionCreators.createJob(jobData, authData)),
    saveJobDraft: (jobData, authData) =>
      dispatch(actionCreators.saveJobDraft(jobData, authData)),
    getOneCompany: (payload) => dispatch(actionCreators.getOneCompany(payload)),
    createJobFail: () => dispatch({ type: actionTypes.CREATEJOBFAIL }),
    resetJob: () => dispatch({ type: actionTypes.JOBRESET }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewJob));
