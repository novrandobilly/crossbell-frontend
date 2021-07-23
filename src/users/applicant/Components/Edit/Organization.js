import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, withRouter, Link } from 'react-router-dom';
import { useForm } from '../../../../shared/utils/useForm';
import moment from 'moment';

import * as actionTypes from '../../../../store/actions/actions';
import * as actionCreators from '../../../../store/actions/index';
import { VALIDATOR_REQUIRE, VALIDATOR_ALWAYSTRUE } from '../../../../shared/utils/validator';

import Modal from '../../../../shared/UI_Element/Modal';
import Checkbox from '@material-ui/core/Checkbox';
import SpinnerCircle from '../../../../shared/UI_Element/Spinner/SpinnerCircle';
import Input from '../../../../shared/UI_Element/Input';
import Button from '@material-ui/core/Button';

import classes from './Organization.module.css';

const Organization = props => {
  const { applicantid } = useParams();
  const { Organizationindex } = useParams();

  const [data, setData] = useState();
  const [tillNow, setTillNow] = useState(false);

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
      getOneApplicant(payload).then(res => {
        console.log(res);
        const OrganizationSort = res.applicant.organization.sort((a, b) => moment(b.startDate) - moment(a.startDate));
        setData(OrganizationSort[Organizationindex]);
      });
    }
  }, [getOneApplicant, applicantid, Organizationindex, props.auth.token]);

  const [formState, onInputHandler] = useForm(
    {
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
        isValid: data && data.description ? true : false,
      },
    },
    false
  );

  const onSubmitHandler = async event => {
    event.preventDefault();

    if (!formState.formIsValid) {
      return props.updateApplicantFail();
    }
    let updatedOrganization = {
      applicantId: applicantid,
      index: Organizationindex,
      organization: formState.inputs.organization.value,
      prevCompany: formState.inputs.prevCompany.value,
      prevIndustry: formState.inputs.prevIndustry.value,
      startDate: formState.inputs.startDate.value,
      endDate: formState.inputs.endDate.value,
      description: formState.inputs.description.value,
      token: props.auth.token,
    };

    if (tillNow) {
      updatedOrganization = {
        applicantId: applicantid,
        index: Organizationindex,
        organization: formState.inputs.organization.value,
        prevCompany: formState.inputs.prevCompany.value,
        prevIndustry: formState.inputs.prevIndustry.value,
        startDate: formState.inputs.startDate.value,
        endDate: null,
        description: formState.inputs.description.value,
        token: props.auth.token,
      };
    }

    try {
      const res = await props.updateApplicantOrganization(updatedOrganization);
      if (res) {
        console.log(res);
      } else {
        console.log('no res detected');
      }

      props.history.push(`/ap/${applicantid}/profile`);
    } catch (err) {
      console.log(err);
    }
  };

  const dateHandler = event => {
    setTillNow(!tillNow);
  };

  let formContent = <SpinnerCircle />;

  if (!props.isLoading && data) {
    formContent = (
      <React.Fragment>
        <div className={classes.ContainerFlex}>
          <p className={classes.FormTitle}>Ubah pengalaman kerja</p>

          <div className={classes.FormRow}>
            <div className={classes.EditLabel}>
              <Input
                inputType='input'
                id='prevTitle'
                inputClass='AddJobInput'
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label='Nama Organisasi*'
                initValue={data.prevTitle}
                initIsValid={true}
              />
            </div>

            <div className={classes.Period}>
              <div className={classes.EditLabel}>
                <p className={classes.Text}>Waktu Mulai*</p>
                <Input
                  inputType='customdate'
                  id='startDate'
                  inputClass='EditProfileTextArea'
                  validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
                  onInputHandler={onInputHandler}
                  views={['year', 'month']}
                  label='Tahun Mulai'
                  maxDate={moment()}
                  initValue={data.startDate}
                  initIsValid={true}
                />
              </div>

              {!tillNow ? (
                <div className={classes.EditLabel}>
                  <p className={classes.Text}>Waktu Selesai*</p>
                  <Input
                    inputType='customdate'
                    id='endDate'
                    inputClass='EditProfileTextArea'
                    validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
                    onInputHandler={onInputHandler}
                    views={['year', 'month']}
                    label='Tahun Selesai'
                    maxDate={moment()}
                    initValue={data.endDate}
                    initIsValid={true}
                  />
                </div>
              ) : (
                <div />
              )}
            </div>

            <div className={classes.CheckboxDiv}>
              <Checkbox color='primary' size='small' onChange={dateHandler} style={{ padding: '0' }} />
              <label className={classes.CheckboxText}>Saya masih berkerja disini</label>
            </div>

            <div className={classes.EditLabel}>
              <Input
                inputType='textarea'
                id='description'
                inputClass='EditProfileTextArea'
                validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
                onInputHandler={onInputHandler}
                label='Uraian Organisasi (Opsional)'
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
    updateApplicantOrganization: ApplicantData => dispatch(actionCreators.updateApplicantOrganization(ApplicantData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Organization));
