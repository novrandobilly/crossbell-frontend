import React, { useReducer, useCallback } from "react";

import Input from "../../../shared/UI_Element/Input";
import { VALIDATOR_REQUIRE } from "../../../shared/utils/validator";

import classes from "./NewJob.module.css";

const ACTION = { UPDATEFORM_NEWJOB: "update-form-login" };
const formReducer = (state, action) => {
  switch (action.type) {
    case ACTION.UPDATEFORM_NEWJOB:
      let formValidity = true;
      for (const key in state.inputs) {
        if (key === action.payload.id) {
          formValidity = formValidity && action.payload.isValid;
        } else {
          formValidity = formValidity && state.inputs[key].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.payload.id]: {
            value: action.payload.value,
            isValid: action.payload.isValid,
          },
        },
        formIsValid: formValidity,
      };
    default:
      return state;
  }
};

const NewJob = (props) => {
  const [state, dispatch] = useReducer(formReducer, {
    inputs: {
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
    formIsValid: false,
  });

  const onInputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: ACTION.UPDATEFORM_NEWJOB,
      payload: { id, value, isValid },
    });
  }, []);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log(state);
  };

  const onChangeHandler = (event) => {
    dispatch({
      type: ACTION.ONCHANGE,
      payload: {
        value: event.target.value,
        validatorMethod: props.validatorMethod,
      },
    });
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
                value={state.value}
                onChange={onChangeHandler}
                className={classes.DropDown}
              >
                <option id="0" value="1">
                  Entry Level
                </option>
                <option id="1" value="2">
                  Junior Apprentice
                </option>
                <option id="2" value="3">
                  Associate/ Supervisor
                </option>
                <option id="3" value="4">
                  Mid-Senior/ Manager
                </option>
                <option id="4" value="5">
                  Director/ Executive
                </option>
              </select>

              <label className={classes.LabelName}>Employment Type*</label>
              <select
                id="employment"
                name="employment"
                value={state.value}
                onChange={onChangeHandler}
                className={classes.DropDown}
              >
                <option id="0" value="1">
                  Full Time
                </option>
                <option id="1" value="2">
                  Contract
                </option>
                <option id="2" value="3">
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
          <button disabled={!state.formIsValid} className={classes.SaveButton}>
            <span>Save</span>
          </button>
        </div>
      </form>
    </>
  );
};
export default NewJob;
