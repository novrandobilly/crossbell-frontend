import React, { useCallback, useEffect, useState } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import { connect } from 'react-redux';

import * as actionCreators from '../../../store/actions/index';
import * as actionTypes from '../../../store/actions/actions';
import LoadingBar from '../../../shared/UI_Element/Spinner/LoadingBar';
import ApplicantProfile from '../components/ApplicantProfile';
import Modal from '../../../shared/UI_Element/Modal';
import HeaderBanner from '../../../shared/UI_Element/HeaderBanner';
import MeetingDashboard from '../../../assets/images/Meeting-Dashboard.png';
import styles from './ApplicantDetails.module.scss';

const ApplicantDetails = props => {
  const { applicantid } = useParams();
  const [data, setData] = useState(null);

  const { getOneApplicant } = props;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fetchApplicantData = useCallback(() => {
    const payload = {
      applicantId: applicantid,
      token: props.auth.token || props.admin.token,
    };
    getOneApplicant(payload)
      .then(res => {
        setData(res.applicant);
      })
      .catch(err => console.log(err));
  }, [getOneApplicant, applicantid, props.auth.token, props.admin.token]);

  useEffect(() => {
    fetchApplicantData();
  }, [fetchApplicantData]);

  const onCancelHandler = () => {
    props.history.push(`/`);
    props.resetApplicant();
  };
  let applicantProfileContent = <LoadingBar />;
  if (props.applicant.error) {
    applicantProfileContent = (
      <Modal show={props.applicant.error} onCancel={onCancelHandler}>
        Anda tidak memiliki akses masuk ke halaman ini
      </Modal>
    );
  }

  if (data) {
    applicantProfileContent = (
      <ApplicantProfile
        //======================== Applicant Intro
        data={data}
        fetchApplicantData={fetchApplicantData}
      />
    );
  }

  return (
    <div className={styles.ApplicantDetailsContainer}>
      <HeaderBanner imageSource={MeetingDashboard} />
      {applicantProfileContent}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    admin: state.admin,
    auth: state.auth,
    applicant: state.applicant,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getOneApplicant: payload => dispatch(actionCreators.getOneApplicant(payload)),
    resetApplicant: () => dispatch({ type: actionTypes.APPLICANTRESET }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ApplicantDetails));
