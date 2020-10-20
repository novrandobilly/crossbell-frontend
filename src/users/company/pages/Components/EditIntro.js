import React, { useReducer, useCallback } from "react";

import Input from "../../../../shared/UI_Element/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
} from "../../../../shared/utils/validator";

import classes from "./EditIntro.module.css";

const ACTION = { UPDATEFORM_COMINTRO: "update-form-commpanyIntro" };
const formReducer = (state, action) => {
  switch (action.type) {
    case ACTION.UPDATEFORM_COMINTRO:
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

const EditIntro = (props) => {
  const [state, dispatch] = useReducer(formReducer, {
    inputs: {
      name: {
        value: "",
        isValid: false,
      },
      size: {
        value: "",
        isValid: false,
      },
      industry: {
        value: "",
        isValid: false,
      },
      headquarter: {
        value: "",
        isValid: false,
      },
      websites: {
        value: "",
        isValid: false,
      },
      recipient: {
        value: "",
        isValid: false,
      },
    },
    formIsValid: false,
  });

  const onInputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: ACTION.UPDATEFORM_COMINTRO,
      payload: { id, value, isValid },
    });
  }, []);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    // console.log(state);
  };

  return (
    <>
      <form onSubmit={onSubmitHandler} className={classes.Container}>
        <div className={classes.ContainerFlex}>
          <p className={classes.FormTitle}>Edit Company Intro</p>

          <div className={classes.FormRow}>
            <div className={classes.EditLabel}>
              <Input
                inputType="input"
                id="name"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="Name*"
              />

              <Input
                inputType="input"
                id="size"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="Size*"
              />

              <Input
                inputType="input"
                id="industry"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="Industry*"
              />

              <Input
                inputType="input"
                id="headquarter"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="Address*"
              />

              <Input
                inputType="input"
                id="websites"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="Websites*"
              />

              <Input
                inputType="input"
                id="recipient"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
                onInputHandler={onInputHandler}
                label="Email Recipient*"
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
export default EditIntro;
