import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, withRouter } from 'react-router-dom';
import { useForm } from '../../../shared/utils/useForm';

import * as actionTypes from '../../../store/actions/actions';
import * as actionCreators from '../../../store/actions/index';
// import { VALIDATOR_REQUIRE } from '../../../shared/utils/validator';

import Modal from '../../../shared/UI_Element/Modal';
import OrderModal from '../../../shared/UI_Element/OrderModal';
import Button from '@material-ui/core/Button';
import SpinnerCircle from '../../../shared/UI_Element/Spinner/SpinnerCircle';
import TextField from '@material-ui/core/TextField';

import classes from './Subscription.module.css';

const Subscription = props => {
  const [data, setData] = useState();
  const [orderModal, setOrderModal] = useState(false);
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
    getOneApplicant(payload).then(res => {
      setAutoSend(res.applicant.autoSend);
      setAutoRemind(res.applicant.autoRemind);
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

  const onSubmitHandler = async event => {
    event.preventDefault();
    if (!formState.formIsValid) {
      return props.updateApplicantFail();
    }

    const ApplicantData = {
      applicantId: applicantid,
      token: props.auth.token,
      autoSend: formState.inputs.autoSend.value,
      autoRemind: formState.inputs.autoRemind.value,
    };

    setOrderModal(false);
    try {
      const res = await props.updateApplicantSubscription(ApplicantData);

      if (res) {
        props.history.push(`/ap/${applicantid}/profile`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onCheckedAutoSend = e => {
    const elementValue = e.target.checked;
    setAutoSend(prevState => {
      let tempObject = { ...prevState };
      tempObject.isAutoSend = elementValue;
      return { ...tempObject };
    });
  };

  const onChangeAutoSendIndustry = e => {
    e.persist();
    setAutoSend(prevState => {
      let tempObject = { ...prevState };
      tempObject.jobIndustry = e.target.value;
      prevState.jobIndustry = e.target.value;
      return tempObject;
    });
  };

  const onChangeAutoSendField = e => {
    e.persist();
    setAutoSend(prevState => {
      let tempObject = { ...prevState };
      tempObject.jobField = e.target.value;
      return { ...tempObject };
    });
  };

  const onCheckedAutoRemind = e => {
    const elementValue = e.target.checked;
    setAutoRemind(prevState => {
      let tempObject = { ...prevState };
      tempObject.isAutoRemind = elementValue;
      return { ...tempObject };
    });
  };

  const onChangeAutoRemindIndustry = e => {
    e.persist();
    setAutoRemind(prevState => {
      let tempObject = { ...prevState };
      tempObject.jobIndustry = e.target.value;
      prevState.jobIndustry = e.target.value;
      return tempObject;
    });
  };

  const onChangeAutoRemindField = e => {
    e.persist();
    setAutoRemind(prevState => {
      let tempObject = { ...prevState };
      tempObject.jobField = e.target.value;
      return { ...tempObject };
    });
  };

  const onCloseOrderModal = () => {
    setOrderModal(false);
  };

  const onOpenOrderModal = () => {
    setOrderModal(true);
  };

  let content = <SpinnerCircle />;

  if (!props.isLoading && data) {
    content = (
      <form className={classes.Container}>
        <h2>Ubah Kriteria Langganan</h2>
        <p className={classes.AppealText}>
          Silahkan klik centang untuk mengosongkan kotak{' '}
          <strong>
            <em>(uncheck)</em>
          </strong>{' '}
          untuk konfirmasi anda berhenti dari fitur notifikasi otomatis (auto reminder) dan/atau fitur lamaran otomatis (auto apply) ,
          keluar dari halaman bila anda tidak ingin melakukan pembaruan
        </p>

        <div className={classes.Content}>
          <div className={classes.TopContent}>
            <p className={classes.ContentTitle}>Lamaran otomatis</p>

            <label onChange={onCheckedAutoSend} className={classes.CheckBox}>
              <input id='autoSend' type='checkbox' name='autoSend' className={classes.Box} />
              <p className={classes.Text}>Saya bersedia didaftarkan kerja secara otomatis oleh Crossbell</p>{' '}
            </label>
            <div className={classes.InputDiv}>
              <TextField
                id='jobIndustry'
                label='Industri Perusahaan*'
                onChange={onChangeAutoSendIndustry}
                style={{ width: '100%' }}
                value={autoSend.jobIndustry ? autoSend.jobIndustry : ''}
              />
            </div>
            <div className={classes.InputDiv}>
              <TextField
                id='jobfield'
                onChange={onChangeAutoSendField}
                label='Bidang Pekerjaan*'
                style={{ width: '100%' }}
                value={autoSend.jobField ? autoSend.jobField : ''}
              />
            </div>
          </div>

          <div className={classes.BottomContent}>
            <p className={classes.ContentTitle}>Notifikasi otomatis</p>
            <label onChange={onCheckedAutoRemind} className={classes.CheckBox}>
              <input id='autoRemind' type='checkbox' name='autoRemind' className={classes.Box} />
              <p className={classes.Text}>Berikan notifikasi bila ada pekerjaan sesuai bidang minat</p>{' '}
            </label>
            <div className={classes.InputDiv}>
              <TextField
                id='jobIndustry'
                onChange={onChangeAutoRemindIndustry}
                label='Industri Perusahaan*'
                style={{ width: '100%' }}
                value={autoRemind.jobIndustry ? autoRemind.jobIndustry : ''}
              />
            </div>
            <div className={classes.InputDiv}>
              <TextField
                id='jobfield'
                onChange={onChangeAutoRemindField}
                label='Bidang Pekerjaan*'
                style={{ width: '100%' }}
                value={autoRemind.jobField ? autoRemind.jobField : ''}
              />
            </div>
          </div>
        </div>

        <div className={classes.Footer}>
          <Button disabled={!formState.formIsValid} variant='contained' color='primary' type='button' onClick={onOpenOrderModal}>
            Simpan
          </Button>
        </div>
      </form>
    );
  }

  const onCancelHandler = () => {
    props.resetApplicant();
  };

  return (
    <div className={classes.ContainerFlex}>
      {' '}
      <Modal show={props.error} onCancel={onCancelHandler}>
        Could not update changes at the moment, please try again later
      </Modal>
      <OrderModal show={orderModal} onCancel={onCloseOrderModal} Accept={onSubmitHandler}>
        Apakah anda yakin ingin membuat perubahan pada subscription anda saat ini?
      </OrderModal>
      {content}
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
    updateApplicantFail: () => dispatch({ type: actionTypes.UPDATEAPPLICANTFAIL }),
    resetApplicant: () => dispatch({ type: actionTypes.APPLICANTRESET }),
    getOneApplicant: payload => dispatch(actionCreators.getOneApplicant(payload)),
    updateApplicantSubscription: ApplicantData => dispatch(actionCreators.updateApplicantSubscription(ApplicantData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Subscription));
