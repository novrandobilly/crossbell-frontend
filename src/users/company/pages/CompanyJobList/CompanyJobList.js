import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

import * as actionCreators from '../../../../store/actions';
import SpinnerCircle from '../../../../shared/UI_Element/Spinner/SpinnerCircle';
import classes from './CompanyJobList.module.css';

// import SpinnerCircle from "../../../../shared/UI_Element/Spinner/SpinnerCircle";

const CompanyJobList = (props) => {
  const { companyid } = useParams();

  const [data, setData] = useState();

  const { getJobsInCompany } = props;
  useEffect(() => {
    const token = props.auth.token;
    if (token) {
      const payload = {
        token: token,
        companyId: companyid,
      };

      getJobsInCompany(payload).then((res) => {
        setData(res.foundJob);
      });
    }
  }, [getJobsInCompany, companyid, props.auth]);

  let Content = <SpinnerCircle />;

  if (data && !props.isLoading) {
    Content = (
      <div className={classes.Container}>
        <div className={classes.CardContainer}>
          <div className={classes.DivContainer}>
            {data.map((job, i) => {
              return (
                <div key={job.id}>
                  <Link
                    to={
                      job.expiredDate
                        ? `/jobs/${job.id}`
                        : `/jobs/new/edit/${job.id}`
                    }
                  >
                    <div className={classes.JobCard}>
                      <div className={classes.CardHeader}>
                        <p>{job.jobTitle}</p>
                        <p className={classes.CardAddress}>
                          {job.placementLocation}
                        </p>
                        <p className={classes.CardRecipient}>
                          {job.emailRecipient}
                        </p>
                      </div>
                      <div className={classes.CardBody}>
                        <p className={classes.CardApplicant}>
                          {job.jobApplicants.length}
                        </p>
                        <p>applicants applied </p>
                      </div>
                      <div className={classes.CardFooter}>
                        {job.expiredDate ? (
                          <p className={classes.ExpDate}>
                            {moment(job.expiredDate).diff(moment(), 'days') > 0
                              ? [
                                  `expired in ${moment(job.expiredDate).diff(
                                    moment(),
                                    'days'
                                  )} days`,
                                ]
                              : 'expired'}
                          </p>
                        ) : (
                          <p className={classes.ExpDate}>belum ditayangkan</p>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return Content;
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    isLoading: state.job.isLoading,
    error: state.job.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    applyJob: (payload) => dispatch(actionCreators.applyJob(payload)),
    getJobsInCompany: (payload) =>
      dispatch(actionCreators.getJobsInCompany(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyJobList);
