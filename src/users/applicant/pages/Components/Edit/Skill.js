import React, { useState } from "react";
import { useForm } from "../../../../../shared/utils/useForm";

import { VALIDATOR_REQUIRE } from "../../../../../shared/utils/validator";

import Input from "../../../../../shared/UI_Element/Input";
import SaveButton from "../../../../../shared/UI_Element/SaveButton";

import classes from "./Skill.module.css";

const EditDetails = (props) => {
  const [formState, onInputHandler] = useForm(
    {
      skills: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const [skills, setSkills] = useState([]);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState);
  };

  const addSkill = (e) => {
    setSkills((skills) => [...skills, "testing"]);
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

        <button onClick={(e) => addSkill(e)} className={classes.AddButton}>
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

export default EditDetails;
