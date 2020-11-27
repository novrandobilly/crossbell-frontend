import React from 'react';

import AdmReg from './AdmReg';
import classes from './AdmAuth.module.css';

const AdmAuth = () => {
	return (
		<div className={classes.AdmAuth}>
			<AdmReg />
		</div>
	);
};

export default AdmAuth;
