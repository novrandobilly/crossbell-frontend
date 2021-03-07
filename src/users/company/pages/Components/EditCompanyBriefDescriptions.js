import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, withRouter } from 'react-router-dom';
import { useForm } from '../../../../shared/utils/useForm';

import * as actionTypes from '../../../../store/actions/actions';
import * as actionCreators from '../../../../store/actions/index';
import { VALIDATOR_MINLENGTH } from '../../../../shared/utils/validator';

import Button from '@material-ui/core/Button';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Modal from '../../../../shared/UI_Element/Modal';
import SpinnerCircle from '../../../../shared/UI_Element/Spinner/SpinnerCircle';
import Input from '../../../../shared/UI_Element/Input';
import classes from './EditCompanyBriefDescriptions.module.css';

const BriefDescriptions = props => {
	const { companyid } = useParams();

	const [ data, setData ] = useState();

	const { getOneCompany } = props;
	useEffect(
		() => {
			getOneCompany({ userId: companyid }).then(res => {
				setData(res.company);
			});
		},
		[ getOneCompany, companyid ]
	);

	let push = props.push;

	const [ formState, onInputHandler ] = useForm(
		{
			briefDescriptions: {
				value: data ? data.briefDescriptions : null,
				isValid: data && data.briefDescriptions ? true : false
			}
		},
		false
	);

	const onSubmitHandler = async event => {
		event.preventDefault();

		if (!formState.formIsValid) {
			return props.updateCompanyFail();
		}

		const updatedData = {
			companyId: companyid,
			briefDescriptions: formState.inputs.briefDescriptions.value,
			token: props.auth.token
		};

		try {
			const res = await props.updateCompanyBriefDescriptions(updatedData);
			if (res) {
				console.log(res);
				if (push) {
					return props.onNextHandler();
				}
			}

			!push && props.history.push(`/co/${companyid}`);
		} catch (err) {
			console.log(err);
		}
	};

	let formContent = <SpinnerCircle />;

	if (!props.isLoading && data) {
		formContent = (
			<React.Fragment>
				<div className={classes.ContainerFlex}>
					<p className={classes.FormTitle}>Edit Company Brief Descriptions</p>

					<div className={classes.FormRow}>
						<div className={classes.EditLabel}>
							<Input
								inputType='textarea'
								id='briefDescriptions'
								InputClass='EditProfileTextArea'
								validatorMethod={[ VALIDATOR_MINLENGTH(20) ]}
								onInputHandler={onInputHandler}
								label='Deskripsikan perusahaan anda*'
								initValue={data.briefDescriptions}
								initIsValid={data.briefDescriptions}
								rows={11}
							/>
						</div>
					</div>

					<div className={classes.Footer}>
						{push && (
							<Button
								className={classes.button}
								startIcon={<NavigateBeforeIcon />}
								onClick={props.onBackHandler}
								style={{ marginRight: '2rem' }}>
								Back
							</Button>
						)}

						<Button
							disabled={!formState.formIsValid}
							variant='contained'
							color='primary'
							type='submit'
							className={classes.button}
							endIcon={<NavigateNextIcon />}>
							{push ? 'Next' : 'Save'}
						</Button>
					</div>
				</div>
			</React.Fragment>
		);
	}

	const onCancelHandler = () => {
		props.resetCompany();
	};

	return (
		<div className={!push ? classes.EditCompanyBrief : classes.AddCompanyBrief}>
			<form onSubmit={onSubmitHandler} className={classes.Container}>
				<Modal show={props.error} onCancel={onCancelHandler}>
					Could not update changes at the moment, please try again later
				</Modal>
				{formContent}
			</form>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		isLoading: state.company.isLoading,
		error: state.company.error,
		auth: state.auth
	};
};

const mapDispatchToProps = dispatch => {
	return {
		updateCompanyFail: () => dispatch({ type: actionTypes.UPDATECOMPANYFAIL }),
		resetCompany: () => dispatch({ type: actionTypes.COMPANYRESET }),
		getOneCompany: data => dispatch(actionCreators.getOneCompany(data)),
		updateCompanyBriefDescriptions: CompanyData => dispatch(actionCreators.updateCompanyBriefDescriptions(CompanyData))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BriefDescriptions));
