import React, { useState } from 'react';

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

	console.log(role);

	if (role) {
		return <div>{!sign ? <CompanyForm sign={toggleSign} role={toggleRole} /> : <Login sign={toggleSign} />}</div>;
	} else {
		return <div>{!sign ? <Register sign={toggleSign} role={toggleRole} /> : <Login sign={toggleSign} />}</div>;
	}
};

export default AuthForm;
