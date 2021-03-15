import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

import * as actionCreators from '../../../../store/actions';
import SpinnerCircle from '../../../../shared/UI_Element/Spinner/SpinnerCircle';
import CloseIcon from '@material-ui/icons/Close';

import classes from './CompanyJobList.module.css';

const CompanyJobList = (props) => {
  const { companyid } = useParams();

  const [data, setData] = useState([]);

  const { getJobsInCompany } = props;
  useEffect(() => {
    const token = props.auth.token;
    if (token) {
      const payload = {
        token: token,
        companyId: companyid,
      };

      getJobsInCompany(payload).then((res) => {
        console.log(res);
        setData(
          res.foundJob.sort((a, b) => moment(b.createdAt) - moment(a.createdAt))
        );
      });
    }
  }, [getJobsInCompany, companyid, props.auth]);

  const onDeleteHandler = async (id) => {
    const token = props.auth.token;
    try {
      const payload = {
        jobId: id,
        token: token,
      };
      const res = await props.deleteJob(payload);
      if (res) {
        console.log(res);
        setData(data.filter((fil) => fil._id !== id));
      } else {
        console.log('No feed with id:' + { id } + 'found');
      }
    } catch (err) {
      console.log(err);
    }
  };

  let content = <SpinnerCircle />;

  if (!props.isLoading && data && data.length > 0) {
    content = (
      <div className={classes.Container}>
        <div className={classes.CardContainer}>
          <div className={classes.DivContainer}>
            {data.map((job, i) => {
              return (
                <div key={job.id} className={classes.CardHolder}>
                  <div className={classes.JobCard}>
                    <div className={classes.CardHeader}>
                      <div>
                        <p>{job.jobTitle}</p>
                        <p className={classes.CardAddress}>
                          {job.placementLocation}
                        </p>
                      </div>
                      {!job.expiredDate && (
                        <div>
                          <button onClick={() => onDeleteHandler(job.id)}>
                            <CloseIcon />
                          </button>
                        </div>
                      )}
                    </div>
                    <Link
                      to={
                        job.expiredDate
                          ? `/jobs/${job.id}`
                          : `/jobs/new/edit/${job.id}`
                      }
                    >
                      <div>
                        <p className={classes.CardRecipient}>
                          {job.emailRecipient}
                        </p>

                        <div className={classes.CardBody}>
                          <p className={classes.CardApplicant}>
                            {job.jobApplicants.length}
                          </p>
                          <p>applicants applied </p>
                        </div>
                        <div className={classes.CardFooter}>
                          {job.expiredDate ? (
                            <p className={classes.ExpDate}>
                              {moment(job.expiredDate).diff(moment(), 'days') >
                              0
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
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (!props.isLoading && (!data || data.length < 1)) {
    content = (
      <p className={classes.EmptyText}>
        Anda belum memasang iklan pekerjaan sebelumnya
      </p>
    );
  }

  return content;
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
    deleteJob: (payload) => dispatch(actionCreators.deleteJob(payload)),
    getJobsInCompany: (payload) =>
      dispatch(actionCreators.getJobsInCompany(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyJobList);
