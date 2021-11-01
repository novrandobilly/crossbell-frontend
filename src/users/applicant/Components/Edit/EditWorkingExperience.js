import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, withRouter } from 'react-router-dom';
import { useForm } from '../../../../shared/utils/useForm';

import * as actionTypes from '../../../../store/actions/actions';
import * as actionCreators from '../../../../store/actions/index';
import { VALIDATOR_REQUIRE, VALIDATOR_ALWAYSTRUE } from '../../../../shared/utils/validator';

import Modal from '../../../../shared/UI_Element/Modal';
import Checkbox from '@material-ui/core/Checkbox';
import LoadingBar from '../../../../shared/UI_Element/Spinner/LoadingBar';
import Input from '../../../../shared/UI_Element/Input';

import styles from './EditWorkingExperience.module.scss';

const Experience = props => {
  const { applicantid } = useParams();
  const { workingExperienceId } = props;

  const [data, setData] = useState();
  const [stillWorking, setStillWorking] = useState(false);

  const { getOneApplicant } = props;
  useEffect(() => {
    const payload = {
      applicantId: applicantid,
      token: props.auth.token,
    };
    if (props.auth.token) {
      getOneApplicant(payload).then(res => {
        const workExperience = res.applicant?.experience.filter(exp => exp.id === workingExperienceId)[0];
        if (workExperience.endDate === null) setStillWorking(true);
        setData(workExperience);
      });
    }
  }, [getOneApplicant, applicantid, workingExperienceId, props.auth.token]);

  const [formState, onInputHandler] = useForm(
    {
      prevTitle: {
        value: data ? data.prevTitle : null,
        isValid: data && data.prevTitle ? true : false,
      },
      prevCompany: {
        value: data ? data.prevCompany : null,
        isValid: data && data.prevCompany ? true : false,
      },
      prevIndustry: {
        value: data ? data.prevIndustry : null,
        isValid: data && data.prevIndustry ? true : false,
      },
      startDate: {
        value: data ? data.startDate : null,
        isValid: data && data.startDate ? true : false,
      },
      endDate: {
        value: data ? data.endDate : null,
        isValid: true,
      },
      description: {
        value: data ? data.description : null,
        isValid: data && data.description ? true : false,
      },
    },
    false
  );
  console.log(formState);

  const onSubmitHandler = async event => {
    event.preventDefault();

    if (!formState.formIsValid) {
      return props.updateApplicantFail();
    }
    let updatedExperience = {
      applicantId: applicantid,
      experienceId: workingExperienceId,
      prevTitle: formState.inputs.prevTitle.value,
      prevCompany: formState.inputs.prevCompany.value,
      prevIndustry: formState.inputs.prevIndustry.value,
      startDate: formState.inputs.startDate.value,
      endDate: stillWorking ? null : formState.inputs.endDate.value,
      description: formState.inputs.description.value,
      token: props.auth.token,
    };

    try {
      await props.updateApplicantExperience(updatedExperience);
      props.onCancel();
      props.fetchApplicantData();
    } catch (err) {
      console.log(err);
    }
  };

  const dateHandler = event => {
    const isChecked = event.target.checked;
    setStillWorking(isChecked);
  };

  let formContent = <LoadingBar />;

  if (!props.isLoading && data) {
    formContent = (
      <div className={styles.EditWorkingExperienceContainer}>
        <div className={styles.WorkingExperienceInput}>
          <Input
            inputType='input'
            id='prevTitle'
            inputClass='AddJobInput'
            validatorMethod={[VALIDATOR_REQUIRE()]}
            onInputHandler={onInputHandler}
            label={true}
            labelName='Jabatan*'
            initValue={data.prevTitle}
            initIsValid={true}
          />

          <Input
            inputType='input'
            id='prevCompany'
            inputClass='AddJobInput'
            validatorMethod={[VALIDATOR_REQUIRE()]}
            onInputHandler={onInputHandler}
            label={true}
            labelName='Nama Perusahaan*'
            initValue={data.prevCompany}
            initIsValid={true}
          />

          <Input
            inputType='input'
            id='prevIndustry'
            inputClass='AddJobInput'
            validatorMethod={[VALIDATOR_REQUIRE()]}
            onInputHandler={onInputHandler}
            label={true}
            labelName='Industri*'
            initValue={data.prevIndustry}
            initIsValid={true}
          />

          <div className={styles.WorkingPeriod}>
            <Input
              inputType='datePicker'
              id='startDate'
              validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
              onInputHandler={onInputHandler}
              views={['year', 'month']}
              format='MMMM YYYY'
              label={true}
              labelName='Sejak'
              initValue={data.startDate}
              initIsValid={true}
            />

            {!stillWorking && (
              <Input
                inputType='datePicker'
                id='endDate'
                validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
                onInputHandler={onInputHandler}
                views={['year', 'month']}
                format='MMMM YYYY'
                label={true}
                labelName='Hingga'
                initValue={data.endDate}
                initIsValid={true}
              />
            )}
          </div>

          <div className={styles.StillWorkingHereCheck}>
            <Checkbox
              checked={stillWorking}
              color='primary'
              size='small'
              onChange={dateHandler}
              style={{ padding: '0' }}
              id='stillWorkingHere'
            />
            <label htmlFor='stillWorkingHere' className={styles.CheckboxText}>
              Saya masih berkerja disini
            </label>
          </div>

          <Input
            inputType='textarea'
            id='description'
            inputClass='EditProfileTextArea'
            validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
            onInputHandler={onInputHandler}
            label={true}
            labelName='Uraian pekerjaan (optional)'
            rows={10}
            style={{ border: '2px solid #f79f35', outline: 'none' }}
            initValue={data.description}
            initIsValid={true}
          />
        </div>

        <div className={styles.SubmitButton}>
          <button type='button' onClick={props.onCancel}>
            Back
          </button>
          <button disabled={!formState.formIsValid} type='submit'>
            Save
          </button>
        </div>
      </div>
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
    updateApplicantExperience: ApplicantData => dispatch(actionCreators.updateApplicantExperience(ApplicantData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Experience));
