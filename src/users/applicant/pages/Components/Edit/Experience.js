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
import Button from '@material-ui/core/Button';

import classes from './Experience.module.css';

const Experience = props => {
	const { applicantid } = useParams();
	const { experienceindex } = useParams();

	const [ data, setData ] = useState();

	const { getOneApplicant } = props;
	useEffect(
		() => {
			const payload = {
				applicantId: applicantid,
				token: props.auth.token
			};
			getOneApplicant(payload).then(res => {
				setData(res.applicant.experience[experienceindex]);
			});
		},
		[ getOneApplicant, applicantid, experienceindex, props.auth.token ]
	);

	const [ formState, onInputHandler ] = useForm(
		{
			prevTitle: {
				value: data ? data.prevTitle : null,
				isValid: data && data.prevTitle ? true : false
			},
			prevCompany: {
				value: data ? data.prevCompany : null,
				isValid: data && data.prevCompany ? true : false
			},
			prevLocation: {
				value: data ? data.prevLocation : null,
				isValid: data && data.prevLocation ? true : false
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

		const updatedExperience = {
			applicantId: applicantid,
			index: experienceindex,
			prevTitle: formState.inputs.prevTitle.value,
			prevCompany: formState.inputs.prevCompany.value,
			prevLocation: formState.inputs.prevLocation.value,
			startDate: formState.inputs.startDate.value,
			endDate: formState.inputs.endDate.value,
			description: formState.inputs.description.value,
			token: props.auth.token
		};
		try {
			const res = await props.updateApplicantExperience(updatedExperience);
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

	if (!props.isLoading && data) {
		formContent = (
			<React.Fragment>
				<div className={classes.ContainerFlex}>
					<p className={classes.FormTitle}>Experience</p>

					<div className={classes.FormRow}>
						<div className={classes.EditLabel}>
							<Input
								inputType='input'
								id='prevTitle'
								inputClass='AddJobInput'
								validatorMethod={[ VALIDATOR_REQUIRE() ]}
								onInputHandler={onInputHandler}
								label='Previous Title *'
								initValue={data.prevTitle}
								initIsValid={true}
							/>
						</div>

						<div className={classes.EditLabel}>
							<Input
								inputType='input'
								id='prevCompany'
								inputClass='AddJobInput'
								validatorMethod={[ VALIDATOR_REQUIRE() ]}
								onInputHandler={onInputHandler}
								label='Company Name*'
								initValue={data.prevCompany}
								initIsValid={true}
							/>
						</div>

						<div className={classes.EditLabel}>
							<Input
								inputType='input'
								id='prevLocation'
								inputClass='AddJobInput'
								validatorMethod={[ VALIDATOR_REQUIRE() ]}
								onInputHandler={onInputHandler}
								label='Location*'
								initValue={data.prevLocation}
								initIsValid={true}
							/>
						</div>

						<div className={classes.Period}>
							<div className={classes.EditLabel}>
								<p className={classes.Text}>Waktu Mulai *</p>
								<Input
									inputType='customdate'
									id='startDate'
									inputClass='EditProfileTextArea'
									validatorMethod={[ VALIDATOR_ALWAYSTRUE() ]}
									onInputHandler={onInputHandler}
									views={[ 'year', 'month' ]}
									label='Tahun Mulai'
									maxDate={moment()}
									initValue={data.startDate}
									initIsValid={true}
								/>
							</div>

							<div className={classes.EditLabel}>
								<p className={classes.Text}>Waktu Selesai *</p>
								<Input
									inputType='customdate'
									id='endDate'
									inputClass='EditProfileTextArea'
									validatorMethod={[ VALIDATOR_ALWAYSTRUE() ]}
									onInputHandler={onInputHandler}
									views={[ 'year', 'month' ]}
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
								label='Description*'
								initValue={data.description}
								initIsValid={true}
								rows={12}
							/>
						</div>
					</div>

					<div className={classes.Footer}>
						<Button disabled={!formState.formIsValid} variant='contained' color='primary' type='submit'>
							Save
						</Button>
					</div>
				</div>
			</React.Fragment>
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
		error: state.applicant.error,
		auth: state.auth
	};
};

const mapDispatchToProps = dispatch => {
	return {
		updateApplicantFail: () => dispatch({ type: actionTypes.UPDATEAPPLICANTFAIL }),
		resetApplicant: () => dispatch({ type: actionTypes.APPLICANTRESET }),
		getOneApplicant: data => dispatch(actionCreators.getOneApplicant(data)),
		updateApplicantExperience: ApplicantData => dispatch(actionCreators.updateApplicantExperience(ApplicantData))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Experience));
