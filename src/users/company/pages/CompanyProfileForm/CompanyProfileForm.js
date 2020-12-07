import React, { useState } from 'react';

import EditIntro from '../Components/EditIntro';
import EditCompanyBriefDescriptions from '../Components/EditCompanyBriefDescriptions';
import EditPIC from '../Components/EditPIC';
import classes from './CompanyProfileForm.module.css';

const CompanyProfileForm = props => {
	const [ push, setPush ] = useState(true);

	const pushHandler = () => {
		setPush(!push);
	};

	return (
		<div className={classes.Form}>
			<EditIntro FlexClass='FlexContainer' push={push} pushHandler={pushHandler} />
			<EditCompanyBriefDescriptions push={push} pushHandler={pushHandler} />
			<EditPIC push={push} pushHandler={pushHandler} />
		</div>
	);
};

export default CompanyProfileForm;
