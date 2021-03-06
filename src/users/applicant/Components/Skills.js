import React, { useState, Fragment } from 'react';

import Modal from '../../../shared/UI_Element/Modal';
import EditSkills from './Edit/EditSkills';
import SkillsIcon from '../../../assets/icons/skills.svg';
import EditWhiteIcon from '../../../assets/icons/edit-white.svg';
import styles from './Skills.module.scss';

const Skills = ({ skills, EditAuthorized, fetchApplicantData }) => {
  const [openSkillsEdit, setOpenSkillsEdit] = useState(false);

  const openSkillsHandler = () => setOpenSkillsEdit(true);
  const closeSkillsHandler = () => setOpenSkillsEdit(false);

  return (
    <Fragment>
      <Modal
        headerText='Skill & Keterampilan'
        show={openSkillsEdit}
        onCancel={closeSkillsHandler}
        ContainerClass={styles.SkillsModal}>
        <EditSkills fetchApplicantData={fetchApplicantData} onCancel={closeSkillsHandler} />
      </Modal>
      <div className={styles.SkillsListingContainer}>
        {EditAuthorized && (
          <span className={styles.AddEditButton} onClick={openSkillsHandler}>
            <img alt='Edit Button' src={EditWhiteIcon} />
          </span>
        )}
        <h1 className={styles.SkillsHeaderTitle}>
          <img alt='Skill Icon' src={SkillsIcon} />
          Skill & Keterampilan:
        </h1>
        {skills && skills.length > 0 ? (
          <div className={styles.SkillsListing}>
            {skills.map((skill, index) => (
              <p className={styles.Skill} key={`${skill.skillName}_${index}`}>
                &#x27A4; {skill.skillName} - {skill.rate}
              </p>
            ))}
          </div>
        ) : (
          <p className={styles.SkillEmpty}>Belum ada skill.</p>
        )}
      </div>
    </Fragment>
  );
};

export default Skills;
