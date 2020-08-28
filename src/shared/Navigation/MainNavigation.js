import React from 'react';
import { Link } from 'react-router-dom';

import MainHeader from './MainHeader';
import NavigationLinks from './NavigationLinks';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
	return (
		<MainHeader>
			<button className={classes.MenuBtn}>
				<span />
				<span />
				<span />
			</button>
			<h2 className={classes.Title}>
				<Link to='/'>Kolam Pemancingan</Link>
			</h2>
			<nav>
				<NavigationLinks />
			</nav>
		</MainHeader>
	);
};

export default MainNavigation;
