import React, { useState, useEffect, Fragment, useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import moment from 'moment';
import * as actionCreators from '../../store/actions';
import * as actionTypes from '../../store/actions/actions';
import { LoginContext } from '../../store/LoginContext';

import Modal from '../../shared/UI_Element/Modal';
import LoadingBar from '../../shared/UI_Element/Spinner/LoadingBar';
import Button from '../../shared/UI_Element/Button';
import BlankCompany from '../../assets/images/Company.png';

import styles from './JobCard.module.scss';

const JobCard = (props) => {
  const [jobId, setJobId] = useState(null);
  const [applicantList, setApplicantList] = useState([]);
  const [applyConfirm, setApplyConfirm] = useState(false);
  const loginCtx = useContext(LoginContext);

  //=====================================INSTANT APPLY=====================================
  const onOpenApplyConfirmHandler = () => setApplyConfirm(true);
  const onCloseApplyConfirmHandler = () => setApplyConfirm(false);

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
      onCloseApplyConfirmHandler();
    } catch (err) {
      console.log(err);
      setJobId(null);
      onCloseApplyConfirmHandler();
      return props.createJobFail();
    }
  };
  const profileCompletionHandler = () => {
    onCloseApplyConfirmHandler();
    props.history.push(`/ap/${props.auth.userId}/profile`);
  };

  useEffect(() => {
    setApplicantList(props.jobApplicant);
  }, [props.jobApplicant]);

  let instantApplyButton;

  if (!props.auth.isCompany && !props.admin.isAdmin) {
    instantApplyButton = (
      <Button btnType='InstantApply' onClick={() => loginCtx.showLogin()}>
        Apply
      </Button>
    );
  }

  if (!props.auth.isCompany && props.auth.token) {
    instantApplyButton = (
      <Button
        btnType='InstantApply'
        onClick={onOpenApplyConfirmHandler}
        disabled={applicantList.some((appId) => appId.toString() === props.auth.userId.toString())}>
        {applicantList.some((appId) => appId.toString() === props.auth.userId.toString()) ? 'Applied' : 'Apply'}
      </Button>
    );
  }

  //   =====================================================================================
  let salary = parseInt(props.salary);

  const onCancelHandler = () => {
    props.resetJob();
  };
  return (
    <Fragment>
      <Modal
        show={applyConfirm}
        headerText='Anda yakin melamar pekerjaan ini?'
        onCancel={onCloseApplyConfirmHandler}
        style={{ top: '30vh', maxWidth: '600px', marginLeft: '-300px', height: '30vh', overflowY: 'auto' }}>
        <div className={styles.ApplicationModal}>
          <p>Pastikan profile anda sudah anda lengkapi untuk memudahkan perusahaan memahami potensi diri anda.</p>

          <div className={styles.ApplyButtonContainer}>
            {props.job.isLoading && jobId === props.jobId ? (
              <LoadingBar style={{ margin: '0 0 10px' }} />
            ) : (
              <>
                <button type='button' onClick={onCloseApplyConfirmHandler}>
                  Cancel
                </button>
                <button type='button' onClick={applyHandler}>
                  Apply
                </button>
              </>
            )}
          </div>
          <p className={styles.ProfileCompletion} onClick={profileCompletionHandler}>
            <em>Lengkapi profile sekarang</em>
          </p>
        </div>
      </Modal>

      <div className={styles.JobCard}>
        <Modal show={props.job.error} onCancel={onCancelHandler}>
          Tidak dapat melamar pekerjaan untuk saat ini{' '}
        </Modal>
        <div className={styles.Logo}>
          <img src={props.logo && !props.isHidden ? props.logo.url : BlankCompany} alt='company-logo' />
        </div>
        <div className={styles.Content}>
          <div className={styles.ContentHeader}>
            <p className={styles.JobTitle}>
              <Link to={`/jobs/${props.jobId}`} style={{ textDecoration: 'inherit', color: 'inherit' }}>
                {props.jobTitle}
              </Link>
            </p>
            <p className={styles.FieldOfWork}>
              <em>{props.fieldOfWork?.filter((fow) => fow).join(', ')}</em>
            </p>
            <p>Pengalaman: {props.jobExperience} tahun</p>
            <p>Pendidikan: {props.educationalStage}</p>
          </div>

          <div className={styles.Company}>
            {props.isHidden ? (
              <span className={styles.TextSecret}>Perusahaan {props.fieldOfWork[0]}</span>
            ) : (
              <Link to={`/co/${props.companyId._id}/profile`} style={{ textDecoration: 'inherit', color: 'inherit' }}>
                <span className={styles.TextLeft}>{props.company}</span>
              </Link>
            )}
          </div>
          <p className={styles.Placement}> {props.placementLocation}</p>
          <p className={styles.Salary}>
            {props.salary && props.salary > 0 ? `IDR ${salary.toLocaleString()} /bulan` : 'Gaji Tidak Ditampilkan'}
          </p>

          {/* <p className={styles.Date}>{moment().diff(moment(props.releasedAt), 'days')} hari lalu</p> */}
          {/* 
          <Link
            to={`/jobs/${props.jobId}`}
            style={{
              textDecoration: 'inherit',
              fontWeight: '500',
              color: 'rgba(0,0,0,0.6)',
            }}>
            Details
          </Link> */}
        </div>
        <div className={styles.InstantSubmit}>{instantApplyButton}</div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    companies: state.company.companies,
    auth: state.auth,
    admin: state.admin,
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(JobCard));
