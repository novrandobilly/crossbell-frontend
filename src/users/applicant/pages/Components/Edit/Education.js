import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, withRouter } from 'react-router-dom';
import { useForm } from '../../../../../shared/utils/useForm';
import moment from 'moment';

import * as actionTypes from '../../../../../store/actions/actions';
import * as actionCreators from '../../../../../store/actions/index';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_ALWAYSTRUE } from '../../../../../shared/utils/validator';

import Modal from '../../../../../shared/UI_Element/Modal';
import SpinnerCircle from '../../../../../shared/UI_Element/Spinner/SpinnerCircle';
import Input from '../../../../../shared/UI_Element/Input';
import SaveButton from '../../../../../shared/UI_Element/SaveButton';

import classes from './Education.module.css';

const Education = props => {
	const { applicantid } = useParams();
	const { educationindex } = useParams();

	const [ data, setData ] = useState();
	// const [isLoading, setIsLoading] = useState(true);

	const { getOneApplicant } = props;
	useEffect(
		() => {
			getOneApplicant(applicantid).then(res => {
				setData(res.applicant.education[educationindex]);
				// setIsLoading(false);
			});
		},
		[ getOneApplicant, applicantid, educationindex ]
	);

	const [ formState, onInputHandler ] = useForm(
		{
			school: {
				value: data ? data.school : null,
				isValid: data && data.school ? true : false
			},
			degree: {
				value: data ? data.degree : null,
				isValid: data && data.degree ? true : false
			},
			major: {
				value: data ? data.major : null,
				isValid: data && data.major ? true : false
			},
			location: {
				value: data ? data.location : null,
				isValid: data && data.location ? true : false
			},
			startDate: {
				value: data ? data.startDate : null,
				isValid: data && data.startDate ? true : false
			},
			endDate: {
				value: data ? data.endDate : null,
				isValid: data && data.endDate ? true : false
			},
			description: {
				value: data ? data.description : null,
				isValid: data && data.description ? true : false
			}
		},
		false
	);

	const onSubmitHandler = async event => {
		event.preventDefault();

		if (!formState.formIsValid) {
			return props.updateApplicantFail();
		}

		const updatedEducation = {
			applicantId: applicantid,
			index: educationindex,
			school: formState.inputs.school.value,
			degree: formState.inputs.degree.value,
			major: formState.inputs.major.value,
			location: formState.inputs.location.value,
			startDate: formState.inputs.startDate.value,
			endDate: formState.inputs.endDate.value,
			description: formState.inputs.description.value
		};
		try {
			const res = await props.updateApplicantEducation(updatedEducation);
			if (res) {
				console.log(res);
			} else {
				console.log('no res detected');
			}
			props.history.push(`/ap/${applicantid}`);
		} catch (err) {
			console.log(err);
		}
	};

	let formContent = <SpinnerCircle />;
	console.log(formState);
	if (!props.isLoading && data) {
		formContent = (
			<div className={classes.ContainerFlex}>
				<p className={classes.FormTitle}>Education</p>

				<div className={classes.FormRow}>
					<div className={classes.EditLabel}>
						<Input
							inputType='input'
							id='school'
							inputClass='AddJobInput'
							validatorMethod={[ VALIDATOR_REQUIRE() ]}
							onInputHandler={onInputHandler}
							label='School *'
							initValue={data.school}
							initIsValid={true}
						/>
					</div>

					<div className={classes.EditLabel}>
						<Input
							inputType='input'
							id='degree'
							inputClass='AddJobInput'
							validatorMethod={[ VALIDATOR_REQUIRE() ]}
							onInputHandler={onInputHandler}
							label='Degree *'
							initValue={data.degree}
							initIsValid={true}
						/>
					</div>

					<div className={classes.EditLabel}>
						<Input
							inputType='input'
							id='major'
							inputClass='AddJobInput'
							validatorMethod={[ VALIDATOR_REQUIRE() ]}
							onInputHandler={onInputHandler}
							label='Field of Study *'
							initValue={data.major}
							initIsValid={true}
						/>
					</div>

					<div className={classes.EditLabel}>
						<Input
							inputType='input'
							id='location'
							inputClass='AddJobInput'
							validatorMethod={[ VALIDATOR_REQUIRE() ]}
							onInputHandler={onInputHandler}
							label='Location *'
							initValue={data.location}
							initIsValid={true}
						/>
					</div>

					<div className={classes.Period}>
						<div className={classes.EditLabel}>
							<Input
								inputType='customdate'
								id='startDate'
								validatorMethod={[ VALIDATOR_ALWAYSTRUE() ]}
								onInputHandler={onInputHandler}
								views={[ 'year' ]}
								label='Tahun Mulai'
								maxDate={moment()}
								initValue={data.startDate}
								initIsValid={true}
							/>
						</div>

						<div className={classes.EditLabel}>
							<Input
								inputType='customdate'
								id='endDate'
								validatorMethod={[ VALIDATOR_ALWAYSTRUE() ]}
								onInputHandler={onInputHandler}
								views={[ 'year' ]}
								label='Tahun Selesai'
								maxDate={moment()}
								initValue={data.endDate}
								initIsValid={true}
							/>
						</div>
					</div>

					<div className={classes.EditLabel}>
						<Input
							inputType='textarea'
							id='description'
							inputClass='EditProfileTextArea'
							validatorMethod={[ VALIDATOR_MINLENGTH(20) ]}
							onInputHandler={onInputHandler}
							label='Description *'
							initValue={data.description}
							initIsValid={true}
						/>
					</div>
				</div>

				<SaveButton btnClass='SaveButton' disabled={!formState.formIsValid} placeholder='Save' />
			</div>
		);
	}

	const onCancelHandler = () => {
		props.resetApplicant();
	};

	return (
		<form onSubmit={onSubmitHandler} className={classes.Container}>
			<Modal show={props.error} onCancel={onCancelHandler}>
				Could not update changes at the moment, please try again later
			</Modal>
			{formContent}
		</form>
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
		updateApplicantFail: () => dispatch({ type: actionTypes.UPDATEAPPLICANTFAIL }),
		resetApplicant: () => dispatch({ type: actionTypes.APPLICANTRESET }),
		getOneApplicant: data => dispatch(actionCreators.getOneApplicant(data)),
		updateApplicantEducation: ApplicantData => dispatch(actionCreators.updateApplicantEducation(ApplicantData))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Education));
