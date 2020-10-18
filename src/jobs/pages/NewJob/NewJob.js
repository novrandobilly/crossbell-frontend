import React from "react";

import Input from '../../../shared/UI_Element/Input';
import { VALIDATOR_REQUIRE} from '../../../shared/utils/validator';

import classes from "./NewJob.module.css";

const NewJob = (props) => {
  const onSaveHandler = (event) => {
    event.preventDefault();
  };

  const [category, setCategory] = React.useState("Type");

  const handleCategoryChange = (category) => {
    setCategory(category);
  };

  return (
    <>
      <form className={classes.Container}>
        <div className={classes.ContainerFlex}>
          <p className={classes.FormTitle}>New Job Ads</p>

          <div className={classes.FormRow}>
            <div className={classes.EditLabel}>
              <Input
                inputType='input'
                id='title'
                inputClass='AddJobInput'
                validatorMethod={[ VALIDATOR_REQUIRE() ]}
                label='Job Title*'
              />

              <Input
                inputType='input'
                id='description'
                inputClass='AddJobInput'
                validatorMethod={[ VALIDATOR_REQUIRE() ]}
                label='Job Description*'
              />

              <Input
                inputType='input'
                id='qualification'
                inputClass='AddJobInput'
                validatorMethod={[ VALIDATOR_REQUIRE() ]}
                label='Job Qualification*'
              />

              <Input
                inputType='input'
                id='requirement'
                inputClass='AddJobInput'
                validatorMethod={[ VALIDATOR_REQUIRE() ]}
                label='Technical Requirement*'
              />

              <Input
                inputType='input'
                id='placement'
                inputClass='AddJobInput'
                validatorMethod={[ VALIDATOR_REQUIRE() ]}
                label='Job Placement*'
              />

              <label className={classes.LabelName}>Job Level*</label>
              <select
                name="category"
                value={category}
                onChange={(event) => handleCategoryChange(event.target.value)}
                className={classes.DropDown}
              >
                <option id="0">Entry Level</option>
                <option id="1">Junior Apprentice</option>
                <option id="2">Associate/ Supervisor</option>
                <option id="3">Mid-Senior/ Manager</option>
                <option id="4">Director/ Executive</option>
              </select>

              <label className={classes.LabelName}>Employment Type*</label>
              <select
                name="category"
                value={category}
                onChange={(event) => handleCategoryChange(event.target.value)}
                className={classes.DropDown}
              >
                <option id="0">Full Time</option>
                <option id="1">Contract</option>
                <option id="2">Internship</option>
              </select>

              <Input
                inputType='input'
                id='salary'
                inputClass='AddJobInput'
                validatorMethod={[ VALIDATOR_REQUIRE() ]}
                label='Salary*'
              />

               <Input
                inputType='input'
                id='benefit'
                inputClass='AddJobInput'
                validatorMethod={[ VALIDATOR_REQUIRE() ]}
                label='Benefits*'
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
export default NewJob;
