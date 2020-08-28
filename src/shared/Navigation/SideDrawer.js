import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import classes from './SideDrawer.module.css';

const SideDrawer = props => {
	const sideDrawer = (
		<CSSTransition in={props.show} timeout={400} classNames='slide-in-left' mountOnEnter unmountOnExit>
			<aside className={classes.SideDrawer}>{props.children}</aside>
		</CSSTransition>
	);
	return ReactDOM.createPortal(sideDrawer, document.getElementById('drawer-hook'));
};

export default SideDrawer;
