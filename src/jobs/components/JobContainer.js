import React from 'react';
import { Link, withRouter, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

import * as actionCreators from '../../store/actions/';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Spinner from '../../shared/UI_Element/Spinner/SpinnerCircle';
import Button from '../../shared/UI_Element/Button';

import classes from './JobContainer.module.css';

const JobDetails = (props) => {
  const { jobsid } = useParams();

  const onSaveHandler = (event) => {
    event.preventDefault();
  };

  // const onDeleteHandler = async event => {
  // 	event.preventDefault();

  // 	const payload = {
  // 		jobId: jobsid,
  // 		token: props.auth.token
  // 	};
  // 	try {
  // 		await props.deleteJob(payload);
  // 		props.history.push('/jobs-dashboard');
  // 	} catch (err) {
  // 		console.log(err);
  // 	}
  // };

  const onReleaseHandler = async (event) => {
    event.preventDefault();

    const payload = {
      jobId: jobsid,
      token: props.auth.token,
    };
    try {
      await props.deleteJob(payload);
      props.history.push('/jobs-dashboard');
    } catch (err) {
      console.log(err);
    }
  };

  let containerContent = (
    <div className={classes.Container}>
      <div className={classes.LeftContainer}>
        <div className={classes.UpperContainer}>
          <div className={classes.AvatarContainer}>
            {props.logo && props.logo.url ? (
              <div
                className={classes.Avatar}
                style={{
                  backgroundImage: `url('${props.logo.url}')`,
                }}
              />
            ) : (
              <AccountCircleIcon
                style={{
                  fontSize: '15rem',
                  marginBottom: '1rem',
                }}
              />
            )}
          </div>

          <div className={classes.ContainerIntro}>
            <div className={classes.Header}>
              <p className={classes.JobTitle}>{props.jobTitle} </p>
              <p className={classes.TextDate}>
                Posted {moment().diff(moment(props.releasedAt), 'days')} days
                ago
              </p>
            </div>
            <div className={classes.ContainerFirst}>
              <Link
                to={`/co/${props.companyId}`}
                style={{
                  textDecoration: 'none',
                  color: 'rgba(58, 81, 153, 1)',
                }}
              >
                <p className={classes.TextLeft}>{props.companyName}</p>
              </Link>
              <p>-</p>
              <p className={classes.TextMiddle}>{props.fieldOfWork}</p>
            </div>

            <div className={classes.ContainerSecond}>
              <p className={classes.TextLeft}>
                Salary: IDR{' '}
                {props.payment
                  ? props.payment.toLocaleString()
                  : 'tidak dipaparkan oleh perusahaan'}
              </p>
              <p>-</p>
              <p className={classes.TextMiddle}>{props.employment}</p>
            </div>

            <div className={classes.ContainerThird}>
              {props.auth.isCompany ||
                (props.admin.isAdmin && (
                  <p className={classes.TextLeft}>
                    email HR: {props.emailRecipient}
                  </p>
                ))}

              <div className={classes.ButtonContainer}>
                {props.auth.userId === props.companyId && (
                  <Link to={`/jobs/${props.jobId}/edit`}>
                    <button className={classes.InstantButton}>
                      <span>Edit</span>
                    </button>
                  </Link>
                )}
                {!props.releasedAt && props.auth.userId === props.companyId && (
                  <button
                    onClick={onReleaseHandler}
                    className={classes.InstantButton}
                  >
                    <span>Release</span>
                  </button>
                )}

                {/* {props.auth.userId === props.companyId && (
									<button onClick={onDeleteHandler} className={[ classes.InstantButton, classes.DeleteButton ].join(' ')}>
										<span>Delete</span>
									</button>
								)} */}

                {!props.auth.isCompany && props.auth.token && (
                  <Button
                    btnType='InstantApply'
                    onClick={onSaveHandler}
                    disabled={props.jobApplicants.some(
                      (appId) =>
                        appId.toString() === props.auth.userId.toString()
                    )}
                  >
                    {props.jobApplicants.some(
                      (appId) =>
                        appId.toString() === props.auth.userId.toString()
                    )
                      ? 'Applied'
                      : 'Apply'}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={classes.LowerContainer}>
          <div className={classes.JobDesc}>
            <p className={classes.TextLabel}>Deskripsi Pekerjaan</p>
            <p className={classes.TextDetail}>{props.jobDescriptions}</p>
          </div>

          <div className={classes.JobDesc}>
            <p className={classes.TextLabel}>Kualifikasi Pekerjaan</p>
            <p className={classes.TextDetail}>{props.educationalStage}</p>
          </div>

          <div className={classes.JobDesc}>
            <p className={classes.TextLabel}>Syarat Teknis</p>
            <p className={classes.TextDetail}>{props.technicalRequirement}</p>
          </div>

          <div>
            <p className={classes.TextLabel}>Benefits</p>
            <p className={classes.TextDetail}>{props.benefit}</p>
          </div>
        </div>
      </div>

      <div className={classes.RightContainer}>
        <div>
          <p className={classes.AboutLabel}>About Company</p>
          <p className={classes.AboutText}>{props.companyDetails}</p>
        </div>

        <div>
          <p className={classes.AboutLabel}>Location</p>
        </div>
      </div>
    </div>
  );

  if (props.job.isLoading) {
    containerContent = <Spinner />;
  }

  return containerContent;
};

const mapStateToProps = (state) => {
  return {
    admin: state.admin,
    auth: state.auth,
    job: state.job,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // deleteJob: payload => dispatch(actionCreators.deleteJob(payload)),
    releaseJob: (payload) => dispatch(actionCreators.releaseJob(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(JobDetails));
