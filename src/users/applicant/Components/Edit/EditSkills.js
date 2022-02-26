import React, { useState, useEffect } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { useForm } from '../../../../shared/utils/useForm';

import * as actionTypes from '../../../../store/actions/actions';
import * as actionCreators from '../../../../store/actions';
import { VALIDATOR_ALWAYSTRUE } from '../../../../shared/utils/validator';
import Modal from '../../../../shared/UI_Element/Modal';
import LoadingBar from '../../../../shared/UI_Element/Spinner/LoadingBar';
import Input from '../../../../shared/UI_Element/Input';

import styles from './EditSkills.module.scss';

const EditSkills = (props) => {
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
        setSkills((prevState) => [...prevState, 'skill']);
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

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!formState.formIsValid) {
      return props.updateApplicantFail();
    }

    const updatedData = {
      applicantId: applicantid,
      skillsData: formState.inputs.skills.value,
      token: props.auth.token,
    };
    const res = await props.updateSkills(updatedData);
    console.log(res);
    props.onCancel();
    props.fetchApplicantData();
  };

  const addSkill = (e) => {
    e.preventDefault();
    if (skills.length < 5) setSkills((skills) => [...skills, 'skill']);
  };

  const onUpdateSkill = (event, i, type) => {
    let inputValue = event.target.value;

    setSkillsList((prevState) => {
      let newState = [...prevState];
      if (typeof newState[i] !== 'object') newState[i] = {};
      newState[i][type] = inputValue;
      return newState;
    });
  };
  console.log(skillsList);
  const onDeleteSkillHandler = (event, index) => {
    const newSkillsCount = skills.slice(1, skills.length);
    const newSkillsList = skillsList.filter((skillObject, skillIndex) => skillIndex !== index);
    setSkills(newSkillsCount);
    setSkillsList(newSkillsList);
  };

  let formSkills = <LoadingBar />;

  if (skillsList && !props.applicant.isLoading) {
    formSkills = (
      <form onSubmit={onSubmitHandler} className={styles.SkillsContainer}>
        {skills.map((skill, index) => {
          return (
            <div className={styles.SkillItem} key={`${skill}_${index}`}>
              <Input
                inputType='input'
                id={`skill_${index}`}
                validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
                onChange={(e) => onUpdateSkill(e, index, 'skillName')}
                initIsValid={true}
                label={false}
                value={skillsList[index]?.skillName}
              />

              <div className={styles.SkillRating}>
                <select
                  id={`rating_${index}`}
                  value={skillsList[index]?.rate}
                  onChange={(e) => onUpdateSkill(e, index, 'rate')}>
                  <option value=''></option>
                  <option value='sangat-baik'>Sangat Baik</option>
                  <option value='baik'>Baik</option>
                  <option value='cukup'>Cukup</option>
                </select>
              </div>

              <span className={styles.DeleteSkillIcon} onClick={(event) => onDeleteSkillHandler(event, index)}>
                &#x2718;
              </span>
            </div>
          );
        })}

        <div className={styles.ButtonContainer}>
          <button type='button' onClick={addSkill}>
            Add Input
          </button>

          <button disabled={!formState.formIsValid} type='submit'>
            Save
          </button>
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

const mapStateToProps = (state) => {
  return {
    applicant: state.applicant,
    isLoading: state.applicant.isLoading,
    error: state.applicant.error,
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateSkills: (payload) => dispatch(actionCreators.updateApplicantSkills(payload)),
    getOneApplicant: (applicantid) => dispatch(actionCreators.getOneApplicant(applicantid)),
    resetApplicant: () => dispatch({ type: actionTypes.APPLICANTRESET }),
    updateApplicantFail: () => dispatch({ type: actionTypes.UPDATEAPPLICANTFAIL }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditSkills));
