import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import * as actionCreators from '../../store/actions';
import * as actionTypes from '../../store/actions/actions';

import Modal from '../../shared/UI_Element/Modal';
import Spinner from '../../shared/UI_Element/Spinner/LoadingBar';
import Button from '../../shared/UI_Element/Button';
import BlankCompany from '../../assets/images/Company.png';

import classes from './JobCard.module.css';

const JobCard = props => {
  const [jobId, setJobId] = useState(null);
  const [applicantList, setApplicantList] = useState([]);

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
      if (res.message === 'Successfully applied to the job') {
        let applicantArray = [...applicantList, props.auth.userId];
        setApplicantList(applicantArray);
      }
      setJobId(null);
    } catch (err) {
      console.log(err);
      setJobId(null);
      return props.createJobFail();
    }
  };

  useEffect(() => {
    setApplicantList(props.jobApplicant);
  }, [props.jobApplicant]);

  let instantApplyButton = <Button></Button>;

  if (!props.auth.isCompany && props.auth.token) {
    instantApplyButton = (
      <Button
        btnType='InstantApply'
        onClick={applyHandler}
        disabled={applicantList.some(appId => appId.toString() === props.auth.userId.toString())}>
        {applicantList.some(appId => appId.toString() === props.auth.userId.toString()) ? 'Applied' : 'Apply'}
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

  let content = (
    <div className={classes.FlexWrap}>
      <div className={classes.JobCard}>
        <Modal show={props.job.error} onCancel={onCancelHandler}>
          Tidak dapat melamar pekerjaan untuk saat ini{' '}
        </Modal>
        <div className={classes.Logo}>
          <img src={props.logo && !props.isHidden ? props.logo.url : BlankCompany} alt='company-logo' />
        </div>
        <div className={classes.Content}>
          <div className={classes.ContentHeader}>
            <div className={classes.TitleDateWrap}>
              <h3>
                <Link to={`/jobs/${props.jobId}`} style={{ textDecoration: 'inherit', color: 'inherit' }}>
                  {props.jobTitle}
                </Link>
              </h3>
              <p className={classes.Date}>{moment().diff(moment(props.releasedAt), 'days')} hari lalu</p>
            </div>
            <Link
              to={`/jobs/${props.jobId}`}
              style={{
                textDecoration: 'inherit',
                fontWeight: '500',
                color: 'rgba(0,0,0,0.6)',
              }}>
              Details
            </Link>
          </div>

          <div className={classes.TopContent}>
            {props.isHidden ? (
              <span className={classes.TextSecret}>Perusahaan Dirahasiakan</span>
            ) : (
              <Link to={`/co/${props.companyId._id}/profile`} style={{ textDecoration: 'inherit', color: 'inherit' }}>
                <span className={classes.TextLeft}>{props.company}</span>
              </Link>
            )}

            <span className={classes.PlacementLocationProps}>, {props.placementLocation}</span>
          </div>
          <div>
            <em>{props.fieldOfWork?.filter(fow => fow).join(', ')}</em>
          </div>
          <div className={classes.BottomContent}>
            <p className={classes.BottomSalary}>
              {props.salary && props.salary > 0 ? `IDR ${salary.toLocaleString()} /bulan` : 'Gaji Tidak Ditampilkan'}
            </p>
          </div>
        </div>
        <div className={classes.InstantSubmit}>{instantApplyButton}</div>

        <footer />
      </div>
    </div>
  );

  return <React.Fragment>{content}</React.Fragment>;
};

const mapStateToProps = state => {
  return {
    companies: state.company.companies,
    auth: state.auth,
    job: state.job,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    applyJob: payload => dispatch(actionCreators.applyJob(payload)),
    createJobFail: () => dispatch({ type: actionTypes.CREATEJOBFAIL }),
    resetJob: () => dispatch({ type: actionTypes.JOBRESET }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(JobCard));
