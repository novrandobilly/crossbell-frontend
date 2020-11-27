import React, { useEffect, useState } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { useForm } from '../../shared/utils/useForm';
import * as actionCreators from '../../store/actions';

import Spinner from '../../shared/UI_Element/Spinner/SpinnerCircle';
import Input from '../../shared/UI_Element/Input';
import { VALIDATOR_REQUIRE } from '../../shared/utils/validator';
import classes from './NewJob.module.css';

const EditJob = props => {
	const jobid = useParams().jobsid;
	const [ identifiedJob, setIdentifiedJob ] = useState(null);

	const [ formState, onInputHandler ] = useForm(
		{
			jobQualification: {
				value: identifiedJob ? identifiedJob.jobQualification : '',
				isValid: identifiedJob ? identifiedJob.jobQualification : false
			},
			technicalRequirement: {
				value: identifiedJob ? identifiedJob.technicalRequirement : '',
				isValid: identifiedJob ? identifiedJob.technicalRequirement : false
			},

			employment: {
				value: identifiedJob ? identifiedJob.employment : '',
				isValid: identifiedJob ? identifiedJob.employment : false
			},
			salary: {
				value: identifiedJob ? identifiedJob.salary : '',
				isValid: identifiedJob ? identifiedJob.salary : false
			},
			description: {
				value: identifiedJob ? identifiedJob.description : '',
				isValid: identifiedJob ? identifiedJob.description : false
			}
		},
		true
	);

	const { getOneJob } = props;
	useEffect(
		() => {
			const fetchJob = async () => {
				try {
					const res = await getOneJob(jobid);
					setIdentifiedJob(res);
				} catch (err) {
					console.log(err);
				}
			};
			fetchJob();
		},
		[ getOneJob, jobid ]
	);

	const onSubmitHandler = async event => {
		event.preventDefault();
		const payload = {
			jobId: jobid,
			description: formState.inputs.description.value,
			employment: formState.inputs.employment.value,
			jobQualification: formState.inputs.jobQualification.value,
			salary: formState.inputs.salary.value,
			technicalRequirement: formState.inputs.technicalRequirement.value,
			token: props.auth.token
		};

		try {
			await props.updateJob(payload);
			props.history.push(`/jobs/${jobid}`);
		} catch (err) {
			console.log(err);
		}
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

	let formContent = <Spinner />;
	if (identifiedJob && !props.job.isLoading) {
		formContent = (
			<React.Fragment>
				<p className={classes.FormTitle}>Edit Job Ads: </p>

				<div className={classes.FormRow}>
					<div className={classes.EditLabel}>
						<Input
							inputType='input'
							id='description'
							inputClass='AddJobInput'
							validatorMethod={[ VALIDATOR_REQUIRE() ]}
							onInputHandler={onInputHandler}
							label='Description*'
							initValue={identifiedJob.description}
							initIsValid={true}
						/>
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
					</div>
				</div>
				<button disabled={!formState.formIsValid} className={classes.SaveButton}>
					<span>Save</span>
				</button>
			</React.Fragment>
		);
	}

	return (
		<form onSubmit={onSubmitHandler} className={classes.Container}>
			<div className={classes.ContainerFlex}>{formContent}</div>
		</form>
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
		updateJob: payload => dispatch(actionCreators.updateJob(payload)),
		getOneJob: jobId => dispatch(actionCreators.getOneJob(jobId))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditJob));
