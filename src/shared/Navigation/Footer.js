import React from 'react';

import Address from './Address';
import Logo from '../UI_Element/Logo';

import classes from './Footer.module.css';

const Footer = () => {
	return (
		<div className={classes.Footer}>
			<div className={classes.LogoAddress}>
				<Logo />
				<Address />
			</div>
			<div className={classes.Copyright}>Copyright PT Crossbell 2020</div>
		</div>
	);
};

export default Footer;
