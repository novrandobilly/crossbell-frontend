import React, { useState, useEffect } from 'react';
import { withRouter, useParams, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

import * as actionCreators from '../../../store/actions';
import HeaderBanner from '../../../shared/UI_Element/HeaderBanner';
import MeetingDashboard from '../../../assets/images/Meeting-Dashboard.png';
import LoadingBar from '../../../shared/UI_Element/Spinner/LoadingBar';

import styles from './JobsApplied.module.scss';

const JobsApplied = props => {
  const { applicantid } = useParams();
  const [data, setData] = useState([]);
  const { getApplicantJobsApplied } = props;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const token = props.auth.token;
    if (token) {
      const payload = {
        token: token,
        applicantId: applicantid,
      };

      getApplicantJobsApplied(payload).then(res => {
        console.log(res);
        setData(res.Jobs.sort((a, b) => moment(b.releasedAt) - moment(a.releasedAt)));
      });
    }
  }, [getApplicantJobsApplied, applicantid, props.auth]);

  let content = <LoadingBar />;

  if (!props.isLoading && data) {
    content = (
      <div className={styles.AppliedJobContainer}>
        {data.map((items, i) => {
          console.log(items);

          return (
            <div className={styles.JobCard} key={items.id}>
              <Link to={`/jobs/${items.id}`}>
                <div className={styles.CardContainer}>
                  <div className={styles.Header}>
                    <p className={styles.Title}>{items.jobTitle}</p>
                    <p className={styles.Company}>{items.companyId.companyName}</p>
                  </div>
                  <div className={styles.Content}>
                    <div className={styles.AvatarContainer}>
                      <img className={styles.Avatar} src={`${items.companyId.logo?.url}`} alt='Logo' />
                    </div>
                  </div>
                  <div className={styles.Footer}>
                    <p className={styles.DateApplied}>
                      {moment().diff(moment(items.createdAt), 'days') > 0
                        ? [`posted ${moment().diff(moment(items.createdAt), 'days')} days ago`]
                        : 'atas'}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={styles.Container}>
      <HeaderBanner imageSource={MeetingDashboard} />

      <div className={styles.PageTitle}>PEKERJAAN SUDAH DILAMAR</div>
      {content}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    applicant: state.applicant,
    isLoading: state.applicant.isLoading,
    error: state.applicant.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getApplicantJobsApplied: payload => dispatch(actionCreators.getApplicantJobsApplied(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(JobsApplied));
