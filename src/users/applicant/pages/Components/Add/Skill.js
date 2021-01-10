import React, { useState } from "react";
import { connect } from "react-redux";
import { useParams, withRouter } from "react-router-dom";
import { useForm } from "../../../../../shared/utils/useForm";

import * as actionTypes from "../../../../../store/actions/actions";
import { VALIDATOR_REQUIRE } from "../../../../../shared/utils/validator";

import Input from "../../../../../shared/UI_Element/Input";
import SaveButton from "../../../../../shared/UI_Element/SaveButton";

import classes from "./Skill.module.css";

const Skill = (props) => {
  const { applicantid } = useParams();
  const [skills, setSkills] = useState([]);

  const [formState, onInputHandler] = useForm(
    {
      skill: {
        value: [],
        isValid: false,
      },
    },
    false
  );

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const updatedSkills = {
      applicantId: applicantid,
      skills: formState.inputs.skills.value,
    };
    props.onUpdateAppCertification(updatedSkills);
    props.history.push(`/ap/${applicantid}`);
  };

  const addSkill = (e) => {
    setSkills((prevState) => [...prevState, formState.inputs.skill.value]);
  };

  return (
    <form onSubmit={onSubmitHandler} className={classes.Container}>
      <div className={classes.ContainerFlex}>
        <p className={classes.FormTitle}>Skills</p>

        <div className={classes.FormRow}>
          <div className={classes.EditLabel}>
            <Input
              inputType="input"
              id="skill"
              inputClass="AddJobInput"
              validatorMethod={[VALIDATOR_REQUIRE()]}
              onInputHandler={onInputHandler}
              placeholder="Ex: Communication"
            />
          </div>

          {skills.map((skill, i) => {
            return (
              <div className={classes.EditLabel} key={i}>
                <Input
                  inputType="input"
                  id="skill"
                  inputClass="AddJobInput"
                  validatorMethod={[VALIDATOR_REQUIRE()]}
                  onInputHandler={onInputHandler}
                  placeholder="Ex: Communication"
                />
              </div>
            );
          })}
        </div>

        <button type="button" onClick={addSkill} className={classes.AddButton}>
          Add Skill
        </button>

        <SaveButton
          btnClass="SaveButton"
          disabled={!formState.formIsValid}
          placeholder="Save"
        />
      </div>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateAppCertification: (updatedSkills) =>
      dispatch({
        type: actionTypes.CREATEAPPLICANTSKILL,
        payload: { updatedSkills },
      }),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(Skill));
