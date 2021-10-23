import React from 'react';
import moment from 'moment';

import EducationsIcon from '../../../assets/icons/education.svg';
import styles from './Educations.module.scss';

const Educations = ({ educations }) => {
  const splitParagraph = eduParagraph => {
    let paragraphArray = eduParagraph.split('\n').filter(edu => edu);
    return paragraphArray.map((paragraph, index) => <p key={`paragraph_${index}`}>{paragraph}</p>);
  };
  return (
    <div className={styles.EducationsContainer}>
      <h1 className={styles.EducationsHeaderTitle}>
        <span className={styles.EducationsIcon}>
          <img alt='Educations Icon' src={EducationsIcon} />
        </span>
        Pendidikan
      </h1>

      {educations && educations.length > 0 ? (
        educations.map((edu, index) => (
          <article className={styles.EducationsItem} key={`${edu.major}_${index}`}>
            <h3 className={styles.EducationPeriod}>
              &#x27A4; {moment(edu.startDate).format('MMMM YYYY')} -{' '}
              {edu.endDate ? moment(edu.endDate).format('MMMM YYYY') : 'Sekarang'}
            </h3>
            <h4 className={styles.EducationTitle}>
              {edu.major} - {edu.school}, {edu.location}
            </h4>
            {splitParagraph(edu.description)}
          </article>
        ))
      ) : (
        <p className={styles.EducationsEmpty}>Belum ada pendidikan.</p>
      )}
    </div>
  );
};

export default Educations;
