import React from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { useForm } from '../../../../shared/utils/useForm';
import * as actionTypes from '../../../../store/actions/actions';

import Input from '../../../../shared/UI_Element/Input';
import { VALIDATOR_MINLENGTH } from '../../../../shared/utils/validator';

import classes from './EditMission.module.css';

const EditMission = props => {
	const { companyid } = useParams();

	const identifiedCompany = props.company.find(co => co.companyId === companyid);
	const [ formState, onInputHandler ] = useForm(
		{
			mission: {
				value: identifiedCompany.mission,
				isValid: identifiedCompany.mission ? true : false
			}
		},
		false
	);

	const onSubmitHandler = event => {
		event.preventDefault();
		const missionUpdateData = {
			companyId: identifiedCompany.companyId,
			mission: formState.inputs.mission.value
		};

		props.missionUpdate(missionUpdateData);
		props.history.goBack();
	};

	return (
		<React.Fragment>
			<form onSubmit={onSubmitHandler} className={classes.Container}>
				<div className={classes.ContainerFlex}>
					<p className={classes.FormTitle}>Edit Company Mission</p>

					<div className={classes.FormRow}>
						<div className={classes.EditLabel}>
							<Input
								inputType='textarea'
								id='mission'
								inputClass='EditProfileTextArea'
								validatorMethod={[ VALIDATOR_MINLENGTH(20) ]}
								onInputHandler={onInputHandler}
								label='Mission*'
								initValue={formState.inputs.mission.value}
								initIsValid={formState.inputs.mission.isValid}
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
		missionUpdate: payload => dispatch({ type: actionTypes.EDITCOMPANYMISSION, payload })
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditMission));
