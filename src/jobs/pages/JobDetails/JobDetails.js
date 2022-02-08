import React, { Fragment, useEffect, useState, useContext } from 'react';
import { useParams, Link, withRouter } from 'react-router-dom';
import moment from 'moment';
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions';
import { splitParagraph, thousandSeparator } from '../../../shared/utils/sharedFunctions';
import { LoginContext } from '../../../store/LoginContext';

import Modal from '../../../shared/UI_Element/Modal';
import BlankCompany from '../../../assets/images/Company.png';
import LoadingBar from '../../../shared/UI_Element/Spinner/LoadingBar';

import styles from './JobDetails.module.scss';

const JobDetails = (props) => {
  const { jobsid } = useParams();
  const [loadedJob, setLoadedJob] = useState(null);
  const [applyConfirm, setApplyConfirm] = useState(false);
  const loginCtx = useContext(LoginContext);

  const onOpenApplyConfirmHandler = () => setApplyConfirm(true);
  const onCloseApplyConfirmHandler = () => setApplyConfirm(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { getOneJob } = props;
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await getOneJob(jobsid);
        setLoadedJob(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchJob();
  }, [getOneJob, jobsid, props.auth.token, props.admin.token]);

  const onApplyHandler = async (event) => {
    event.preventDefault();
    const payload = {
      token: props.auth.token,
      userId: props.auth.userId,
      jobId: jobsid,
    };
    try {
      await props.applyJob(payload);
    } catch (err) {
      console.log(err);
      return props.createJobFail();
    }
  };

  const profileCompletionHandler = () => {
    onCloseApplyConfirmHandler();
    props.history.push(`/ap/${props.auth.userId}/profile`);
  };

  // const onReleaseHandler = async event => {
  //   event.preventDefault();

  //   const jobData = {
  //     jobId: jobsid,
  //     jobTitle: loadedJob.jobTitle,
  //     isHidden: loadedJob.isHidden,
  //     placementLocation: loadedJob.placementLocation,
  //     jobDescriptions: loadedJob.jobDescriptions,
  //     jobExperience: loadedJob.jobExperience,
  //     educationalStage: loadedJob.educationalStage,
  //     specialRequirement: loadedJob.specialRequirement,
  //     emailRecipient: loadedJob.emailRecipient,
  //     rangeAge: loadedJob.rangeAge,
  //     employment: loadedJob.employment,
  //     benefit: loadedJob.benefit,
  //     salary: loadedJob.salary,
  //     slot: loadedJob.slot,
  //     fieldOfWork: loadedJob.fieldOfWork,
  //   };
  //   const authData = {
  //     userId: props.auth.userId,
  //     token: props.auth.token,
  //   };

  //   try {
  //     await props.releaseJob(jobData, authData);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  let jobDetails = <LoadingBar />;
  if (loadedJob) {
    jobDetails = (
      <div className={styles.JobDetailsContainer}>
        <div className={styles.JobContainer}>
          <div className={styles.HeaderContainer}>
            <div className={styles.LogoContainer}>
              {loadedJob.companyId.logo && !loadedJob.isHidden ? (
                <img alt='Company Logo' src={`${loadedJob.companyId.logo.url}`} className={styles.Logo} />
              ) : (
                <div className={styles.Logo} style={{ backgroundImage: `url(${BlankCompany})` }} />
              )}
            </div>

            <div className={styles.JobMetaData}>
              <div className={styles.JobHeader}>
                <p className={styles.JobTitle}>{loadedJob.jobTitle} </p>
                <p className={styles.TextDate}>Posted {moment().diff(moment(loadedJob.releasedAt), 'days')} days ago</p>
              </div>

              <div className={styles.MetaData}>
                {loadedJob.isHidden ? (
                  <p className={`${styles.CompanyName} ${styles.MetaDataText}`}>
                    <em>Nama perusahaan dirahasiakan</em>
                  </p>
                ) : (
                  <Link to={`/co/${loadedJob.companyId.id}/profile`}>
                    <p className={`${styles.CompanyName} ${styles.MetaDataText}`}>
                      <em>{loadedJob.companyId.companyName}</em>
                    </p>
                  </Link>
                )}

                <p className={styles.MetaDataText}>
                  Gaji:
                  <strong>
                    {' '}
                    {loadedJob.salary ? `Rp ${thousandSeparator(loadedJob.salary)},-` : 'dirahasiakan oleh perusahaan'}
                  </strong>
                </p>
                <p className={styles.MetaDataText}>
                  Penempatan: <strong> {loadedJob.placementLocation}</strong>
                </p>

                {(props.auth.isCompany || props.admin.isAdmin) && (
                  <p className={styles.MetaDataText}>
                    Email: <strong>{loadedJob.emailRecipient}</strong> (Hanya untuk admin)
                  </p>
                )}
              </div>

              <div className={styles.ActionButtonContainer}>
                <p className={styles.TextDateMobile}>
                  Posted {moment().diff(moment(loadedJob.releasedAt), 'days')} days ago
                </p>
                <div className={styles.EditContainer}>
                  {props.auth?.userId === loadedJob.companyId.id && (
                    <Link to={`/jobs/${loadedJob.id}/edit`}>
                      <button className={styles.EditButton}>
                        <span>Edit</span>
                      </button>
                    </Link>
                  )}
                  {/* {!loadedJob.releasedAt && props.auth.userId === loadedJob.companyId.id && (
                    <button onClick={onReleaseHandler} className={styles.ReleaseButton}>
                      <span>Release</span>
                    </button>
                  )} */}

                  {!props.auth.isCompany && props.auth.token && (
                    <button
                      className={styles.ApplyButton}
                      onClick={onOpenApplyConfirmHandler}
                      disabled={loadedJob.jobApplicants.some((appId) => {
                        return appId.id.toString() === props.auth.userId.toString();
                      })}>
                      {loadedJob.jobApplicants.some((appId) => appId.id.toString() === props.auth.userId.toString())
                        ? 'Applied'
                        : 'Apply'}
                    </button>
                  )}

                  {!props.auth.isCompany && !props.auth.token && (
                    <button className={styles.ApplyButton} onClick={() => loginCtx.showLogin()}>
                      Apply
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.LowerContainer}>
            <div className={styles.SectionDesc}>
              <div className={styles.SectionDiv}>
                <p className={styles.Caption}>Fungsi Pekerjaan</p>
                <p className={styles.Details}>
                  <strong> {loadedJob.fieldOfWork[0]}</strong>
                </p>
              </div>
              <div className={styles.SectionDiv}>
                <p className={styles.Caption}>Jenis Kontrak</p>
                <p className={styles.Details}>
                  <strong>
                    {loadedJob.employment === 'permanent'
                      ? 'Karyawan Tetap'
                      : loadedJob.employment === 'contract'
                      ? 'Karyawan Kontrak (PKWT)'
                      : 'Karyawan Magang (Intern)'}
                  </strong>
                </p>
              </div>
              <div className={styles.SectionDiv}>
                <p className={styles.Caption}>Pengalaman Kerja</p>
                <p className={styles.Details}>
                  <strong>{loadedJob.jobExperience} tahun </strong>
                </p>
              </div>

              <div className={styles.SectionDiv}>
                <p className={styles.Caption}>Pendidikan</p>
                <p className={styles.Details}>
                  <strong>{loadedJob.educationalStage} </strong>
                </p>
              </div>
            </div>

            <div className={styles.JobDesc}>
              <p className={styles.TextLabel}>Deskripsi Pekerjaan</p>
              {splitParagraph(loadedJob.jobDescriptions)}
            </div>

            <div className={styles.JobDesc}>
              <p className={styles.TextLabel}>Syarat Teknis</p>
              <ul>
                {loadedJob?.specialRequirement.map((req, index) => (
                  <li key={`${req}_${index}`} className={styles.TextDetail}>
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className={styles.TextLabel}>Benefits</p>
              <p className={styles.TextDetail}>{loadedJob.benefit}</p>
            </div>
          </div>
        </div>

        <div className={styles.AboutCompanyContainer}>
          <p className={styles.AboutLabel}>About Company</p>
          {loadedJob.isHidden ? (
            <p className={styles.AboutText}>Data perusahaan dirahasiakan</p>
          ) : (
            <div className={styles.AboutText}>{splitParagraph(loadedJob.companyId.briefDescriptions)}</div>
          )}
        </div>
      </div>
    );
  }
  return (
    <Fragment>
      <Modal
        show={applyConfirm}
        headerText='Anda yakin melamar pekerjaan ini?'
        onCancel={onCloseApplyConfirmHandler}
        style={{ top: '30vh', maxWidth: '600px', marginLeft: '-300px', height: '30vh', overflowY: 'auto' }}>
        <div className={styles.ApplicationModal}>
          <p>Pastikan profile anda sudah anda lengkapi untuk memudahkan perusahaan memahami potensi diri anda.</p>

          <div className={styles.ApplyButtonContainer}>
            {props.jobs.isLoading && jobsid === props.jobId ? (
              <LoadingBar style={{ margin: '0 0 10px' }} />
            ) : (
              <>
                <button type='button' onClick={onCloseApplyConfirmHandler}>
                  Cancel
                </button>
                <button type='button' onClick={onApplyHandler}>
                  Apply
                </button>
              </>
            )}
          </div>
          <p className={styles.ProfileCompletion} onClick={profileCompletionHandler}>
            <em>Lengkapi profile sekarang</em>
          </p>
        </div>
      </Modal>

      {jobDetails}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    admin: state.admin,
    jobs: state.job,
    companies: state.company.companies,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOneJob: (jobsid) => dispatch(actionCreators.getOneJob(jobsid)),
    applyJob: (payload) => dispatch(actionCreators.applyJob(payload)),
    releaseJob: (jobData, authData) => dispatch(actionCreators.releaseJob(jobData, authData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(JobDetails));
