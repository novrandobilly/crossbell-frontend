import React from 'react';

import styles from './PersonInCharge.module.scss';

const PersonInCharge = props => {
  return (
    <div className={styles.PersonInChargeContainer}>
      <header>
        <h3 className={styles.PICTitle}>Person In Charge </h3>
        <p>
          <em>(Hanya untuk admin)</em>{' '}
        </p>
      </header>
      <div className={styles.PICInfo}>
        <p>Nama: {props.name}</p>
        <p>Posisi: {props.jobTitle} </p>
        <p>Email: {props.email}</p>
        <p>Telefon: {props.phone}</p>
        <p>Kantor: {props.officePhone}</p>
        <p>NPWP Perusahaan: {props.npwp}</p>
      </div>
    </div>
  );
};

export default PersonInCharge;
