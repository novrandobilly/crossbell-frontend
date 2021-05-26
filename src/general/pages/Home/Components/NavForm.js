import React from 'react';
import classes from './NavForm.module.css';

const AuthForm = props => {
	return (
		<div className={classes.Container}>
			<div className={classes.SelectorContainer}>
				<div className={classes.SelectorSection} onClick={props.toggleTouch} style={{ backgroundColor: 'white' }}>
					Daftar Sebagai Pelamar
				</div>
				<div className={classes.SelectorSection} onClick={props.toggleTouchCompany} style={{ backgroundColor: '#d7e2ff' }}>
					Daftar Sebagai Perusahaan
				</div>
			</div>
		</div>
	);
};

export default AuthForm;
