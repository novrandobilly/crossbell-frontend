import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationLinks.module.css';

const NavigationLinks = () => {
	return (
		<ul className={classes.NavLinks}>
			<li>
				<NavLink to='/'>Home</NavLink>
			</li>
			<li>
				<NavLink to='/jobs-dashboard'>Explore Jobs</NavLink>
			</li>
			<li>
				<NavLink to='/blogs'>Blog & Article</NavLink>
			</li>
			<li>
				<NavLink to='/authentication/ap'>Jobseeker</NavLink>
			</li>
			<li>
				<NavLink to='/authentication/co'>Employer</NavLink>
			</li>
			<li>
				<NavLink to='/ap/:applicantid'>My Profile</NavLink>
			</li>
		</ul>
	);
};

export default NavigationLinks;
