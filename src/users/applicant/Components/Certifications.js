import React from 'react';
import moment from 'moment';

import CertificationsIcon from '../../../assets/icons/certificate.svg';
import styles from './Certifications.module.scss';

const Certifications = ({ certifications }) => {
  const splitParagraph = expParagraph => {
    let paragraphArray = expParagraph.split('\n').filter(exp => exp);
    return paragraphArray.map((paragraph, index) => <p key={`paragraph_${index}`}>{paragraph}</p>);
  };
  return (
    <div className={styles.CertificationsContainer}>
      <h1 className={styles.CertificationsHeaderTitle}>
        <span className={styles.CertificationsIcon}>
          <img alt='Certifications Icon' src={CertificationsIcon} />
        </span>
        Sertifikasi
      </h1>

      {certifications && certifications.length > 0 ? (
        certifications.map((cert, index) => (
          <article className={styles.CertificationsItem} key={`${cert.title}_${index}`}>
            <h3 className={styles.CertificationPeriod}>
              &#x27A4; {moment(cert.startDate).format('MMMM YYYY')} -{' '}
              {cert.endDate ? moment(cert.endDate).format('MMMM YYYY') : 'Berlaku selamanya'}
            </h3>
            <h4 className={styles.CertificationTitle}>{cert.title}</h4>
            <h5 className={styles.CertificationOrganization}>Issued by: {cert.organization}</h5>
            {splitParagraph(cert.description)}
          </article>
        ))
      ) : (
        <p className={styles.CertificationsEmpty}>Belum ada pengalaman.</p>
      )}
    </div>
  );
};

export default Certifications;
