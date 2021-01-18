import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';

import classes from './JobCard.module.css';

import Spinner from '../../shared/UI_Element/Spinner/Spinner';
import Button from '../../shared/UI_Element/Button';

const JobCard = (props) => {
  const [jobId, setJobId] = useState(null);
  //=====================================INSTANT APPLY=====================================
  const applyHandler = async () => {
    setJobId(props.jobId);
    const payload = {
      token: props.auth.token,
      userId: props.auth.userId,
      jobId: props.jobId,
    };
    let res;
    try {
      res = await props.applyJob(payload);
      console.log(res);
      setJobId(null);
    } catch (err) {
      console.log(err);
      setJobId(null);
    }
  };

  let instantApplyButton = (
    <Button btnType='InstantApply' onClick={applyHandler}>
      Apply
    </Button>
  );

  if (props.job.isLoading && jobId === props.jobId) {
    instantApplyButton = <Spinner />;
  }
  //=====================================================================================
  let salary = parseInt(props.salary);

  return (
    <div className={classes.JobCard}>
      <div className={classes.Logo}>
        <img src={props.logo} alt={props.company} />
      </div>
      <div className={classes.Content}>
        <h3>
          <Link
            to={`/jobs/${props.jobId}`}
            style={{ textDecoration: 'inherit', color: 'inherit' }}
          >
            {props.jobTitle}
          </Link>
        </h3>

        <p>
          <Link
            to={`/co/${props.companyId._id}`}
            style={{ textDecoration: 'inherit', color: 'inherit' }}
          >
            <em>
              <strong>{props.company} </strong>
            </em>
          </Link>
          - {props.placementLocation}
        </p>
        {props.salary ? (
          <p>IDR {salary.toLocaleString()} /month</p>
        ) : (
          <p>Salary Undisclosed</p>
        )}
      </div>
      {!props.auth.isCompany && props.auth.token && (
        <div className={classes.InstantSubmit}>{instantApplyButton}</div>
      )}

      <footer />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    companies: state.company.companies,
    auth: state.auth,
    job: state.job,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    applyJob: (payload) => dispatch(actionCreators.applyJob(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(JobCard);
