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

import styles from './EditCertification.module.scss';

const Certification = props => {
  const { applicantid } = useParams();
  const { certificationId } = props;

  const [data, setData] = useState();
  const [isExpired, setIsExpired] = useState(true);

  const { getOneApplicant } = props;
  useEffect(() => {
    const payload = {
      applicantId: applicantid,
      token: props.auth.token,
    };
    if (props.auth.token) {
      getOneApplicant(payload).then(res => {
        const certification = res.applicant?.certification.filter(cert => cert.id === certificationId)[0];
        if (certification.endDate === null) setIsExpired(false);
        setData(certification);
      });
    }
  }, [getOneApplicant, applicantid, certificationId, props.auth.token]);

  const [formState, onInputHandler] = useForm(
    {
      title: {
        value: data ? data.title : null,
        isValid: data && data.title ? true : false,
      },
      organization: {
        value: data ? data.organization : null,
        isValid: data && data.organization ? true : false,
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
        isValid: true,
      },
    },
    false
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const expiryHandler = event => {
    setIsExpired(prevState => !prevState);
  };

  const onSubmitHandler = async event => {
    event.preventDefault();

    if (!formState.formIsValid) {
      return props.updateApplicantFail();
    }

    const updatedCertification = {
      applicantId: applicantid,
      certificationId,
      title: formState.inputs.title.value,
      organization: formState.inputs.organization.value,
      startDate: formState.inputs.startDate.value,
      endDate: !isExpired ? null : formState.inputs.endDate.value,
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
  console.log(formState);

  let formContent = <LoadingBar />;

  if (!props.isLoading && data) {
    formContent = (
      <form onSubmit={onSubmitHandler} className={styles.EditCertificationContainer}>
        <Input
          inputType='input'
          id='title'
          inputClass='AddJobInput'
          validatorMethod={[VALIDATOR_REQUIRE()]}
          onInputHandler={onInputHandler}
          label={true}
          labelName='Nama Sertifikasi*'
          initValue={data.title}
          initIsValid={true}
        />

        <Input
          inputType='input'
          id='organization'
          inputClass='AddJobInput'
          validatorMethod={[VALIDATOR_REQUIRE()]}
          onInputHandler={onInputHandler}
          label={true}
          labelName='Organisasi Penerbit*'
          initValue={data.organization}
          initIsValid={true}
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
            labelName='Berlaku Sejak*'
            initValue={data.startDate}
            initIsValid={true}
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
              labelName='Hingga*'
              disableFuture={false}
              initValue={data.endDate || moment()}
              initIsValid={true}
            />
          )}
        </div>

        <div className={styles.IsExpiredCheck}>
          <Checkbox
            checked={!isExpired}
            color='primary'
            size='small'
            onChange={expiryHandler}
            style={{ padding: '0' }}
            id='IsExpiredCheck'
          />
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
          label={true}
          labelName='Deskripsi Sertifikasi (Opsional)'
          initValue={data.description}
          initIsValid={true}
          rows={12}
        />

        <div className={styles.SubmitButtonContainer}>
          <button type='button' onClick={props.onCancel}>
            Back
          </button>

          <button disabled={!formState.formIsValid} type='submit'>
            Save
          </button>
        </div>
      </form>
    );
  }

  const onCancelHandler = () => {
    props.resetApplicant();
  };

  return (
    <Fragment>
      <Modal show={props.error} onCancel={onCancelHandler}>
        Could not update changes at the moment, please try again later
      </Modal>
      {formContent}
    </Fragment>
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
    updateApplicantCertification: ApplicantData => dispatch(actionCreators.updateApplicantCertification(ApplicantData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Certification));
