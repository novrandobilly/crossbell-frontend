import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actionTypes from '../../../../store/actions/actions';
import { useForm } from '../../../../shared/utils/useForm';

import Input from '../../../../shared/UI_Element/Input';
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

	const onSubmitHandler = event => {
		event.preventDefault();
		console.log(formState);
		props.login();
		props.history.push('/jobs-dashboard');
	};

	return (
		<React.Fragment>
			<form onSubmit={onSubmitHandler} className={classes.Container}>
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
							Click Here
						</button>
					</span>
				</div>
			</form>
		</React.Fragment>
	);
};

const mapDispatchToProps = dispatch => {
	return {
		login: () => dispatch({ type: actionTypes.AUTHLOGIN })
	};
};

export default connect(null, mapDispatchToProps)(withRouter(Login));
