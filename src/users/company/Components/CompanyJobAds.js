import React, { useState, useEffect, Fragment } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions';

import JobCard from '../../../jobs/components/JobCard';
import LoadingBar from '../../../shared/UI_Element/Spinner/LoadingBar';
import styles from './CompanyJobAds.module.scss';

const CompanyJobAds = props => {
  const [validJobList, setValidJobList] = useState();

  const { companyId, getJobsInCompany } = props;
  useEffect(() => {
    const fetchJobs = async () => {
      const payload = {
        companyId: companyId,
      };
      try {
        const response = await getJobsInCompany(payload);
        const validJob = response.foundJob.filter(job => moment(job.expiredDate) >= moment());
        setValidJobList(validJob);
      } catch (err) {
        console.log(err);
      }
    };
    fetchJobs();
  }, [companyId, getJobsInCompany]);

  let jobList = <LoadingBar />;
  if (validJobList?.length > 0) {
    jobList = (
      <div className={styles.CompanyJobAds}>
        {validJobList.map(job => (
          <JobCard
            key={job._id}
            isHidden={job.isHidden}
            jobId={job._id}
            jobTitle={job.jobTitle}
            placementLocation={job.placementLocation}
            company={props.companyName}
            logo={props.logo}
            salary={job.salary}
            emailRecipient={job.companyId.emailRecipient}
            companyId={job.companyId}
            fieldOfWork={job.fieldOfWork}
            jobApplicant={job.jobApplicants}
            setModalError={props.setModalError}
            modalError={props.modalError}
            releasedAt={job.releasedAt}
          />
        ))}
      </div>
    );
  }

  return (
    <Fragment>
      <h3>Lowongan dari perusahaan ini: </h3>
      {jobList}
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getJobsInCompany: payload => dispatch(actionCreators.getJobsInCompany(payload)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CompanyJobAds);
