import React, { Fragment } from 'react';
import styles from './HeaderBanner.module.scss';
import { connect } from 'react-redux';

const HeaderBanner = (props) => {
  return (
    <section className={styles.HeaderBanner}>
      <div className={styles.HeaderText}>
        {props.auth.isCompany ? (
          <Fragment>
            <h1>Kandidat Profesional</h1>
            <h2>Sudah di ujung jari</h2>
          </Fragment>
        ) : (
          <Fragment>
            <h1>Pekerjaan Impianmu</h1>
            <h2>Sudah di depan mata</h2>
          </Fragment>
        )}
      </div>
      <div className={styles.HeaderImage}>
        <img alt='Header Banner' src={props.imageSource} />
      </div>
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(HeaderBanner);
