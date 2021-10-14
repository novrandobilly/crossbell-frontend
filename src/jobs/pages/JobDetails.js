import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/';

import Spinner from '../../shared/UI_Element/Spinner/LoadingBar';
import JobDetailMap from '../components/JobDetailMap';

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

  let jobDetails = <Spinner />;
  if (loadedJob) {
    jobDetails = <JobDetailMap job={loadedJob} />;
  }
  return jobDetails;
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    admin: state.admin,
    jobStore: state.job.jobs,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getOneJob: jobsid => dispatch(actionCreators.getOneJob(jobsid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(JobDetails);
