import React, { useState } from 'react';
import { Link, withRouter, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

import * as actionCreators from '../../store/actions/';
import BlankCompany from '../../assets/images/Company.png';
import LoadingBar from '../../shared/UI_Element/Spinner/LoadingBar';
import Button from '../../shared/UI_Element/Button';

import classes from './JobContainer.module.css';

const JobDetails = props => {
  const [jobId, setJobId] = useState(null);
  const [applicantList, setApplicantList] = useState([]);

  const { jobsid } = useParams();

  const onSaveHandler = async event => {
    event.preventDefault();
    setJobId(props.jobId);
    const payload = {
      token: props.auth.token,
      userId: props.auth.userId,
      jobId: jobId,
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

  const onReleaseHandler = async event => {
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
            {props.logo && !props.isHidden ? (
              <div
                className={classes.Avatar}
                style={{
                  backgroundImage: `url('${props.logo.url}')`,
                }}
              />
            ) : (
              <div className={classes.Avatar} style={{ backgroundImage: `url(${BlankCompany})` }} />
            )}
          </div>

          <div className={classes.ContainerIntro}>
            <div className={classes.Header}>
              <p className={classes.JobTitle}>{props.jobTitle} </p>
              <p className={classes.TextDate}>Posted {moment().diff(moment(props.releasedAt), 'days')} days ago</p>
            </div>
            <div className={classes.ContainerFirst}>
              {props.isHidden ? (
                <p className={classes.TextLeft}>Data perusahaan dirahasiakan</p>
              ) : (
                <Link
                  to={`/co/${props.companyId}/profile`}
                  style={{
                    textDecoration: 'none',
                    color: '#f79f35',
                  }}>
                  <p className={classes.TextLeft}>{props.companyName}</p>
                </Link>
              )}
            </div>

            <div className={classes.ContainerSecond}>
              <p className={classes.TextLeft}>
                Gaji: IDR {props.payment ? props.payment.toLocaleString() : 'tidak dipaparkan oleh perusahaan'}
              </p>
            </div>

            <div className={classes.ContainerThird}>
              {props.auth.isCompany ||
                (props.admin.isAdmin && <p className={classes.TextLeft}>email HR: {props.emailRecipient}</p>)}
              <p className={classes.TextDateMobile}>
                Posted {moment().diff(moment(props.releasedAt), 'days')} days ago
              </p>
              <div className={classes.ButtonContainer}>
                {props.auth.userId === props.companyId && (
                  <Link to={`/jobs/${props.jobId}/edit`}>
                    <button className={classes.InstantButton}>
                      <span>Edit</span>
                    </button>
                  </Link>
                )}
                {!props.releasedAt && props.auth.userId === props.companyId && (
                  <button onClick={onReleaseHandler} className={classes.InstantButton}>
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
                    disabled={props.jobApplicants.some(appId => appId.id.toString() === props.auth.userId.toString())}>
                    {props.jobApplicants.some(appId => appId.id.toString() === props.auth.userId.toString())
                      ? 'Applied'
                      : 'Apply'}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={classes.LowerContainer}>
          <div className={classes.SectionDesc}>
            <div className={classes.SectionDiv}>
              <p className={classes.Caption}>Fungsi Pekerjaan</p>
              {props.fieldOfWork?.map((item, i) => (
                <p className={classes.Details} key={i}>
                  {item}
                </p>
              ))}
            </div>
            <div className={classes.MiddleSectionDiv}>
              <p className={classes.Caption}>Jenis Kontrak</p>
              <p className={classes.Details}>
                {props.employment === 'permanent'
                  ? 'Karyawan Tetap'
                  : props.employment === 'contract'
                  ? 'Karyawan Kontrak (PKWT)'
                  : 'Karyawan Magang (Intern)'}
              </p>
            </div>

            <div className={classes.SectionDiv}>
              <p className={classes.Caption}>Pendidikan</p>
              <p className={classes.Details}>{props.educationalStage}</p>
              <p className={classes.Caption}>Pengalaman Kerja</p>
              <p className={classes.Details}>{props.jobExperience} tahun</p>
            </div>
          </div>

          <div className={classes.JobDesc}>
            <p className={classes.TextLabel}>Deskripsi Pekerjaan</p>
            <p className={classes.TextDetail}>{props.jobDescriptions}</p>
          </div>

          <div className={classes.JobDesc}>
            <p className={classes.TextLabel}>Syarat Teknis</p>
            <p className={classes.TextDetail}>{props.specialRequirement}</p>
          </div>

          <div>
            <p className={classes.TextLabel}>Benefits</p>
            <p className={classes.TextDetail}>{props.benefit}</p>
          </div>
        </div>
      </div>

      <div className={classes.RightContainer}>
        <div
          style={{
            marginBottom: '16px',
            borderBottom: 'solid 1px rgba(0, 0, 0, 0.2)',
          }}>
          <p className={classes.AboutLabel}>About Company</p>
          {props.isHidden ? (
            <p className={classes.AboutText}>Data perusahaan dirahasiakan</p>
          ) : (
            <p className={classes.AboutText}>{props.companyDetails}</p>
          )}
        </div>

        <div>
          <p className={classes.AboutLabel}>Location</p>
          <p className={classes.AboutLabel}>{props.placementLocation}</p>
        </div>
      </div>
    </div>
  );

  if (props.job.isLoading) {
    containerContent = <LoadingBar />;
  }

  return containerContent;
};
const mapStateToProps = state => {
  return {
    admin: state.admin,
    auth: state.auth,
    companies: state.company.companies,
    job: state.job,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // deleteJob: payload => dispatch(actionCreators.deleteJob(payload)),
    applyJob: payload => dispatch(actionCreators.applyJob(payload)),
    releaseJob: payload => dispatch(actionCreators.releaseJob(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(JobDetails));
