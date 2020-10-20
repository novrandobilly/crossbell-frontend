import React, { useReducer, useCallback } from "react";

import Input from "../../../shared/UI_Element/Input";
import Button from "../../../shared/UI_Element/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
  VALIDATOR_NUMSTR,
} from "../../../shared/utils/validator";

import classes from "./ContactUsForm.module.css";

const ACTION = { UPDATEFORM: "update-form" };
const formReducer = (state, action) => {
  switch (action.type) {
    case ACTION.UPDATEFORM:
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

const ContactUsForm = () => {
  const [state, dispatch] = useReducer(formReducer, {
    inputs: {
      nama: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      phone: {
        value: "",
        isValid: false,
      },
      message: {
        value: "",
        isValid: false,
      },
    },
    formIsValid: false,
  });

  const onInputHandler = useCallback((id, value, isValid) => {
    dispatch({ type: ACTION.UPDATEFORM, payload: { id, value, isValid } });
  }, []);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    // console.log(state);
  };

  return (
    <div className={classes.ContactUsContainer}>
      <form onSubmit={onSubmitHandler} className={classes.ContactUsForm}>
        <Input
          inputType="input"
          placeholder="Nama"
          id="nama"
          onInputHandler={onInputHandler}
          validatorMethod={[VALIDATOR_REQUIRE()]}
        />
        <Input
          inputType="input"
          placeholder="Email"
          id="email"
          onInputHandler={onInputHandler}
          validatorMethod={[VALIDATOR_EMAIL()]}
        />
        <Input
          inputType="input"
          placeholder="No Telephone"
          id="phone"
          onInputHandler={onInputHandler}
          validatorMethod={[VALIDATOR_NUMSTR()]}
        />
        <Input
          inputType="textarea"
          placeholder="Pesan..."
          rows="10"
          id="message"
          onInputHandler={onInputHandler}
          validatorMethod={[VALIDATOR_MINLENGTH(10)]}
        />
        <Button disabled={!state.formIsValid} btnType={"Dark"}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ContactUsForm;
