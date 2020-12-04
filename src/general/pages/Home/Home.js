import React from 'react';
import { connect } from 'react-redux';
import { VALIDATOR_REQUIRE } from '../../../shared/utils/validator';


import Carousel from './Components/Carousel';
import Input from '../../../shared/UI_Element/Input';
import Button from '../../../shared/UI_Element/Button';
import AuthForm from './Components/AuthForm';
import classes from './Home.module.css';

const Home = props => {
	return (
		<React.Fragment>
			<Carousel />
			<div className={classes.Content}>
				<div>
					<p className={classes.About}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
						aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
						Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
						sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					</p>
					<div className={classes.Search}>
						<Input
							inputType='input'
							id='QueryHome'
							inputClass='QueryHome'
							validatorMethod={[ VALIDATOR_REQUIRE() ]}
							// onInputHandler={onInputHandler}
							placeholder='Search for jobs'
						/>
						<Button children='Search' btnType='SearchButton' type='Button' />
					</div>
				</div>
				<div className={classes.Margin}>{!props.auth.isLoggedIn && !props.admin.isLoggedIn && <AuthForm />}</div>
			</div>
		</React.Fragment>
	);

};

const mapStateToProps = state => {
	return {
		auth: state.auth,
		admin: state.admin
	};
};

export default connect(mapStateToProps)(Home);
