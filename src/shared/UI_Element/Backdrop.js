import React from 'react';
import ReactDOM from 'react-dom';

import classes from './Backdrop.module.css';

const Backdrop = props => {
	return ReactDOM.createPortal(<div className={classes.Backdrop} onClick={props.onClick} />, document.getElementById('backdrop-hook'));
};

export default Backdrop;
