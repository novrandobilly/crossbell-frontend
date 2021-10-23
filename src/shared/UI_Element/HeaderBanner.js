import React from 'react';
import styles from './HeaderBanner.module.scss';

const HeaderBanner = props => {
  return (
    <section className={styles.HeaderBanner}>
      <div className={styles.HeaderText}>
        <h1>Pekerjaan Impianmu</h1>
        <h2>Sudah di depan mata</h2>
      </div>
      <div className={styles.HeaderImage}>
        <img alt='Header Banner' src={props.imageSource} />
      </div>
    </section>
  );
};

export default HeaderBanner;
