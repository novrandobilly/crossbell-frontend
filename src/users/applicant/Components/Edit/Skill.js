import React, { useState, useEffect } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { useForm } from '../../../../shared/utils/useForm';

import * as actionTypes from '../../../../store/actions/actions';
import * as actionCreators from '../../../../store/actions';
import { VALIDATOR_ALWAYSTRUE } from '../../../../shared/utils/validator';
import Button from '@material-ui/core/Button';
import Modal from '../../../../shared/UI_Element/Modal';
import LoadingBar from '../../../../shared/UI_Element/Spinner/LoadingBar';
import Input from '../../../../shared/UI_Element/Input';

import classes from './Skill.module.css';

const Skills = props => {
  const [skills, setSkills] = useState(['skill']);
  const [skillsList, setSkillsList] = useState([{}]);

  const [formState, onInputHandler] = useForm({}, true);
  const { applicantid } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { getOneApplicant } = props;
  useEffect(() => {
    let res;
    const fetchApp = async () => {
      const payload = {
        applicantId: applicantid,
        token: props.auth.token,
      };

      res = await getOneApplicant(payload);

      res.applicant.skills.forEach((skill, i) => {
        setSkills(prevState => [...prevState, 'skill']);
      });
      setSkillsList(res.applicant.skills);
    };

    if (props.auth.token) {
      fetchApp();
    }
  }, [getOneApplicant, applicantid, onInputHandler, props.auth.token]);

  useEffect(() => {
    onInputHandler('skills', skillsList, true);
  }, [onInputHandler, skillsList]);

  const onSubmitHandler = async event => {
    if (!formState.formIsValid) {
      return props.updateApplicantFail();
    }

    event.preventDefault();
    // let skillsData = [];
    // for (const key in formState.inputs) {
    //   skillsData = skillsData.concat(formState.inputs[key].value);
    // }
    // skillsData = skillsData.filter((skill) => !!skill.trim());
    const updatedData = {
      applicantId: applicantid,
      skillsData: formState.inputs.skills.value,
      token: props.auth.token,
    };
    await props.updateSkills(updatedData);
    props.history.push(`/ap/${applicantid}/profile`);
  };

  const addSkill = e => {
    e.preventDefault();
    setSkills(skills => [...skills, 'skill']);
  };

  const onUpdateSkill = (event, i, type) => {
    let inputValue = event.target.value;

    setSkillsList(prevState => {
      let newState = [...prevState];
      if (typeof newState[i] !== 'object') newState[i] = {};
      newState[i][type] = inputValue;
      return newState;
    });
  };

  let formSkills = <LoadingBar />;

  if (skillsList && !props.applicant.isLoading) {
    formSkills = (
      <form onSubmit={onSubmitHandler} className={classes.Container}>
        <div className={classes.ContainerFlex}>
          <p className={classes.FormTitle}>Ubah keterampilan</p>

          {skills.map((skill, i) => {
            return (
              <div className={classes.FormRow} key={i}>
                <div className={classes.LanguageDiv}>
                  <Input
                    inputType='input'
                    id={`skill_${i}`}
                    validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
                    onChange={e => onUpdateSkill(e, i, 'skillName')}
                    initIsValid={true}
                    label='Keterampilan'
                    value={skillsList[i]?.skillName}
                  />
                </div>

                <div className={classes.RatingDiv}>
                  <Input
                    inputType='input'
                    id={`rating_${i}`}
                    validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
                    onChange={e => onUpdateSkill(e, i, 'rate')}
                    initIsValid={true}
                    type='number'
                    label='Rate'
                    min='0'
                    max='5'
                    step='1'
                    value={skillsList[i]?.rate}
                  />
                </div>
              </div>
            );
          })}

          <Button variant='contained' color='primary' type='button' disableElevation onClick={addSkill} size='small'>
            Add Input
          </Button>

          <div className={classes.Footer}>
            <Button disabled={!formState.formIsValid} variant='contained' color='primary' type='submit'>
              Save
            </Button>
          </div>
        </div>
      </form>
    );
  }

  const onCancelHandler = () => {
    props.resetApplicant();
  };

  return (
    <React.Fragment>
      {' '}
      <Modal show={props.error} onCancel={onCancelHandler}>
        Could not update changes at the moment, please try again later
      </Modal>
      {formSkills}
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    applicant: state.applicant,
    isLoading: state.applicant.isLoading,
    error: state.applicant.error,
    auth: state.auth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateSkills: payload => dispatch(actionCreators.updateApplicantSkills(payload)),
    getOneApplicant: applicantid => dispatch(actionCreators.getOneApplicant(applicantid)),
    resetApplicant: () => dispatch({ type: actionTypes.APPLICANTRESET }),
    updateApplicantFail: () => dispatch({ type: actionTypes.UPDATEAPPLICANTFAIL }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Skills));
