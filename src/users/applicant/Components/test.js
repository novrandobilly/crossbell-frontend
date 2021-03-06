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
import LoadingBar from '../../../../shared/UI_Element/Spinner/LoadingBar';
import Input from '../../../../shared/UI_Element/Input';
import Button from '@material-ui/core/Button';

import styles from './EditOrganization.module.scss';

const EditOrganization = props => {
  const { applicantid } = useParams();
  const { organizationindex } = useParams();

  const [data, setData] = useState();
  const [stillMember, setStillMember] = useState(false);

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
        const OrganizationSort = res.applicant.organization.sort((a, b) => moment(b.startDate) - moment(a.startDate));
        setData(OrganizationSort[organizationindex]);
      });
    }
  }, [getOneApplicant, applicantid, organizationindex, props.auth.token]);

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
      index: organizationindex,
      organization: formState.inputs.organization?.value,
      prevCompany: formState.inputs.prevCompany?.value,
      prevIndustry: formState.inputs.prevIndustry?.value,
      startDate: formState.inputs.startDate?.value,
      endDate: formState.inputs.endDate?.value,
      description: formState.inputs.description?.value,
      token: props.auth.token,
    };

    if (stillMember) {
      updatedOrganization = {
        applicantId: applicantid,
        index: organizationindex,
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
    setStillMember(!stillMember);
  };

  let formContent = <LoadingBar />;

  if (!props.isLoading && data) {
    formContent = (
      <React.Fragment>
        <div className={styles.ContainerFlex}>
          <p className={styles.FormTitle}>Ubah pengalaman kerja</p>

          <div className={styles.FormRow}>
            <div className={styles.EditLabel}>
              <Input
                inputType='input'
                id='organization'
                inputClass='AddJobInput'
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label='Nama Organisasi*'
                initValue={data.organization}
                initIsValid={true}
              />
            </div>

            <div className={styles.Period}>
              <div className={styles.EditLabel}>
                <Input
                  inputType='datePicker'
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

              {!stillMember ? (
                <div className={styles.EditLabel}>
                  <Input
                    inputType='datePicker'
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

            <div className={styles.CheckboxDiv}>
              <Checkbox color='primary' size='small' onChange={dateHandler} style={{ padding: '0' }} />
              <label className={styles.CheckboxText}>Saya masih berkerja disini</label>
            </div>

            <div className={styles.EditLabel}>
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

          <div className={styles.Footer}>
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
    <form onSubmit={onSubmitHandler} className={styles.Container}>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditOrganization));
