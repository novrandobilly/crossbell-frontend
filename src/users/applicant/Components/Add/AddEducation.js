import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { useParams, withRouter } from 'react-router-dom';
import { useForm } from '../../../../shared/utils/useForm';
import moment from 'moment';

import * as actionTypes from '../../../../store/actions/actions';
import * as actionCreators from '../../../../store/actions/index';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_ALWAYSTRUE,
  VALIDATOR_MAX,
  VALIDATOR_MIN,
} from '../../../../shared/utils/validator';

import University from '../../../../shared/UI_Element/PredefinedData/UniversityData';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

import Modal from '../../../../shared/UI_Element/Modal';
import LoadingBar from '../../../../shared/UI_Element/Spinner/LoadingBar';
import Input from '../../../../shared/UI_Element/Input';

import styles from './AddEducation.module.scss';

const CustomTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    padding: '0',
    '& .MuiOutlinedInput-input': {
      padding: '5px',
    },
    '& fieldset': {
      border: '2px solid #f79f35',
      borderRadius: '5px',
    },
    '&.Mui-focused fieldset': {
      border: '2px solid #f79f35',
    },
    '&:hover fieldset': {
      border: '2px solid #f79f35',
    },
  },
});

const AddEducation = props => {
  const { applicantid } = useParams();

  const [degree, setDegree] = useState('SMA');
  const [school, setSchool] = useState('');
  const [formState, onInputHandler] = useForm(
    {
      school: {
        value: '',
        isValid: false,
      },
      degree: {
        value: '',
        isValid: false,
      },
      major: {
        value: '',
        isValid: false,
      },
      location: {
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
        isValid: false,
      },
      IPK: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onSubmitHandler = async event => {
    event.preventDefault();

    if (!formState.formIsValid) {
      return props.updateApplicantFail();
    }

    const updatedEducation = {
      applicantId: applicantid,
      school: formState.inputs.school.value,
      degree: formState.inputs.degree.value,
      major: formState.inputs.major.value,
      location: formState.inputs.location.value,
      startDate: formState.inputs.startDate.value,
      endDate: formState.inputs.endDate.value,
      description: formState.inputs.description.value,
      IPK: formState.inputs.IPK.value,
      token: props.auth.token,
    };
    try {
      await props.updateApplicantEducation(updatedEducation);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (school) {
      onInputHandler('school', school.institusi, true);
    }
  }, [onInputHandler, school]);

  const handleChange = e => {
    const elementId = e.target.name;
    const elementValue = e.target.value;
    onInputHandler(elementId, elementValue, true);
    setDegree(elementValue);
  };

  const onAutoCompleteHandler = (event, newValue) => {
    event.preventDefault();
    console.log(newValue);
  };

  let formContent = (
    <form className={styles.AddEducationFormContainer} onSubmit={onSubmitHandler}>
      <div className={styles.UniversityContainer}>
        <p>Nama Sekolah/Universitas</p>
        <Autocomplete
          value={school}
          onChange={onAutoCompleteHandler}
          id='school'
          name='school'
          options={University.map(uni => uni.institusi)}
          freeSolo
          renderInput={params => <CustomTextField {...params} />}
        />
      </div>

      <div className={styles.Degree}>
        <p>Tingkat Pendidikan</p>
        <select id='degree' name='degree' value={degree} onChange={handleChange}>
          <option value='SMA'>SMA</option>
          <option value='SMK'>SMK</option>
          <option value='D3'>D3</option>
          <option value='S1'>S1</option>
          <option value='S2'>S2</option>
          <option value='S3'>S3</option>
        </select>
      </div>

      <Input
        inputType='input'
        id='major'
        InputClass='AddJobInput'
        validatorMethod={[VALIDATOR_REQUIRE()]}
        onInputHandler={onInputHandler}
        label={true}
        labelName='Bidang Studi*'
        initIsValid={true}
      />

      <Input
        inputType='input'
        id='location'
        InputClass='AddJobInput'
        validatorMethod={[VALIDATOR_REQUIRE()]}
        onInputHandler={onInputHandler}
        label={true}
        labelName='Lokasi*'
        initIsValid={true}
      />

      <div className={styles.EducationPeriod}>
        <Input
          inputType='datePicker'
          id='startDate'
          validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
          onInputHandler={onInputHandler}
          views={['year']}
          format='YYYY'
          initValue={moment()}
          initIsValid={true}
          label={true}
          labelName='Tahun Mulai'
        />

        <Input
          inputType='datePicker'
          id='endDate'
          validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
          onInputHandler={onInputHandler}
          views={['year']}
          format='YYYY'
          initIsValid={true}
          disableFuture={false}
          initValue={moment()}
          label={true}
          labelName='Tahun Selesai (atau estimasi selesai)'
        />
      </div>

      <Input
        inputType='input'
        id='IPK'
        validatorMethod={[VALIDATOR_MAX(4), VALIDATOR_MIN(0)]}
        onInputHandler={onInputHandler}
        type='number'
        min={0}
        max={4}
        step='0.1'
        label={true}
        labelName='IPK'
      />

      <Input
        inputType='textarea'
        id='description'
        inputClass='EditProfileTextArea'
        validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
        onInputHandler={onInputHandler}
        label={true}
        labelName='Deskripsi Pendidikan (Opsional)'
        initIsValid={true}
        rows={10}
        style={{ border: '2px solid #f79f35', outline: 'none' }}
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

  if (props.isLoading) {
    formContent = <LoadingBar />;
  }

  const onCancelHandler = () => {
    props.resetApplicant();
  };

  return (
    <Fragment>
      <Modal show={props.error} onCancel={onCancelHandler}>
        Silahkan lengkapi form sesuai data yang diminta
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
    resetApplicant: () => dispatch({ type: actionTypes.APPLICANTRESET }),
    updateApplicantFail: () => dispatch({ type: actionTypes.UPDATEAPPLICANTFAIL }),
    updateApplicantEducation: ApplicantData => dispatch(actionCreators.updateApplicantEducation(ApplicantData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddEducation));
