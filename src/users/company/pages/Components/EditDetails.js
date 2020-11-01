import React from 'react';
import { connect } from 'react-redux';
import { useParams, withRouter } from 'react-router-dom';
import * as actionTypes from '../../../../store/actions/actions';
import { useForm } from '../../../../shared/utils/useForm';

import Input from '../../../../shared/UI_Element/Input';
import { VALIDATOR_MINLENGTH } from '../../../../shared/utils/validator';

import classes from './EditDetails.module.css';

const EditDetails = props => {
	const { companyid } = useParams();

	const identifiedCompany = props.company.find(co => co.companyId === companyid);
	const [ formState, onInputHandler ] = useForm(
		{
			details: {
				value: identifiedCompany.details,
				isValid: identifiedCompany.details ? true : false
			}
		},
		false
	);

	const onSubmitHandler = event => {
		event.preventDefault();
		const detailsUpdateData = {
			companyId: identifiedCompany.companyId,
			details: formState.inputs.details.value
		};

		props.detailsUpdate(detailsUpdateData);
		props.history.goBack();
	};

	return (
		<React.Fragment>
			<form onSubmit={onSubmitHandler} className={classes.Container}>
				<div className={classes.ContainerFlex}>
					<p className={classes.FormTitle}>Edit Company Details</p>

					<div className={classes.FormRow}>
						<div className={classes.EditLabel}>
							<Input
								inputType='textarea'
								id='details'
								inputClass='EditProfileTextArea'
								validatorMethod={[ VALIDATOR_MINLENGTH(20) ]}
								onInputHandler={onInputHandler}
								label='Details*'
								initValue={formState.inputs.details.value}
								initIsValid={formState.inputs.details.isValid}
							/>
						</div>
					</div>

					<button disabled={!formState.formIsValid} className={classes.SaveButton}>
						<span>Save</span>
					</button>
				</div>
			</form>
		</React.Fragment>
	);
};

const mapStateToProps = state => {
	return {
		company: state.company.companies
	};
};

const mapDispatchToProps = dispatch => {
	return {
		detailsUpdate: payload => dispatch({ type: actionTypes.EDITCOMPANYDETAILS, payload })
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditDetails));
