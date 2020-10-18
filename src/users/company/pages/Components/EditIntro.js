import React from "react";

import Input from '../../../../shared/UI_Element/Input';
import { VALIDATOR_REQUIRE} from '../../../../shared/utils/validator';

import classes from "./EditIntro.module.css";

const EditIntro = (props) => {
  const onSaveHandler = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <form className={classes.Container}>
        <div className={classes.ContainerFlex}>
          <p className={classes.FormTitle}>Edit Company Intro</p>

          <div className={classes.FormRow}>
            <div className={classes.EditLabel}>
              <Input
                inputType='input'
                id='name'
                inputClass='AddJobInput'
                validatorMethod={[ VALIDATOR_REQUIRE() ]}
                label='name*'
              />

              <Input
                inputType='input'
                id='size'
                inputClass='AddJobInput'
                validatorMethod={[ VALIDATOR_REQUIRE() ]}
                label='Size*'
              />


              <Input
                inputType='input'
                id='industry'
                inputClass='AddJobInput'
                validatorMethod={[ VALIDATOR_REQUIRE() ]}
                label='Industry*'
              />

              <Input
                inputType='input'
                id='headquarter'
                inputClass='AddJobInput'
                validatorMethod={[ VALIDATOR_REQUIRE() ]}
                label='Address*'
              />

              <Input
                inputType='input'
                id='websites'
                inputClass='AddJobInput'
                validatorMethod={[ VALIDATOR_REQUIRE() ]}
                label='Websites*'
              />
            </div>
          </div>

          <button className={classes.SaveButton} onClick={onSaveHandler}>
            <span>Save</span>
          </button>
        </div>
      </form>
    </>
  );
};
export default EditIntro;
