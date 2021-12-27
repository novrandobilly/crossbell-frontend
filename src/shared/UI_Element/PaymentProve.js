import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { useForm } from '../utils/useForm';

import * as actionCreators from '../../store/actions/index';
import Button from '@material-ui/core/Button';
import Backdrop from './Backdrop';
import TextField from '@material-ui/core/TextField';
import Input from './Input';
import { VALIDATOR_MIN } from '../utils/validator';

import classes from './PaymentProve.module.css';
import ModalSpinner from './Spinner/ModalSpinner';

const ModalOverlay = (props) => {
  const [file, setFile] = useState();
  const [submitLoading, setSubmitLoading] = useState(false);

  const [formState, onInputHandler] = useForm(
    {
      paymentFile: {
        value: null,
        isValid: false,
      },

      date: {
        value: '',
        isValid: false,
      },

      time: {
        value: '',
        isValid: false,
      },

      nominal: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const onUploadHandler = (e) => {
    const elementId = e.target.name;
    const elementFile = e.target.files[0];
    onInputHandler(elementId, elementFile, true);
    setFile(file);
    if (elementFile) return setFile(URL.createObjectURL(elementFile));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setSubmitLoading(true);
    if (!formState.formIsValid) {
      throw new Error('Approve order can not be done at the moment');
    }
    let payload;
    if (props.orderType === 'REG') {
      payload = {
        orderRegId: props.orderId,
        paymentFile: formState.inputs.paymentFile.value,
        paymentDate: formState.inputs.date.value,
        paymentTime: formState.inputs.time.value,
        nominal: formState.inputs.nominal.value,
        token: props.admin?.isAdmin ? props.admin.token : props.auth?.isCompany ? props.auth.token : '',
      };
      console.log(payload);

      try {
        const res = await props.updatePaymentREG(payload);
        console.log(res);

        if (!res) {
          throw new Error('gagal menambah pembayaran');
        }
        props.fetchPayment();
        setSubmitLoading(false);
        props.onCancel();
      } catch (err) {
        console.log(err);
        setSubmitLoading(false);
        props.onCancel();
      }
    }

    if (props.orderType === 'BC') {
      payload = {
        orderBcId: props.orderId,
        paymentFile: formState.inputs.paymentFile.value,
        paymentDate: formState.inputs.date.value,
        paymentTime: formState.inputs.time.value,
        nominal: formState.inputs.nominal.value,
        token: props.admin.token,
      };

      try {
        const res = await props.updatePaymentBC(payload);
        if (!res) {
          throw new Error('gagal menambah pembayaran');
        }

        props.onUpdatePaymentInput(payload);
        setSubmitLoading(false);
        props.onCancel();
      } catch (err) {
        console.log(err);
        setSubmitLoading(false);
        props.onCancel();
      }
    }
  };

  let content = (
    <div className={`${classes.Modal} ${props.ContainerClass}`} style={props.style}>
      <header className={`${classes.Header} ${props.HeaderClass}`}>
        <p> {props.children}</p>
      </header>

      {submitLoading ? (
        <ModalSpinner />
      ) : (
        <form>
          <div className={`${classes.Content} ${props.ContentClass}`}>
            <div className={classes.ContentDiv}>
              {' '}
              <TextField
                id='date'
                label='Tanggal Bayar'
                type='date'
                style={{ width: '100%' }}
                className={classes.textField}
                onChange={(e) => onInputHandler('date', e.target.value, true)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>

            <div className={classes.ContentDiv}>
              {' '}
              <TextField
                id='time'
                label='Waktu Bayar'
                type='time'
                defaultValue='00:00'
                className={classes.textField}
                style={{ width: '100%' }}
                onChange={(e) => onInputHandler('time', e.target.value, true)}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300,
                }}
              />
            </div>

            <div className={classes.ContentDiv}>
              <Input
                inputType='input'
                id='nominal'
                validatorMethod={[VALIDATOR_MIN(0)]}
                onInputHandler={onInputHandler}
                error={false}
                initIsValid={true}
                type='number'
                min={0}
                step='100000'
                label={true}
                labelName='Nominal Pembayaran'
                helperText='Jumlah transfer wajib diisi'
                InputLabelProps={{ shrink: true }}
              />
            </div>

            <div className={classes.ContentDiv}>
              {file && (
                <div
                  className={classes.File}
                  style={{
                    backgroundImage: `url('${file}')`,
                  }}
                />
              )}

              <label className={classes.InputButton}>
                <input
                  type='file'
                  name='paymentFile'
                  id='paymentFile'
                  onChange={onUploadHandler}
                  accept='.jpg, .jpeg, .png'
                />
                <span className={classes.InputButtonText}> Upload Bukti Pembayaran </span>
              </label>
            </div>
          </div>

          <footer className={`${classes.Footer} ${props.FooterClass}`}>
            <div className={`${classes.FooterButton}`}>
              <Button
                variant='contained'
                disableElevation
                style={{ marginRight: '16px', padding: '0' }}
                onClick={props.onCancel}>
                tidak
              </Button>

              <Button
                variant='contained'
                color='primary'
                disableElevation
                onClick={onSubmitHandler}
                style={{ padding: '0' }}
                disabled={!formState.formIsValid}>
                ya
              </Button>
            </div>
          </footer>
        </form>
      )}
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};

const Modal = (props) => {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition in={props.show} mountOnEnter unmountOnExit timeout={200} classNames='Modal'>
        <ModalOverlay {...props} />
      </CSSTransition>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    admin: state.admin,
    auth: state.auth,
    isLoading: state.finance.isLoading,
    error: state.finance.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updatePaymentREG: (payload) => dispatch(actionCreators.updatePaymentREG(payload)),
    updatePaymentBC: (payload) => dispatch(actionCreators.updatePaymentBC(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
