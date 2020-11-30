import React, { useState } from 'react';

import AdmReg from './AdmReg';
import AdmSign from './AdmSign';
import classes from './AdmAuth.module.css';

const AdmAuth = () => {
	const [ isSignIn, setIsSignIn ] = useState(true);

	const switchSignUpHandler = () => setIsSignIn(false);
	const switchSignInHandler = () => setIsSignIn(true);
	return (
		<div className={classes.AdmAuth}>
			{isSignIn ? <AdmSign switchSignUp={switchSignUpHandler} /> : <AdmReg switchSignIn={switchSignInHandler} />}
		</div>
	);
};

export default AdmAuth;
