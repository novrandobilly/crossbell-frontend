import React, { useState } from "react";
import { useForm } from "../../../shared/utils/useForm";

import Input from "../../../shared/UI_Element/Input";
import { VALIDATOR_REQUIRE } from "../../../shared/utils/validator";

import classes from "./NewJob.module.css";

const NewJob = (props) => {
  const [formState, onInputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      qualification: {
        value: "",
        isValid: false,
      },
      requirement: {
        value: "",
        isValid: false,
      },
      placement: {
        value: "",
        isValid: false,
      },
      level: {
        value: "",
        isValid: true,
      },
      employment: {
        value: "",
        isValid: true,
      },
      salary: {
        value: "",
        isValid: false,
      },
      benefit: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const [select, setSelect] = useState({
    level: "entryLevel",
    employment: "fullTime",
  });

  console.log(select);

  const changeSelect = (newValue) => {
    setSelect(newValue);
  };

  const onChangeHandler = (e) => {
    changeSelect(e.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState);
  };

  return (
    <>
      <form onSubmit={onSubmitHandler} className={classes.Container}>
        <div className={classes.ContainerFlex}>
          <p className={classes.FormTitle}>New Job Ads</p>

          <div className={classes.FormRow}>
            <div className={classes.EditLabel}>
              <Input
                inputType="input"
                id="title"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="Job Title*"
              />

              <Input
                inputType="input"
                id="description"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="Job Description*"
              />

              <Input
                inputType="input"
                id="qualification"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="Job Qualification*"
              />

              <Input
                inputType="input"
                id="requirement"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="Technical Requirement*"
              />

              <Input
                inputType="input"
                id="placement"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="Job Placement*"
              />

              <label className={classes.LabelName}>Job Level*</label>
              <select
                id="level"
                name="level"
                onChange={onChangeHandler}
                className={classes.DropDown}
              >
                <option id="1" value="entryLevel">
                  Entry Level
                </option>
                <option id="2" value="juniorApp">
                  Junior Apprentice
                </option>
                <option id="3" value="assoc">
                  Associate/ Supervisor
                </option>
                <option id="4" value="midSenior">
                  Mid-Senior/ Manager
                </option>
                <option id="5" value="director">
                  Director/ Executive
                </option>
              </select>

              <label className={classes.LabelName}>Employment Type*</label>
              <select
                id="employment"
                name="employment"
                onChange={onChangeHandler}
                className={classes.DropDown}
              >
                <option id="0" value="fullTime">
                  Full Time
                </option>
                <option id="1" value="contract">
                  Contract
                </option>
                <option id="2" value="intern">
                  Internship
                </option>
              </select>

              <Input
                inputType="input"
                id="salary"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="Salary*"
              />

              <Input
                inputType="input"
                id="benefit"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="Benefits*"
              />
            </div>
          </div>
          <button
            disabled={!formState.formIsValid}
            className={classes.SaveButton}
          >
            <span>Save</span>
          </button>
        </div>
      </form>
    </>
  );
};
export default NewJob;
