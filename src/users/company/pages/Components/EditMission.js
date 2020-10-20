import React, { useReducer, useCallback } from "react";

import Input from "../../../../shared/UI_Element/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../../../shared/utils/validator";

import classes from "./EditMission.module.css";

const ACTION = { UPDATEFORM_COMMISSION: "update-form-companyMission" };
const formReducer = (state, action) => {
  switch (action.type) {
    case ACTION.UPDATEFORM_COMMISSION:
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

const EditMission = (props) => {
  const [state, dispatch] = useReducer(formReducer, {
    inputs: {
      mission: {
        value: "",
        isValid: false,
      },
    },
    formIsValid: false,
  });

  const onInputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: ACTION.UPDATEFORM_COMMISSION,
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
          <p className={classes.FormTitle}>Edit Company Mission</p>

          <div className={classes.FormRow}>
            <div className={classes.EditLabel}>
              <Input
                inputType="textarea"
                id="mission"
                inputClass="EditProfileTextArea"
                validatorMethod={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(20)]}
                onInputHandler={onInputHandler}
                label="Mission*"
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

export default EditMission;
