import React, { useReducer, useCallback } from "react";

import Input from "../../../../shared/UI_Element/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../../../shared/utils/validator";

import classes from "./EditDetails.module.css";

const ACTION = { UPDATEFORM_COMDETAIL: "update-form-companyDetail" };
const formReducer = (state, action) => {
  switch (action.type) {
    case ACTION.UPDATEFORM_COMDETAIL:
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

const EditDetails = (props) => {
  const [state, dispatch] = useReducer(formReducer, {
    inputs: {
      details: {
        value: "",
        isValid: false,
      },
    },
    formIsValid: false,
  });

  const onInputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: ACTION.UPDATEFORM_COMDETAIL,
      payload: { id, value, isValid },
    });
  }, []);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log(state);
  };

  return (
    <>
      <form onSubmit={onSubmitHandler} className={classes.Container}>
        <div className={classes.ContainerFlex}>
          <p className={classes.FormTitle}>Edit Company Details</p>

          <div className={classes.FormRow}>
            <div className={classes.EditLabel}>
              <Input
                inputType="textarea"
                id="details"
                inputClass="EditProfileTextArea"
                validatorMethod={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(20)]}
                onInputHandler={onInputHandler}
                label="Details*"
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

export default EditDetails;
