import React from 'react';
import { connect } from 'react-redux';
import { useParams, withRouter } from 'react-router-dom';
import { useForm } from '../../../../../shared/utils/useForm';
import moment from 'moment';

import * as actionTypes from '../../../../../store/actions/actions';
import * as actionCreators from '../../../../../store/actions/index';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_ALWAYSTRUE,
} from '../../../../../shared/utils/validator';

import Modal from '../../../../../shared/UI_Element/Modal';
import SpinnerCircle from '../../../../../shared/UI_Element/Spinner/SpinnerCircle';
import Input from '../../../../../shared/UI_Element/Input';
import Button from '@material-ui/core/Button';

import classes from './Experience.module.css';

const Experience = (props) => {
  const { applicantid } = useParams();
  const push = props.push;

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
      prevLocation: {
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
    },
    false
  );

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!formState.formIsValid) {
      return props.updateApplicantFail();
    }

    const updatedExperience = {
      applicantId: applicantid,
      prevTitle: formState.inputs.prevTitle.value,
      prevCompany: formState.inputs.prevCompany.value,
      prevLocation: formState.inputs.prevLocation.value,
      startDate: formState.inputs.startDate.value,
      endDate: formState.inputs.endDate.value,
      description: formState.inputs.description.value,
    };

    try {
      const res = await props.updateApplicantExperience(updatedExperience);
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

  let formContent = (
    <React.Fragment>
      <div className={classes.ContainerFlex}>
        <p className={classes.FormTitle}>Experience</p>

        <div className={classes.FormRow}>
          <div className={classes.EditLabel}>
            <Input
              inputType='input'
              id='prevTitle'
              inputClass='AddJobInput'
              validatorMethod={[VALIDATOR_REQUIRE()]}
              onInputHandler={onInputHandler}
              label='Previous Title*'
            />
          </div>

          <div className={classes.EditLabel}>
            <Input
              inputType='input'
              id='prevCompany'
              inputClass='AddJobInput'
              validatorMethod={[VALIDATOR_REQUIRE()]}
              onInputHandler={onInputHandler}
              label='Company Name*'
            />
          </div>

          <div className={classes.EditLabel}>
            <Input
              inputType='input'
              id='prevLocation'
              inputClass='AddJobInput'
              validatorMethod={[VALIDATOR_REQUIRE()]}
              onInputHandler={onInputHandler}
              label='Location*'
            />
          </div>

          <div className={classes.Period}>
            <div className={classes.EditLabel}>
              <p className={classes.Text}>Waktu Mulai *</p>
              <Input
                inputType='customdate'
                id='startDate'
                validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
                onInputHandler={onInputHandler}
                views={['year', 'month']}
                label='Tahun Mulai'
                maxDate={moment()}
                initValue={moment()}
              />
            </div>

            <div className={classes.EditLabel}>
              <p className={classes.Text}>Waktu Selesai *</p>
              <Input
                inputType='customdate'
                id='endDate'
                validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
                onInputHandler={onInputHandler}
                views={['year', 'month']}
                label='Tahun Selesai'
                maxDate={moment()}
                initValue={moment()}
              />
            </div>
          </div>

          <div className={classes.EditLabel}>
            <Input
              inputType='textarea'
              id='description'
              inputClass='EditProfileTextArea'
              validatorMethod={[VALIDATOR_MINLENGTH(20)]}
              onInputHandler={onInputHandler}
              label='Description*'
              rows={12}
            />
          </div>
        </div>

        <div className={classes.Footer}>
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
