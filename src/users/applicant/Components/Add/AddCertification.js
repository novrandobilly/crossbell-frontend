import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { useParams, withRouter } from 'react-router-dom';
import { useForm } from '../../../../shared/utils/useForm';
import moment from 'moment';

import * as actionTypes from '../../../../store/actions/actions';
import * as actionCreators from '../../../../store/actions/index';
import { VALIDATOR_REQUIRE, VALIDATOR_ALWAYSTRUE } from '../../../../shared/utils/validator';

import Modal from '../../../../shared/UI_Element/Modal';
import LoadingBar from '../../../../shared/UI_Element/Spinner/LoadingBar';
import Input from '../../../../shared/UI_Element/Input';
import Checkbox from '@material-ui/core/Checkbox';

import styles from './AddCertification.module.scss';

const Certification = (props) => {
  const { applicantid } = useParams();
  const [isExpired, setIsExpired] = useState(true);

  const [formState, onInputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      organization: {
        value: '',
        isValid: false,
      },
      startDate: {
        value: '',
        isValid: false,
      },
      endDate: {
        value: '',
        isValid: false,
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

  const expiryHandler = (event) => {
    setIsExpired(!isExpired);
    formState.inputs.endDate.isValid = true;
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!formState.formIsValid) {
      return props.updateApplicantFail();
    }

    const updatedCertification = {
      applicantId: applicantid,
      title: formState.inputs.title.value,
      organization: formState.inputs.organization.value,
      startDate: formState.inputs.startDate.value,
      endDate: isExpired ? formState.inputs.endDate.value : null,
      description: formState.inputs.description.value,
      token: props.auth.token,
    };
    try {
      await props.updateApplicantCertification(updatedCertification);
      props.onCancel();
      props.fetchApplicantData();
    } catch (err) {
      console.log(err);
    }
  };

  let formContent = (
    <form onSubmit={onSubmitHandler} className={styles.AddCertificationContainer}>
      <Input
        inputType='input'
        id='title'
        inputClass='AddJobInput'
        validatorMethod={[VALIDATOR_REQUIRE()]}
        onInputHandler={onInputHandler}
        label={true}
        labelName='Nama Sertifikasi*'
      />

      <Input
        inputType='input'
        id='organization'
        inputClass='AddJobInput'
        validatorMethod={[VALIDATOR_REQUIRE()]}
        onInputHandler={onInputHandler}
        label={true}
        labelName='Organisasi Penerbit*'
      />

      <div className={styles.CertificationValidity}>
        <Input
          inputType='datePicker'
          id='startDate'
          validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
          onInputHandler={onInputHandler}
          views={['year', 'month']}
          format='MMMM YYYY'
          label={true}
          labelName='Berlaku sejak*'
          initIsValid={true}
          initValue={moment()}
        />

        {isExpired && (
          <Input
            inputType='datePicker'
            id='endDate'
            validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
            onInputHandler={onInputHandler}
            views={['year', 'month']}
            format='MMMM YYYY'
            label={true}
            disableFuture={false}
            labelName='Hingga*'
            initIsValid={true}
            initValue={moment()}
          />
        )}
      </div>

      <div className={styles.IsExpiredCheck}>
        <Checkbox color='primary' size='small' onChange={expiryHandler} style={{ padding: '0' }} id='IsExpiredCheck' />
        <label htmlFor='IsExpiredCheck' className={styles.IsExpiredLabel}>
          Berlaku selamanya
        </label>
      </div>

      <Input
        inputType='textarea'
        id='description'
        inputClass='EditProfileTextArea'
        validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
        onInputHandler={onInputHandler}
        label='Deskripsi Sertifikasi (Opsional)'
        rows={10}
        initIsValid={true}
        style={{ border: '2px solid #f79f35', outline: 'none' }}
      />

      <div className={styles.SubmitButtonContainer}>
        <button onClick={props.onCancel} type='button'>
          Back
        </button>
        <button disabled={!formState.formIsValid} type='submit'>
          Save
        </button>
      </div>
    </form>
  );

  if (props.isLoading) {
    formContent = <LoadingBar />;
  }

  const onCancelHandler = () => {
    props.resetApplicant();
  };

  return (
    <Fragment>
      <Modal show={props.error} onCancel={onCancelHandler}>
        Input requirement not fulfilled
      </Modal>
      {formContent}
    </Fragment>
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
    updateApplicantCertification: (ApplicantData) =>
      dispatch(actionCreators.updateApplicantCertification(ApplicantData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Certification));
