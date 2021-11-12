import React, { useEffect, useState } from 'react';
import { useParams, Link, withRouter } from 'react-router-dom';
import moment from 'moment';
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions';
import { splitParagraph, thousandSeparator } from '../../../shared/utils/sharedFunctions';
import BlankCompany from '../../../assets/images/Company.png';

import LoadingBar from '../../../shared/UI_Element/Spinner/LoadingBar';

import styles from './JobDetails.module.scss';

const JobDetails = props => {
  const { jobsid } = useParams();
  const [loadedJob, setLoadedJob] = useState(null);

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

  console.log(loadedJob);

  const onApplyHandler = async event => {
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

  const onReleaseHandler = async event => {
    event.preventDefault();

    const payload = {
      jobId: jobsid,
      token: props.auth.token,
    };
    try {
      await props.deleteJob(payload);
      props.history.push('/jobs-dashboard');
    } catch (err) {
      console.log(err);
    }
  };

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
                  <Link to={`/co/${loadedJob.companyId}/profile`}>
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
                  {props.auth.userId === loadedJob.companyId.id && (
                    <Link to={`/jobs/${loadedJob.jobId}/edit`}>
                      <button className={styles.EditButton}>
                        <span>Edit</span>
                      </button>
                    </Link>
                  )}
                  {!loadedJob.releasedAt && props.auth.userId === loadedJob.companyId.id && (
                    <button onClick={onReleaseHandler} className={styles.ReleaseButton}>
                      <span>Release</span>
                    </button>
                  )}

                  {!props.auth.isCompany && props.auth.token && (
                    <button
                      className={styles.ApplyButton}
                      onClick={onApplyHandler}
                      disabled={loadedJob.jobApplicants.some(
                        appId => appId.id.toString() === loadedJob.auth.userId.toString()
                      )}>
                      {loadedJob.jobApplicants.some(appId => appId.id.toString() === loadedJob.auth.userId.toString())
                        ? 'Applied'
                        : 'Apply'}
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
              <div className={styles.TextDetail}>{splitParagraph(loadedJob.jobDescriptions)}</div>
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
  return jobDetails;
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    admin: state.admin,
    jobs: state.job,
    companies: state.company.companies,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getOneJob: jobsid => dispatch(actionCreators.getOneJob(jobsid)),
    applyJob: payload => dispatch(actionCreators.applyJob(payload)),
    releaseJob: payload => dispatch(actionCreators.releaseJob(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(JobDetails));
