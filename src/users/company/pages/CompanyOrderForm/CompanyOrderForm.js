import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { useForm } from '../../../../shared/utils/useForm';

import OrderComponent from './OrderComponent';
import * as actionTypes from '../../../../store/actions/actions';
import * as actionCreators from '../../../../store/actions/index';
import { VALIDATOR_MIN } from '../../../../shared/utils/validator';
import Button from '@material-ui/core/Button';

import Spinner from '../../../../shared/UI_Element/Spinner/SpinnerCircle';
import Modal from '../../../../shared/UI_Element/Modal';
import OrderModal from '../../../../shared/UI_Element/OrderModal';
import Input from '../../../../shared/UI_Element/Input';

import classes from './CompanyOrderForm.module.css';

const ORIGINAL_PRICE = 500000;

const CompanyOrderForm = (props) => {
  const companyData = JSON.parse(localStorage.getItem('userData'));

  const [orderModal, setOrderModal] = useState(false);

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

    const orderData = {
      invoiceId: companyData.userId.slice(0, 3),
      companyId: companyData.userId,
      packageName: title,
      slot: formState.inputs.slot.value,
      token: props.auth.token,
    };

    try {
      if (orderData.slot < 1) {
        throw new Error('jumlah pembelian tidak boleh dibawah 1');
      }

      setOrderModal(false);

      const res = await props.createOrder(orderData);
      if (res) {
        console.log(res);
        props.history.push(`/co/${res.orderreg.id}/invoice`);
      } else {
        throw new Error('Error nih bro');
      }
    } catch (err) {
      console.log(err);
    }
  };

  let price;

  if (formState.inputs.slot.value <= 1) price = ORIGINAL_PRICE;
  if (formState.inputs.slot.value > 1)
    price = ORIGINAL_PRICE - ORIGINAL_PRICE * 0.05;
  if (formState.inputs.slot.value > 4)
    price = ORIGINAL_PRICE - ORIGINAL_PRICE * 0.1;
  if (formState.inputs.slot.value > 9)
    price = ORIGINAL_PRICE - ORIGINAL_PRICE * 0.15;

  const onCloseOrderModal = () => {
    setOrderModal(false);
  };

  const onOpenOrderModal = () => {
    setOrderModal(true);
  };

  let formContent = (
    <React.Fragment>
      <div className={classes.PackageList}>
        <OrderComponent
          title='Bronze'
          price={ORIGINAL_PRICE}
          slot='1 slot'
          perks={['1 slot = 2 minggu penayangan iklan']}
          createOrder={props.createOrder}
        />
        <OrderComponent
          title='Silver'
          price={ORIGINAL_PRICE - ORIGINAL_PRICE * 0.1}
          slot='2 - 4 slot'
          perks={[
            '1 slot = 2 minggu penayangan iklan',
            'Discount per slot sebesar 5%',
          ]}
          createOrder={props.createOrder}
        />
        <OrderComponent
          title='Gold'
          price={ORIGINAL_PRICE - ORIGINAL_PRICE * 0.2}
          slot='5 - 9 slot'
          perks={[
            '1 slot = 2 minggu penayangan iklan',
            'Discount per slot sebesar 10%',
          ]}
          createOrder={props.createOrder}
        />
        <OrderComponent
          title='Platinum'
          price={ORIGINAL_PRICE - ORIGINAL_PRICE * 0.3}
          slot='>9 slot'
          perks={[
            '1 slot = 2 minggu penayangan iklan',
            'Discount per slot sebesar 15%',
          ]}
          createOrder={props.createOrder}
        />
      </div>
      <form className={classes.FormContainer} onSubmit={onSubmitHandler}>
        <div className={classes.InputAmount}>
          <p className={classes.Label}>Jumlah slot yang ingin dibeli</p>
          <div className={classes.InputSlot}>
            <Input
              inputType='input'
              id='slot'
              InputClass='PackageSlot'
              validatorMethod={[VALIDATOR_MIN(1)]}
              onInputHandler={onInputHandler}
              type='number'
              initValue='1'
              min='1'
              step='1'
            />
          </div>
        </div>

        <div
          className={classes.InputAmount}
          style={{ borderBottom: '1px solid black' }}
        >
          <p className={classes.Label}>Harga per slot:</p>
          <p className={classes.InputSlot}>IDR {price.toLocaleString()}</p>
        </div>
        <div className={classes.InputAmount}>
          <p className={classes.Label}>Total:</p>
          <p className={classes.InputSlot}>
            <strong>
              IDR {(price * formState.inputs.slot.value).toLocaleString()}
            </strong>
          </p>
        </div>

        <div style={{ width: '100%', textAlign: 'center' }}>
          <Button
            type='button'
            variant='contained'
            color='primary'
            disableElevation
            disabled={!formState.formIsValid}
            style={{ width: '50%', marginTop: '1rem' }}
            onClick={onOpenOrderModal}
          >
            Submit
          </Button>
        </div>
      </form>
    </React.Fragment>
  );

  const onCancelHandler = () => {
    props.resetOrder();
  };

  if (props.isLoading) formContent = <Spinner />;

  return (
    <div className={classes.Container}>
      {' '}
      <Modal show={props.error} onCancel={onCancelHandler}>
        Tidak dapat melakukan Pembelian untuk saat ini
      </Modal>
      <OrderModal
        show={orderModal}
        onCancel={onCloseOrderModal}
        Accept={onSubmitHandler}
      >
        Apakah anda yakin ingin membuat pesananan saat ini?
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
    createOrderFail: () =>
      dispatch({ type: actionTypes.CREATEORDERCANDIDATEFAIL }),
    resetOrder: () => dispatch({ type: actionTypes.ORDERRESET }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CompanyOrderForm));
