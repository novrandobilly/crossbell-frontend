import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useForm } from '../../../../shared/utils/useForm';
import * as actionTypes from '../../../../store/actions/actions';
import * as actionCreators from '../../../../store/actions/index';

import Button from '@material-ui/core/Button';
import Input from '../../../../shared/UI_Element/Input';
import SpinnerCircle from '../../../../shared/UI_Element/Spinner/SpinnerCircle';
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../../../../shared/utils/validator';

import classes from './AdmReg.module.css';

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
			role: {
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
			role: formState.inputs.role.value,
			verificationKey: formState.inputs.verificationKey.value
		};

		try {
			const res = await props.admReg(newAdmin);
			console.log(res);
			if (res.token) {
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

				<div className={classes.Content}>
					<div className={classes.ContentTop}>
						<div className={classes.ContentLeft}>
							<Input
								inputType='input'
								id='NIK'
								InputClass='Register'
								validatorMethod={[ VALIDATOR_REQUIRE() ]}
								onInputHandler={onInputHandler}
								label='NIK*'
							/>

							<Input
								inputType='input'
								id='firstName'
								InputClass='Register'
								validatorMethod={[ VALIDATOR_REQUIRE() ]}
								onInputHandler={onInputHandler}
								label='Nama Depan*'
							/>

							<Input
								inputType='input'
								id='gender'
								InputClass='Register'
								validatorMethod={[ VALIDATOR_REQUIRE() ]}
								onInputHandler={onInputHandler}
								label='Jenis Kelamin*'
							/>

							<Input
								inputType='input'
								id='role'
								InputClass='Register'
								validatorMethod={[ VALIDATOR_REQUIRE() ]}
								onInputHandler={onInputHandler}
								label='Pekerjaan*'
							/>

							<Input
								inputType='input'
								id='email'
								InputClass='Register'
								validatorMethod={[ VALIDATOR_EMAIL() ]}
								onInputHandler={onInputHandler}
								label='Email*'
							/>
						</div>

						<div className={classes.ContentRight}>
							<Input
								inputType='input'
								id='dateOfBirth'
								InputClass='Register'
								validatorMethod={[ VALIDATOR_REQUIRE() ]}
								onInputHandler={onInputHandler}
								label='Tanggal Lahir*'
							/>

							<Input
								inputType='input'
								id='lastName'
								InputClass='Register'
								validatorMethod={[ VALIDATOR_REQUIRE() ]}
								onInputHandler={onInputHandler}
								label='Nama Belakang*'
							/>

							<Input
								inputType='input'
								id='phoneNumber'
								InputClass='Register'
								validatorMethod={[ VALIDATOR_REQUIRE() ]}
								onInputHandler={onInputHandler}
								label='Nomor Telepon*'
							/>

							<Input
								inputType='input'
								id='address'
								InputClass='Register'
								validatorMethod={[ VALIDATOR_REQUIRE() ]}
								onInputHandler={onInputHandler}
								label='Alamat*'
							/>

							<Input
								inputType='input'
								id='password'
								InputClass='Register'
								validatorMethod={[ VALIDATOR_MINLENGTH(8) ]}
								onInputHandler={onInputHandler}
								label='Password*'
								type='password'
							/>
						</div>
					</div>

					<div className={classes.ContentBottom}>
						<Input
							inputType='input'
							id='verificationKey'
							InputClass='Register'
							validatorMethod={[ VALIDATOR_REQUIRE() ]}
							onInputHandler={onInputHandler}
							label='Kode Verifikasi*'
							type='password'
						/>

						<Button
							variant='contained'
							color='primary'
							type='submit'
							disableElevation
							disabled={!formState.formIsValid}
							style={{
								marginTop: '1rem'
							}}>
							submit
						</Button>

						<span className={classes.Sign}>
							<button className={classes.ChangeSign} type='button' onClick={props.switchSignIn}>
								Admin Sign In
							</button>
						</span>
					</div>
				</div>
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
