import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useParams, withRouter } from 'react-router-dom';
import { useForm } from '../../../../../shared/utils/useForm';

import * as actionCreators from '../../../../../store/actions';
import { VALIDATOR_REQUIRE } from '../../../../../shared/utils/validator';

import Input from '../../../../../shared/UI_Element/Input';
import SaveButton from '../../../../../shared/UI_Element/SaveButton';

import classes from './Skill.module.css';

const Skill = props => {
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
		e.preventDefault();
		setSkills(skills => [ ...skills, 'skill' ]);
	};
	console.log(formState);
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

				<button type='button' onClick={addSkill} className={classes.AddButton}>
					Add Skill
				</button>

				<SaveButton btnClass='SaveButton' disabled={!formState.formIsValid} placeholder='Save' />
			</div>
		</form>
	);
};

const mapDispatchToProps = dispatch => {
	return {
		updateSkills: payload => dispatch(actionCreators.updateApplicantSkills(payload))
	};
};

export default connect(null, mapDispatchToProps)(withRouter(Skill));
