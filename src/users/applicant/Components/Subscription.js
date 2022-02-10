import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, withRouter } from 'react-router-dom';
import { useForm } from '../../../shared/utils/useForm';

import * as actionTypes from '../../../store/actions/actions';
import * as actionCreators from '../../../store/actions/index';

import Autocomplete from '@mui/material/Autocomplete';
import Modal from '../../../shared/UI_Element/Modal';
import WorkFieldData from '../../../shared/UI_Element/PredefinedData/WorkFieldData';
import LoadingBar from '../../../shared/UI_Element/Spinner/LoadingBar';
import { CustomTextField } from '../../../shared/UI_Element/CustomMUIComponents';
import Input from '../../../shared/UI_Element/Input';
import { VALIDATOR_REQUIRE } from '../../../shared/utils/validator';

import styles from './Subscription.module.scss';

const Subscription = (props) => {
  const [autoRemind, setAutoRemind] = useState(null);

  // const [workField, setWorkField] = useState();

  const { applicantid } = useParams();

  const { getOneApplicant } = props;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const payload = {
      applicantId: applicantid,
      token: props.auth.token,
    };
    getOneApplicant(payload).then((res) => {
      const autoRemind = {
        isAutoRemind: res.applicant.autoRemind.isAutoRemind,
        jobField: res.applicant.autoRemind.jobField,
        minSalary: res.applicant.autoRemind.minSalary,
        maxSalary: res.applicant.autoRemind.maxSalary,
      };

      setAutoRemind(autoRemind);
    });
  }, [getOneApplicant, applicantid, props.auth.token]);

  const [formState, onInputHandler] = useForm(
    {
      autoRemind: {
        value: autoRemind?.isAutoRemind || false,
        isValid: true,
      },
      autoRemindJobField: {
        value: autoRemind?.jobField || [],
        isValid: autoRemind?.jobField?.length ? true : false,
      },
      autoRemindMinSalary: {
        value: autoRemind?.minSalary || 0,
        isValid: autoRemind?.minSalary ? true : false,
      },
      autoRemindMaxSalary: {
        value: autoRemind?.maxSalary || 0,
        isValid: autoRemind?.minSalary ? true : false,
      },
    },
    false
  );

  useEffect(() => {
    if (autoRemind) {
      const autoRemindEl = document.getElementById('autoRemind');
      autoRemindEl.checked = autoRemind.isAutoRemind;
      onInputHandler('autoRemindJobField', autoRemind.jobField, !!autoRemind.jobField?.length);
      onInputHandler('autoRemind', autoRemind.isAutoRemind, true);
    }
  }, [onInputHandler, autoRemind]);
  console.log(autoRemind);
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // if (!formState.formIsValid) {
    //   return props.updateApplicantFail();
    // }
    const autoRemind = {
      isAutoRemind: formState.inputs.autoRemind.value,
      jobField: formState.inputs.autoRemindJobField.value || [],
      minSalary: formState.inputs.autoRemindMinSalary.value,
      maxSalary: formState.inputs.autoRemindMaxSalary.value,
    };
    const checkValidityAutoRemind = (autoRemind) => {
      if (autoRemind.isAutoRemind) {
        if (!autoRemind.jobField.length) return false;
      }
      return true;
    };

    const ApplicantData = {
      applicantId: applicantid,
      token: props.auth.token,
      autoRemind: autoRemind,
    };

    try {
      if (!checkValidityAutoRemind(autoRemind)) {
        throw new Error('Bidang Pekerjaan tidak boleh kosong');
      }
      await props.updateApplicantSubscription(ApplicantData);
      props.fetchApplicantData();
      props.onCancel();
    } catch (err) {
      console.log(err);
    }
  };
  const onCheckedAutoRemind = (e) => {
    const elementValue = e.target.checked;
    onInputHandler('autoRemind', elementValue, true);
    setAutoRemind((prevState) => {
      let tempObject = { ...prevState };
      tempObject.isAutoRemind = elementValue;
      return tempObject;
    });
  };

  const onChangeAutoRemindField = (e, newVal) => {
    e.persist();

    onInputHandler('autoRemindJobField', newVal, !!newVal.length);
    setAutoRemind((prevState) => {
      let tempObject = { ...prevState };
      tempObject.jobField = newVal;
      return tempObject;
    });
  };

  let content = <LoadingBar />;

  if (!props.isLoading && autoRemind) {
    content = (
      <form className={styles.SubscriptionContainer}>
        <p className={styles.Description}>
          Dengan mengaktifkan fitur ini, anda akan mendapatkan email pemberitahuan (Auto Remind) pada pekerjaan yang
          sesuai dengan minat anda.
        </p>

        <div className={styles.AutoRemindContainer}>
          <label onChange={onCheckedAutoRemind} className={styles.CheckBox}>
            <input
              value={autoRemind?.jobField || ''}
              id='autoRemind'
              type='checkbox'
              name='autoRemind'
              className={styles.InputCheckBox}
            />
            <p className={styles.ContentTitle}>Auto Remind </p>
          </label>

          <div className={styles.JobCategory}>
            <p>Bidang Pekerjaan yang diminati</p>
            <Autocomplete
              id='jobField'
              name='jobField'
              disableCloseOnSelect
              getOptionDisabled={() => autoRemind.jobField?.length >= 4}
              multiple
              freeSolo
              options={WorkFieldData.sort((a, b) => {
                const optA = a.field.toLowerCase();
                const optB = b.field.toLowerCase();
                if (optA < optB) return -1;
                if (optA > optB) return 1;
                return 0;
              }).map((option) => option.field)}
              getOptionLabel={(option) => option}
              onChange={onChangeAutoRemindField}
              value={autoRemind?.jobField || []}
              renderInput={(params) => <CustomTextField {...params} />}
            />
          </div>
          <div className={styles.SalaryRange}>
            <Input
              inputType='input'
              id='autoRemindMinSalary'
              validatorMethod={[VALIDATOR_REQUIRE()]}
              onInputHandler={onInputHandler}
              initIsValid={!!autoRemind?.minSalary}
              initValue={autoRemind.minSalary}
              label={true}
              labelName='Min Salary'
              error={false}
              type='number'
              min={0}
              step='500000'
            />
            <Input
              inputType='input'
              id='autoRemindMaxSalary'
              validatorMethod={[VALIDATOR_REQUIRE()]}
              onInputHandler={onInputHandler}
              initIsValid={!!autoRemind?.maxSalary}
              initValue={autoRemind.maxSalary}
              label={true}
              labelName='Max Salary'
              error={false}
              type='number'
              min={0}
              step='500000'
            />
          </div>
        </div>

        <button
          className={styles.SubmitButton}
          disabled={!formState.formIsValid && autoRemind.isAutoRemind}
          type='button'
          onClick={onSubmitHandler}>
          Simpan
        </button>
      </form>
    );
  }

  const onCancelHandler = () => {
    props.resetApplicant();
  };

  return (
    <div className={styles.ContainerFlex}>
      {' '}
      <Modal show={props.error} onCancel={onCancelHandler}>
        Could not update changes at the moment, please try again later
      </Modal>
      {content}
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
    updateApplicantFail: () => dispatch({ type: actionTypes.UPDATEAPPLICANTFAIL }),
    resetApplicant: () => dispatch({ type: actionTypes.APPLICANTRESET }),
    getOneApplicant: (payload) => dispatch(actionCreators.getOneApplicant(payload)),
    updateApplicantSubscription: (ApplicantData) => dispatch(actionCreators.updateApplicantSubscription(ApplicantData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Subscription));
