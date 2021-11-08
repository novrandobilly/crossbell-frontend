import React, { useState, Fragment } from 'react';

import { splitParagraph } from '../../../shared/utils/sharedFunctions';
import EditWhiteIcon from '../../../assets/icons/edit-white.svg';
import Modal from '../../../shared/UI_Element/Modal';
import EditCompanyDescriptions from './EditCompanyDescriptions';
import styles from './CompanyDescription.module.scss';

const CompanyDescription = props => {
  const [openEditDescription, setOpenEditDescription] = useState(false);

  const openEditDescriptionHandler = () => setOpenEditDescription(true);
  const closeEditDescriptionHandler = () => setOpenEditDescription(false);
  return (
    <Fragment>
      <Modal
        show={openEditDescription}
        onCancel={closeEditDescriptionHandler}
        style={{ top: '18vh', maxWidth: '800px', marginLeft: '-400px', height: '40vh', overflowY: 'auto' }}
        headerText='Deskripsi Perusahaan'>
        <EditCompanyDescriptions onCancel={closeEditDescriptionHandler} fetchCompany={props.fetchCompany} />
      </Modal>
      <div className={styles.CompanyDescriptionContainer}>
        <h3>Tentang Perusahaan:</h3>
        <div className={styles.CompanyDescription}>{splitParagraph(props.description)}</div>
        {props.EditAuthorization && (
          <span className={styles.AddEditButton} onClick={openEditDescriptionHandler}>
            <img alt='Edit Button' src={EditWhiteIcon} />
          </span>
        )}
      </div>
    </Fragment>
  );
};

export default CompanyDescription;
