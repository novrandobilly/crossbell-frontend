import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, withRouter } from 'react-router-dom';
import { useForm } from '../../../../shared/utils/useForm';
import moment from 'moment';

import * as actionTypes from '../../../../store/actions/actions';
import * as actionCreators from '../../../../store/actions/index';
import { VALIDATOR_REQUIRE, VALIDATOR_ALWAYSTRUE } from '../../../../shared/utils/validator';

import Checkbox from '@material-ui/core/Checkbox';
import Modal from '../../../../shared/UI_Element/Modal';
import LoadingBar from '../../../../shared/UI_Element/Spinner/LoadingBar';
import Input from '../../../../shared/UI_Element/Input';

import styles from './AddWorkingExperience.module.scss';

const AddWorkingExperience = (props) => {
  const { applicantid } = useParams();
  const [stillWorking, setStillWorking] = useState(false);

  const [formState, onInputHandler] = useForm(
    {
      prevTitle: {
        value: '',
        isValid: false,
      },
      prevCompany: {
        value: '',
        isValid: false,
      },
      prevIndustry: {
        value: '',
        isValid: false,
      },
      startDate: {
        value: '',
        isValid: true,
      },
      endDate: {
        value: '',
        isValid: true,
      },
      description: {
        value: '',
        isValid: true,
      },
    },
    false
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!formState.formIsValid) {
      return props.updateApplicantFail();
    }

    let updatedExperience = {
      applicantId: applicantid,
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
  const dateHandler = (event) => {
    setStillWorking(!stillWorking);
  };

  let formContent = (
    <div className={styles.AddWorkingExperienceContainer}>
      <div className={styles.WorkingExperienceInput}>
        <Input
          inputType='input'
          id='prevTitle'
          inputClass='AddJobInput'
          validatorMethod={[VALIDATOR_REQUIRE()]}
          onInputHandler={onInputHandler}
          label={true}
          labelName='Jabatan*'
        />

        <Input
          inputType='input'
          id='prevCompany'
          inputClass='AddJobInput'
          validatorMethod={[VALIDATOR_REQUIRE()]}
          onInputHandler={onInputHandler}
          label={true}
          labelName='Nama Perusahaan*'
        />

        <Input
          inputType='input'
          id='prevIndustry'
          inputClass='AddJobInput'
          validatorMethod={[VALIDATOR_REQUIRE()]}
          onInputHandler={onInputHandler}
          label={true}
          labelName='Industri*'
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
            initValue={moment()}
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
              initValue={moment()}
              initIsValid={true}
            />
          )}
        </div>

        <div className={styles.StillWorkingHereCheck}>
          <Checkbox
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
          initIsValid={true}
          rows={10}
          style={{ border: '2px solid #f79f35', outline: 'none' }}
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

  if (props.isLoading) {
    formContent = <LoadingBar />;
  }

  const onCancelHandler = () => {
    props.resetApplicant();
  };

  return (
    <form onSubmit={onSubmitHandler} className={styles.Container}>
      <Modal show={props.error} onCancel={onCancelHandler}>
        Input requirement not fulfilled
      </Modal>
      {formContent}
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.applicant.isLoading,
    error: state.applicant.error,
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetApplicant: () => dispatch({ type: actionTypes.APPLICANTRESET }),
    updateApplicantFail: () => dispatch({ type: actionTypes.UPDATEAPPLICANTFAIL }),
    updateApplicantExperience: (ApplicantData) => dispatch(actionCreators.updateApplicantExperience(ApplicantData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddWorkingExperience));
