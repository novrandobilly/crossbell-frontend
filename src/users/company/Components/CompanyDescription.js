import React from 'react';

import { splitParagraph } from '../../../shared/utils/sharedFunctions';
import styles from './CompanyDescription.module.scss';

const CompanyDescription = props => {
  return (
    <div className={styles.CompanyDescriptionContainer}>
      <h3>Tentang Perusahaan:</h3>
      <div className={styles.CompanyDescription}>{splitParagraph(props.description)}</div>
    </div>
  );
};

export default CompanyDescription;
