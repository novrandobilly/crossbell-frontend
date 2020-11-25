import React, { useEffect, useState } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { useForm } from '../../../../shared/utils/useForm';

import * as actionCreators from '../../../../store/actions/index';
import SpinnerCircle from '../../../../shared/UI_Element/Spinner/SpinnerCircle';
import Input from '../../../../shared/UI_Element/Input';
import { VALIDATOR_MINLENGTH } from '../../../../shared/utils/validator';

import classes from './EditMission.module.css';

const EditMission = props => {
	const { companyid } = useParams();

	const [ data, setData ] = useState({});
	const [ isLoading, setIsLoading ] = useState(true);

	const { getOneCompany } = props;
	useEffect(
		() => {
			getOneCompany({ userId: companyid }).then(res => {
				setData(res.company);
				setIsLoading(false);
			});
		},
		[ getOneCompany, setIsLoading, companyid ]
	);

	let push = props.push;

	const [ formState, onInputHandler ] = useForm(
		{
			mission: {
				value: data.mission,
				isValid: data.mission ? true : false
			}
		},
		false
	);

	const onSubmitHandler = async event => {
		event.preventDefault();
		const updatedData = {
			companyId: companyid,
			mission: formState.inputs.mission.value
		};
		try {
			const res = await props.updateCompanyMission(updatedData);
			if (res) {
				console.log(res);
			} else {
				console.log('no res detected');
			}
			!push && props.history.push(`/co/${companyid}`);
		} catch (err) {
			console.log(err);
		}
	};

	let formContent = (
		<React.Fragment>
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
							initValue={data.mission}
							initIsValid={data.mission}
						/>
					</div>
				</div>

				<button disabled={!formState.formIsValid} className={classes.SaveButton}>
					<span>Save</span>
				</button>
			</div>
		</React.Fragment>
	);

	if (isLoading) {
		formContent = <SpinnerCircle />;
	}

	return (
		<div style={!push ? { marginTop: '6rem' } : { marginTop: '0' }}>
			<form onSubmit={onSubmitHandler} className={classes.Container}>
				{formContent}
			</form>
		</div>
	);
};

const mapDispatchToProps = dispatch => {
	return {
		getOneCompany: data => dispatch(actionCreators.getOneCompany(data)),
		updateCompanyMission: CompanyData => dispatch(actionCreators.updateCompanyMission(CompanyData))
	};
};

export default connect(null, mapDispatchToProps)(withRouter(EditMission));
