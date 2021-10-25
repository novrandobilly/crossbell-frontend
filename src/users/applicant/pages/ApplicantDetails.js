import React, { useEffect, useState } from 'react';
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

  const { getOneApplicant, getApplicantFail } = props;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const payload = {
      applicantId: applicantid,
      token: props.auth.token || props.admin.token,
    };
    getOneApplicant(payload)
      .then(res => {
        setData(res.applicant);
      })
      .catch(err => console.log(err));
  }, [getOneApplicant, applicantid, props.auth.token, props.auth.isCompany, props.admin.token, getApplicantFail]);

  const onCancelHandler = () => {
    props.history.push(`/`);
    props.resetApplicant();
  };
  console.log(data);
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
        key={data.id}
        id={data.id}
        firstName={data.firstName}
        lastName={data.lastName}
        headline={data.headline}
        dateOfBirth={data.dateOfBirth}
        address={data.address}
        city={data.city}
        state={data.state}
        zip={data.zip}
        email={data.email}
        phone={data.phone}
        details={data.details}
        gender={data.gender}
        picture={data.picture}
        resume={data.resume}
        salary={data.salary}
        // ======================================== Applicant Education
        education={data.education}
        //============================================= Applicant Experience
        experience={data.experience}
        //================================================ Applicant Certification
        certification={data.certification}
        //================================================ Applicant Organization
        organization={data.organization}
        //=========================================== Applicant Skill
        skills={data.skills}
        //=========================================== Applicant Languages
        languages={data.languages}
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
    getApplicantFail: () => dispatch({ type: actionTypes.GETAPPLICANTFAIL }),
    resetApplicant: () => dispatch({ type: actionTypes.APPLICANTRESET }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ApplicantDetails));
