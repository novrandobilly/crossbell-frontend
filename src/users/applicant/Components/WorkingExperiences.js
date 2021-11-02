import React, { useState, Fragment } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions';

import WorkingExperiencesIcon from '../../../assets/icons/briefcase.svg';
import AddWhiteIcon from '../../../assets/icons/add-white.svg';
import EditWhiteIcon from '../../../assets/icons/edit-white.svg';
import DeleteIcon from '../../../assets/icons/x-mark.svg';
import Modal from '../../../shared/UI_Element/Modal';
import AddWorkingExperience from './Add/AddWorkingExperience';
import EditWorkingExperience from './Edit/EditWorkingExperience';
import LoadingBar from '../../../shared/UI_Element/Spinner/LoadingBar';
import { splitParagraph } from '../../../shared/utils/sharedFunctions';

import styles from './WorkingExperiences.module.scss';

const WorkingExperiences = props => {
  const [openAddWorkingExp, setOpenAddWorkingExp] = useState(false);
  const [openEditWorkingExp, setOpenEditWorkingExp] = useState(false);
  const [openDeleteExperience, setOpenDeleteExperience] = useState(false);
  const [workingExperienceId, setWorkingExperienceId] = useState(null);

  const openAddWorkingExpHandler = () => setOpenAddWorkingExp(true);
  const closeAddWorkingExpHandler = () => setOpenAddWorkingExp(false);
  const openEditWorkingExpHandler = (event, experienceId) => {
    setWorkingExperienceId(experienceId);
    setOpenEditWorkingExp(true);
  };
  const closeEditWorkingExpHandler = () => setOpenEditWorkingExp(false);
  const openDeleteHandler = (event, experienceId) => {
    setWorkingExperienceId(experienceId);
    setOpenDeleteExperience(true);
  };
  const onCloseDeleteExpHandler = () => setOpenDeleteExperience(false);

  const onDeleteHandler = async event => {
    const payload = {
      applicantId: props.auth.userId,
      token: props.auth.token,
      itemCategories: 'experience',
      itemId: workingExperienceId,
    };
    try {
      await props.deleteItem(payload);
      await props.fetchApplicantData();
      setOpenDeleteExperience(false);
    } catch (err) {
      console.log(err);
      setOpenDeleteExperience(false);
    }
  };

  return (
    <Fragment>
      <Modal
        show={openAddWorkingExp}
        onCancel={closeAddWorkingExpHandler}
        style={{ top: '18vh', maxWidth: '600px', marginLeft: '-300px', height: '60vh', overflowY: 'auto' }}
        headerText='Tambah Pengalaman Kerja'>
        <AddWorkingExperience onCancel={closeAddWorkingExpHandler} fetchApplicantData={props.fetchApplicantData} />
      </Modal>
      <Modal
        show={openEditWorkingExp}
        onCancel={closeEditWorkingExpHandler}
        style={{ top: '18vh', maxWidth: '600px', marginLeft: '-300px', height: '60vh', overflowY: 'auto' }}
        headerText='Edit Pengalaman Kerja'>
        <EditWorkingExperience
          onCancel={closeEditWorkingExpHandler}
          fetchApplicantData={props.fetchApplicantData}
          workingExperienceId={workingExperienceId}
        />
      </Modal>
      <Modal
        show={openDeleteExperience}
        onCancel={onCloseDeleteExpHandler}
        style={{ top: '25vh', maxWidth: '400px', marginLeft: '-200px', height: '25vh', overflowY: 'auto' }}>
        <h3>Hapus Pekerjaan?</h3>
        {props.applicant.isLoading ? (
          <LoadingBar />
        ) : (
          <div className={styles.DeleteButtonContainer}>
            <button type='button' onClick={onCloseDeleteExpHandler}>
              Tidak
            </button>
            <button type='button' onClick={onDeleteHandler}>
              Hapus
            </button>
          </div>
        )}
      </Modal>
      <div className={styles.WorkingExperiencesContainer}>
        <h1 className={styles.WorkingExperiencesHeaderTitle}>
          <span className={styles.WorkingExperiencesIcon}>
            <img alt='Working Experience Icon' src={WorkingExperiencesIcon} />
          </span>
          Pengalaman Kerja
        </h1>

        {props.experiences && props.experiences.length > 0 ? (
          props.experiences.map((exp, index) => (
            <article className={styles.WorkingExperiencesItem} key={`${exp.prevTitle}_${index}`}>
              <h3 className={styles.ExperiencePeriod}>
                &#x27A4; {moment(exp.startDate).format('MMMM YYYY')} -{' '}
                {exp.endDate ? moment(exp.endDate).format('MMMM YYYY') : 'Sekarang'}
              </h3>
              <h4 className={styles.ExperienceTitle}>
                {exp.prevTitle} - {exp.prevCompany}
              </h4>
              {splitParagraph(exp.description)}
              {props.EditAuthorized && (
                <Fragment>
                  <span
                    className={`${styles.AddEditButton} ${styles.EditWorkingExpItem}`}
                    onClick={event => openEditWorkingExpHandler(event, exp.id)}>
                    <img alt='Edit Button' src={EditWhiteIcon} />
                  </span>

                  <span
                    className={`${styles.AddEditButton} ${styles.DeleteItem}`}
                    onClick={event => openDeleteHandler(event, exp.id)}>
                    <img alt='Delete Button' src={DeleteIcon} />
                  </span>
                </Fragment>
              )}
            </article>
          ))
        ) : (
          <article className={styles.WorkingExperiencesItem}>
            <p className={styles.WorkingExperiencesEmpty}>Belum ada pengalaman.</p>
          </article>
        )}
        {props.EditAuthorized && (
          <span className={styles.AddEditButton} onClick={openAddWorkingExpHandler}>
            <img alt='Add Button' src={AddWhiteIcon} />
          </span>
        )}
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    applicant: state.applicant,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteItem: payload => dispatch(actionCreators.deleteItem(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkingExperiences);
