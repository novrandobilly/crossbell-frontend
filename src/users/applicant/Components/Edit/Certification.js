import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, withRouter, Link } from 'react-router-dom';
import { useForm } from '../../../../shared/utils/useForm';
import moment from 'moment';

import * as actionTypes from '../../../../store/actions/actions';
import * as actionCreators from '../../../../store/actions/index';
import { VALIDATOR_REQUIRE, VALIDATOR_ALWAYSTRUE } from '../../../../shared/utils/validator';

import Modal from '../../../../shared/UI_Element/Modal';
import LoadingBar from '../../../../shared/UI_Element/Spinner/LoadingBar';
import Input from '../../../../shared/UI_Element/Input';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';

import classes from './Certification.module.css';

const Certification = props => {
  const { applicantid } = useParams();
  const { certificationindex } = useParams();

  const [data, setData] = useState();
  const [expiry, setExpiry] = useState(true);

  const { getOneApplicant } = props;
  useEffect(() => {
    const payload = {
      applicantId: applicantid,
      token: props.auth.token,
    };
    if (props.auth.token) {
      getOneApplicant(payload).then(res => {
        const certificationSort = res.applicant.certification.sort((a, b) => moment(b.startDate) - moment(a.startDate));
        setData(certificationSort[certificationindex]);
      });
    }
  }, [getOneApplicant, applicantid, certificationindex, props.auth.token]);

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
        isValid: data && data.endDate ? true : false,
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
    setExpiry(!expiry);
  };

  const onSubmitHandler = async event => {
    event.preventDefault();

    if (!formState.formIsValid) {
      return props.updateApplicantFail();
    }

    if (expiry) {
      const updatedCertification = {
        applicantId: applicantid,
        index: certificationindex,
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
        props.history.push(`/ap/${applicantid}/profile`);
      } catch (err) {
        console.log(err);
      }
    } else {
      const updatedCertification = {
        applicantId: applicantid,
        index: certificationindex,
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
        props.history.push(`/ap/${applicantid}/profile`);
      } catch (err) {
        console.log(err);
      }
    }
  };

  let formContent = <LoadingBar />;

  if (!props.isLoading && data) {
    formContent = (
      <React.Fragment>
        <div className={classes.ContainerFlex}>
          <p className={classes.FormTitle}>Ubah sertifikasi/ penghargaan</p>

          <div className={classes.FormRow}>
            <div className={classes.EditLabel}>
              <Input
                inputType='input'
                id='title'
                inputClass='AddJobInput'
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label='Nama sertifikasi/ penghargaan*'
                initValue={data.title}
                initIsValid={true}
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
                initValue={data.organization}
                initIsValid={true}
              />
            </div>

            <div className={classes.Period}>
              <div className={classes.EditLabel}>
                <p className={classes.Text}>Berlaku Sejak*</p>
                <Input
                  inputType='customdate'
                  id='startDate'
                  validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
                  onInputHandler={onInputHandler}
                  views={['year', 'month']}
                  label='Tahun Mulai*'
                  maxDate={moment()}
                  initValue={data.startDate}
                  initIsValid={true}
                />
              </div>

              {expiry ? (
                <div className={classes.EditLabel}>
                  <p className={classes.Text}>Berlaku Sampai*</p>
                  <Input
                    inputType='customdate'
                    id='endDate'
                    validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
                    onInputHandler={onInputHandler}
                    views={['year', 'month']}
                    label='Tahun Selesai*'
                    maxDate={moment()}
                    initValue={data.endDate || moment()}
                    initIsValid={true}
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
                initValue={data.description}
                initIsValid={true}
                rows={12}
              />
            </div>
          </div>

          <div className={classes.Footer}>
            <Link to={`/ap/${applicantid}/profile`}>
              <Button variant='outlined' type='Button' disableElevation style={{ marginRight: '16px' }}>
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
  }

  const onCancelHandler = () => {
    props.resetApplicant();
  };

  return (
    <form onSubmit={onSubmitHandler} className={classes.Container}>
      <Modal show={props.error} onCancel={onCancelHandler}>
        Could not update changes at the moment, please try again later
      </Modal>
      {formContent}
    </form>
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
