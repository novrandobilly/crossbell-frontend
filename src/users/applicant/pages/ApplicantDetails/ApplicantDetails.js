import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import * as actionCreators from "../../../../store/actions/index";
import SpinnerCircle from "../../../../shared/UI_Element/Spinner/SpinnerCircle";
import Container from "../Components/ApplicantMap";

const ApplicantDetails = (props) => {
  const { applicantid } = useParams();

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { getOneApplicant } = props;
  useEffect(() => {
    getOneApplicant(applicantid).then((res) => {
      setData(res.applicant);
      setIsLoading(false);
    });
  }, [getOneApplicant, setIsLoading, applicantid]);

  return (
    <>
      {isLoading ? (
        <SpinnerCircle />
      ) : (
        <Container items={data} id={applicantid} />
      )}
      ;
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOneApplicant: (data) => dispatch(actionCreators.getOneApplicant(data)),
  };
};

export default connect(null, mapDispatchToProps)(ApplicantDetails);
