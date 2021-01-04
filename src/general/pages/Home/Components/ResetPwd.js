import React, { useState, useEffect } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { VALIDATOR_MINLENGTH } from '../../../../shared/utils/validator';
import { useForm } from '../../../../shared/utils/useForm';
import { connect } from 'react-redux';
import * as actionCreators from '../../../../store/actions';

import classes from './ForgotPwd.module.css';
import Input from '../../../../shared/UI_Element/Input';
import Spinner from '../../../../shared/UI_Element/Spinner/SpinnerCircle';

const ResetPwd = props => {
	const [ tokenIsValid, setTokenIsValid ] = useState(false);
	const [ formState, onInputHandler ] = useForm(
		{
			newPassword: {
				value: '',
				isValid: false
			},
			confirmPassword: {
				value: '',
				isValid: false
			}
		},
		false
	);
	const { token } = useParams();

	const { getResetPwd } = props;
	useEffect(
		() => {
			const payload = { token };
			const execGetResetPwd = async () => {
				try {
					const res = await getResetPwd(payload);
					console.log(res);
					if (res.tokenIsValid) {
						setTokenIsValid(true);
					}
				} catch (err) {
					console.log(err);
				}
			};
			execGetResetPwd();
		},
		[ getResetPwd, token ]
	);

	const onSubmitResetHandler = async event => {
		event.preventDefault();
		const payload = {
			newPassword: formState.inputs.newPassword.value,
			confirmPassword: formState.inputs.confirmPassword.value,
			resetToken: token
		};
		try {
			await props.resetPwd(payload);
			props.history.replace('/jobs-dashboard');
		} catch (err) {
			console.log(err);
		}
	};

	let content = (
		<div style={{ margin: '6rem auto' }}>
			<Spinner />;
		</div>
	);

	if (tokenIsValid && !props.auth.isLoading) {
		content = (
			<form onSubmit={onSubmitResetHandler}>
				<div className={classes.ContainerFlex}>
					<p className={classes.FormTitle}>Set New Password</p>

					<Input
						inputType='input'
						type='password'
						id='newPassword'
						inputClass='Forgot_Password'
						validatorMethod={[ VALIDATOR_MINLENGTH(6) ]}
						onInputHandler={onInputHandler}
						label='New Password*'
					/>
					<Input
						inputType='input'
						type='password'
						id='confirmPassword'
						inputClass='Forgot_Password'
						validatorMethod={[ VALIDATOR_MINLENGTH(6) ]}
						onInputHandler={onInputHandler}
						label='Confirm Password*'
					/>

					<button disabled={!formState.formIsValid} className={classes.SubmitButton}>
						<span>Submit</span>
					</button>
				</div>
			</form>
		);
	}
	return content;
};

const mapStateToProps = state => {
	return {
		auth: state.auth
	};
};

const mapDispatchToProps = dispatch => {
	return {
		resetPwd: payload => dispatch(actionCreators.resetPwd(payload)),
		getResetPwd: payload => dispatch(actionCreators.getResetPwd(payload))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ResetPwd));
