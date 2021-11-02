import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { useParams, withRouter } from 'react-router-dom';
import { useForm } from '../../../../shared/utils/useForm';
import moment from 'moment';

import * as actionTypes from '../../../../store/actions/actions';
import * as actionCreators from '../../../../store/actions/index';
import { VALIDATOR_REQUIRE, VALIDATOR_ALWAYSTRUE } from '../../../../shared/utils/validator';

import Modal from '../../../../shared/UI_Element/Modal';
import Checkbox from '@material-ui/core/Checkbox';
import LoadingBar from '../../../../shared/UI_Element/Spinner/LoadingBar';
import Input from '../../../../shared/UI_Element/Input';

import styles from './EditOrganization.module.scss';

const EditOrganization = props => {
  const { applicantid } = useParams();
  const { organizationId } = props;

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
        const organization = res.applicant?.organization.filter(org => org.id === organizationId)[0];
        console.log(res);
        setData(organization);
      });
    }
  }, [getOneApplicant, applicantid, organizationId, props.auth.token]);

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
      organizationId,
      organization: formState.inputs.organization?.value,
      prevCompany: formState.inputs.prevCompany?.value,
      prevIndustry: formState.inputs.prevIndustry?.value,
      startDate: formState.inputs.startDate?.value,
      endDate: stillMember ? null : formState.inputs.endDate?.value,
      description: formState.inputs.description?.value,
      token: props.auth.token,
    };

    try {
      await props.updateApplicantOrganization(updatedOrganization);
      props.onCancel();
      props.fetchApplicantData();
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
      <form className={styles.EditOrganizationContainer} onSubmit={onSubmitHandler}>
        <Input
          inputType='input'
          id='organization'
          inputClass='AddJobInput'
          validatorMethod={[VALIDATOR_REQUIRE()]}
          onInputHandler={onInputHandler}
          label={true}
          labelName='Nama Organisasi*'
          initValue={data.organization}
          initIsValid={true}
        />

        <div className={styles.OrganizationPeriod}>
          <Input
            inputType='datePicker'
            id='startDate'
            inputClass='EditProfileTextArea'
            validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
            onInputHandler={onInputHandler}
            views={['year', 'month']}
            format='MMMM YYYY'
            label={true}
            labelName='Tahun Mulai'
            initValue={data.startDate}
            initIsValid={true}
          />

          {!stillMember && (
            <Input
              inputType='datePicker'
              id='endDate'
              inputClass='EditProfileTextArea'
              validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
              onInputHandler={onInputHandler}
              views={['year', 'month']}
              format='MMMM YYYY'
              label='Tahun Selesai'
              maxDate={moment()}
              initValue={data.endDate}
              initIsValid={true}
            />
          )}
        </div>

        <div className={styles.StillMemberCheck}>
          <Checkbox color='primary' size='small' onChange={dateHandler} id='StilMemberCheck' style={{ padding: '0' }} />
          <label htmlFor='StillMemberCheck' className={styles.StillMemberLabel}>
            Saya masih menjadi anggota
          </label>
        </div>

        <div className={styles.EditLabel}>
          <Input
            inputType='textarea'
            id='description'
            inputClass='EditProfileTextArea'
            validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
            onInputHandler={onInputHandler}
            label={true}
            labelName='Deskripsi Organisasi (Opsional)'
            initValue={data.description}
            initIsValid={true}
            rows={10}
            style={{ border: '2px solid #f79f35', outline: 'none' }}
          />
        </div>

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
  }

  const onCancelHandler = () => {
    props.resetApplicant();
  };

  return (
    <Fragment>
      <Modal show={props.error} onCancel={onCancelHandler}>
        Could not update changes at the moment, please try again later
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
    updateApplicantFail: () => dispatch({ type: actionTypes.UPDATEAPPLICANTFAIL }),
    resetApplicant: () => dispatch({ type: actionTypes.APPLICANTRESET }),
    getOneApplicant: data => dispatch(actionCreators.getOneApplicant(data)),
    updateApplicantOrganization: ApplicantData => dispatch(actionCreators.updateApplicantOrganization(ApplicantData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditOrganization));
