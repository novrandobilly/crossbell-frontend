import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actionCreators from '../../../../store/actions/index';
import SpinnerCircle from '../../../../shared/UI_Element/Spinner/SpinnerCircle';
import Container from '../Components/ApplicantMap';

const ApplicantDetails = props => {
	const { applicantid } = useParams();

	const [ data, setData ] = useState({});
	const [ isLoading, setIsLoading ] = useState(true);

	const { getOneApplicant } = props;
	useEffect(
		() => {
			getOneApplicant(applicantid).then(res => {
				setData(res.applicant);
				setIsLoading(false);
			});
		},
		[ getOneApplicant, setIsLoading, applicantid ]
	);

	return <React.Fragment>{isLoading ? <SpinnerCircle /> : <Container items={data} id={applicantid} />}</React.Fragment>;
};

const mapDispatchToProps = dispatch => {
	return {
		getOneApplicant: data => dispatch(actionCreators.getOneApplicant(data))
	};
};

const mapStateToProps = state => {
	return {
		login: state.auth.isLogin,
		admin: state.auth.isAdmin,
		applicant: state.applicant
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplicantDetails);
