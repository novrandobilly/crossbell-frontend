import React, { useState, Fragment } from 'react';

import Modal from '../../../shared/UI_Element/Modal';
import EditPIC from './EditPIC';
import EditWhiteIcon from '../../../assets/icons/edit-white.svg';
import styles from './PersonInCharge.module.scss';

const PersonInCharge = (props) => {
  const [openEditPIC, setOpenEditPIC] = useState(false);

  const openEditPICHandler = () => setOpenEditPIC(true);
  const closeEditPICHandler = () => setOpenEditPIC(false);

  return (
    <Fragment>
      <Modal
        show={openEditPIC}
        onCancel={closeEditPICHandler}
        style={{ top: '18vh', maxWidth: '500px', marginLeft: '-250px', height: '45vh', overflowY: 'auto' }}
        headerText='Edit Person In Charge'>
        <EditPIC onCancel={closeEditPICHandler} fetchCompany={props.fetchCompany} />
      </Modal>
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
          <p>Telepon/Whatsapp: {props.phone}</p>
          <p>Telepon Kantor: {props.officePhone}</p>
          <p>NPWP Perusahaan: {props.npwp}</p>
        </div>
        {props.EditAuthorization && (
          <span className={styles.AddEditButton} onClick={openEditPICHandler}>
            <img alt='Edit Button' src={EditWhiteIcon} />
          </span>
        )}
      </div>
    </Fragment>
  );
};

export default PersonInCharge;
