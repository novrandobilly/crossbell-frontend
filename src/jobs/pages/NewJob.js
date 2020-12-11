import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useForm } from '../../shared/utils/useForm';
import * as actionCreators from '../../store/actions';

import Spinner from '../../shared/UI_Element/Spinner/SpinnerCircle';
import Input from '../../shared/UI_Element/Input';
import { VALIDATOR_REQUIRE, VALIDATOR_MIN, VALIDATOR_ALWAYSTRUE } from '../../shared/utils/validator';

import classes from './NewJob.module.css';

const NewJob = props => {
	const [ maxSlot, setMaxSlot ] = useState(null);
	const [ formState, onInputHandler ] = useForm(
		{
			jobTitle: {
				value: '',
				isValid: false
			},
			jobDescriptions: {
				value: '',
				isValid: false
			},
			jobQualification: {
				value: '',
				isValid: false
			},
			technicalRequirement: {
				value: '',
				isValid: false
			},
			placementLocation: {
				value: '',
				isValid: false
			},

			emailRecipient: {
				value: '',
				isValid: true
			},
			employment: {
				value: '',
				isValid: true
			},
			salary: {
				value: '',
				isValid: true
			},
			benefit: {
				value: '',
				isValid: true
			},
			slotAllocation: {
				value: null,
				isValid: false
			}
		},
		false
	);
	const { getOneCompany, auth } = props;
	useEffect(
		() => {
			const employment = document.getElementById('employment');
			const salary = document.getElementById('salary');
			const benefit = document.getElementById('benefit');

			onInputHandler('employment', employment.value, true);
			onInputHandler('salary', salary.value, true);
			onInputHandler('benefit', benefit.value, true);

			const getSlot = async () => {
				try {
					if (auth.userId) {
						const res = await getOneCompany({ userId: auth.userId });
						setMaxSlot(res.company.slotREG);
					}
				} catch (err) {
					console.log(err);
				}
			};
			getSlot();
		},
		[ onInputHandler, getOneCompany, auth ]
	);

	const onChangeHandler = e => {
		const elementId = e.target.id;
		const elementValue = e.target.value;
		onInputHandler(elementId, elementValue, true);
	};

	const onSubmitHandler = async event => {
		event.preventDefault();
		const jobData = {
			jobTitle: formState.inputs.jobTitle.value,
			placementLocation: formState.inputs.placementLocation.value,
			jobDescriptions: formState.inputs.jobDescriptions.value,
			jobQualification: formState.inputs.jobQualification.value,
			technicalRequirement: formState.inputs.technicalRequirement.value,
			emailRecipient: formState.inputs.emailRecipient.value,
			employment: formState.inputs.employment.value,
			benefit: formState.inputs.benefit.value,
			slot: formState.inputs.slotAllocation.value,
			salary: formState.inputs.salary.value
		};
		const authData = {
			token: props.auth.token,
			userId: props.auth.userId
		};
		console.log(jobData);
		try {
			const res = await props.createJob(jobData, authData);
			console.log(res);
			props.history.push('/jobs-dashboard');
		} catch (err) {
			console.log(err);
		}
	};

	let formContent = (
		<div className={classes.ContainerFlex}>
			<p className={classes.FormTitle}>New Job Advertisement</p>

			<div className={classes.FormRow}>
				<div className={classes.EditLabel}>
					<Input
						inputType='input'
						id='jobTitle'
						inputClass='AddJobInput'
						validatorMethod={[ VALIDATOR_REQUIRE() ]}
						onInputHandler={onInputHandler}
						label='Job Title*'
					/>

					<Input
						inputType='input'
						id='jobDescriptions'
						inputClass='AddJobInput'
						validatorMethod={[ VALIDATOR_REQUIRE() ]}
						onInputHandler={onInputHandler}
						label='Job Descriptions*'
					/>

					<Input
						inputType='input'
						id='jobQualification'
						inputClass='AddJobInput'
						validatorMethod={[ VALIDATOR_REQUIRE() ]}
						onInputHandler={onInputHandler}
						label='Job Qualification*'
					/>

					<Input
						inputType='input'
						id='technicalRequirement'
						inputClass='AddJobInput'
						validatorMethod={[ VALIDATOR_REQUIRE() ]}
						onInputHandler={onInputHandler}
						label='Technical Requirement*'
					/>

					<Input
						inputType='input'
						id='placementLocation'
						inputClass='AddJobInput'
						validatorMethod={[ VALIDATOR_REQUIRE() ]}
						onInputHandler={onInputHandler}
						label='Lokasi Penempatan*'
					/>

					<label className={classes.LabelName}>Employment Type*</label>
					<select
						id='employment'
						name='employment'
						value={formState.inputs.employment.value}
						onChange={onChangeHandler}
						className={classes.DropDown}>
						<option id='0' value='permanent'>
							Permanent
						</option>
						<option id='1' value='contract'>
							Contract
						</option>
						<option id='2' value='intern'>
							Internship
						</option>
					</select>

					<Input
						inputType='input'
						id='emailRecipient'
						inputClass='AddJobInput'
						validatorMethod={[ VALIDATOR_REQUIRE() ]}
						onInputHandler={onInputHandler}
						label='Email Recipient*'
					/>
					<Input
						inputType='input'
						id='salary'
						inputClass='AddJobInput'
						validatorMethod={[ VALIDATOR_ALWAYSTRUE() ]}
						onInputHandler={onInputHandler}
						label='Salary (optional)'
					/>

					<Input
						inputType='input'
						id='benefit'
						inputClass='AddJobInput'
						validatorMethod={[ VALIDATOR_ALWAYSTRUE() ]}
						onInputHandler={onInputHandler}
						label='Benefits (optional)'
					/>
					<Input
						inputType='number'
						id='slotAllocation'
						inputClass='AddJobInput'
						validatorMethod={[ VALIDATOR_MIN(1) ]}
						onInputHandler={onInputHandler}
						label='Durasi Penayangan* (dalam Minggu)'
						type='number'
						min='0'
						max={parseInt(maxSlot) * 2 || '0'}
						step='2'
					/>
				</div>
			</div>
			<button disabled={!formState.formIsValid} className={classes.SaveButton}>
				<span>Save</span>
			</button>
		</div>
	);

	if (props.job.isLoading) {
		formContent = <Spinner />;
	}

	return (
		<React.Fragment>
			<form onSubmit={onSubmitHandler} className={classes.Container}>
				{formContent}
			</form>
		</React.Fragment>
	);
};

const mapStateToProps = state => {
	return {
		auth: state.auth,
		job: state.job
	};
};
const mapDispatchToProps = dispatch => {
	return {
		createJob: (jobData, authData) => dispatch(actionCreators.createJob(jobData, authData)),
		getOneCompany: payload => dispatch(actionCreators.getOneCompany(payload))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewJob));
