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

	if (role)
		return (
			<div>
				<h1>This is a homepage </h1>

				{!sign ? <CompanyForm sign={toggleSign} role={toggleRole} /> : <Login sign={toggleSign} />}
			</div>
		);

	return (
		<div>
			<h1>This is a homepage </h1>

			{!sign ? <Register sign={toggleSign} role={toggleRole} /> : <Login sign={toggleSign} />}
		</div>
	);
};

export default AuthForm;
