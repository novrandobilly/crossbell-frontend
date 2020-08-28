import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationLinks.module.css';

const NavigationLinks = props => {
	return (
		<ul className={classes.NavLinks}>
			<li>
				<NavLink to='/' exact activeClassName={classes.active}>
					Home
				</NavLink>
			</li>
			<li>
				<NavLink to='/jobs-dashboard' activeClassName={classes.active}>
					Explore Jobs
				</NavLink>
			</li>
			<li>
				<NavLink to='/blogs' activeClassName={classes.active}>
					Blog & Article
				</NavLink>
			</li>
			<li>
				<NavLink to='/authentication/ap' activeClassName={classes.active}>
					Jobseeker
				</NavLink>
			</li>
			<li>
				<NavLink to='/authentication/co' activeClassName={classes.active}>
					Employer
				</NavLink>
			</li>
			<li>
				<NavLink to='/ap/:applicantid' activeClassName={classes.active}>
					My Profile
				</NavLink>
			</li>
		</ul>
	);
};

export default NavigationLinks;
