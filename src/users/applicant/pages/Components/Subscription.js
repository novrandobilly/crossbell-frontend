import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, withRouter } from 'react-router-dom';
import { useForm } from '../../../../shared/utils/useForm';

import * as actionTypes from '../../../../store/actions/actions';
import * as actionCreators from '../../../../store/actions/index';
import Modal from '../../../../shared/UI_Element/Modal';
import OrderModal from '../../../../shared/UI_Element/OrderModal';
import Button from '@material-ui/core/Button';
import SpinnerCircle from '../../../../shared/UI_Element/Spinner/SpinnerCircle';

import classes from './Subscription.module.css';

const Subscription = (props) => {
  const [data, setData] = useState();
  const [orderModal, setOrderModal] = useState(false);

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
      setData(res.applicant);
      console.log(res.applicant);
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
      autoSendEl.checked = data.autoSend;
      autoRemindEl.checked = data.autoRemind;
      onInputHandler('autoSend', data.autoSend, true);
      onInputHandler('autoRemind', data.autoRemind, true);
    }
  }, [data, onInputHandler]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!formState.formIsValid) {
      return props.updateApplicantFail();
    }

    const ApplicantData = {
      applicantId: applicantid,
      autoSend: formState.inputs.autoSend.value,
      autoRemind: formState.inputs.autoRemind.value,
    };

    setOrderModal(false);

    try {
      const res = await props.updateApplicantSubscription(ApplicantData);
      if (res) {
        console.log(res);
      }
      props.history.push(`/ap/${applicantid}`);
    } catch (err) {
      console.log(err);
    }
  };

  const onCheckedInputHandler = (e) => {
    const elementId = e.target.name;
    const elementValue = e.target.checked;
    onInputHandler(elementId, elementValue, true);
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
        <h2>Berhenti Berlangganan</h2>
        <p className={classes.AppealText}>
          Silahkan klik centang untuk mengosongkan kotak{' '}
          <strong>
            <em>(uncheck)</em>
          </strong>{' '}
          untuk konfirmasi anda berhenti dari fitur notifikasi otomatis (auto
          reminder) dan/atau fitur lamaran otomatis (auto apply) , keluar dari
          halaman bila anda tidak ingin melakukan pembaruan
        </p>

        <div className={classes.Content}>
          <label onChange={onCheckedInputHandler} className={classes.CheckBox}>
            <p style={{ margin: '0', marginLeft: '4px' }}>
              Saya bersedia didaftarkan kerja secara otomatis oleh Crossbell
            </p>{' '}
            <input
              id='autoSend'
              type='checkbox'
              name='autoSend'
              className={classes.Box}
            />
          </label>
          <label onChange={onCheckedInputHandler} className={classes.CheckBox}>
            <p style={{ margin: '0', marginLeft: '4px' }}>
              Berikan notifikasi bila ada pekerjaan sesuai bidang minat
            </p>{' '}
            <input
              id='autoRemind'
              type='checkbox'
              name='autoRemind'
              className={classes.Box}
            />
          </label>
        </div>

        <div className={classes.Footer}>
          <Button
            disabled={!formState.formIsValid}
            variant='contained'
            color='primary'
            type='button'
            onClick={onOpenOrderModal}
          >
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
      <OrderModal
        show={orderModal}
        onCancel={onCloseOrderModal}
        Accept={onSubmitHandler}
      >
        Apakah anda yakin ingin membuat perubahan pada subscription anda saat
        ini?
      </OrderModal>
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
    updateApplicantFail: () =>
      dispatch({ type: actionTypes.UPDATEAPPLICANTFAIL }),
    resetApplicant: () => dispatch({ type: actionTypes.APPLICANTRESET }),
    getOneApplicant: (payload) =>
      dispatch(actionCreators.getOneApplicant(payload)),
    updateApplicantSubscription: (ApplicantData) =>
      dispatch(actionCreators.updateApplicantSubscription(ApplicantData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Subscription));
