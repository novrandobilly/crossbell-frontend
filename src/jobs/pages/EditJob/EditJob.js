import React, { useEffect, useState, Fragment } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { useForm } from '../../../shared/utils/useForm';
import * as actionCreators from '../../../store/actions';

import HeaderBanner from '../../../shared/UI_Element/HeaderBanner';
import CompanyMeeting from '../../../assets/images/CompanyMeeting.png';

import LoadingBar from '../../../shared/UI_Element/Spinner/LoadingBar';
import Input from '../../../shared/UI_Element/Input';
import { VALIDATOR_REQUIRE, VALIDATOR_ALWAYSTRUE } from '../../../shared/utils/validator';
import styles from './EditJob.module.scss';

const EditJob = props => {
  const jobid = useParams().jobsid;
  const [identifiedJob, setIdentifiedJob] = useState(null);
  const [employment, setEmployment] = useState('');
  const [educationalStage, setEducationalStage] = useState('');
  const [requirement, setRequirement] = useState(['req']);

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
        console.log(res);

        res.specialRequirement.forEach((requirement, i) => {
          setRequirement(prevState => [...prevState, 'req']);
        });
        setIdentifiedJob(res);
        setEmployment(res.employment);
        setEducationalStage(res.educationalStage);
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
      specialRequirement: formState.inputs.specialRequirement.value.filter(req => req),
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
      onInputHandler('employment', identifiedJob.employment, true);
      onInputHandler('specialRequirement', identifiedJob.specialRequirement, true);
      onInputHandler('educationalStage', identifiedJob.educationalStage, true);
    }
  }, [identifiedJob, onInputHandler]);

  const handleEmploymentChange = e => {
    const elementId = e.target.name;
    const elementValue = e.target.value;
    onInputHandler(elementId, elementValue, true);
    setEmployment(e.target.value);
  };

  const handleEducationChange = e => {
    const elementId = e.target.name;
    const elementValue = e.target.value;
    onInputHandler(elementId, elementValue, true);
    setEducationalStage(e.target.value);
  };

  const onCheckedInputHandler = e => {
    const elementId = e.target.name;
    const elementValue = e.target.checked;
    onInputHandler(elementId, elementValue, true);
  };

  const onRequirementsUpdate = (event, reqIndex) => {
    let inputValue = event.target.value;
    setIdentifiedJob(prevState => {
      let newState = { ...prevState };
      newState.specialRequirement[reqIndex] = inputValue;
      return newState;
    });
  };
  const addRequirement = e => {
    e.preventDefault();
    setRequirement(req => [...req, 'req']);
  };

  let formContent = <LoadingBar />;
  if (identifiedJob && !props.job.isLoading) {
    formContent = (
      <form onSubmit={onSubmitHandler} className={styles.EditJobContainer}>
        <Input
          inputType='textarea'
          id='jobDescriptions'
          InputClass='AddJobInput'
          validatorMethod={[VALIDATOR_REQUIRE()]}
          onInputHandler={onInputHandler}
          label={true}
          labelName='Deskripsi Pekerjaan*'
          initValue={identifiedJob.jobDescriptions}
          initIsValid={true}
          style={{ border: '2px solid #f79f35', borderRadius: '10px', padding: '5px', fontSize: '18px' }}
          rows={10}
        />

        <div className={styles.EducationEmploymentContainer}>
          <div className={styles.Degree}>
            <p>Tingkat Pendidikan</p>
            <select
              id='educationalStage'
              name='educationalStage'
              value={educationalStage}
              onChange={handleEducationChange}>
              <option value='SMA/SMK'>SMA/SMK</option>
              <option value='D3'>D3</option>
              <option value='S1'>S1</option>
              <option value='S2'>S2</option>
              <option value='S3'>S3</option>
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
                  initValue={identifiedJob.specialRequirement[i]}
                />
              </div>
            );
          })}
        </div>

        <Input
          inputType='input'
          id='salary'
          InputClass='AddJobInput'
          validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
          onInputHandler={onInputHandler}
          initValue={identifiedJob.salary}
          initIsValid={true}
          label={true}
          labelName='Gaji (optional)'
          error={false}
          type='number'
          min={0}
          step='500000'
        />

        <div className={styles.HideCompany}>
          <label onChange={onCheckedInputHandler} className={styles.CheckBoxLabel}>
            <input id='isHidden' type='checkbox' name='isHidden' className={styles.CheckBox} />
            <p>Rahasiakan nama perusahaan</p>
          </label>
        </div>

        <div className={styles.SubmitButtonContainer}>
          <button type='button' onClick={() => props.history.goBack()}>
            Kembali
          </button>
          <button type='submit' onClick={onSubmitHandler} disabled={!formState.formIsValid}>
            Simpan
          </button>
        </div>
      </form>
    );
  }

  return (
    <Fragment>
      <HeaderBanner imageSource={CompanyMeeting} />
      <h1 className={styles.EditTitle}>
        Edit <span>Pekerjaan</span>{' '}
      </h1>
      {formContent}
    </Fragment>
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
