import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/';

import Spinner from '../../shared/UI_Element/Spinner/SpinnerCircle';
import JobDetailMap from '../components/JobDetailMap';

const JobDetails = (props) => {
  const { jobsid } = useParams();
  const [loadedJob, setLoadedJob] = useState(null);

  const { getOneJob } = props;
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await getOneJob(jobsid);
        console.log(res);
        setLoadedJob(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchJob();
  }, [getOneJob, jobsid]);

  let jobDetails = <Spinner />;
  if (loadedJob) {
    jobDetails = <JobDetailMap job={loadedJob} />;
  }
  return jobDetails;
};

const mapStateToProps = (state) => {
  return {
    jobStore: state.job.jobs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOneJob: (jobsid) => dispatch(actionCreators.getOneJob(jobsid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(JobDetails);
