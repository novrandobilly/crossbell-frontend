import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, withRouter, Link } from 'react-router-dom';
import { useForm } from '../../../../../shared/utils/useForm';
import moment from 'moment';

import * as actionTypes from '../../../../../store/actions/actions';
import * as actionCreators from '../../../../../store/actions/index';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_ALWAYSTRUE,
} from '../../../../../shared/utils/validator';

import Checkbox from '@material-ui/core/Checkbox';
import Modal from '../../../../../shared/UI_Element/Modal';
import SpinnerCircle from '../../../../../shared/UI_Element/Spinner/SpinnerCircle';
import Input from '../../../../../shared/UI_Element/Input';
import Button from '@material-ui/core/Button';

import classes from './Experience.module.css';

const Experience = (props) => {
  const { applicantid } = useParams();
  const push = props.push;

  const [tillNow, setTillNow] = useState(false);

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
        isValid: false,
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
      endDate: formState.inputs.endDate.value,
      description: formState.inputs.description.value,
      token: props.auth.token,
    };

    if (tillNow) {
      updatedExperience = {
        applicantId: applicantid,
        prevTitle: formState.inputs.prevTitle.value,
        prevCompany: formState.inputs.prevCompany.value,
        prevIndustry: formState.inputs.prevIndustry.value,
        startDate: formState.inputs.startDate.value,
        endDate: null,
        description: formState.inputs.description.value,
        token: props.auth.token,
      };
    }

    try {
      const res = await props.updateApplicantExperience(updatedExperience);
      if (res) {
        console.log(res);
      } else {
        console.log('no res detected');
      }
      !push && props.history.push(`/ap/${applicantid}/profile`);
    } catch (err) {
      console.log(err);
    }
  };

  const dateHandler = (event) => {
    setTillNow(!tillNow);
  };

  let formContent = (
    <React.Fragment>
      <div className={classes.ContainerFlex}>
        <p className={classes.FormTitle}>Tambah pengalaman kerja</p>

        <div className={classes.FormRow}>
          <div className={classes.EditLabel}>
            <Input
              inputType='input'
              id='prevTitle'
              inputClass='AddJobInput'
              validatorMethod={[VALIDATOR_REQUIRE()]}
              onInputHandler={onInputHandler}
              label='Jabatan*'
            />
          </div>

          <div className={classes.EditLabel}>
            <Input
              inputType='input'
              id='prevCompany'
              inputClass='AddJobInput'
              validatorMethod={[VALIDATOR_REQUIRE()]}
              onInputHandler={onInputHandler}
              label='Nama perusahaan*'
            />
          </div>

          <div className={classes.EditLabel}>
            <Input
              inputType='input'
              id='prevIndustry'
              inputClass='AddJobInput'
              validatorMethod={[VALIDATOR_REQUIRE()]}
              onInputHandler={onInputHandler}
              label='Alamat perusahaan*'
            />
          </div>

          <div className={classes.Period}>
            <div className={classes.EditLabel}>
              <p className={classes.Text}>Waktu Mulai*</p>
              <Input
                inputType='customdate'
                id='startDate'
                validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
                onInputHandler={onInputHandler}
                views={['year', 'month']}
                label='Tahun Mulai'
                maxDate={moment()}
                initValue={moment()}
                initIsValid={true}
              />
            </div>

            {!tillNow ? (
              <div className={classes.EditLabel}>
                <p className={classes.Text}>Waktu Selesai*</p>
                <Input
                  inputType='customdate'
                  id='endDate'
                  validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
                  onInputHandler={onInputHandler}
                  views={['year', 'month']}
                  label='Tahun Selesai'
                  maxDate={moment()}
                  initValue={moment()}
                  initIsValid={true}
                />
              </div>
            ) : (
              <div />
            )}
          </div>

          <div className={classes.CheckboxDiv}>
            <Checkbox
              color='primary'
              size='small'
              onChange={dateHandler}
              style={{ padding: '0' }}
            />
            <label className={classes.CheckboxText}>
              Saya masih berkerja disini
            </label>
          </div>

          <div className={classes.EditLabel}>
            <Input
              inputType='textarea'
              id='description'
              inputClass='EditProfileTextArea'
              validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
              onInputHandler={onInputHandler}
              label='Uraian pekerjaan (optional)'
              rows={12}
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
    </React.Fragment>
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
    updateApplicantExperience: (ApplicantData) =>
      dispatch(actionCreators.updateApplicantExperience(ApplicantData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Experience));
