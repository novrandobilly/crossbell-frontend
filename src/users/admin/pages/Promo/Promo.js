import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useForm } from '../../../../shared/utils/useForm';

import { VALIDATOR_MIN, VALIDATOR_MAX } from '../../../../shared/utils/validator';
import * as actionTypes from '../../../../store/actions/actions';
import * as actionCreators from '../../../../store/actions/index';
import Button from '@material-ui/core/Button';
import Input from '../../../../shared/UI_Element/Input';
import Modal from '../../../../shared/UI_Element/Modal';
import LoadingBar from '../../../../shared/UI_Element/Spinner/LoadingBar';

import classes from './Promo.module.css';

const Promo = props => {
  const [promo, setPromo] = useState();
  const [dummyLoad, setDummyLoad] = useState(false);

  const [formState, onInputHandler] = useForm(
    {
      promoReg: {
        value: '',
        isValid: true,
      },
      promoBC: {
        value: '',
        isValid: true,
      },
    },
    true
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { getPromo } = props;
  useEffect(() => {
    if (props.admin.token) {
      getPromo(props.admin.token).then(res => {
        setPromo(res.promo[0]);
      });
    }
  }, [getPromo, props.admin.token]);

  const onSubmitHandler = async event => {
    event.preventDefault();
    setDummyLoad(true);

    if (!formState.formIsValid) {
      setDummyLoad(false);
      return props.updatePromoFail();
    }

    const orderData = {
      token: props.admin.token,
      promoReg: formState.inputs.promoReg.value,
      promoBC: formState.inputs.promoBC.value,
    };

    try {
      const res = await props.updatePromo(orderData);
      if (res) {
        setPromo(prevData => {
          const tempData = { ...prevData };
          tempData.promoReg = orderData.promoReg;
          tempData.promoBC = orderData.promoBC;
          return tempData;
        });
        console.log(res);
        setDummyLoad(false);
      } else {
        console.log('no res detected');
      }
    } catch (err) {
      console.log(err.message);
      setDummyLoad(false);
      return props.updatePromoFail();
    }
  };

  let Content = <LoadingBar />;

  if (!props.isLoading && promo && !dummyLoad) {
    Content = (
      <div className={classes.Container}>
        <div className={classes.PromoContainer}>
          <p className={classes.PromoTitle}>Promo </p>
          <div className={classes.Border} />

          <p className={classes.OrderTitle}>Promo Reguler </p>
          <p className={classes.ReleasedPromo}>Promo berlaku saat ini: {promo.promoReg}%</p>
          <Input
            inputType='input'
            id='promoReg'
            validatorMethod={[VALIDATOR_MIN(0), VALIDATOR_MAX(100)]}
            onInputHandler={onInputHandler}
            type='number'
            initValue={promo.promoReg}
            initIsValid={true}
            min={0}
            max={100}
            step='1'
            label='Input dalam (%)'
            helperText='mohon masukkan nilai dari 0 - 100'
          />

          <Button variant='contained' disableElevation color='primary' size='small' style={{ marginTop: '16px' }} onClick={onSubmitHandler}>
            Submit
          </Button>

          <div className={classes.Border} />
          <p className={classes.OrderTitle}>Promo Bulk Candidate </p>
          <p className={classes.ReleasedPromo}>Promo berlaku saat ini: {promo.promoBC}%</p>

          <Input
            inputType='input'
            id='promoBC'
            validatorMethod={[VALIDATOR_MIN(0), VALIDATOR_MAX(100)]}
            onInputHandler={onInputHandler}
            type='number'
            initValue={promo.promoBC}
            initIsValid={true}
            min={0}
            max={100}
            step='1'
            label='Input dalam (%)'
            helperText='mohon masukkan nilai dari 0 - 100'
          />

          <Button variant='contained' disableElevation color='primary' size='small' style={{ marginTop: '16px' }} onClick={onSubmitHandler}>
            Submit
          </Button>
        </div>
      </div>
    );
  }

  const onCancelHandler = () => {
    props.resetAdmin();
  };

  return (
    <React.Fragment>
      <Modal show={props.error} onCancel={onCancelHandler}>
        Tidak dapat mengubah promo untuk sementara, cobalah beberapa saat lagi{' '}
      </Modal>
      {Content}
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    admin: state.admin,
    error: state.admin.error,
    isLoading: state.admin.isLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPromo: payload => dispatch(actionCreators.getPromo(payload)),
    updatePromo: data => dispatch(actionCreators.updatePromo(data)),
    updatePromoFail: () => dispatch({ type: actionTypes.GETADMINFAIL }),
    resetAdmin: () => dispatch({ type: actionTypes.GETADMIN }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Promo);
