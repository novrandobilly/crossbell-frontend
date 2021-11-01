import React, { Fragment, useState } from 'react';

import EditWhiteIcon from '../../../assets/icons/edit-white.svg';
import Modal from '../../../shared/UI_Element/Modal';
import EditDescription from './Edit/EditDescription';
import { splitParagraph } from '../../../shared/utils/sharedFunctions';

import styles from './Description.module.scss';

const Description = props => {
  const [openDescription, setOpenDescription] = useState(false);
  const openDescriptionHandler = () => setOpenDescription(true);
  const closeDescriptionHandler = () => setOpenDescription(false);

  return (
    <Fragment>
      <Modal
        show={openDescription}
        onCancel={closeDescriptionHandler}
        style={{ top: '18vh', maxWidth: '800px', marginLeft: '-400px', height: '60vh', overflowY: 'auto' }}
        headerText='Deskripsi Diri'>
        <EditDescription onCancel={closeDescriptionHandler} fetchApplicantData={props.fetchApplicantData} />
      </Modal>
      <div className={styles.DescriptionContainer}>
        {props.EditAuthorized && (
          <span className={styles.AddEditButton} onClick={openDescriptionHandler}>
            <img alt='Edit Button' src={EditWhiteIcon} />
          </span>
        )}
        <h1 className={styles.DescriptionHeader}>Description:</h1>
        <div className={styles.DescriptionBody}>{splitParagraph(props.description)}</div>
      </div>
    </Fragment>
  );
};

export default Description;
