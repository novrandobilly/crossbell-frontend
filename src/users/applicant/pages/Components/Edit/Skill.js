import React, { useState, useEffect } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../../../../../store/actions';
import { useForm } from '../../../../../shared/utils/useForm';

import { VALIDATOR_ALWAYSTRUE } from '../../../../../shared/utils/validator';

import Spinner from '../../../../../shared/UI_Element/Spinner/SpinnerCircle';
import Input from '../../../../../shared/UI_Element/Input';
import SaveButton from '../../../../../shared/UI_Element/SaveButton';

import classes from './Skill.module.css';

const EditDetails = props => {
	const [ skills, setSkills ] = useState([ 'skill' ]);
	const [ skillsList, setSkillsList ] = useState();
	const [ formState, onInputHandler ] = useForm({}, true);
	const { applicantid } = useParams();

	const { getOneApplicant } = props;
	useEffect(
		() => {
			let res;
			const fetchApp = async () => {
				res = await getOneApplicant(applicantid);
				res.applicant.skills.forEach((skill, i) => {
					setSkills(prevState => [ ...prevState, 'skill' ]);
					onInputHandler(`skill_${i}`, skill, true);
				});
				setSkillsList(res.applicant.skills);
			};
			fetchApp();
		},
		[ getOneApplicant, applicantid, onInputHandler ]
	);

	const onSubmitHandler = async event => {
		event.preventDefault();
		let skillsData = [];
		for (const key in formState.inputs) {
			skillsData = skillsData.concat(formState.inputs[key].value);
		}
		skillsData = skillsData.filter(skill => !!skill.trim());
		const updatedData = {
			applicantId: applicantid,
			skillsData
		};
		await props.updateSkills(updatedData);
		props.history.push(`/ap/${applicantid}`);
	};

	const addSkill = e => {
		e.preventDefault();
		setSkills(skills => [ ...skills, 'skill' ]);
	};
	let formSkills = <Spinner />;

	if (skillsList && !props.applicant.isLoading) {
		formSkills = (
			<form onSubmit={onSubmitHandler} className={classes.Container}>
				<div className={classes.ContainerFlex}>
					<p className={classes.FormTitle}>Skills edit</p>

					<div className={classes.FormRow}>
						{skills.map((skill, i) => {
							return (
								<div className={classes.EditLabel} key={i}>
									<Input
										inputType='input'
										id={`skill_${i}`}
										inputClass='AddJobInput'
										validatorMethod={[ VALIDATOR_ALWAYSTRUE() ]}
										onInputHandler={onInputHandler}
										initValue={skillsList[i]}
										initIsValid={true}
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
	}
	return formSkills;
};

const mapStateToProps = state => {
	return {
		applicant: state.applicant
	};
};

const mapDispatchToProps = dispatch => {
	return {
		updateSkills: payload => dispatch(actionCreators.updateApplicantSkills(payload)),
		getOneApplicant: applicantid => dispatch(actionCreators.getOneApplicant(applicantid))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditDetails));
