import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter, useParams, Link } from 'react-router-dom';
import { useForm } from '../../shared/utils/useForm';

import * as actionTypes from '../../store/actions/actions';
import * as actionCreators from '../../store/actions';
import Modal from '../../shared/UI_Element/Modal';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Spinner from '../../shared/UI_Element/Spinner/SpinnerCircle';
import Input from '../../shared/UI_Element/Input';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MIN,
  VALIDATOR_ALWAYSTRUE,
  VALIDATOR_EMAIL,
} from '../../shared/utils/validator';
import WorkFieldData from '../../shared/UI_Element/WorkFieldData';
import AddIcon from '@material-ui/icons/Add';

import classes from './NewJob.module.css';

const EditUnreleasedJob = (props) => {
  const { jobsid } = useParams();
  const [loadedJob, setLoadedJob] = useState(null);
  const [maxSlot, setMaxSlot] = useState(null);

  const [fieldOfWork, setFieldOfWork] = useState(['', '', '']);
  const [employment, setEmployment] = useState('');
  const [open, setOpen] = useState([false, false, false]);
  const [employmentOpen, setEmploymentOpen] = useState(false);
  const [educationalStageOpen, setEducationalStageOpen] = useState(false);
  const [educationalStage, setEducationalStage] = useState('');

  const { getOneCompany, auth, getOneJob } = props;
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await getOneJob(jobsid);
        setFieldOfWork(res.fieldOfWork);
        setEmployment(res.employment);
        setEducationalStage(res.educationalStage);
        setLoadedJob(res);
        console.log(res);
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
      jobDescriptions: {
        value: loadedJob ? loadedJob.jobDescriptions : '',
        isValid: loadedJob && loadedJob.jobDescriptions ? true : false,
      },
      educationalStage: {
        value: loadedJob ? loadedJob.educationalStage : '',
        isValid: loadedJob && loadedJob.educationalStage ? true : false,
      },
      technicalRequirement: {
        value: loadedJob ? loadedJob.technicalRequirement : '',
        isValid: loadedJob && loadedJob.technicalRequirement ? true : false,
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

      benefit: {
        value: loadedJob ? loadedJob.benefit : '',
        isValid: true,
      },

      slotAllocation: {
        value: loadedJob ? loadedJob.slotAllocation : '',
        isValid: loadedJob && loadedJob.slotAllocation ? true : false,
      },

      fieldOfWork: {
        value: loadedJob ? loadedJob.fieldOfWork : ['', '', ''],
        isValid: loadedJob && loadedJob.fieldOfWork ? true : false,
      },
    },
    false
  );

  console.log(formState);

  const checkmyinput = () => {
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
      const salary = document.getElementById('salary');
      const benefit = document.getElementById('benefit');
      onInputHandler('fieldOfWork', fieldOfWork, true);
      onInputHandler('educationalStage', educationalStage, true);
      onInputHandler('employment', employment, true);
      onInputHandler('salary', salary.value, true);
      onInputHandler('benefit', benefit.value, true);
    }
  }, [onInputHandler, loadedJob, employment, educationalStage, fieldOfWork]);

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
    try {
      if (formState.inputs.slotAllocation.value % 2 !== 0) {
        throw new Error('Slot allocation harus genap');
      }
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

  const fowHandler = (e) => {
    let indexFow;
    switch (e.target.name) {
      case 'fieldOfWork-1':
        indexFow = 0;
        break;
      case 'fieldOfWork-2':
        indexFow = 1;
        break;
      case 'fieldOfWork-3':
        indexFow = 2;
        break;
      default:
        indexFow = 0;
    }
    const elementId = 'fieldOfWork';
    const elementArray = [...fieldOfWork];
    elementArray[indexFow] = e.target.value;
    setFieldOfWork(elementArray);
    onInputHandler(elementId, elementArray, true);
  };

  const handleEmploymentChange = (e) => {
    const elementId = e.target.name;
    const elementValue = e.target.value;
    onInputHandler(elementId, elementValue, true);
    setEmployment(e.target.value);
  };

  const handleClose = () => {
    setOpen([false, false, false]);
  };

  const handleOpen = (e) => {
    let index;
    switch (e.target.id) {
      case 'fieldOfWork-1':
        index = 0;
        break;
      case 'fieldOfWork-2':
        index = 1;
        break;
      case 'fieldOfWork-3':
        index = 2;
        break;
      default:
        index = 0;
    }
    let openArray = [...open];
    openArray[index] = true;
    setOpen(openArray);
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
              />

              <Input
                inputType='input'
                id='placementLocation'
                InputClass='AddJobInput'
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label='Lokasi Penempatan*'
                initValue={loadedJob.placementLocation}
                initIsValid={loadedJob.placementLocation ? true : false}
              />
            </div>

            <div className={classes.ContentWrap}>
              <FormControl
                className={classes.formControl}
                style={{ margin: '0.8rem 0' }}
              >
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

              <Input
                inputType='input'
                id='technicalRequirement'
                InputClass='AddJobInput'
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label='Persyaratan teknis*'
                initValue={loadedJob.technicalRequirement}
                initIsValid={loadedJob.technicalRequirement ? true : false}
              />
            </div>

            <div className={classes.ContentWrap}>
              <FormControl
                className={classes.FormControl}
                style={{ marginTop: '.68rem' }}
              >
                <InputLabel id='employmentLabel' style={{ fontSize: '1rem' }}>
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
                  <MenuItem
                    id={0}
                    value='intern'
                    style={{ fontSize: '0.9rem' }}
                  >
                    Intern/Magang
                  </MenuItem>
                </Select>
              </FormControl>

              <Input
                inputType='input'
                id='emailRecipient'
                InputClass='AddJobInput'
                validatorMethod={[VALIDATOR_EMAIL()]}
                onInputHandler={onInputHandler}
                label='Email penerima*'
                helperText='Please input a valid email address'
                initValue={loadedJob.emailRecipient}
                initIsValid={loadedJob.emailRecipient ? true : false}
              />
            </div>

            <div className={classes.ContentWrap}>
              <FormControl
                className={classes.FormControl}
                style={{ marginTop: '.68rem' }}
              >
                <InputLabel id='fieldOfWorkLabel1' style={{ fontSize: '1rem' }}>
                  Bidang pekerjaan (Wajib)
                </InputLabel>

                <Select
                  labelId='fieldOfWorkLabel1'
                  id='fieldOfWork-1'
                  name='fieldOfWork-1'
                  open={open[0]}
                  onClose={handleClose}
                  onOpen={handleOpen}
                  value={fieldOfWork[0] ? fieldOfWork[0] : ''}
                  onChange={fowHandler}
                  style={{
                    fontSize: '0.9rem',
                    textAlign: 'left',
                  }}
                >
                  <MenuItem value='' style={{ fontSize: '0.9rem' }}>
                    <em>Pilih</em>
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
                className={classes.FormControl}
                style={{ marginTop: '.68rem' }}
              >
                <InputLabel id='fieldOfWorkLabel2' style={{ fontSize: '1rem' }}>
                  Bidang pekerjaan (Opsional)
                </InputLabel>

                <Select
                  labelId='fieldOfWorkLabel2'
                  id='fieldOfWork-2'
                  name='fieldOfWork-2'
                  open={open[1]}
                  onClose={handleClose}
                  onOpen={handleOpen}
                  value={fieldOfWork[1] ? fieldOfWork[1] : ''}
                  onChange={fowHandler}
                  style={{
                    fontSize: '0.9rem',
                    textAlign: 'left',
                  }}
                >
                  <MenuItem value='' style={{ fontSize: '0.9rem' }}>
                    <em>Pilih</em>
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
                className={classes.FormControl}
                style={{ marginTop: '1.2rem' }}
              >
                <InputLabel id='fieldOfWorkLabel3' style={{ fontSize: '1rem' }}>
                  Bidang pekerjaan (Opsional)
                </InputLabel>

                <Select
                  labelId='fieldOfWorkLabel3'
                  id='fieldOfWork-3'
                  name='fieldOfWork-3'
                  open={open[2]}
                  onClose={handleClose}
                  onOpen={handleOpen}
                  value={fieldOfWork[2] ? fieldOfWork[2] : ''}
                  onChange={fowHandler}
                  style={{
                    fontSize: '0.9rem',
                    textAlign: 'left',
                  }}
                >
                  <MenuItem value='' style={{ fontSize: '0.9rem' }}>
                    <em>Pilih</em>
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
            initValue={loadedJob.jobDescriptions || ''}
            initIsValid={loadedJob.jobDescriptions ? true : false}
            helperText='Deskripsi pekerjaan wajib diisi'
          />
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
              label='Keuntungan (optional)'
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
              step='1000'
            />
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
                onKeyUp={checkmyinput()}
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
                  color='primary'
                  disableElevation
                  size='small'
                  startIcon={<AddIcon />}
                  style={{ fontWeight: '600' }}
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
    createJob: (jobData, authData) =>
      dispatch(actionCreators.createJob(jobData, authData)),
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
