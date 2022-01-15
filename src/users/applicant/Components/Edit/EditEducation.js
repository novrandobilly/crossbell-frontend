import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { useParams, withRouter } from 'react-router-dom';
import { useForm } from '../../../../shared/utils/useForm';

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
import { CustomTextField } from '../../../../shared/UI_Element/CustomMUIComponents';

import Modal from '../../../../shared/UI_Element/Modal';
import LoadingBar from '../../../../shared/UI_Element/Spinner/LoadingBar';
import Input from '../../../../shared/UI_Element/Input';

import styles from './EditEducation.module.scss';

const EditEducation = (props) => {
  const { applicantid } = useParams();
  const { educationId } = props;

  const [data, setData] = useState();

  const [school, setSchool] = useState(null);
  const [inputSchool, setInputSchool] = useState('');
  const [degree, setDegree] = useState('SMA');
  const [formState, onInputHandler] = useForm(
    {
      school: {
        value: data ? data.school : null,
        isValid: data && data.school ? true : false,
      },
      degree: {
        value: data ? data.degree : null,
        isValid: data && data.degree ? true : false,
      },
      major: {
        value: data ? data.major : null,
        isValid: data && data.major ? true : false,
      },
      location: {
        value: data ? data.location : null,
        isValid: data && data.location ? true : false,
      },
      startDate: {
        value: data ? data.startDate : null,
        isValid: data && data.startDate ? true : false,
      },
      endDate: {
        value: data ? data.endDate : null,
        isValid: data && data.endDate ? true : false,
      },
      description: {
        value: data ? data.description : null,
        isValid: data && data.description ? true : false,
      },
      IPK: {
        value: data ? data.IPK : null,
        isValid: data && data.IPK ? true : false,
      },
    },
    false
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { getOneApplicant } = props;
  useEffect(() => {
    const payload = {
      applicantId: applicantid,
      token: props.auth.token,
    };
    if (props.auth.token) {
      getOneApplicant(payload).then((res) => {
        const education = res.applicant?.education.filter((edu) => edu.id === educationId)[0];
        setData(education);
        onInputHandler('school', education.school, true);
        onInputHandler('degree', education.degree, true);
        setSchool(education.school);
        setInputSchool(education.school);
        setDegree(education.degree);
      });
    }
  }, [getOneApplicant, applicantid, educationId, props.auth.token, onInputHandler]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!formState.formIsValid) {
      return props.updateApplicantFail();
    }

    const updatedEducation = {
      applicantId: applicantid,
      educationId,
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
      props.onCancel();
      props.fetchApplicantData();
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const elementId = e.target.name;
    const elementValue = e.target.value;
    onInputHandler(elementId, elementValue, true);
    if (elementValue === 'SMK' || elementValue === 'SMA') onInputHandler('IPK', null, true);
    setDegree(elementValue);
  };

  const onSetSchoolHandler = (event, newValue) => {
    setSchool(newValue);
    onInputHandler('school', newValue, true);
  };
  const onInputSchoolHandler = (event, newValue) => {
    setInputSchool(newValue);
    onInputHandler('school', newValue, true);
  };

  let formContent = (
    <form className={styles.EditEducationFormContainer} onSubmit={onSubmitHandler}>
      <div className={styles.UniversityContainer}>
        <p>Nama Sekolah/Universitas</p>
        <Autocomplete
          value={school}
          inputValue={inputSchool}
          onChange={onSetSchoolHandler}
          onInputChange={onInputSchoolHandler}
          id='school'
          name='school'
          options={University.map((uni) => uni.institusi)}
          freeSolo
          renderInput={(params) => <CustomTextField {...params} />}
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
        initValue={data?.major}
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
        initValue={data?.location}
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
          initValue={data?.startDate}
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
          initValue={data?.endDate}
          initIsValid={true}
          disableFuture={false}
          label={true}
          labelName='Tahun Selesai (atau estimasi selesai)'
        />
      </div>

      {formState.inputs?.degree.value !== 'SMK' && formState.inputs?.degree.value !== 'SMA' && (
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
          initValue={data?.IPK}
          initIsValid={true}
        />
      )}

      <Input
        inputType='textarea'
        id='description'
        inputClass='EditProfileTextArea'
        validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
        onInputHandler={onInputHandler}
        label={true}
        labelName='Deskripsi Pendidikan (Opsional)'
        initIsValid={true}
        initValue={data?.description}
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

  if (props.isLoading || !data) {
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
    updateApplicantEducation: (ApplicantData) => dispatch(actionCreators.updateApplicantEducation(ApplicantData)),
    getOneApplicant: (data) => dispatch(actionCreators.getOneApplicant(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditEducation));
