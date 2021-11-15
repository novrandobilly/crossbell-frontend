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
        setData(res.Jobs.sort((a, b) => moment(b.jobItem.releasedAt) - moment(a.jobItem.releasedAt)));
      });
    }
  }, [getApplicantJobsApplied, applicantid, props.auth]);
  console.log(data);
  let content = <LoadingBar />;
  if (!props.isLoading && data) {
    content = (
      <div className={styles.AppliedJobsContainer}>
        {data.map((items, i) => {
          return (
            <div className={styles.JobItem} key={items.jobItem.id}>
              <p>{i + 1}</p>
              <Link to={`/co/${items.jobItem?.companyId?.id}/profile`}>
                <img className={styles.CompanyLogo} src={`${items.jobItem.companyId.logo?.url}`} alt='Logo' />
              </Link>
              <Link to={`/co/${items.jobItem?.companyId?.id}/profile`}>
                <p className={styles.CompanyName}>{items.jobItem.companyId.companyName}</p>
              </Link>
              <Link to={`/jobs/${items.jobItem.id}`}>
                <p className={styles.JobTitle}>{items.jobItem.jobTitle}</p>
              </Link>
              <p className={styles.DateApplied}>{moment(items.appliedDate).fromNow()}</p>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={styles.Container}>
      <HeaderBanner imageSource={MeetingDashboard} />

      <h1 className={styles.PageTitle}>Pekerjaan Yang Telah Dilamar</h1>
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
