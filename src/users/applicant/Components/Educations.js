import React, { Fragment, useState } from 'react';
import moment from 'moment';

import Modal from '../../../shared/UI_Element/Modal';
import AddEducation from './Add/AddEducation';
import EducationsIcon from '../../../assets/icons/education.svg';
import AddWhiteIcon from '../../../assets/icons/add-white.svg';

import styles from './Educations.module.scss';

const Educations = props => {
  const [openAddEducation, setOpenAddEducation] = useState(false);

  const onOpenAddEducationHandler = () => setOpenAddEducation(true);
  const onCloseAddEducationHandler = () => setOpenAddEducation(false);

  const splitParagraph = eduParagraph => {
    let paragraphArray = eduParagraph.split('\n').filter(edu => edu);
    return paragraphArray.map((paragraph, index) => <p key={`paragraph_${index}`}>{paragraph}</p>);
  };
  return (
    <Fragment>
      <Modal
        show={openAddEducation}
        onCancel={onCloseAddEducationHandler}
        style={{ top: '18vh', maxWidth: '600px', marginLeft: '-300px', height: '60vh', overflowY: 'auto' }}
        headerText='Tambah Pendidikan'>
        <AddEducation onCancel={onCloseAddEducationHandler} fetchApplicantData={props.fetchApplicantData} />
      </Modal>
      <div className={styles.EducationsContainer}>
        <h1 className={styles.EducationsHeaderTitle}>
          <span className={styles.EducationsIcon}>
            <img alt='Educations Icon' src={EducationsIcon} />
          </span>
          Pendidikan
        </h1>

        {props.educations && props.educations.length > 0 ? (
          props.educations.map((edu, index) => (
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
        {props.EditAuthorized && (
          <span className={styles.AddEditButton} onClick={onOpenAddEducationHandler}>
            <img alt='Add Button' src={AddWhiteIcon} />
          </span>
        )}
      </div>
    </Fragment>
  );
};

export default Educations;
