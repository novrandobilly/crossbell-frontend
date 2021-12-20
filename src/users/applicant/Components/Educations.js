import React, { Fragment, useState } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions';

import Modal from '../../../shared/UI_Element/Modal';
import AddEducation from './Add/AddEducation';
import EducationsIcon from '../../../assets/icons/education.svg';
import AddWhiteIcon from '../../../assets/icons/add-white.svg';
import EditWhiteIcon from '../../../assets/icons/edit-white.svg';
import DeleteIcon from '../../../assets/icons/x-mark.svg';
import EditEducation from './Edit/EditEducation';
import LoadingBar from '../../../shared/UI_Element/Spinner/LoadingBar';
import { splitParagraph } from '../../../shared/utils/sharedFunctions';

import styles from './Educations.module.scss';

const Educations = (props) => {
  const [openAddEducation, setOpenAddEducation] = useState(false);
  const [openEditEducation, setOpenEditEducation] = useState(false);
  const [openDeleteEducation, setOpenDeleteEducation] = useState(false);
  const [educationId, setEducationId] = useState(null);

  const onOpenAddEducationHandler = () => setOpenAddEducation(true);
  const onCloseAddEducationHandler = () => setOpenAddEducation(false);

  const onOpenEditEducationHandler = (event, educationId) => {
    setEducationId(educationId);
    setOpenEditEducation(true);
  };
  const onCloseEditEducationHandler = () => setOpenEditEducation(false);

  const onOpenDeleteEducationHandler = (event, educationId) => {
    setEducationId(educationId);
    setOpenDeleteEducation(true);
  };
  const onCloseDeleteEducationHandler = () => setOpenDeleteEducation(false);
  const onDeleteHandler = async (event) => {
    const payload = {
      applicantId: props.auth.userId,
      token: props.auth.token,
      itemCategories: 'education',
      itemId: educationId,
    };
    try {
      await props.deleteItem(payload);
      await props.fetchApplicantData();
      setOpenDeleteEducation(false);
    } catch (err) {
      console.log(err);
      setOpenDeleteEducation(false);
    }
  };

  return (
    <Fragment>
      <Modal
        show={openAddEducation}
        onCancel={onCloseAddEducationHandler}
        ContainerClass={styles.EducationModal}
        // style={{ top: '18vh', maxWidth: '600px', marginLeft: '-300px', height: '60vh', overflowY: 'auto' }}
        headerText='Tambah Pendidikan'>
        <AddEducation onCancel={onCloseAddEducationHandler} fetchApplicantData={props.fetchApplicantData} />
      </Modal>
      <Modal
        show={openEditEducation}
        onCancel={onCloseEditEducationHandler}
        ContainerClass={styles.EducationModal}
        // style={{ top: '18vh', maxWidth: '600px', marginLeft: '-300px', height: '60vh', overflowY: 'auto' }}
        headerText='Edit Pengalaman Kerja'>
        <EditEducation
          onCancel={onCloseEditEducationHandler}
          fetchApplicantData={props.fetchApplicantData}
          educationId={educationId}
        />
      </Modal>
      <Modal
        show={openDeleteEducation}
        onCancel={onCloseDeleteEducationHandler}
        style={{ top: '25vh', maxWidth: '400px', marginLeft: '-200px', height: '25vh', overflowY: 'auto' }}>
        <h3>Hapus Pekerjaan?</h3>
        {props.applicant.isLoading ? (
          <LoadingBar />
        ) : (
          <div className={styles.DeleteButtonContainer}>
            <button type='button' onClick={onCloseDeleteEducationHandler}>
              Tidak
            </button>
            <button type='button' onClick={onDeleteHandler}>
              Hapus
            </button>
          </div>
        )}
      </Modal>
      <div className={styles.EducationsContainer}>
        <h1 className={styles.EducationsHeaderTitle}>
          <span className={styles.EducationsIcon}>
            <img alt='Educations Icon' src={EducationsIcon} />
          </span>
          Pendidikan
        </h1>

        {props.educations && props.educations.length > 0 ? (
          props.educations.map((edu, index) => (
            <article className={styles.EducationsItem} key={`${edu.major}_${index}`}>
              <h3 className={styles.EducationPeriod}>
                &#x27A4; {moment(edu.startDate).format('MMMM YYYY')} -{' '}
                {edu.endDate ? moment(edu.endDate).format('MMMM YYYY') : 'Sekarang'}
              </h3>
              <h4 className={styles.EducationTitle}>
                {edu.major} - {edu.school}, {edu.location}
              </h4>
              <h4 className={styles.EducationTitle}>Score/IPK: {edu.IPK}</h4>
              {splitParagraph(edu.description)}
              {props.EditAuthorized && (
                <Fragment>
                  <span
                    className={`${styles.AddEditButton} ${styles.EditEducationItem}`}
                    onClick={(event) => onOpenEditEducationHandler(event, edu.id)}>
                    <img alt='Edit Button' src={EditWhiteIcon} />
                  </span>

                  <span
                    className={`${styles.AddEditButton} ${styles.DeleteItem}`}
                    onClick={(event) => onOpenDeleteEducationHandler(event, edu.id)}>
                    <img alt='Delete Button' src={DeleteIcon} />
                  </span>
                </Fragment>
              )}
            </article>
          ))
        ) : (
          <p className={styles.EducationsEmpty}>Belum ada pendidikan.</p>
        )}
        {props.EditAuthorized && (
          <span className={styles.AddEditButton} onClick={onOpenAddEducationHandler}>
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

export default connect(mapStateToProps, mapDispatchToProps)(Educations);
