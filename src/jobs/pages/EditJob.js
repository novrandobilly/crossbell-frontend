import React, { useEffect, useState } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { useForm } from '../../shared/utils/useForm';
import * as actionCreators from '../../store/actions';

import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import LoadingBar from '../../shared/UI_Element/Spinner/LoadingBar';
import Input from '../../shared/UI_Element/Input';
import { VALIDATOR_REQUIRE } from '../../shared/utils/validator';
import classes from './EditJob.module.css';

const EditJob = props => {
  const jobid = useParams().jobsid;
  const [identifiedJob, setIdentifiedJob] = useState(null);
  const [employment, setEmployment] = useState('');
  const [employmentOpen, setEmploymentOpen] = useState(false);

  const [formState, onInputHandler] = useForm(
    {
      educationalStage: {
        value: identifiedJob ? identifiedJob.educationalStage : '',
        isValid: identifiedJob ? identifiedJob.educationalStage : false,
      },
      specialRequirement: {
        value: identifiedJob ? identifiedJob.specialRequirement : '',
        isValid: identifiedJob ? identifiedJob.specialRequirement : false,
      },

      employment: {
        value: identifiedJob ? identifiedJob.employment : '',
        isValid: identifiedJob ? identifiedJob.employment : false,
      },
      salary: {
        value: identifiedJob ? identifiedJob.salary : '',
        isValid: identifiedJob ? identifiedJob.salary : false,
      },
      jobDescriptions: {
        value: identifiedJob ? identifiedJob.jobDescriptions : '',
        isValid: identifiedJob ? identifiedJob.description : false,
      },

      isHidden: {
        value: identifiedJob ? identifiedJob.isHidden : '',
        isValid: identifiedJob && identifiedJob.isHidden ? true : false,
      },
    },
    true
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { getOneJob } = props;
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await getOneJob(jobid);
        setIdentifiedJob(res);
        setEmployment(res.employment);
      } catch (err) {
        console.log(err);
      }
    };
    fetchJob();
  }, [getOneJob, jobid]);

  const onSubmitHandler = async event => {
    event.preventDefault();
    const payload = {
      jobId: jobid,
      jobDescriptions: formState.inputs.jobDescriptions.value,
      isHidden: formState.inputs.isHidden.value,
      employment: formState.inputs.employment.value,
      educationalStage: formState.inputs.educationalStage.value,
      salary: formState.inputs.salary.value,
      specialRequirement: formState.inputs.specialRequirement.value,
      token: props.auth.token,
    };

    try {
      await props.updateJob(payload);
      props.history.push(`/jobs/${jobid}`);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (identifiedJob) {
      const isHiddenEl = document.getElementById('isHidden');
      isHiddenEl.checked = identifiedJob.isHidden;
      onInputHandler('isHidden', identifiedJob.isHidden, true);
    }
    onInputHandler('employment', formState.inputs.employment.value, true);
  }, [identifiedJob, onInputHandler, formState.inputs.employment.value]);

  const handleEmploymentChange = e => {
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

  const onCheckedInputHandler = e => {
    const elementId = e.target.name;
    const elementValue = e.target.checked;
    onInputHandler(elementId, elementValue, true);
  };

  let formContent = <LoadingBar />;
  if (identifiedJob && !props.job.isLoading) {
    formContent = (
      <div className={classes.FormContainer}>
        <p className={classes.FormTitle}>Edit iklan pekerjaan: </p>

        <div className={classes.FormRow}>
          <div className={classes.EditLabel}>
            <div className={classes.InputDiv}>
              <Input
                inputType='input'
                id='jobDescriptions'
                InputClass='AddJobInput'
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label='Deskripsi pekerjaan*'
                initValue={identifiedJob.jobDescriptions}
                initIsValid={true}
              />
            </div>
            <div className={classes.InputDiv}>
              <Input
                inputType='input'
                id='educationalStage'
                InputClass='AddJobInput'
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label='Jenjang pendidikan*'
                initValue={identifiedJob.educationalStage}
                initIsValid={true}
              />
            </div>

            <div className={classes.InputDiv}>
              <Input
                inputType='input'
                id='specialRequirement'
                InputClass='AddJobInput'
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label='Persyaratan teknis*'
                initValue={identifiedJob.specialRequirement}
                initIsValid={true}
              />
            </div>

            <div className={classes.InputDiv}>
              <FormControl
                className={classes.formControl}
                style={{
                  width: '100%',
                }}>
                <InputLabel id='employment' style={{ fontSize: '1rem' }}>
                  Jenis Pekerjaan*
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
            </div>

            <div className={classes.InputDiv}>
              <Input
                inputType='input'
                id='salary'
                InputClass='AddJobInput'
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label='Gaji*'
                initValue={identifiedJob.salary}
                initIsValid={true}
              />
            </div>

            <div className={classes.CheckBoxDiv}>
              <label onChange={onCheckedInputHandler} className={classes.CheckBoxLabel}>
                <input id='isHidden' type='checkbox' name='isHidden' className={classes.CheckBox} />
                <p style={{ margin: '0' }}>Rahasiakan nama perusahaan</p>
              </label>
            </div>
          </div>
        </div>
        <div className={classes.Footer}>
          <Button
            variant='contained'
            color='primary'
            type='submit'
            size='small'
            disableElevation
            onClick={onSubmitHandler}
            disabled={!formState.formIsValid}
            style={{ marginTop: '1rem' }}>
            save
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmitHandler} className={classes.Container}>
      <div className={classes.ContainerFlex}>{formContent}</div>
    </form>
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
    updateJob: payload => dispatch(actionCreators.updateJob(payload)),
    getOneJob: jobId => dispatch(actionCreators.getOneJob(jobId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditJob));
