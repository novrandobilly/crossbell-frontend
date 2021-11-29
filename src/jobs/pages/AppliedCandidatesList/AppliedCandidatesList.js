import React, { useState, useEffect, Fragment } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

import * as actionTypes from '../../../store/actions/actions';
import * as actionCreators from '../../../store/actions';
import HeaderBanner from '../../../shared/UI_Element/HeaderBanner';
import CompanyMeeting from '../../../assets/images/CompanyMeeting.png';
import LoadingBar from '../../../shared/UI_Element/Spinner/LoadingBar';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import SchoolOutlinedIcon from '@material-ui/icons/SchoolOutlined';
import PinDropOutlinedIcon from '@material-ui/icons/PinDropOutlined';
import WcOutlinedIcon from '@material-ui/icons/WcOutlined';
import MoneyIcon from '@mui/icons-material/Money';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import CallIcon from '@material-ui/icons/Call';
import BlankProfile from '../../../assets/images/Blank_Profile.png';

import styles from './AppliedCandidatesList.module.scss';

const AppliedCandidatesList = props => {
  const { jobsid } = useParams();
  const [jobData, setJobData] = useState();

  const { getOneJob } = props;

  useEffect(() => {
    getOneJob(jobsid)
      .then(res => {
        setJobData(res);
      })
      .catch(err => console.log(err));
  }, [getOneJob, jobsid, props.auth]);

  let Content = <LoadingBar />;

  if (!props.isLoading && jobData?.jobApplicants) {
    Content = (
      <div className={styles.CardHolder}>
        {jobData.jobApplicants.map((data, i) => {
          return (
            <div className={styles.CardContainer} key={data.id}>
              <div className={styles.CardLeft}>
                {console.log(data.picture)}
                <a href={`/ap/${data.id}/profile`} target='_blank' rel='noreferrer' className={styles.Avatar}>
                  <img alt='Applicant Avatar' src={data.picture ? data.picture.url : BlankProfile} />
                </a>
              </div>

              <div className={styles.CardMid}>
                <a href={`/ap/${data.id}/profile`} target='_blank' rel='noreferrer'>
                  <p className={styles.Name}>
                    {data.firstName} {data.lastName}
                  </p>
                </a>
                <div className={styles.CardMidTitle}>
                  <WorkOutlineIcon fontSize='small' style={{ marginRight: '6px' }} />
                  {data.experience.length > 0 ? data.experience[0].prevTitle : ' - '}
                </div>
                <div className={styles.CardMidLocation}>
                  <span>at {data.experience.length > 0 ? data.experience[0].prevCompany : ' - '}</span>
                </div>

                <div className={styles.CardMidTitle}>
                  <SchoolOutlinedIcon fontSize='small' style={{ marginRight: '6px' }} />
                  {data.education.length > 0 ? data.education[0].major : ' - '}
                </div>
                <div className={styles.CardMidLocation}>
                  <span>at {data.education.length > 0 ? data.education[0].school : ' - '}</span>
                </div>
                <div className={styles.CardMidTitle}>
                  GPA: {data.education.length > 0 ? data.education[0].IPK : ' - '}
                </div>
                <div className={styles.CardMidTitle}>
                  <WcOutlinedIcon fontSize='small' style={{ marginRight: '6px' }} />
                  <p className={styles.GenderAge}>
                    {!data.gender ? ' - ' : data.gender === 'male' ? 'Pria' : 'Wanita'},{' '}
                    {data.dateOfBirth ? moment().diff(moment(data.dateOfBirth), 'year') : '0'} tahun
                  </p>{' '}
                </div>
              </div>

              <div className={styles.CardRight}>
                <div className={styles.ExtraDetails}>
                  <PinDropOutlinedIcon fontSize='small' style={{ marginRight: '6px' }} />
                  <p className={styles.City}>
                    {data.address && data.address}, {data.city ? data.city : ' - '}{' '}
                  </p>
                </div>

                <div className={styles.ExtraDetails}>
                  <MoneyIcon fontSize='small' style={{ marginRight: '6px' }} />
                  <p className={styles.Salary}>Harapan gaji: Rp. {data.salary ? data.salary.toLocaleString() : '0'}</p>
                </div>

                <div className={styles.ExtraDetails}>
                  <AlternateEmailIcon fontSize='small' style={{ marginRight: '6px' }} />
                  <p className={styles.Mail}>{data.email}</p>
                </div>

                <div className={styles.ExtraDetails}>
                  <CallIcon fontSize='small' style={{ marginRight: '6px' }} />
                  <p className={styles.Phone}>{data.phone ? data.phone : ' - '}</p>
                </div>

                <p>
                  <strong>{data.workShifts ? 'Bersedia' : 'Tidak Bersedia'} bekerja dengan sistem shift</strong>
                </p>
                <p>
                  <strong>{data.outOfTown ? 'Bersedia' : 'Tidak Bersedia'} ditempatkan di luar kota asal</strong>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <Fragment>
      <HeaderBanner imageSource={CompanyMeeting} />
      <h1 className={styles.AppliedCandidatesTitle}>
        Daftar <span>Pelamar</span>
      </h1>
      <div className={styles.AppliedCandidatesListContainer}>
        <div className={styles.JobAds}>
          {jobData ? (
            <Fragment>
              {' '}
              <div className={styles.JobAdsHeader}>
                <img alt='Company Logo' src={jobData.companyId?.logo?.url || BlankProfile} />
                <h3 className={styles.JobTitle} onClick={() => props.history.push(`/jobs/${jobData.id}`)}>
                  {jobData.jobTitle}
                </h3>
              </div>
              <p>
                Kategori: <strong>{jobData.fieldOfWork[0]}</strong>
              </p>
              <p>
                Tingkat Pendidikan: <strong>{jobData.educationalStage}</strong>
              </p>
              <p>
                Pengalaman: <strong>{jobData.jobExperience} tahun</strong>
              </p>
              <p>
                Usia:{' '}
                <strong>
                  {jobData.rangeAge[0]} - {jobData.rangeAge[1]} tahun
                </strong>
              </p>
              <p>
                Penempatan: <strong>{jobData.placementLocation}</strong>
              </p>
              <p>
                Kontrak Kerja: <strong>{jobData.employment}</strong>
              </p>
              <p>
                Persyaratan Khusus: <strong>{jobData?.specialRequirement.length < 1 && '-'} </strong>
              </p>
              {jobData?.specialRequirement.length > 0 && (
                <ul className={styles.SpecialRequirements}>
                  {jobData.specialRequirement.map((req, i) => (
                    <li key={`${req}_${i}`}>
                      <strong>{req}</strong>
                    </li>
                  ))}
                </ul>
              )}
            </Fragment>
          ) : (
            <LoadingBar />
          )}
        </div>
        {Content}
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    admin: state.admin,
    isLoading: state.job.isLoading,
    error: state.job.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getOneJob: jobsid => dispatch(actionCreators.getOneJob(jobsid)),
    resetCompany: () => dispatch({ type: actionTypes.FETCHINGFINISH }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AppliedCandidatesList));
