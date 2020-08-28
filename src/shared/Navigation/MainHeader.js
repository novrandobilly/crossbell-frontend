import React from 'react';

import classes from './MainHeader.module.css';

const MainHeader = props => {
	return <header className={classes.MainHeader}>{props.children}</header>;
};

export default MainHeader;
