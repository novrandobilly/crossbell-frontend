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
			NIK: {
				value: '',
				isValid: false
			},
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
			},
			gender: {
				value: '',
				isValid: false
			},
			dateOfBirth: {
				value: '',
				isValid: false
			},
			address: {
				value: '',
				isValid: false
			},
			phoneNumber: {
				value: '',
				isValid: false
			},
			jobTitle: {
				value: '',
				isValid: false
			},
			verificationKey: {
				value: '',
				isValid: false
			}
		},
		false
	);

	const onSubmitHandler = async event => {
		event.preventDefault();
		const newAdmin = {
			NIK: formState.inputs.NIK.value,
			firstName: formState.inputs.firstName.value,
			lastName: formState.inputs.lastName.value,
			email: formState.inputs.email.value,
			password: formState.inputs.password.value,
			gender: formState.inputs.gender.value,
			dateOfBirth: formState.inputs.dateOfBirth.value,
			address: formState.inputs.address.value,
			phoneNumber: formState.inputs.phoneNumber.value,
			jobTitle: formState.inputs.jobTitle.value,
			verificationKey: formState.inputs.verificationKey.value
		};

		try {
			const res = await props.admReg(newAdmin);
			console.log(res);
			if (res) {
				props.history.push(`/jobs-dashboard`);
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
				<p className={classes.FormTitle}>Admin Sign Up</p>

				<Input
					inputType='input'
					id='NIK'
					inputClass='Register'
					validatorMethod={[ VALIDATOR_REQUIRE() ]}
					onInputHandler={onInputHandler}
					label='NIK*'
				/>

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
					validatorMethod={[ VALIDATOR_MINLENGTH(8) ]}
					onInputHandler={onInputHandler}
					label='Password*'
					type='password'
				/>

				<Input
					inputType='input'
					id='gender'
					inputClass='Register'
					validatorMethod={[ VALIDATOR_REQUIRE() ]}
					onInputHandler={onInputHandler}
					label='Gender*'
				/>
				<Input
					inputType='input'
					id='dateOfBirth'
					inputClass='Register'
					validatorMethod={[ VALIDATOR_REQUIRE() ]}
					onInputHandler={onInputHandler}
					label='Date Of Birth*'
				/>
				<Input
					inputType='input'
					id='address'
					inputClass='Register'
					validatorMethod={[ VALIDATOR_REQUIRE() ]}
					onInputHandler={onInputHandler}
					label='Address*'
				/>
				<Input
					inputType='input'
					id='phoneNumber'
					inputClass='Register'
					validatorMethod={[ VALIDATOR_REQUIRE() ]}
					onInputHandler={onInputHandler}
					label='Phone Number*'
				/>
				<Input
					inputType='input'
					id='jobTitle'
					inputClass='Register'
					validatorMethod={[ VALIDATOR_REQUIRE() ]}
					onInputHandler={onInputHandler}
					label='Job Title*'
				/>

				<Input
					inputType='input'
					id='verificationKey'
					inputClass='Register'
					validatorMethod={[ VALIDATOR_REQUIRE() ]}
					onInputHandler={onInputHandler}
					label='Verification Key*'
					type='password'
				/>

				<button disabled={!formState.formIsValid} className={classes.SubmitButton}>
					<span>Submit</span>
				</button>

				<span className={classes.Sign}>
					<button className={classes.ChangeSign} type='button' onClick={props.switchSignIn}>
						Admin Sign In
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
		isLoading: state.admin.isLoading
	};
};

const mapDispatchToProps = dispatch => {
	return {
		admReg: payload => dispatch(actionCreators.admReg(payload)),
		login: payload => dispatch({ type: actionTypes.AUTHLOGIN, payload })
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));
