import React from 'react';

import styles from './AboutUs.module.scss';

const AboutUs = () => {
  return (
    <div className={styles.AboutUsContainer}>
      <section className={styles.AboutCrossbell}></section>
      <section className={styles.AboutCrossbellTeam}></section>
      <section className={styles.AboutCrossbellContact}></section>
    </div>
  );
};

export default AboutUs;
