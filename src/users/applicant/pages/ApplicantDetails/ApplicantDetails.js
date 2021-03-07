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
			console.log(props.auth);
			const payload = {
				applicantId: applicantid,
				token: props.auth.token
			};
			if (props.auth.token) {
				getOneApplicant(payload).then(res => {
					console.log(res);
					setData(res.applicant);
					setIsLoading(false);
				});
			}
		},
		[ getOneApplicant, setIsLoading, applicantid, props.auth ]
	);

	return <React.Fragment>{isLoading ? <SpinnerCircle /> : <Container items={data} id={applicantid} />}</React.Fragment>;
};

const mapDispatchToProps = dispatch => {
	return {
		getOneApplicant: payload => dispatch(actionCreators.getOneApplicant(payload))
	};
};

const mapStateToProps = state => {
	return {
		login: state.auth.isLogin,
		admin: state.auth.isAdmin,
		auth: state.auth,
		applicant: state.applicant
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplicantDetails);
