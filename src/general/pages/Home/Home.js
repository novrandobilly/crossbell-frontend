import React from 'react';
import { connect } from 'react-redux';

import AuthForm from './Components/AuthForm';
const Home = props => {
	return (
		<React.Fragment>
			<h1>This is a homepage </h1>
			{!props.auth.isLoggedIn && <AuthForm />}
		</React.Fragment>
	);
};

const mapStateToProps = state => {
	return {
		auth: state.auth
	};
};

export default connect(mapStateToProps)(Home);
