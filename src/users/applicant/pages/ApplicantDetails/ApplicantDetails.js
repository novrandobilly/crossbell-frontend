import React, { useEffect, useState } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import { connect } from 'react-redux';

import * as actionCreators from '../../../../store/actions/index';
import * as actionTypes from '../../../../store/actions/actions';
import SpinnerCircle from '../../../../shared/UI_Element/Spinner/SpinnerCircle';
import Container from '../../Components/ApplicantMap';
import Modal from '../../../../shared/UI_Element/Modal';

const ApplicantDetails = (props) => {
  const { applicantid } = useParams();

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { getOneApplicant, getApplicantFail } = props;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const payload = {
      applicantId: applicantid,
      token: props.auth.token || props.admin.token,
    };
    // if ((props.auth.token && !props.auth.isCompany) || props.admin.token) {
    getOneApplicant(payload)
      .then((res) => {
        setData(res.applicant);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
    // } else {
    //   getApplicantFail();
    // }
  }, [
    setIsLoading,
    getOneApplicant,
    applicantid,
    props.auth.token,
    props.auth.isCompany,
    props.admin.token,
    getApplicantFail,
  ]);

  const onCancelHandler = () => {
    props.history.push(`/`);
    props.resetApplicant();
  };

  return (
    <React.Fragment>
      {isLoading ? (
        <SpinnerCircle />
      ) : props.error ? (
        <Modal show={props.error} onCancel={onCancelHandler}>
          Anda tidak memiliki akses masuk ke halaman ini
        </Modal>
      ) : (
        <Container items={data} id={applicantid} />
      )}
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOneApplicant: (payload) =>
      dispatch(actionCreators.getOneApplicant(payload)),
    getApplicantFail: () => dispatch({ type: actionTypes.GETAPPLICANTFAIL }),
    resetApplicant: () => dispatch({ type: actionTypes.APPLICANTRESET }),
  };
};

const mapStateToProps = (state) => {
  return {
    login: state.auth.isLogin,
    admin: state.admin,
    auth: state.auth,
    applicant: state.applicant,
    error: state.applicant.error,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ApplicantDetails));
