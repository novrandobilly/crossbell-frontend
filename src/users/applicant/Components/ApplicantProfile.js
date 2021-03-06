import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import * as actionCreators from '../../../store/actions';

import Description from './Description.js';
import Skills from './Skills.js';
import WorkingExperiences from './WorkingExperiences';
import Educations from './Educations';
import Organizations from './Organizations';
import Certifications from './Certifications';
import EditBriefInformations from './Edit/EditBriefInformations';
import Modal from '../../../shared/UI_Element/Modal';
import LoadingBar from '../../../shared/UI_Element/Spinner/LoadingBar';
import Subscription from './Subscription';

import BlankProfile from '../../../assets/images/Blank_Profile.png';
import PhoneIcon from '../../../assets/icons/phone.svg';
import AddressIcon from '../../../assets/icons/location.svg';
import EmailIcon from '../../../assets/icons/email.svg';
import MoneyIcon from '../../../assets/icons/money.svg';
import GenderIcon from '../../../assets/icons/gender.svg';
import BirthdayIcon from '../../../assets/icons/birthday-cake.svg';
import EditWhiteIcon from '../../../assets/icons/edit-white.svg';

import styles from './ApplicantProfile.module.scss';

const ApplicantProfile = (props) => {
  const [openEditBrief, setOpenEditBrief] = useState(false);
  const [uploadIsLoading, setUploadIsLoading] = useState(false);
  const [uploadResumeIsLoading, setUploadResumeIsLoading] = useState(false);
  const [autoNotification, setAutoNotification] = useState(false);

  const openAutoNotification = () => setAutoNotification(true);
  const closeAutoNotification = () => setAutoNotification(false);

  const onUploadResumeHandler = async (event) => {
    event.preventDefault();
    setUploadResumeIsLoading(true);
    const resumeFile = event.target.files[0];
    const payload = {
      applicantId: props.auth.userId,
      resume: resumeFile,
      token: props.auth.token,
    };
    try {
      await props.updateResume(payload);
      props.fetchApplicantData();
      setUploadResumeIsLoading(false);
    } catch (err) {
      console.log(err);
      setUploadResumeIsLoading(false);
    }
  };

  const closeEditBriefHandler = () => {
    setOpenEditBrief(false);
  };
  const openEditBriefHandler = () => {
    setOpenEditBrief(true);
  };
  const applicantData = props.data;

  const onUploadHandler = async (e) => {
    setUploadIsLoading(true);
    const elementFile = e.target.files[0];
    const payload = {
      applicantId: props.auth.userId,
      token: props.auth.token,
      picture: elementFile,
    };
    try {
      await props.updateApplicantAvatar(payload);
      props.fetchApplicantData();
      setUploadIsLoading(false);
    } catch (err) {
      console.log(err);
      setUploadIsLoading(false);
    }
  };

  return (
    <div className={styles.ApplicantDetailsContainer}>
      <section className={styles.ApplicantBriefInformation}>
        <Modal
          show={openEditBrief}
          onCancel={closeEditBriefHandler}
          style={{
            top: '12vh',
            maxWidth: '80vw',
            marginLeft: '-40vw',
            // maxWidth: `${maxWidth}px`,
            // marginLeft: `${maxWidth / -2}px`,
            height: '80vh',
            overflowY: 'auto',
          }}
          headerText='Biodata Kandidat'>
          <EditBriefInformations onCancel={closeEditBriefHandler} fetchApplicantData={props.fetchApplicantData} />
        </Modal>

        {/*------------------- Absolute Edit Button -------------------*/}
        {props.auth.userId === applicantData.id && (
          <span className={styles.AddEditButton} onClick={openEditBriefHandler}>
            <img alt='Edit Button' src={EditWhiteIcon} />
          </span>
        )}

        {/* ---------------------------------------------------------- */}
        <label className={styles.ApplicantAvatar} htmlFor='ApplicantAvatar'>
          {uploadIsLoading ? (
            <LoadingBar />
          ) : (
            <Fragment>
              <img alt='Applicant Avatar' src={applicantData.picture ? applicantData.picture.url : BlankProfile} />
              <input
                accept='.jpg, .jpeg, .png'
                name='ApplicantAvatar'
                id='ApplicantAvatar'
                type='file'
                style={{ display: 'none' }}
                onChange={onUploadHandler}
              />
            </Fragment>
          )}
        </label>
        <div className={styles.ApplicantBriefDetails}>
          <h2 className={styles.ApplicantFullName}>
            {applicantData.firstName}&nbsp;{applicantData.lastName}
          </h2>
          <h3 className={styles.ApplicantHeadline}>{applicantData.headline}</h3>
          <div className={styles.ApplicantBiodata}>
            <div className={styles.ApplicantBiodataFirstGroup}>
              <p className={styles.ApplicantPhone}>
                <img alt='Phone Icon' src={PhoneIcon} />
                {applicantData.phone}
              </p>
              <p className={styles.ApplicantEmail}>
                <img alt='Email Icon' src={EmailIcon} />
                {applicantData.email}
              </p>
              <p className={styles.ApplicantAddress}>
                <img alt='Address Icon' src={AddressIcon} />
                {applicantData.address}
              </p>
              <p className={styles.ApplicantSalaryExpectation}>
                <img alt='Money Icon' src={MoneyIcon} />
                {`Rp ${applicantData.salary.toLocaleString()},-`}
              </p>
            </div>

            <div className={styles.ApplicantBiodataSecondGroup}>
              <p className={styles.ApplicantGender}>
                <img alt='Gender Icon' src={GenderIcon} />
                {applicantData.gender === 'male' ? 'Pria' : applicantData.gender === 'female' && 'Wanita'}
              </p>
              <p className={styles.ApplicantGender}>
                <img alt='Birthday Icon' src={BirthdayIcon} />
                {`${moment(applicantData.dateOfBirth).format('DD MMMM YYYY')} (${moment().diff(
                  applicantData.dateOfBirth,
                  'years'
                )} tahun)`}
              </p>
              <p className={styles.ApplicantGender}>
                &#x27A4; {`${applicantData.workShifts ? ' B' : 'Tidak b'}ersedia bekerja dengan sistem shift`}
              </p>
              <p className={styles.ApplicantGender}>
                &#x27A4; {`${applicantData.outOfTown ? ' B' : 'Tidak b'}ersedia ditempatkan di luar kota asal`}
              </p>
            </div>
          </div>

          {props.auth.userId === applicantData.id &&
            (uploadResumeIsLoading ? (
              <LoadingBar />
            ) : (
              <div className={styles.UploadResume}>
                <label className={styles.UploadResumeButton}>
                  <input type='file' name='resume' id='resume' onChange={onUploadResumeHandler} accept='.pdf' />
                  <span className={styles.UploadResumeText}> Upload Resume </span>
                </label>
                {applicantData.resume ? (
                  <a
                    href={applicantData.resume?.url.slice(0, applicantData.resume.url.length - 4) + '.jpg'}
                    className={styles.ResumeLink}
                    target='_blank'
                    rel='noopener noreferrer'>
                    &#x02713; {applicantData.firstName} {applicantData.lastName}'s Resume
                  </a>
                ) : (
                  <span>Klik 'Upload Resume' untuk menambahkan resume</span>
                )}
              </div>
            ))}

          {props.auth.userId === applicantData.id && (
            <Fragment>
              <Modal
                show={autoNotification}
                onCancel={closeAutoNotification}
                style={{ top: '15vh', maxWidth: '60vw', marginLeft: '-30vw', height: '620px', overflowY: 'auto' }}
                headerText='Notifikasi Otomatis'>
                <Subscription fetchApplicantData={() => props.fetchApplicantData()} onCancel={closeAutoNotification} />
              </Modal>
              <div className={styles.AutoNotificationContainer}>
                <p className={styles.AutoNotificationButton} onClick={openAutoNotification}>
                  Notifikasi Otomatis
                </p>
                <p>Notifikasi Otomatis {applicantData.autoRemind.isAutoRemind ? 'aktif' : 'tidak aktif'}</p>
                {/* <p>Lamaran Otomatis {applicantData.autoSend.isAutoSend ? 'aktif' : 'tidak aktif'}</p> */}
              </div>
            </Fragment>
          )}
        </div>
      </section>

      <section className={styles.ApplicantDescription}>
        <Description
          description={applicantData.details}
          EditAuthorized={props.auth.userId === applicantData.id}
          fetchApplicantData={props.fetchApplicantData}
        />
      </section>

      <section className={styles.ApplicantSkills}>
        <Skills
          skills={applicantData.skills}
          EditAuthorized={props.auth.userId === applicantData.id}
          fetchApplicantData={props.fetchApplicantData}
        />
      </section>

      <section className={styles.ApplicantWorkingExperiences}>
        <WorkingExperiences
          experiences={applicantData.experience.sort(
            (a, b) => moment(b.endDate ? b.endDate : new Date()) - moment(a.endDate ? a.endDate : new Date())
          )}
          EditAuthorized={props.auth.userId === applicantData.id}
          fetchApplicantData={props.fetchApplicantData}
        />
      </section>
      <section className={styles.ApplicantEducations}>
        <Educations
          educations={applicantData.education.sort(
            (a, b) => moment(b.endDate ? b.endDate : new Date()) - moment(a.endDate ? a.endDate : new Date())
          )}
          EditAuthorized={props.auth.userId === applicantData.id}
          fetchApplicantData={props.fetchApplicantData}
        />
      </section>
      <section className={styles.ApplicantOrganizationExperiences}>
        <Organizations
          organizations={applicantData.organization.sort(
            (a, b) => moment(b.endDate ? b.endDate : new Date()) - moment(a.endDate ? a.endDate : new Date())
          )}
          EditAuthorized={props.auth.userId === applicantData.id}
          fetchApplicantData={props.fetchApplicantData}
        />
      </section>
      <section className={styles.ApplicantCertifications}>
        <Certifications
          certifications={applicantData.certification.sort(
            (a, b) => moment(b.endDate ? b.endDate : new Date()) - moment(a.endDate ? a.endDate : new Date())
          )}
          EditAuthorized={props.auth.userId === applicantData.id}
          fetchApplicantData={props.fetchApplicantData}
        />
      </section>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    admin: state.admin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateResume: (payload) => dispatch(actionCreators.updateResume(payload)),
    updateApplicantAvatar: (payload) => dispatch(actionCreators.updateApplicantAvatar(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplicantProfile);
