import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useForm } from '../../../../shared/utils/useForm';
import * as actionTypes from '../../../../store/actions/actions';
import * as actionCreators from '../../../../store/actions/index';

import Input from '../../../../shared/UI_Element/Input';
import SpinnerCircle from '../../../../shared/UI_Element/Spinner/SpinnerCircle';
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../../../../shared/utils/validator';

import classes from './Register.module.css';

const Register = props => {
	const [ formState, onInputHandler ] = useForm(
		{
			firstName: {
				value: '',
				isValid: false
			},
			lastName: {
				value: '',
				isValid: false
			},
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
		const newApplicant = {
			firstName: formState.inputs.firstName.value,
			lastName: formState.inputs.lastName.value,
			email: formState.inputs.email.value,
			password: formState.inputs.password.value
		};

		try {
			const res = await props.createApplicant(newApplicant);
			console.log(res);
			if (res) {
				props.login({ token: res.token, userId: res.userId, isCompany: res.isCompany });
				console.log(res);
				props.history.push(`/ap/${res.userId}/res-val`);
			} else {
				throw new Error('Error nih bro');
			}
		} catch (err) {
			console.log(err);
		}
	};

	let formContent = (
		<React.Fragment>
			<div className={classes.ContainerFlex}>
				<p className={classes.FormTitle}>Applicant Sign Up</p>

				<button className={classes.CompanyRegister} onClick={props.role} type='button'>
					Company sign up
				</button>

				<Input
					inputType='input'
					id='firstName'
					inputClass='Register'
					validatorMethod={[ VALIDATOR_REQUIRE() ]}
					onInputHandler={onInputHandler}
					label='First Name*'
				/>

				<Input
					inputType='input'
					id='lastName'
					inputClass='Register'
					validatorMethod={[ VALIDATOR_REQUIRE() ]}
					onInputHandler={onInputHandler}
					label='Last Name*'
				/>

				<Input
					inputType='input'
					id='email'
					inputClass='Register'
					validatorMethod={[ VALIDATOR_EMAIL() ]}
					onInputHandler={onInputHandler}
					label='Email*'
				/>

				<Input
					inputType='input'
					id='password'
					inputClass='Register'
					validatorMethod={[ VALIDATOR_MINLENGTH(6) ]}
					onInputHandler={onInputHandler}
					label='Password*'
					type='password'
				/>

				<button disabled={!formState.formIsValid} className={classes.SubmitButton}>
					<span>Submit</span>
				</button>

				<span className={classes.Sign}>
					Already have an account?
					<button className={classes.ChangeSign} type='button' onClick={props.sign}>
						Sign In Here
					</button>
				</span>
			</div>
		</React.Fragment>
	);

	if (props.isLoading) {
		formContent = <SpinnerCircle />;
	}

	return (
		<form onSubmit={onSubmitHandler} className={classes.Container}>
			{formContent}
		</form>
	);
};
const mapStateToProps = state => {
	return {
		isLoading: state.company.isLoading
	};
};

const mapDispatchToProps = dispatch => {
	return {
		createApplicant: newApplicant => dispatch(actionCreators.createApplicant(newApplicant)),
		login: payload => dispatch({ type: actionTypes.AUTHLOGIN, payload })
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));
