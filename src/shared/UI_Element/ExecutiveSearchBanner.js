import React from 'react';
import { withRouter } from 'react-router-dom';
import styles from './ExecutiveSearchBanner.module.scss';
import ExecutiveImage from '../../assets/images/ES_Banner_1.jpeg';

const ExecutiveSearchBanner = props => {
  return (
    <div className={styles.BannerContainer}>
      <img
        src={props.imageSource || ExecutiveImage}
        alt='Executive Search'
        onClick={() => props.history.push('/co/order/es')}
      />
    </div>
  );
};

export default withRouter(ExecutiveSearchBanner);
