import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useForm } from '../../shared/utils/useForm';
import * as actionCreators from '../../store/actions';

import Spinner from '../../shared/UI_Element/Spinner/SpinnerCircle';
import Input from '../../shared/UI_Element/Input';
import { VALIDATOR_REQUIRE, VALIDATOR_MIN } from '../../shared/utils/validator';

import classes from './NewJob.module.css';

const NewJob = props => {
	const [ maxSlot, setMaxSlot ] = useState(null);
	const [ formState, onInputHandler ] = useForm(
		{
			// jobId: {
			// 	value: '',
			// 	isValid: false
			// },
			jobTitle: {
				value: '',
				isValid: false
			},
			description: {
				value: '',
				isValid: false
			},
			jobFunction: {
				value: '',
				isValid: false
			},
			jobDescription: {
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
			city: {
				value: '',
				isValid: false
			},
			region: {
				value: '',
				isValid: false
			},
			level: {
				value: '',
				isValid: true
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
				isValid: false
			},
			benefit: {
				value: '',
				isValid: false
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
			const level = document.getElementById('level');
			const employment = document.getElementById('employment');

			onInputHandler('level', level.value, true);
			onInputHandler('employment', employment.value, true);

			const getSlot = async () => {
				try {
					const res = await getOneCompany({ userId: auth.userId });
					setMaxSlot(res.company.slot);
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
			description: formState.inputs.description.value,
			city: formState.inputs.city.value,
			region: formState.inputs.region.value,
			jobDescription: formState.inputs.jobDescription.value,
			jobQualification: formState.inputs.jobQualification.value,
			technicalRequirement: formState.inputs.technicalRequirement.value,
			level: formState.inputs.level.value,
			emailRecipient: formState.inputs.emailRecipient.value,
			employment: formState.inputs.employment.value,
			jobFunction: formState.inputs.jobFunction.value,
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
			<p className={classes.FormTitle}>New Job Ads</p>

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
						id='description'
						inputClass='AddJobInput'
						validatorMethod={[ VALIDATOR_REQUIRE() ]}
						onInputHandler={onInputHandler}
						label='Description*'
					/>
					<Input
						inputType='input'
						id='jobFunction'
						inputClass='AddJobInput'
						validatorMethod={[ VALIDATOR_REQUIRE() ]}
						onInputHandler={onInputHandler}
						label='Job Function*'
					/>

					<Input
						inputType='input'
						id='jobDescription'
						inputClass='AddJobInput'
						validatorMethod={[ VALIDATOR_REQUIRE() ]}
						onInputHandler={onInputHandler}
						label='Job Description*'
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
						id='city'
						inputClass='AddJobInput'
						validatorMethod={[ VALIDATOR_REQUIRE() ]}
						onInputHandler={onInputHandler}
						label='City*'
					/>
					<Input
						inputType='input'
						id='region'
						inputClass='AddJobInput'
						validatorMethod={[ VALIDATOR_REQUIRE() ]}
						onInputHandler={onInputHandler}
						label='Region*'
					/>

					<label className={classes.LabelName}>Job Level*</label>
					<select
						id='level'
						name='level'
						value={formState.inputs.level.value}
						onChange={onChangeHandler}
						className={classes.DropDown}>
						<option id='level_1' value='entryLevel'>
							Entry Level
						</option>
						<option id='2' value='juniorApp'>
							Junior Apprentice
						</option>
						<option id='3' value='assoc'>
							Associate/ Supervisor
						</option>
						<option id='4' value='midSenior'>
							Mid-Senior/ Manager
						</option>
						<option id='5' value='director'>
							Director/ Executive
						</option>
					</select>

					<label className={classes.LabelName}>Employment Type*</label>
					<select
						id='employment'
						name='employment'
						value={formState.inputs.employment.value}
						onChange={onChangeHandler}
						className={classes.DropDown}>
						<option id='0' value='fullTime'>
							Full Time
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
						validatorMethod={[ VALIDATOR_REQUIRE() ]}
						onInputHandler={onInputHandler}
						label='Salary*'
					/>

					<Input
						inputType='input'
						id='benefit'
						inputClass='AddJobInput'
						validatorMethod={[ VALIDATOR_REQUIRE() ]}
						onInputHandler={onInputHandler}
						label='Benefits*'
					/>
					<Input
						inputType='number'
						id='slotAllocation'
						inputClass='AddJobInput'
						validatorMethod={[ VALIDATOR_MIN(1) ]}
						onInputHandler={onInputHandler}
						label='Slot Allocation(s)*'
						type='number'
						min='1'
						max={(maxSlot && maxSlot) || '1'}
						step='1'
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
