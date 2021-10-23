import React from 'react';

import styles from './Description.module.scss';

const Description = props => {
  return (
    <div className={styles.DescriptionContainer}>
      <h1 className={styles.DescriptionHeader}>Description:</h1>
      <p className={styles.DescriptionBody}>{props.description}</p>
    </div>
  );
};

export default Description;
