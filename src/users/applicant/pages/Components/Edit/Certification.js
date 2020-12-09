import React, { useState, useEffect } from 'react';
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

import classes from './Certification.module.css';

const Certification = props => {
	const { applicantid } = useParams();
	const { certificationindex } = useParams();

	const [ data, setData ] = useState();

	const { getOneApplicant } = props;
	useEffect(
		() => {
			getOneApplicant(applicantid).then(res => {
				setData(res.applicant.certification[certificationindex]);
			});
		},
		[ getOneApplicant, applicantid, certificationindex ]
	);

	const [ formState, onInputHandler ] = useForm(
		{
			title: {
				value: data ? data.title : null,
				isValid: data && data.title ? true : false
			},
			organization: {
				value: data ? data.organization : null,
				isValid: data && data.organization ? true : false
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

	const [ expiry, setExpiry ] = useState(true);

	const expiryHandler = event => {
		setExpiry(!expiry);
	};

	const onSubmitHandler = async event => {
		event.preventDefault();

		if (!formState.formIsValid) {
			return props.updateApplicantFail();
		}

		if (expiry) {
			const updatedCertification = {
				applicantId: applicantid,
				index: certificationindex,
				title: formState.inputs.title.value,
				organization: formState.inputs.organization.value,
				startDate: formState.inputs.startDate.value,
				endDate: formState.inputs.endDate.value,
				description: formState.inputs.description.value
			};
			try {
				const res = await props.updateApplicantCertification(updatedCertification);
				if (res) {
					console.log(res);
				} else {
					console.log('no res detected');
				}
				props.history.push(`/ap/${applicantid}`);
			} catch (err) {
				console.log(err);
			}
		} else {
			const updatedCertification = {
				applicantId: applicantid,
				index: certificationindex,
				title: formState.inputs.title.value,
				organization: formState.inputs.organization.value,
				startDate: formState.inputs.startDate.value,
				endDate: null,
				description: formState.inputs.description.value
			};
			try {
				const res = await props.updateApplicantCertification(updatedCertification);
				if (res) {
					console.log(res);
				} else {
					console.log('no res detected');
				}
				props.history.push(`/ap/${applicantid}`);
			} catch (err) {
				console.log(err);
			}
		}
	};

	let formContent = <SpinnerCircle />;

	if (!props.isLoading && data) {
		formContent = (
			<React.Fragment>
				<div className={classes.ContainerFlex}>
					<p className={classes.FormTitle}>Certification</p>

					<div className={classes.FormRow}>
						<div className={classes.EditLabel}>
							<Input
								inputType='input'
								id='title'
								inputClass='AddJobInput'
								validatorMethod={[ VALIDATOR_REQUIRE() ]}
								onInputHandler={onInputHandler}
								label='Certification Title *'
								initValue={data.title}
								initIsValid={true}
							/>
						</div>

						<div className={classes.EditLabel}>
							<Input
								inputType='input'
								id='organization'
								inputClass='AddJobInput'
								validatorMethod={[ VALIDATOR_REQUIRE() ]}
								onInputHandler={onInputHandler}
								label='Issuing Organization*'
								initValue={data.organization}
								initIsValid={true}
							/>
						</div>

						<div className={classes.CheckboxDiv}>
							<input type='checkbox' className={classes.Checkbox} onChange={expiryHandler} />
							<label className={classes.CheckboxText}>No expiry date</label>
						</div>

						<div className={classes.Period}>
							<div className={classes.EditLabel}>
								<Input
									inputType='customdate'
									id='startDate'
									validatorMethod={[ VALIDATOR_ALWAYSTRUE() ]}
									onInputHandler={onInputHandler}
									views={[ 'year', 'month' ]}
									label='Tahun Mulai'
									maxDate={moment()}
									initValue={data.startDate}
									initIsValid={true}
									style={{ marginBottom: '1rem' }}
								/>
							</div>

							{expiry ? (
								<div className={classes.EditLabel}>
									<Input
										inputType='customdate'
										id='endDate'
										validatorMethod={[ VALIDATOR_ALWAYSTRUE() ]}
										onInputHandler={onInputHandler}
										views={[ 'year', 'month' ]}
										label='Tahun Selesai'
										maxDate={moment()}
										initValue={data.endDate}
										initIsValid={true}
										style={{ marginBottom: '1rem' }}
									/>
								</div>
							) : (
								<div />
							)}
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
							/>
						</div>
					</div>

					<SaveButton btnClass='SaveButton' disabled={!formState.formIsValid} placeholder='Save' />
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
		error: state.applicant.error
	};
};

const mapDispatchToProps = dispatch => {
	return {
		updateApplicantFail: () => dispatch({ type: actionTypes.UPDATEAPPLICANTFAIL }),
		resetApplicant: () => dispatch({ type: actionTypes.APPLICANTRESET }),
		getOneApplicant: data => dispatch(actionCreators.getOneApplicant(data)),
		updateApplicantCertification: ApplicantData => dispatch(actionCreators.updateApplicantCertification(ApplicantData))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Certification));
