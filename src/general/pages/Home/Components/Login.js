import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import * as actionTypes from '../../../../store/actions/actions';
import * as actionCreators from '../../../../store/actions';
import { useForm } from '../../../../shared/utils/useForm';

import Input from '../../../../shared/UI_Element/Input';
import Spinner from '../../../../shared/UI_Element/Spinner/SpinnerCircle';
import Modal from '../../../../shared/UI_Element/Modal';

import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../../../../shared/utils/validator';

import classes from './Login.module.css';

const Login = props => {
	const [ formState, onInputHandler ] = useForm(
		{
			email: {
				value: '',
				isValid: false
			},
			password: {
				value: '',
				isValid: false
			}
		},
		false
	);

	const onSubmitHandler = async event => {
		event.preventDefault();

		const loginData = {
			email: formState.inputs.email.value,
			password: formState.inputs.password.value
		};

		let res;
		try {
			res = await props.loginServer(loginData);
			if (!res) {
				throw new Error('Error');
			}
		} catch (err) {
			console.log(err);
		}

		if (res.token) {
			props.history.push('/jobs-dashboard');
		} else {
			console.log('error');
		}
	};

	const onCancelHandler = () => {
		props.logout();
	};

	let formContent = (
		<div className={classes.ContainerFlex}>
			<p className={classes.FormTitle}>Login</p>

			<Input
				inputType='input'
				id='email'
				inputClass='Login'
				validatorMethod={[ VALIDATOR_REQUIRE(), VALIDATOR_EMAIL() ]}
				onInputHandler={onInputHandler}
				label='Email*'
			/>

			<Input
				inputType='input'
				id='password'
				inputClass='Login'
				validatorMethod={[ VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6) ]}
				onInputHandler={onInputHandler}
				label='Password*'
				type='password'
			/>

			<button disabled={!formState.formIsValid} className={classes.SubmitButton}>
				<span>Submit</span>
			</button>

			<span className={classes.sign}>
				Don't have an account
				<button className={classes.ChangeSign} onClick={props.sign} type='button'>
					Sign Up Here
				</button>
			</span>

			<span className={classes.sign}>
				Forgot password?
				<button className={classes.ChangeSign} type='button'>
					<Link style={{ textDecoration: 'none', color: 'rgba(58, 81, 153, 1)' }} to='/forgot'>
						Click Here
					</Link>
				</button>
			</span>
		</div>
	);

	if (props.auth.isLoading) {
		formContent = <Spinner />;
	}
	return (
		<React.Fragment>
			<form onSubmit={onSubmitHandler} className={classes.Container}>
				<Modal show={props.auth.isError} onCancel={onCancelHandler}>
					Email or Password invalid. Please try again.
				</Modal>
				{formContent}
			</form>
		</React.Fragment>
	);
};

const mapStateToProps = state => {
	return {
		auth: state.auth
	};
};

const mapDispatchToProps = dispatch => {
	return {
		isCompany: () => dispatch({ type: actionTypes.AUTHCOMPANY }),
		logout: () => dispatch({ type: actionTypes.AUTHLOGOUT }),
		loginServer: loginData => dispatch(actionCreators.login(loginData))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
