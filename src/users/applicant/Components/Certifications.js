import React, { useState, Fragment } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions';
import Modal from '../../../shared/UI_Element/Modal';
import AddCertification from './Add/AddCertification';
import EditCertification from './Edit/EditCertification';
import LoadingBar from '../../../shared/UI_Element/Spinner/LoadingBar';

import CertificationsIcon from '../../../assets/icons/certificate.svg';
import AddWhiteIcon from '../../../assets/icons/add-white.svg';
import EditWhiteIcon from '../../../assets/icons/edit-white.svg';
import DeleteIcon from '../../../assets/icons/x-mark.svg';
import { splitParagraph } from '../../../shared/utils/sharedFunctions';
import styles from './Certifications.module.scss';

const Certifications = (props) => {
  const [openAddCertification, setOpenAddCertification] = useState(false);
  const [openEditCertification, setOpenEditCertification] = useState(false);
  const [openDeleteCertification, setOpenDeleteCertification] = useState(false);
  const [certificationId, setCertificationId] = useState();

  const onOpenAddCertificationHandler = () => setOpenAddCertification(true);
  const onCloseAddCertificationHandler = () => setOpenAddCertification(false);

  const onOpenEditCertificationHandler = (event, certificationId) => {
    setCertificationId(certificationId);
    setOpenEditCertification(true);
  };
  const onCloseEditCertificationHandler = () => setOpenEditCertification(false);

  const onOpenDeleteCertificationHandler = (event, certificationId) => {
    setCertificationId(certificationId);
    setOpenDeleteCertification(true);
  };
  const onCloseDeleteCertificationHandler = () => setOpenDeleteCertification(false);

  const onDeleteHandler = async (event) => {
    const payload = {
      applicantId: props.auth.userId,
      token: props.auth.token,
      itemCategories: 'certification',
      itemId: certificationId,
    };
    try {
      await props.deleteItem(payload);
      await props.fetchApplicantData();
      setOpenDeleteCertification(false);
    } catch (err) {
      console.log(err);
      setOpenDeleteCertification(false);
    }
  };

  return (
    <Fragment>
      <Modal
        show={openAddCertification}
        onCancel={onCloseAddCertificationHandler}
        ContainerClass={styles.CertificationModal}
        // style={{ top: '18vh', maxWidth: '600px', marginLeft: '-300px', height: '60vh', overflowY: 'auto' }}
        headerText='Tambah Sertifikasi'>
        <AddCertification onCancel={onCloseAddCertificationHandler} fetchApplicantData={props.fetchApplicantData} />
      </Modal>
      <Modal
        show={openEditCertification}
        onCancel={onCloseEditCertificationHandler}
        ContainerClass={styles.CertificationModal}
        // style={{ top: '18vh', maxWidth: '600px', marginLeft: '-300px', height: '60vh', overflowY: 'auto' }}
        headerText='Edit Organisasi'>
        <EditCertification
          onCancel={onCloseEditCertificationHandler}
          fetchApplicantData={props.fetchApplicantData}
          certificationId={certificationId}
        />
      </Modal>
      <Modal
        show={openDeleteCertification}
        onCancel={onCloseDeleteCertificationHandler}
        style={{ top: '25vh', maxWidth: '400px', marginLeft: '-200px', height: '25vh', overflowY: 'auto' }}>
        <h3>Hapus Pekerjaan?</h3>
        {props.applicant.isLoading ? (
          <LoadingBar />
        ) : (
          <div className={styles.DeleteButtonContainer}>
            <button type='button' onClick={onCloseDeleteCertificationHandler}>
              Tidak
            </button>
            <button type='button' onClick={onDeleteHandler}>
              Hapus
            </button>
          </div>
        )}
      </Modal>
      <div className={styles.CertificationsContainer}>
        <h1 className={styles.CertificationsHeaderTitle}>
          <span className={styles.CertificationsIcon}>
            <img alt='Certifications Icon' src={CertificationsIcon} />
          </span>
          Sertifikasi
        </h1>

        {props.certifications && props.certifications.length > 0 ? (
          props.certifications.map((cert, index) => (
            <article className={styles.CertificationsItem} key={`${cert.title}_${index}`}>
              <h3 className={styles.CertificationPeriod}>
                &#x27A4; {moment(cert.startDate).format('MMMM YYYY')} -{' '}
                {cert.endDate ? moment(cert.endDate).format('MMMM YYYY') : 'Berlaku selamanya'}
              </h3>
              <h4 className={styles.CertificationTitle}>{cert.title}</h4>
              <h5 className={styles.CertificationOrganization}>Issued by: {cert.organization}</h5>
              {splitParagraph(cert.description)}
              {props.EditAuthorized && (
                <Fragment>
                  <span
                    className={`${styles.AddEditButton} ${styles.EditCertificationItem}`}
                    onClick={(event) => onOpenEditCertificationHandler(event, cert.id)}>
                    <img alt='Edit Button' src={EditWhiteIcon} />
                  </span>

                  <span
                    className={`${styles.AddEditButton} ${styles.DeleteItem}`}
                    onClick={(event) => onOpenDeleteCertificationHandler(event, cert.id)}>
                    <img alt='Delete Button' src={DeleteIcon} />
                  </span>
                </Fragment>
              )}
            </article>
          ))
        ) : (
          <p className={styles.CertificationsEmpty}>Belum ada sertifikasi.</p>
        )}
        {props.EditAuthorized && (
          <span className={styles.AddEditButton} onClick={onOpenAddCertificationHandler}>
            <img alt='Add Button' src={AddWhiteIcon} />
          </span>
        )}
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    applicant: state.applicant,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteItem: (payload) => dispatch(actionCreators.deleteItem(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Certifications);
