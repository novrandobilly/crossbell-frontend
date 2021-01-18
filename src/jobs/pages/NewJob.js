import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useForm } from '../../shared/utils/useForm';
import * as actionCreators from '../../store/actions';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Spinner from '../../shared/UI_Element/Spinner/SpinnerCircle';
import Input from '../../shared/UI_Element/Input';
import { VALIDATOR_REQUIRE, VALIDATOR_MIN, VALIDATOR_ALWAYSTRUE } from '../../shared/utils/validator';
import WorkFieldData from '../../shared/UI_Element/WorkFieldData';

import classes from './NewJob.module.css';

const NewJob = props => {
	const [ maxSlot, setMaxSlot ] = useState(null);

	const [ fieldOfWork, setFieldOfWork ] = useState('');
	const [ employment, setEmployment ] = useState('');
	const [ open, setOpen ] = useState(false);
	const [ employmentOpen, setEmploymentOpen ] = useState(false);

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
			},
			fieldOfWork: {
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
			salary: formState.inputs.salary.value,
			fieldOfWork: formState.inputs.fieldOfWork.value
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

	const onSaveHandler = async event => {
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
			salary: formState.inputs.salary.value,
			fieldOfWork: formState.inputs.fieldOfWork.value
		};
		const authData = {
			token: props.auth.token,
			userId: props.auth.userId
		};
		console.log(jobData);
		try {
			const res = await props.saveJobDraft(jobData, authData);
			console.log(res);
			props.history.push(`/co/${props.auth.userId}/jobList`);
		} catch (err) {
			console.log(err);
		}
	};

	const handleChange = e => {
		const elementId = e.target.name;
		const elementValue = e.target.value;
		onInputHandler(elementId, elementValue, true);
		setFieldOfWork(e.target.value);
	};

	const handleEmploymentChange = e => {
		const elementId = e.target.name;
		const elementValue = e.target.value;
		onInputHandler(elementId, elementValue, true);
		setEmployment(e.target.value);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const handleEmploymentClose = () => {
		setEmploymentOpen(false);
	};

	const handleEmploymentOpen = () => {
		setEmploymentOpen(true);
	};

	let formContent = (
		<div className={classes.ContainerFlex}>
			<p className={classes.FormTitle}>New Job Advertisement</p>

			<div className={classes.Content}>
				<div className={classes.ContentLeft}>
					<Input
						inputType='input'
						id='jobTitle'
						InputClass='AddJobInput'
						validatorMethod={[ VALIDATOR_REQUIRE() ]}
						onInputHandler={onInputHandler}
						label='Job Title*'
					/>

					<Input
						inputType='input'
						id='jobQualification'
						InputClass='AddJobInput'
						validatorMethod={[ VALIDATOR_REQUIRE() ]}
						onInputHandler={onInputHandler}
						label='Job Qualification*'
					/>

					<Input
						inputType='number'
						id='slotAllocation'
						InputClass='AddJobInput'
						validatorMethod={[ VALIDATOR_MIN(1) ]}
						onInputHandler={onInputHandler}
						label='Durasi Penayangan* (dalam Minggu)'
						type='number'
						min={0}
						max={parseInt(maxSlot) * 2 || 0}
						step='2'
					/>

					<Input
						inputType='input'
						id='benefit'
						InputClass='AddJobInput'
						validatorMethod={[ VALIDATOR_ALWAYSTRUE() ]}
						onInputHandler={onInputHandler}
						label='Benefits (optional)'
					/>

					<FormControl
						className={classes.formControl}
						style={{
							width: '100%',
							marginTop: '0.5rem'
						}}>
						<InputLabel id='employment' style={{ fontSize: '1rem' }}>
							Jenis Pekerjaan*
						</InputLabel>

						<Select
							id='employment'
							name='employment'
							open={employmentOpen}
							onClose={handleEmploymentClose}
							onOpen={handleEmploymentOpen}
							value={employment}
							onChange={handleEmploymentChange}
							style={{
								fontSize: '0.9rem',
								textAlign: 'left'
							}}>
							<MenuItem id={0} value='permanent' style={{ fontSize: '0.9rem' }}>
								Permanent
							</MenuItem>
							<MenuItem id={0} value='contract' style={{ fontSize: '0.9rem' }}>
								Contract
							</MenuItem>
							<MenuItem id={0} value='intern' style={{ fontSize: '0.9rem' }}>
								intern
							</MenuItem>
						</Select>
					</FormControl>
				</div>

				<div className={classes.ContentRight}>
					<Input
						inputType='input'
						id='placementLocation'
						InputClass='AddJobInput'
						validatorMethod={[ VALIDATOR_REQUIRE() ]}
						onInputHandler={onInputHandler}
						label='Lokasi Penempatan*'
					/>

					<Input
						inputType='input'
						id='technicalRequirement'
						InputClass='AddJobInput'
						validatorMethod={[ VALIDATOR_REQUIRE() ]}
						onInputHandler={onInputHandler}
						label='Technical Requirement*'
					/>

					<Input
						inputType='input'
						id='emailRecipient'
						InputClass='AddJobInput'
						validatorMethod={[ VALIDATOR_REQUIRE() ]}
						onInputHandler={onInputHandler}
						label='Email Recipient*'
					/>

					<Input
						inputType='input'
						id='salary'
						InputClass='AddJobInput'
						validatorMethod={[ VALIDATOR_ALWAYSTRUE() ]}
						onInputHandler={onInputHandler}
						label='Salary (optional)'
					/>

					<FormControl className={classes.formControl} style={{ width: '100%', marginTop: '0.5rem', marginBottom: '1rem' }}>
						<InputLabel id='fieldOfWork' style={{ fontSize: '1rem' }}>
							Bidang pekerjaan*
						</InputLabel>

						<Select
							labelId='fieldOfWork'
							id='fieldOfWork'
							name='fieldOfWork'
							open={open}
							onClose={handleClose}
							onOpen={handleOpen}
							value={fieldOfWork}
							onChange={handleChange}
							style={{
								fontSize: '0.9rem',
								textAlign: 'left'
							}}>
							<MenuItem value='' style={{ fontSize: '0.9rem' }}>
								<em>Pilih</em>
							</MenuItem>
							{WorkFieldData.sort().map((work, i) => {
								return (
									<MenuItem id={i} value={work} style={{ fontSize: '0.9rem' }} key={i}>
										{work}
									</MenuItem>
								);
							})}
						</Select>
					</FormControl>
				</div>
			</div>

			<div style={{ width: '95%', marginTop: '0.5rem' }}>
				<Input
					inputType='textarea'
					id='jobDescriptions'
					InputClass='AddJobInput'
					validatorMethod={[ VALIDATOR_REQUIRE() ]}
					onInputHandler={onInputHandler}
					label='Job Descriptions*'
				/>
			</div>
			<div
				style={{
					alignSelf: 'flex-end',
					marginRight: '1rem',
					marginTop: '2rem'
				}}>
				<Button
					variant='outlined'
					color='primary'
					type='submit'
					size='small'
					disableElevation
					onClick={onSaveHandler}
					disabled={!formState.formIsValid}>
					save draft
				</Button>

				{formState.inputs.slotAllocation.value <= maxSlot * 2 && (
					<Button
						variant='contained'
						color='primary'
						type='submit'
						size='small'
						disableElevation
						onClick={onSubmitHandler}
						disabled={!formState.formIsValid}
						style={{ marginLeft: '1rem' }}>
						save & publish
					</Button>
				)}
			</div>
		</div>
	);

	if (props.job.isLoading) {
		formContent = <Spinner />;
	}

	return (
		<React.Fragment>
			<form className={classes.Container}>{formContent}</form>
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
		saveJobDraft: (jobData, authData) => dispatch(actionCreators.saveJobDraft(jobData, authData)),
		getOneCompany: payload => dispatch(actionCreators.getOneCompany(payload))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewJob));
