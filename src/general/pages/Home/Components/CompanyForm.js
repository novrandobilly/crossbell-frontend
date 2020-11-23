
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useForm } from '../../../../shared/utils/useForm';
import * as actionTypes from '../../../../store/actions/actions';
import * as actionCreators from '../../../../store/actions/index';

import Modal from '../../../../shared/UI_Element/Modal';
import Input from '../../../../shared/UI_Element/Input';
import SpinnerCircle from '../../../../shared/UI_Element/Spinner/SpinnerCircle';
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../../../../shared/utils/validator';

import classes from './CompanyForm.module.css';

const CompanyForm = props => {
	const [ formState, onInputHandler ] = useForm(
		{
			companyName: {
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
		// console.log(formState);
		// const coId = formState.inputs.companyName.value.slice(0, 3).toUpperCase();
		const newCompany = {
			companyName: formState.inputs.companyName.value,
			email: formState.inputs.email.value,
			password: formState.inputs.password.value
		};

		try {
			const res = await props.createCompany(newCompany);
			if (!res.newCompany) {
				throw new Error("It's error dude!");
			}
			props.login();
			props.authCompany();
			props.history.push(`/co/${res.newCompany.id}/compro`);
		} catch (err) {
			console.log(err);
		}
	};

	let formContent = (
		<React.Fragment>
			<div className={classes.ContainerFlex}>
				<p className={classes.FormTitle}>Company Sign Up</p>

				<button className={classes.ApplicantRegister} onClick={props.role} type='button'>
					Applicant sign up
				</button>

				<Input
					inputType='input'
					id='companyName'
					inputClass='Register'
					validatorMethod={[ VALIDATOR_REQUIRE() ]}
					onInputHandler={onInputHandler}
					label='Company Name*'
				/>

				<Input
					inputType='input'
					id='email'
					inputClass='Register'
					validatorMethod={[ VALIDATOR_EMAIL() ]}
					onInputHandler={onInputHandler}
					label='Company Email*'
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

				<span className={classes.sign}>
					Already have an account?
					<button className={classes.ChangeSign} onClick={props.sign} type='button'>
						Sign In Here
					</button>
				</span>
			</div>
		</React.Fragment>
	);

	if (props.isLoading) {
		formContent = <SpinnerCircle />;
	}

	const onCancelHandler = () => {
		props.resetCompany();
	};

	return (
		<form onSubmit={onSubmitHandler} className={classes.Container}>
			<Modal show={props.error} onCancel={onCancelHandler}>
				Error bro
			</Modal>
			{formContent}
		</form>
	);
};

const mapStateToProps = state => {
	return {
		isLoading: state.company.isLoading,
		error: state.company.error
	};
};

const mapDispatchToProps = dispatch => {
	return {
		createCompany: newCompany => dispatch(actionCreators.createCompany(newCompany)),
		resetCompany: () => dispatch({ type: actionTypes.COMPANYRESET }),
		// createCompany: newCompany => dispatch({ type: actionTypes.CREATECOMPANY, payload: newCompany }),
		login: () => dispatch({ type: actionTypes.AUTHLOGIN }),
		authCompany: () => dispatch({ type: actionTypes.AUTHCOMPANY })
	};

};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CompanyForm));
