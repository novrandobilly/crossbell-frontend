import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useParams, withRouter, Link } from 'react-router-dom';
import { useForm } from '../../../../../shared/utils/useForm';
import moment from 'moment';

import * as actionTypes from '../../../../../store/actions/actions';
import * as actionCreators from '../../../../../store/actions/index';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_ALWAYSTRUE,
  VALIDATOR_MAX,
  VALIDATOR_MIN,
} from '../../../../../shared/utils/validator';

import University from '../../../../../shared/UI_Element/UniversityData';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Modal from '../../../../../shared/UI_Element/Modal';
import SpinnerCircle from '../../../../../shared/UI_Element/Spinner/SpinnerCircle';
import Input from '../../../../../shared/UI_Element/Input';
import Button from '@material-ui/core/Button';

import classes from './Education.module.css';

const Education = (props) => {
  const { applicantid } = useParams();
  const push = props.push;

  const [degree, setDegree] = useState('');
  const [open, setOpen] = useState(false);
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

  const onSubmitHandler = async (event) => {
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
      const res = await props.updateApplicantEducation(updatedEducation);
      if (res) {
        console.log(res);
      } else {
        console.log('no res detected');
      }
      !push && props.history.push(`/ap/${applicantid}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const elementId = e.target.name;
    const elementValue = e.target.value;
    onInputHandler(elementId, elementValue, true);
    setDegree(e.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSchoolChange = (e, value) => {
    onInputHandler('school', value, true);
  };

  let formContent = (
    <div className={classes.ContainerFlex}>
      <p className={classes.FormTitle}>Tambah pendidikan</p>

      <div className={classes.FormRow}>
        <div className={classes.EditLabel}>
          <Autocomplete
            id='school'
            name='school'
            options={University.map((option) => option)}
            onChange={handleSchoolChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Nama sekolah/ universitas*'
                margin='normal'
                variant='standard'
              />
            )}
          />
        </div>

        <FormControl
          className={classes.formControl}
          style={{ margin: '0.8rem 0' }}
        >
          <InputLabel id='degree' style={{ fontSize: '1rem' }}>
            Tingkat Pendidikan*
          </InputLabel>

          <Select
            labelId='degree'
            id='degree'
            name='degree'
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={degree}
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

        <div className={classes.EditLabel}>
          <Input
            inputType='input'
            id='major'
            InputClass='AddJobInput'
            validatorMethod={[VALIDATOR_REQUIRE()]}
            onInputHandler={onInputHandler}
            label='Bidang Studi*'
            initIsValid={true}
          />
        </div>

        <div className={classes.EditLabel}>
          <Input
            inputType='input'
            id='location'
            InputClass='AddJobInput'
            validatorMethod={[VALIDATOR_REQUIRE()]}
            onInputHandler={onInputHandler}
            label='Alamat*'
            initIsValid={true}
          />
        </div>

        <div className={classes.Period}>
          <div className={classes.EditLabel}>
            <p className={classes.Text}>Tahun Mulai*</p>
            <Input
              inputType='customdate'
              id='startDate'
              validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
              onInputHandler={onInputHandler}
              views={['year']}
              maxDate={moment()}
              initValue={moment()}
              initIsValid={true}
            />
          </div>

          <div className={classes.EditLabel}>
            <p className={classes.Text}>Tahun Selesai*</p>
            <Input
              inputType='customdate'
              id='endDate'
              validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
              onInputHandler={onInputHandler}
              views={['year']}
              maxDate={moment()}
              initIsValid={true}
              initValue={moment()}
            />
          </div>

          <div className={classes.EditLabel}>
            <p className={classes.TextIPK}>IPK/ Nilai Kelulusan</p>
            <Input
              inputType='input'
              id='IPK'
              validatorMethod={[VALIDATOR_MAX(4), VALIDATOR_MIN(0)]}
              onInputHandler={onInputHandler}
              error={false}
              type='number'
              min={0}
              max={4}
              step='0.1'
              helperText={
                formState.inputs.IPK.value < 0
                  ? 'Nilai IPK min 0'
                  : formState.inputs.IPK.value > 4
                  ? 'Nilai IPK max 4'
                  : 'IPK wajib diisi'
              }
            />
          </div>
        </div>

        <div className={classes.EditLabel}>
          <Input
            inputType='textarea'
            id='description'
            inputClass='EditProfileTextArea'
            validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
            onInputHandler={onInputHandler}
            label='Deskripsi Pendidikan (Opsional)'
            initIsValid={true}
            rows={12}
            helperText='Rincian setidaknya berjumlah 20 karakter'
          />
        </div>
      </div>

      <div className={classes.Footer}>
        <Link to={`/ap/${applicantid}`}>
          <Button
            variant='outlined'
            type='Button'
            disableElevation
            style={{ marginRight: '16px' }}
          >
            Back
          </Button>
        </Link>
        <Button
          disabled={!formState.formIsValid}
          variant='contained'
          color='primary'
          type='submit'
        >
          Save
        </Button>
      </div>
    </div>
  );

  if (props.isLoading) {
    formContent = <SpinnerCircle />;
  }

  const onCancelHandler = () => {
    props.resetApplicant();
  };

  return (
    <div style={!push ? { marginTop: '6rem' } : { marginTop: '0' }}>
      <form onSubmit={onSubmitHandler} className={classes.Container}>
        <Modal show={props.error} onCancel={onCancelHandler}>
          Input requirement not fulfilled
        </Modal>
        {formContent}
      </form>
    </div>
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
    updateApplicantFail: () =>
      dispatch({ type: actionTypes.UPDATEAPPLICANTFAIL }),
    updateApplicantEducation: (ApplicantData) =>
      dispatch(actionCreators.updateApplicantEducation(ApplicantData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Education));
