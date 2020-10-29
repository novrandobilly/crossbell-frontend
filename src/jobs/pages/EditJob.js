import React, { useEffect } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { useForm } from '../../shared/utils/useForm';
import * as actionTypes from '../../store/actions/actions';

import Input from '../../shared/UI_Element/Input';
import { VALIDATOR_REQUIRE } from '../../shared/utils/validator';
import classes from './NewJob.module.css';

const EditJob = props => {
	const { jobsid } = useParams();

	const identifiedJob = props.jobs.find(job => job.jobId === jobsid);

	const [ formState, onInputHandler ] = useForm(
		{
			jobQualification: {
				value: identifiedJob.jobQualification,
				isValid: true
			},
			technicalRequirement: {
				value: identifiedJob.technicalRequirement,
				isValid: true
			},

			employment: {
				value: identifiedJob.employment,
				isValid: true
			},
			salary: {
				value: identifiedJob.salary,
				isValid: true
			},
			benefit: {
				value: identifiedJob.benefit,
				isValid: true
			}
		},
		true
	);

	const onSubmitHandler = event => {
		event.preventDefault();
		const updatedJob = {
			jobId: identifiedJob.jobId,
			benefit: formState.inputs.benefit.value,
			employment: formState.inputs.employment.value,
			jobQualification: formState.inputs.jobQualification.value,
			salary: formState.inputs.salary.value,
			technicalRequirement: formState.inputs.technicalRequirement.value
		};

		props.onUpdateJob(updatedJob);
		props.history.push(`/jobs/${identifiedJob.jobId}`);
	};
	useEffect(
		() => {
			onInputHandler('employment', formState.inputs.employment.value, true);
		},
		[ onInputHandler, formState.inputs.employment.value ]
	);

	const onChangeHandler = e => {
		const elementId = e.target.id;
		const elementValue = e.target.value;
		onInputHandler(elementId, elementValue, true);
	};

	return (
		<form onSubmit={onSubmitHandler} className={classes.Container}>
			<div className={classes.ContainerFlex}>
				<p className={classes.FormTitle}>Edit Job Ads: </p>

				<div className={classes.FormRow}>
					<div className={classes.EditLabel}>
						<Input
							inputType='input'
							id='jobQualification'
							inputClass='AddJobInput'
							validatorMethod={[ VALIDATOR_REQUIRE() ]}
							onInputHandler={onInputHandler}
							label='Job Qualification*'
							initValue={identifiedJob.jobQualification}
							initIsValid={true}
						/>

						<Input
							inputType='input'
							id='technicalRequirement'
							inputClass='AddJobInput'
							validatorMethod={[ VALIDATOR_REQUIRE() ]}
							onInputHandler={onInputHandler}
							label='Technical Requirement*'
							initValue={identifiedJob.technicalRequirement}
							initIsValid={true}
						/>

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
							id='salary'
							inputClass='AddJobInput'
							validatorMethod={[ VALIDATOR_REQUIRE() ]}
							onInputHandler={onInputHandler}
							label='Salary*'
							initValue={identifiedJob.salary}
							initIsValid={true}
						/>

						<Input
							inputType='input'
							id='benefit'
							inputClass='AddJobInput'
							validatorMethod={[ VALIDATOR_REQUIRE() ]}
							onInputHandler={onInputHandler}
							label='Benefits*'
							initValue={identifiedJob.benefit}
							initIsValid={true}
						/>
					</div>
				</div>
				<button disabled={!formState.formIsValid} className={classes.SaveButton}>
					<span>Save</span>
				</button>
			</div>
		</form>
	);
};

const mapStateToProps = state => {
	return {
		jobs: state.job.jobs
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onUpdateJob: updatedJob => dispatch({ type: actionTypes.EDITJOB, payload: { updatedJob } })
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditJob));
