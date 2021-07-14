import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, withRouter, Link } from 'react-router-dom';
import { useForm } from '../../../../shared/utils/useForm';
import moment from 'moment';

import * as actionTypes from '../../../../store/actions/actions';
import * as actionCreators from '../../../../store/actions/index';
import { VALIDATOR_REQUIRE, VALIDATOR_ALWAYSTRUE } from '../../../../shared/utils/validator';

import Modal from '../../../../shared/UI_Element/Modal';
import SpinnerCircle from '../../../../shared/UI_Element/Spinner/SpinnerCircle';
import Input from '../../../../shared/UI_Element/Input';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';

import classes from './Certification.module.css';

const Certification = props => {
  const { applicantid } = useParams();
  const push = props.push;
  const [expiry, setExpiry] = useState(true);

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

  const expiryHandler = event => {
    setExpiry(!expiry);
    formState.inputs.endDate.isValid = true;
  };

  const onSubmitHandler = async event => {
    event.preventDefault();

    if (!formState.formIsValid) {
      return props.updateApplicantFail();
    }

    if (expiry) {
      const updatedCertification = {
        applicantId: applicantid,
        title: formState.inputs.title.value,
        organization: formState.inputs.organization.value,
        startDate: formState.inputs.startDate.value,
        endDate: formState.inputs.endDate.value,
        description: formState.inputs.description.value,
        token: props.auth.token,
      };
      try {
        const res = await props.updateApplicantCertification(updatedCertification);

        if (res) {
          console.log(res);
        } else {
          console.log('no res detected');
        }
        !push && props.history.push(`/ap/${applicantid}/profile`);
      } catch (err) {
        console.log(err);
      }
    } else {
      const updatedCertification = {
        applicantId: applicantid,
        title: formState.inputs.title.value,
        organization: formState.inputs.organization.value,
        startDate: formState.inputs.startDate.value,
        endDate: null,
        description: formState.inputs.description.value,
        token: props.auth.token,
      };
      try {
        const res = await props.updateApplicantCertification(updatedCertification);
        if (res) {
          console.log(res);
        } else {
          console.log('no res detected');
        }
        !push && props.history.push(`/ap/${applicantid}/profile`);
      } catch (err) {
        console.log(err);
      }
    }
  };

  console.log(formState);

  let formContent = (
    <React.Fragment>
      <div className={classes.ContainerFlex}>
        <p className={classes.FormTitle}>Tambah sertifikasi/ penghargaan</p>

        <div className={classes.FormRow}>
          <div className={classes.EditLabel}>
            <Input
              inputType='input'
              id='title'
              inputClass='AddJobInput'
              validatorMethod={[VALIDATOR_REQUIRE()]}
              onInputHandler={onInputHandler}
              label='Nama sertifikasi/ penghargaan*'
              placeholder='Ex: Certified Cooperative Communicator'
            />
          </div>

          <div className={classes.EditLabel}>
            <Input
              inputType='input'
              id='organization'
              inputClass='AddJobInput'
              validatorMethod={[VALIDATOR_REQUIRE()]}
              onInputHandler={onInputHandler}
              label='Organisasi penerbit*'
              placeholder='Ex: National Rural Electric Cooperative Association'
            />
          </div>

          <div className={classes.Period}>
            <div className={classes.EditLabel}>
              <Input
                inputType='customdate'
                id='startDate'
                validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
                onInputHandler={onInputHandler}
                views={['year', 'month']}
                label='Tahun Mulai*'
                maxDate={moment()}
                initIsValid={true}
                initValue={moment()}
              />
            </div>

            {expiry ? (
              <div className={classes.EditLabel}>
                <Input
                  inputType='customdate'
                  id='endDate'
                  validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
                  onInputHandler={onInputHandler}
                  views={['year', 'month']}
                  label='Tahun Selesai*'
                  maxDate={moment()}
                  initIsValid={true}
                  initValue={moment()}
                />
              </div>
            ) : (
              <div />
            )}
          </div>

          <div className={classes.CheckboxDiv}>
            <Checkbox color='primary' size='small' onChange={expiryHandler} />
            <label className={classes.CheckboxText}>Berlaku selamanya</label>
          </div>

          <div className={classes.EditLabel}>
            <Input
              inputType='textarea'
              id='description'
              inputClass='EditProfileTextArea'
              validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
              onInputHandler={onInputHandler}
              label='Deskripsi Sertifikasi (Opsional)'
              rows={12}
              initIsValid={true}
            />
          </div>
        </div>

        <div className={classes.Footer}>
          <Link to={`/ap/${applicantid}`}>
            <Button
              variant='outlined'
              // color='secondary'
              type='Button'
              disableElevation
              style={{ marginRight: '16px' }}>
              Back
            </Button>
          </Link>
          <Button disabled={!formState.formIsValid} variant='contained' color='primary' type='submit'>
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
    updateApplicantCertification: ApplicantData => dispatch(actionCreators.updateApplicantCertification(ApplicantData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Certification));
