import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import * as actionTypes from '../../../../store/actions/actions';
import * as actionCreators from '../../../../store/actions/index';

import Modal from '../../../../shared/UI_Element/Modal';
import LoadingBar from '../../../../shared/UI_Element/Spinner/LoadingBar';

import styles from './Promo.module.scss';

const Promo = (props) => {
  const [activePromo, setActivePromo] = useState(null);
  const [listPromo, setListPromo] = useState([]);
  const [promoIsLoading, setPromoIsLoading] = useState(false);
  const [selectedPromo, setSelectedPromo] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { getPromo, admin } = props;
  useEffect(() => {
    if (admin.token) {
      getPromo(admin.token).then((res) => {
        setActivePromo(res.activePromo);
        setListPromo(res.listPromo);
      });
    }
  }, [getPromo, admin.token]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!selectedPromo) return;
    setPromoIsLoading(true);
    const payload = {
      ...selectedPromo,
      token: admin.token,
    };

    try {
      const res = await props.updatePromo(payload);
      if (res) {
        setActivePromo(res.activePromo);
        setListPromo(res.listPromo);
        setPromoIsLoading(false);
      } else {
        console.log('no res detected');
        setPromoIsLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      setPromoIsLoading(false);
      setSelectedPromo(null);
      return props.updatePromoFail();
    }
    setSelectedPromo(null);
  };

  const optionSelectHandler = (promo) => {
    const promoData = {
      REG: {
        promoName: promo.promoName,
        discount: promo.REG?.discount,
      },
      BC: {
        promoName: promo.promoName,
        discount: promo.BC?.discount,
      },
    };
    setSelectedPromo(promoData);
  };

  let content = <LoadingBar />;

  if (!props.isLoading && activePromo && !promoIsLoading) {
    content = (
      <div className={styles.Container}>
        <h1 className={styles.PromoTitle}>Crossbell Promo </h1>
        <div className={styles.PromoInformation}>
          <div className={styles.PromoOrder}>
            <p className={styles.OrderTitle}>
              <strong>Reguler </strong>
            </p>
            <p className={styles.PromoDetails}>Active Promo: {activePromo.REG?.promoName}</p>
            <p className={styles.PromoDetails}>Discount: {activePromo.REG?.discount}%</p>
          </div>
          <div className={styles.PromoOrder}>
            <p className={styles.OrderTitle}>
              <strong>Bulk Candidate </strong>
            </p>
            <p className={styles.PromoDetails}>Active Promo: {activePromo.BC?.promoName}</p>
            <p className={styles.PromoDetails}>Discount: {activePromo.BC?.discount}%</p>
          </div>
        </div>
        <form className={styles.PromoForm} onSubmit={onSubmitHandler}>
          {listPromo.map((promo, index) => (
            <div key={`${promo.promoName}_${index}`} className={styles.PromoOption}>
              <div>
                <input
                  type='radio'
                  id={promo.promoName}
                  name='LIST_PROMO'
                  value={promo.promoName}
                  onChange={optionSelectHandler.bind(null, promo)}
                />
                <label htmlFor={promo.promoName}>{promo.promoName}</label>
              </div>
              <label htmlFor={promo.promoName}>REG Discount: {promo.REG?.discount || 0}%</label>
              <label htmlFor={promo.promoName}>BC Discount: {promo.BC?.discount || 0}%</label>
            </div>
          ))}
          <button type='submit' className={styles.SubmitButton}>
            Submit
          </button>
        </form>
      </div>
    );
  }

  const onCancelHandler = () => {
    props.resetAdmin();
  };

  return (
    <React.Fragment>
      <Modal show={props.error} onCancel={onCancelHandler}>
        Tidak dapat mengubah activePromo untuk sementara, cobalah beberapa saat lagi{' '}
      </Modal>
      {content}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    admin: state.admin,
    error: state.admin.error,
    isLoading: state.admin.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPromo: (payload) => dispatch(actionCreators.getPromo(payload)),
    updatePromo: (data) => dispatch(actionCreators.updatePromo(data)),
    updatePromoFail: () => dispatch({ type: actionTypes.GETADMINFAIL }),
    resetAdmin: () => dispatch({ type: actionTypes.GETADMIN }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Promo);
