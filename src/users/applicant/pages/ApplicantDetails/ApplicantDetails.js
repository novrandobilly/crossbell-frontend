import React from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import Applicant from "../ApplicantResumeVal/ApplicantResumeVal";
import Container from "../Components/ApplicantMap";

const ApplicantDetails = (props) => {
  // const { applicantid } = useParams();

  // const applicant = props.applicant.find((app) => app.id === applicantid);

  // return <Container items={applicant} />;
  return <Applicant />;
};

const mapStateToProps = (state) => {
  return {
    applicant: state.applicant.applicants,
  };
};

export default connect(mapStateToProps)(ApplicantDetails);
