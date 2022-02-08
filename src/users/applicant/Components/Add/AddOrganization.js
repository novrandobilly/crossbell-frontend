import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, withRouter } from 'react-router-dom';
import { useForm } from '../../../../shared/utils/useForm';

import * as actionTypes from '../../../../store/actions/actions';
import * as actionCreators from '../../../../store/actions/index';
import { VALIDATOR_REQUIRE, VALIDATOR_ALWAYSTRUE } from '../../../../shared/utils/validator';

import Checkbox from '@material-ui/core/Checkbox';
import Modal from '../../../../shared/UI_Element/Modal';
import LoadingBar from '../../../../shared/UI_Element/Spinner/LoadingBar';
import Input from '../../../../shared/UI_Element/Input';

import styles from './AddOrganization.module.scss';

const AddOrganization = (props) => {
  const { applicantid } = useParams();

  const [stillMember, setStillMember] = useState(false);

  const [formState, onInputHandler] = useForm(
    {
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

    let updatedOrganization = {
      applicantId: applicantid,
      organization: formState.inputs.organization.value,
      description: formState.inputs.description.value,
      startDate: formState.inputs.startDate.value,
      endDate: formState.inputs.endDate.value,
      token: props.auth.token,
    };

    if (stillMember) {
      updatedOrganization = {
        applicantId: applicantid,
        organization: formState.inputs.organization.value,
        startDate: formState.inputs.startDate.value,
        endDate: null,
        description: formState.inputs.description.value,
        token: props.auth.token,
      };
    }

    try {
      await props.updateApplicantOrganization(updatedOrganization);
      props.onCancel();
      props.fetchApplicantData();
    } catch (err) {
      console.log(err);
    }
  };

  const dateHandler = (event) => {
    if (!stillMember) onInputHandler('endDate', null, true);
    setStillMember(!stillMember);
  };

  let formContent = (
    <div className={styles.AddOrganizationContainer}>
      <Input
        inputType='input'
        id='organization'
        inputClass='AddJobInput'
        validatorMethod={[VALIDATOR_REQUIRE()]}
        onInputHandler={onInputHandler}
        label={true}
        labelName='Nama Organisasi*'
      />

      <div className={styles.OrganizationPeriod}>
        <Input
          inputType='datePicker'
          id='startDate'
          validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
          onInputHandler={onInputHandler}
          views={['year', 'month']}
          format='MMMM YYYY'
          label={true}
          labelName='Sejak*'
        />

        {!stillMember && (
          <Input
            inputType='datePicker'
            id='endDate'
            validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
            onInputHandler={onInputHandler}
            views={['year', 'month']}
            format='MMMM YYYY'
            label={true}
            labelName='Hingga*'
          />
        )}
      </div>

      <div className={styles.StillMemberHereCheck}>
        <Checkbox color='primary' size='small' onChange={dateHandler} style={{ padding: '0' }} id='stillMemberHere' />
        <label htmlFor='stillMemberHere' className={styles.CheckboxText}>
          Saya masih menjadi anggota
        </label>
      </div>

      <Input
        inputType='textarea'
        id='description'
        inputClass='EditProfileTextArea'
        validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
        onInputHandler={onInputHandler}
        label={true}
        labelName='Deskripsi Organisasi (optional)'
        rows={10}
        initIsValid={true}
        style={{ border: '2px solid #f79f35', outline: 'none' }}
      />

      <div className={styles.SubmitButtonContainer}>
        <button type='button'>Back</button>

        <button disabled={!formState.formIsValid} type='submit'>
          Save
        </button>
      </div>
    </div>
  );
  console.log(formState);
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
    updateApplicantOrganization: (ApplicantData) => dispatch(actionCreators.updateApplicantOrganization(ApplicantData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddOrganization));
