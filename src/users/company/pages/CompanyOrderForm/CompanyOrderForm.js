import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { useForm } from '../../../../shared/utils/useForm';

import OrderComponent from './OrderComponent';
import * as actionTypes from '../../../../store/actions/actions';
import * as actionCreators from '../../../../store/actions/index';
import { VALIDATOR_MIN, VALIDATOR_MAX } from '../../../../shared/utils/validator';

import LoadingBar from '../../../../shared/UI_Element/Spinner/LoadingBar';
import Modal from '../../../../shared/UI_Element/Modal';
import OrderModal from '../../../../shared/UI_Element/OrderModal';
import Input from '../../../../shared/UI_Element/Input';

import styles from './CompanyOrderForm.module.scss';

const CompanyOrderForm = (props) => {
  const companyData = JSON.parse(localStorage.getItem('userData'));
  const [validationError, setValidationError] = useState(false);

  const [PPH, setPPH] = useState(false);
  const [orderModal, setOrderModal] = useState(false);
  const [slot, setSlot] = useState('0');
  const [price, setPrice] = useState(0);

  const [formState, onInputHandler] = useForm(
    {
      slot: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!formState.formIsValid) {
      return props.createOrderFail();
    }

    if (!props.auth.isActive) {
      setValidationError(true);
    }

    let title = 'bronze';

    if (formState.inputs.slot.value > 1) {
      title = 'silver';
    }
    if (formState.inputs.slot.value > 4) {
      title = 'gold';
    }
    if (formState.inputs.slot.value > 9) {
      title = 'platinum';
    }
    if (props.auth.isActive) {
      const orderData = {
        invoiceId: companyData.userId.slice(0, 3),
        companyId: companyData.userId,
        packageName: title,
        slot: formState.inputs.slot.value,
        PPH: PPH,
        token: props.auth.token,
      };

      try {
        if (orderData.slot < 1) {
          throw new Error('jumlah pembelian tidak boleh dibawah 1');
        }

        setOrderModal(false);

        const res = await props.createOrder(orderData);
        if (res) {
          props.history.push(`/co/${res.orderreg.id}/invoice`);
        } else {
          throw new Error(res);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    setPrice(600000);
    if (slot > 1) setPrice(575000);
    if (slot > 4) setPrice(525000);
    if (slot > 9) setPrice(450000);
  }, [slot]);

  const onCloseOrderModal = (event) => {
    setOrderModal(false);
  };

  const onOpenOrderModal = () => {
    setOrderModal(true);
  };

  const OnclickBronze = () => {
    onInputHandler('slot', 1, true);
    setSlot('1');
  };

  const OnclickSilver = () => {
    onInputHandler('slot', 4, true);
    setSlot('4');
  };

  const OnclickGold = () => {
    onInputHandler('slot', 9, true);
    setSlot('9');
  };

  const OnclickPlatinum = () => {
    onInputHandler('slot', 10, true);
    setSlot('10');
  };

  const onSlotChange = (event) => {
    setSlot(event?.target?.value);
  };

  const onCheckedPPH = (e) => {
    const elementValue = e.target.checked;
    setPPH(elementValue);
  };

  useEffect(() => {
    onInputHandler('state', slot, true);
  }, [onInputHandler, slot]);
  let formContent = <LoadingBar />;

  if (!props.isLoading) {
    formContent = (
      <React.Fragment>
        <div className={styles.Header}>
          <h1>Form Pemesanan Slot</h1>
          <ul>
            <li>
              <strong>Slot</strong> merepresentasikan durasi tayang pada sebuah iklan lowongan.
            </li>
            <li>
              1 <strong>Slot</strong> sama dengan 30 hari penayangan.
            </li>
            <li>
              Sebuah iklan dapat menggunakan lebih dari 1 <strong>Slot</strong> sesuai dengan durasi tayang yang
              diinginkan
            </li>
          </ul>
        </div>
        <div className={styles.PackageList}>
          <div onClick={OnclickBronze} className={styles.PackageCard}>
            <OrderComponent title='Bronze' price={600000} slot='1 slot' createOrder={props.createOrder} />
          </div>

          <div onClick={OnclickSilver} className={styles.PackageCard}>
            <OrderComponent title='Silver' price={575000} slot='2 - 4 slot' createOrder={props.createOrder} />
          </div>

          <div onClick={OnclickGold} className={styles.PackageCard}>
            <OrderComponent title='Gold' price={525000} slot='5 - 9 slot' createOrder={props.createOrder} />
          </div>

          <div onClick={OnclickPlatinum} className={styles.PackageCard}>
            <OrderComponent title='Platinum' price={450000} slot='> 9 slot' createOrder={props.createOrder} />
          </div>
        </div>
        <form className={styles.FormContainer} onSubmit={onSubmitHandler}>
          <div className={styles.InputAmount} style={{ marginTop: '20px' }}>
            <p className={styles.SlotEqual}>*1 Slot = 30 hari waktu tayang iklan</p>
          </div>
          <div className={styles.InputAmount}>
            <p className={styles.Label}>Jumlah slot yang ingin dibeli</p>
            <div className={styles.InputSlot}>
              <Input
                inputType='input'
                id='slot'
                InputClass='PackageSlot'
                validatorMethod={[VALIDATOR_MIN(1), VALIDATOR_MAX(15)]}
                onInputHandler={onInputHandler}
                type='number'
                initValue={slot}
                onChange={onSlotChange}
                value={slot}
                max='15'
                min='0'
                step='1'
                helperText={
                  formState.inputs.slot.value <= 0
                    ? 'Minimal pembelian 1 slot'
                    : 'Mohon masukkan jumlah yang ingin dibeli'
                }
              />
            </div>
          </div>
          <div className={styles.InputAmount} style={{ marginBottom: '-16px' }}>
            <p className={styles.Label}>Jenis paket:</p>
            <p className={styles.InputSlot}>
              {formState.inputs.slot.value <= 1
                ? 'Bronze'
                : formState.inputs.slot.value <= 4
                ? 'Silver'
                : formState.inputs.slot.value <= 9
                ? 'Gold'
                : 'Platinum'}
            </p>
          </div>
          <div className={styles.InputAmount} style={{ borderBottom: '1px solid black' }}>
            <p className={styles.Label}>Harga per slot:</p>
            <p className={styles.InputSlot}>IDR {price.toLocaleString()}</p>
          </div>
          <div className={styles.InputAmount}>
            <p className={styles.Label}>Total:</p>
            <p className={styles.InputSlot}>
              <strong>IDR {(price * formState.inputs.slot.value).toLocaleString()}</strong>
            </p>
          </div>

          <div className={styles.PPHDiv}>
            <p className={styles.Question}>
              Apakah perusahaan anda memiliki kewajiban untuk memotong <span>PPH pasal 23</span>? Jika ya mohon
              mencentang kotak dibawah ini!
            </p>{' '}
            <label onChange={onCheckedPPH} className={styles.CheckBox}>
              <input id='PPH' type='checkbox' name='PPH' className={styles.Box} />
              <p className={styles.Text}>
                Ya, dan bersedia memberikan bukti potong PPH pasal 23 kepada pihak crossbell
              </p>
            </label>
          </div>

          <div style={{ width: '100%', textAlign: 'center' }}>
            <button
              className={styles.SubmitButton}
              type='button'
              disabled={!formState.formIsValid}
              onClick={onOpenOrderModal}>
              Submit
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  }

  const onCancelHandler = () => {
    props.resetOrder();
    setValidationError(false);
  };

  return (
    <div className={styles.Container}>
      {' '}
      <Modal show={validationError && !props.auth.isActive} onCancel={onCancelHandler}>
        Perusahaan anda masih dalam proses verifikasi admin
      </Modal>
      <Modal show={props.error && props.auth.isActive} onCancel={onCancelHandler}>
        Tidak dapat melakukan Pembelian untuk saat ini
      </Modal>
      <OrderModal show={orderModal && !validationError} onCancel={onCloseOrderModal} Accept={onSubmitHandler}>
        Apakah anda ingin melanjutkan pembelian slot iklan?
      </OrderModal>
      {formContent}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    isLoading: state.finance.isLoading,
    error: state.finance.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createOrder: (orderData) => dispatch(actionCreators.createOrder(orderData)),
    createOrderFail: () => dispatch({ type: actionTypes.CREATEORDERCANDIDATEFAIL }),
    resetOrder: () => dispatch({ type: actionTypes.ORDERRESET }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CompanyOrderForm));
