import React from 'react';
import moment from 'moment';
import WorkingExperiencesIcon from '../../../assets/icons/briefcase.svg';

import styles from './WorkingExperiences.module.scss';

const WorkingExperiences = ({ experiences }) => {
  const splitParagraph = expParagraph => {
    let paragraphArray = expParagraph.split('\n').filter(exp => exp);
    return paragraphArray.map((paragraph, index) => <p key={`paragraph_${index}`}>{paragraph}</p>);
  };

  return (
    <div className={styles.WorkingExperiencesContainer}>
      <h1 className={styles.WorkingExperiencesHeaderTitle}>
        <span className={styles.WorkingExperiencesIcon}>
          <img alt='Working Experience Icon' src={WorkingExperiencesIcon} />
        </span>
        Pengalaman Kerja
      </h1>

      {experiences && experiences.length > 0 ? (
        experiences.map((exp, index) => (
          <article className={styles.WorkingExperiencesItem} key={`${exp.prevTitle}_${index}`}>
            <h3 className={styles.ExperiencePeriod}>
              &#x27A4; {moment(exp.startDate).format('MMMM YYYY')} -{' '}
              {exp.endDate ? moment(exp.endDate).format('MMMM YYYY') : 'Sekarang'}
            </h3>
            <h4 className={styles.ExperienceTitle}>
              {exp.prevTitle} - {exp.prevCompany}
            </h4>
            {splitParagraph(exp.description)}
          </article>
        ))
      ) : (
        <p className={styles.WorkingExperiencesEmpty}>Belum ada pengalaman.</p>
      )}
    </div>
  );
};

export default WorkingExperiences;
