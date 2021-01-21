import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';
import * as actionTypes from '../../store/actions/actions';

import Modal from '../../shared/UI_Element/Modal';
import Spinner from '../../shared/UI_Element/Spinner/Spinner';
import SpinnerCircle from '../../shared/UI_Element/Spinner/SpinnerCircle';
import Button from '../../shared/UI_Element/Button';

import classes from './JobCard.module.css';

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
      return props.createJobFail();
    }
  };

  let instantApplyButton;
  if (!props.auth.isCompany && props.auth.token) {
    instantApplyButton = (
      <Button
        btnType='InstantApply'
        onClick={applyHandler}
        disabled={props.jobApplicant.some(
          (appId) => appId.toString() === props.auth.userId.toString()
        )}
      >
        {props.jobApplicant.some(
          (appId) => appId.toString() === props.auth.userId.toString()
        )
          ? 'Applied'
          : 'Apply'}
      </Button>
    );
  }

  if (props.job.isLoading && jobId === props.jobId) {
    instantApplyButton = <Spinner />;
  }

  //   =====================================================================================
  let salary = parseInt(props.salary);

  const onCancelHandler = () => {
    props.resetJob();
  };
  //   let content = <SpinnerCircle />;

  let content = (
    <div className={classes.JobCard}>
      <Modal show={props.job.error} onCancel={onCancelHandler}>
        Tidak dapat melamar pekerjaan untuk saat ini{' '}
      </Modal>
      <div className={classes.Logo}>
        <img
          src={
            props.logo
              ? props.logo.url
              : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
          }
          alt={props.company}
        />
      </div>
      <div className={classes.Content}>
        <div className={classes.ContentHeader}>
          <h3>
            <Link
              to={`/jobs/${props.jobId}`}
              style={{ textDecoration: 'inherit', color: 'inherit' }}
            >
              {props.jobTitle}
            </Link>
          </h3>
          <Link
            to={`/jobs/${props.jobId}`}
            style={{
              textDecoration: 'inherit',
              fontWeight: '500',
              color: 'rgba(0,0,0,0.6)',
            }}
          >
            Details
          </Link>
        </div>

        <div className={classes.TopContent}>
          <Link
            to={`/co/${props.companyId._id}`}
            style={{ textDecoration: 'inherit', color: 'inherit' }}
          >
            <span className={classes.TextLeft}>{props.company}</span>
          </Link>
          <span className={classes.PlacementLocation}>
            - {props.placementLocation}
          </span>
        </div>
        <div className={classes.FieldOfWork}>
          <p>{props.fieldOfWork.join(', ')}</p>
        </div>
        {props.salary ? (
          <p className={classes.BottomContent}>
            IDR {salary.toLocaleString()} /month
          </p>
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

  return <React.Fragment>{content}</React.Fragment>;
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
    createJobFail: () => dispatch({ type: actionTypes.CREATEJOBFAIL }),
    resetJob: () => dispatch({ type: actionTypes.JOBRESET }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(JobCard);
