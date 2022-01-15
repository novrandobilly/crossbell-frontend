import React from 'react';

import styles from './OrderComponent.module.scss';

const OrderComponent = (props) => {
  return (
    <div className={styles.Container}>
      <div className={styles.OrderCard}>
        <div className={styles.CardHolder}>
          <div>
            <div
              className={`${styles.CardHeader} ${
                props.title === 'Bronze'
                  ? styles.Bronze
                  : props.title === 'Silver'
                  ? styles.Silver
                  : props.title === 'Gold'
                  ? styles.Gold
                  : styles.Platinum
              }`}>
              <p className={styles.Title}>{props.title?.toUpperCase()}</p>
              <div className={styles.Perks}>
                <p className={styles.Price}>Rp {props.price.toLocaleString()}/ slot</p>
                <p className={styles.Slot}>{props.slot}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderComponent;
