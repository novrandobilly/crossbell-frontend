import React, { useState } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionTypes from '../../../../../store/actions/actions';
import { useForm } from '../../../../../shared/utils/useForm';

import { VALIDATOR_REQUIRE } from '../../../../../shared/utils/validator';

import Input from '../../../../../shared/UI_Element/Input';
import SaveButton from '../../../../../shared/UI_Element/SaveButton';

import classes from './Skill.module.css';

const EditDetails = props => {
	const [ skills, setSkills ] = useState([ 'skill' ]);

	const [ formState, onInputHandler ] = useForm({}, false);

	const { applicantid } = useParams();

	const onSubmitHandler = event => {
		event.preventDefault();
		let skillsData = [];
		for (const key in formState.inputs) {
			skillsData = skillsData.concat(formState.inputs[key].value);
		}
		const updatedData = {
			applicantId: applicantid,
			skillsData
		};
		props.updateSkills(updatedData);
		props.history.push(`/ap/${applicantid}`);
	};

	const addSkill = e => {
		setSkills(skills => [ ...skills, 'skill' ]);
	};

	return (
		<form onSubmit={onSubmitHandler} className={classes.Container}>
			<div className={classes.ContainerFlex}>
				<p className={classes.FormTitle}>Skills</p>

				<div className={classes.FormRow}>
					{skills.map((skill, i) => {
						return (
							<div className={classes.EditLabel} key={i}>
								<Input
									inputType='input'
									id={`skill_${i}`}
									inputClass='AddJobInput'
									validatorMethod={[ VALIDATOR_REQUIRE() ]}
									onInputHandler={onInputHandler}
									placeholder='Ex: Communication'
								/>
							</div>
						);
					})}
				</div>

				<button type='button' onClick={e => addSkill(e)} className={classes.AddButton}>
					Add Skill
				</button>

				<SaveButton btnClass='SaveButton' disabled={!formState.formIsValid} placeholder='Save' />
			</div>
		</form>
	);
};

const mapDispatchToProps = dispatch => {
	return {
		updateSkills: payload => dispatch({ type: actionTypes.EDITAPPLICANTSKILL, payload })
	};
};

export default connect(null, mapDispatchToProps)(withRouter(EditDetails));
