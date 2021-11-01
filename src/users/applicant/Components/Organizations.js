import React from 'react';
import moment from 'moment';
import OrganizationsIcon from '../../../assets/icons/organization.svg';
import { splitParagraph } from '../../../shared/utils/sharedFunctions';

import styles from './Organizations.module.scss';

const Organizations = ({ organizations }) => {
  return (
    <div className={styles.OrganizationsContainer}>
      <h1 className={styles.OrganizationsHeaderTitle}>
        <span className={styles.OrganizationsIcon}>
          <img alt='Working Organization Icon' src={OrganizationsIcon} />
        </span>
        Pengalaman Organisasi
      </h1>

      {organizations && organizations.length > 0 ? (
        organizations.map((org, index) => (
          <article className={styles.OrganizationsItem} key={`${org.prevTitle}_${index}`}>
            <h3 className={styles.OrganizationPeriod}>
              &#x27A4; {moment(org.startDate).format('MMMM YYYY')} -{' '}
              {org.endDate ? moment(org.endDate).format('MMMM YYYY') : 'Sekarang'}
            </h3>
            <h4 className={styles.OrganizationTitle}>{org.organization}</h4>
            {splitParagraph(org.description)}
          </article>
        ))
      ) : (
        <p className={styles.OrganizationsEmpty}>Belum ada pengalaman organisasi.</p>
      )}
    </div>
  );
};

export default Organizations;
