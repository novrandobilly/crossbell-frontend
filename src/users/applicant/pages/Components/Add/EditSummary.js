import React from 'react';
import { connect } from 'react-redux';
import { useParams, withRouter } from 'react-router-dom';
import { useForm } from '../../../../../shared/utils/useForm';

import * as actionTypes from '../../../../../store/actions/actions';
import * as actionCreators from '../../../../../store/actions/index';
import { VALIDATOR_MINLENGTH } from '../../../../../shared/utils/validator';

import Modal from '../../../../../shared/UI_Element/Modal';
import SpinnerCircle from '../../../../../shared/UI_Element/Spinner/SpinnerCircle';
import Input from '../../../../../shared/UI_Element/Input';
import SaveButton from '../../../../../shared/UI_Element/SaveButton';

import classes from './EditSummary.module.css';

const EditSummary = props => {
	const { applicantid } = useParams();
	let push = props.push;

	const [ formState, onInputHandler ] = useForm(
		{
			details: {
				value: '',
				isValid: false
			}
		},
		false
	);

	const onSubmitHandler = async event => {
		event.preventDefault();

		if (!formState.formIsValid) {
			return props.updateApplicantFail();
		}

		const updatedSummary = {
			applicantId: applicantid,
			details: formState.inputs.details.value
		};

		try {
			const res = await props.updateApplicantSummary(updatedSummary);
			if (res) {
				console.log(res);
			} else {
				console.log('no res detected');
			}
			!push && props.history.push(`/ap/${applicantid}`);
		} catch (err) {
			console.log(err);
		}
	};

	let formContent = (
		<React.Fragment>
			<div className={classes.ContainerFlex}>
				<p className={classes.FormTitle}>Summary</p>

				<div className={classes.FormRow}>
					<div className={classes.EditLabel}>
						<Input
							inputType='textarea'
							id='details'
							inputClass='EditProfileTextArea'
							validatorMethod={[ VALIDATOR_MINLENGTH(20) ]}
							onInputHandler={onInputHandler}
							label='Details*'
						/>
					</div>
				</div>

				<SaveButton btnClass='SaveButton' disabled={!formState.formIsValid} placeholder='Save' />
			</div>
		</React.Fragment>
	);

	if (props.isLoading) {
		formContent = <SpinnerCircle />;
	}

	const onCancelHandler = () => {
		props.resetApplicant();
	};

	return (
		<div style={!push ? { marginTop: '6rem' } : { marginTop: '0' }}>
			<form onSubmit={onSubmitHandler} className={classes.Container}>
				<Modal show={props.error} onCancel={onCancelHandler}>
					Input requirement not fulfilled
				</Modal>
				{formContent}
			</form>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		isLoading: state.applicant.isLoading,
		error: state.applicant.error
	};
};

const mapDispatchToProps = dispatch => {
	return {
		resetApplicant: () => dispatch({ type: actionTypes.APPLICANTRESET }),
		updateApplicantFail: () => dispatch({ type: actionTypes.UPDATEAPPLICANTFAIL }),
		updateApplicantSummary: ApplicantData => dispatch(actionCreators.updateApplicantSummary(ApplicantData))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditSummary));
