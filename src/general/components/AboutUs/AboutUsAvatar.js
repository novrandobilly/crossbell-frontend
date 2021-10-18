import React from 'react';

import styles from './AboutUsAvatar.module.scss';

const AboutUsAvatar = ({ name, title, description, imageSrc }) => {
  return (
    <div className={styles.TeamMemberCard}>
      <div className={styles.TeamMemberAvatar}>
        <img alt={`${name} Avatar`} src={imageSrc} />
      </div>
      <h2>{name}</h2>
      <h3>{title}</h3>
      {description}
    </div>
  );
};

export default AboutUsAvatar;
