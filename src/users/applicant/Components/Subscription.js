import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, withRouter } from 'react-router-dom';
import { useForm } from '../../../shared/utils/useForm';

import * as actionTypes from '../../../store/actions/actions';
import * as actionCreators from '../../../store/actions/index';

import Autocomplete from '@mui/material/Autocomplete';
import Modal from '../../../shared/UI_Element/Modal';
import IndustryData from '../../../shared/UI_Element/IndustryData';
import WorkFieldData from '../../../shared/UI_Element/PredefinedData/WorkFieldData';
import LoadingBar from '../../../shared/UI_Element/Spinner/LoadingBar';
import { CustomTextField } from '../../../shared/UI_Element/CustomMUIComponents';

import styles from './Subscription.module.scss';

const Subscription = (props) => {
  const [data, setData] = useState();
  const [autoSend, setAutoSend] = useState({
    isAutoSend: false,
    jobIndustry: '',
    jobField: '',
  });
  const [autoRemind, setAutoRemind] = useState({
    isAutoRemind: false,
    jobIndustry: '',
    jobField: '',
  });

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
        jobIndustry: { industry: res.applicant.autoRemind.jobIndustry },
      };
      const autoSend = {
        isAutoSend: res.applicant.autoSend.isAutoSend,
        jobField: res.applicant.autoSend.jobField,
        jobIndustry: { industry: res.applicant.autoSend.jobIndustry },
      };
      setAutoSend(autoSend);
      setAutoRemind(autoRemind);
      setData(res.applicant);
    });
  }, [getOneApplicant, applicantid, props.auth.token]);

  const [formState, onInputHandler] = useForm(
    {
      autoSend: {
        value: data ? data.autoSend : false,
        isValid: data && data.autoSend ? true : false,
      },
      autoRemind: {
        value: data ? data.autoRemind : false,
        isValid: data && data.autoRemind ? true : false,
      },
    },
    false
  );

  useEffect(() => {
    if (data) {
      const autoSendEl = document.getElementById('autoSend');
      const autoRemindEl = document.getElementById('autoRemind');
      autoSendEl.checked = data.autoSend.isAutoSend;
      autoRemindEl.checked = data.autoRemind.isAutoRemind;
    }
  }, [data, onInputHandler]);

  useEffect(() => {
    if (data) {
      onInputHandler('autoSend', autoSend, true);
      onInputHandler('autoRemind', autoRemind, true);
    }
  }, [data, onInputHandler, autoSend, autoRemind]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!formState.formIsValid) {
      return props.updateApplicantFail();
    }
    const autoRemind = {
      isAutoRemind: formState.inputs.autoRemind.value.isAutoRemind,
      jobField: formState.inputs.autoRemind.value.jobField || '',
      jobIndustry: formState.inputs.autoRemind.value.jobIndustry?.industry || '',
    };
    const autoSend = {
      isAutoSend: formState.inputs.autoSend.value.isAutoSend,
      jobField: formState.inputs.autoSend.value.jobField || '',
      jobIndustry: formState.inputs.autoSend.value.jobIndustry?.industry || '',
    };

    const checkValidityAutoRemind = (autoRemind) => {
      if (autoRemind.isAutoRemind) {
        if (!autoRemind.jobField || !autoRemind.jobIndustry) return false;
      }
      return true;
    };
    const checkValidityAutoSend = (autoSend) => {
      if (autoSend.isAutoSend) {
        if (!autoSend.jobField || !autoSend.jobIndustry) return false;
      }
      return true;
    };

    const ApplicantData = {
      applicantId: applicantid,
      token: props.auth.token,
      autoSend: autoSend,
      autoRemind: autoRemind,
    };

    try {
      if (!checkValidityAutoRemind(autoRemind) || !checkValidityAutoSend(autoSend)) {
        throw new Error('Bidang Industri & Bidang Pekerjaan tidak boleh kosong');
      }
      await props.updateApplicantSubscription(ApplicantData);
      props.fetchApplicantData();
      props.onCancel();
    } catch (err) {
      console.log(err);
    }
  };

  const onCheckedAutoSend = (e) => {
    const elementValue = e.target.checked;
    setAutoSend((prevState) => {
      let tempObject = { ...prevState };
      tempObject.isAutoSend = elementValue;
      return { ...tempObject };
    });
  };

  const onChangeAutoSendIndustry = (e, newVal) => {
    e.persist();
    setAutoSend((prevState) => {
      let tempObject = { ...prevState };
      tempObject.jobIndustry = newVal;
      prevState.jobIndustry = newVal;
      return tempObject;
    });
  };

  const onChangeAutoSendField = (e, newVal) => {
    e.persist();
    setAutoSend((prevState) => {
      let tempObject = { ...prevState };
      tempObject.jobField = newVal;
      return { ...tempObject };
    });
  };

  const onCheckedAutoRemind = (e) => {
    const elementValue = e.target.checked;
    setAutoRemind((prevState) => {
      let tempObject = { ...prevState };
      tempObject.isAutoRemind = elementValue;
      return { ...tempObject };
    });
  };

  const onChangeAutoRemindIndustry = (e, newVal) => {
    e.persist();
    setAutoRemind((prevState) => {
      let tempObject = { ...prevState };
      tempObject.jobIndustry = newVal;
      prevState.jobIndustry = newVal;
      return tempObject;
    });
  };

  const onChangeAutoRemindField = (e, newVal) => {
    e.persist();
    setAutoRemind((prevState) => {
      let tempObject = { ...prevState };
      tempObject.jobField = newVal;
      return { ...tempObject };
    });
  };

  let content = <LoadingBar />;

  if (!props.isLoading && data) {
    content = (
      <form className={styles.SubscriptionContainer}>
        <p className={styles.Description}>
          Dengan mengaktifkan salah satu/kedua fitur ini, anda akan mendapatkan email pemberitahuan (Auto Remind),
          dan/atau mengizinkan sistem mengirimkan lamaran anda secara otomatis (Auto Apply) pada pekerjaan yang sesuai
          dengan minat anda.
        </p>

        <div className={styles.AutoRemindContainer}>
          <label onChange={onCheckedAutoRemind} className={styles.CheckBox}>
            <input
              value={autoRemind.jobIndustry || ''}
              id='autoRemind'
              type='checkbox'
              name='autoRemind'
              className={styles.InputCheckBox}
            />
            <p className={styles.ContentTitle}>Auto Remind | Beri notifikasi apabila ada pekerjaan sesuai minat</p>
          </label>

          <div className={styles.Industry}>
            <p>Industri Pekerjaan Yang Diminati</p>
            <Autocomplete
              id='jobIndustry'
              name='jobIndustry'
              options={IndustryData.sort((a, b) => {
                const optA = a.industry.toLowerCase();
                const optB = b.industry.toLowerCase();
                if (optA < optB) return -1;
                if (optA > optB) return 1;
                return 0;
              }).map((option) => option)}
              getOptionLabel={(option) => `${option.industry}`}
              value={autoRemind.jobIndustry}
              onChange={onChangeAutoRemindIndustry}
              renderInput={(params) => <CustomTextField {...params} />}
            />
          </div>
          <div className={styles.JobCategory}>
            <p>Bidang Pekerjaan yang diminati</p>
            <Autocomplete
              id='jobField'
              name='jobField'
              options={WorkFieldData.sort((a, b) => {
                const optA = a.field.toLowerCase();
                const optB = b.field.toLowerCase();
                if (optA < optB) return -1;
                if (optA > optB) return 1;
                return 0;
              }).map((option) => option.field)}
              getOptionLabel={(option) => option}
              onChange={onChangeAutoRemindField}
              value={autoRemind.jobField}
              renderInput={(params) => <CustomTextField {...params} />}
            />
          </div>
        </div>
        <div className={styles.AutoApplyContainer}>
          <label onChange={onCheckedAutoSend} className={styles.CheckBox}>
            <input id='autoSend' type='checkbox' name='autoSend' className={styles.InputCheckBox} />
            <p className={styles.ContentTitle}>Auto Apply | Lamar otomatis apabila ada pekerjaan sesuai minat</p>
          </label>

          <div className={styles.Industry}>
            <p>Industri Pekerjaan Yang Diminati</p>
            <Autocomplete
              id='jobIndustry'
              name='jobIndustry'
              options={IndustryData.sort((a, b) => {
                const optA = a.industry.toLowerCase();
                const optB = b.industry.toLowerCase();
                if (optA < optB) return -1;
                if (optA > optB) return 1;
                return 0;
              }).map((option) => option)}
              getOptionLabel={(option) => `${option.industry}`}
              value={autoSend.jobIndustry}
              onChange={onChangeAutoSendIndustry}
              renderInput={(params) => <CustomTextField {...params} />}
            />
          </div>
          <div className={styles.JobCategory}>
            <p>Bidang Pekerjaan yang diminati</p>
            <Autocomplete
              id='jobField'
              name='jobField'
              options={WorkFieldData.sort((a, b) => {
                const optA = a.field.toLowerCase();
                const optB = b.field.toLowerCase();
                if (optA < optB) return -1;
                if (optA > optB) return 1;
                return 0;
              }).map((option) => option.field)}
              getOptionLabel={(option) => option}
              onChange={onChangeAutoSendField}
              value={autoSend.jobField}
              renderInput={(params) => <CustomTextField {...params} />}
            />
          </div>
        </div>
        <button
          className={styles.SubmitButton}
          disabled={!formState.formIsValid}
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
