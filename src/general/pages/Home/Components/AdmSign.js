import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actionTypes from '../../../../store/actions/actions';
import * as actionCreators from '../../../../store/actions';
import { useForm } from '../../../../shared/utils/useForm';

import Input from '../../../../shared/UI_Element/Input';
import Spinner from '../../../../shared/UI_Element/Spinner/SpinnerCircle';
import Modal from '../../../../shared/UI_Element/Modal';

import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL } from '../../../../shared/utils/validator';

import classes from './Login.module.css';

const AdmSign = props => {
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
			res = await props.admSignIn(loginData);
			if (!res) {
				throw new Error('Error');
			}
			props.history.push('/jobs-dashboard');
		} catch (err) {
			console.log(err);
		}

		// if (res.token) {
		// 	setIsLoading(false);
		// 	props.login({ token: res.token, userId: res.userId, isCompany: res.isCompany });
		// 	props.history.push('/jobs-dashboard');
		// } else {
		// 	console.log('error');

		// }
	};

	const onCancelHandler = () => {
		props.admLogout();
	};

	let formContent = (
		<div className={classes.ContainerFlex}>
			<p className={classes.FormTitle}>Login</p>

			<Input
				inputType='input'
				id='email'
				inputClass='Login'
				validatorMethod={[ VALIDATOR_EMAIL() ]}
				onInputHandler={onInputHandler}
				label='Email*'
			/>

			<Input
				inputType='input'
				id='password'
				inputClass='Login'
				validatorMethod={[ VALIDATOR_REQUIRE() ]}
				onInputHandler={onInputHandler}
				label='Password*'
				type='password'
			/>

			<button disabled={!formState.formIsValid} className={classes.SubmitButton}>
				<span>Submit</span>
			</button>

			<span className={classes.sign}>
				<button className={classes.ChangeSign} onClick={props.switchSignUp} type='button'>
					Admin Registration
				</button>
			</span>
		</div>
	);

	if (props.admin.isLoading) {
		formContent = <Spinner />;
	}

	return (
		<React.Fragment>
			<form onSubmit={onSubmitHandler} className={classes.Container}>
				<Modal show={props.admin.error} onCancel={onCancelHandler}>
					Email or Password invalid. Please try again.
				</Modal>
				{formContent}
			</form>
		</React.Fragment>
	);
};

const mapStateToProps = state => {
	return {
		admin: state.admin
	};
};

const mapDispatchToProps = dispatch => {
	return {
		admLogout: () => dispatch(actionTypes.ADMINLOGOUT()),
		admSignIn: payload => dispatch(actionCreators.admSignIn(payload))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AdmSign));
