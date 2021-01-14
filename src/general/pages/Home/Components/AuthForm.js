import React, { useState } from 'react';

import GoogleLoginButton from './GoogleLoginButton';
import Login from './Login';
import CompanyForm from '../Components/CompanyForm';
import Register from './Register';

const AuthForm = () => {
	const [ sign, setSign ] = useState(false);
	const [ role, setRole ] = useState(false);

	const toggleSign = () => {
		setSign(!sign);
	};

	const toggleRole = () => {
		setRole(!role);
	};

	if (role) {
		return (
			<React.Fragment>
				<div>{!sign ? <CompanyForm sign={toggleSign} role={toggleRole} /> : <Login sign={toggleSign} />}</div>
				<GoogleLoginButton />
			</React.Fragment>
		);
	} else {
		return (
			<React.Fragment>
				<div>{!sign ? <Register sign={toggleSign} role={toggleRole} /> : <Login sign={toggleSign} />}</div>
				<GoogleLoginButton />
			</React.Fragment>
		);
	}
};

export default AuthForm;
