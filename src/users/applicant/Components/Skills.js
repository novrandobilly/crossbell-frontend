import React from 'react';
import SkillsIcon from '../../../assets/icons/skills.svg';

import styles from './Skills.module.scss';

const Skills = ({ skills }) => {
  return (
    <div className={styles.SkillsListingContainer}>
      <h1 className={styles.SkillsHeaderTitle}>
        <img alt='Skill Icon' src={SkillsIcon} />
        Skill & Keterampilan:
      </h1>
      <div className={styles.SkillsListing}>
        {skills && skills.length > 0 ? (
          skills.map((skill, index) => (
            <p className={styles.Skill} key={`${skill.skillName}_${index}`}>
              &#x27A4; {skill.skillName} - {skill.rate}/5
            </p>
          ))
        ) : (
          <p className={styles.SkillEmpty}>Belum ada skill.</p>
        )}
      </div>
    </div>
  );
};

export default Skills;
