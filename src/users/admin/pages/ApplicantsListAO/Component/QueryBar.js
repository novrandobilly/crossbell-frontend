import React from 'react';
import { VALIDATOR_REQUIRE } from '../../../../../shared/utils/validator';

import Input from '../../../../../shared/UI_Element/Input';
import Button from '@material-ui/core/Button';

import classes from './QueryBar.module.css';

const QueryBar = (props) => {
  return (
    <div className={classes.QueryBar}>
      <div className={classes.SearchContainer}>
        <form
          onSubmit={props.searchHandler}
          action={props.action}
          method='GET'
          className={classes.SearchForm}
        >
          <Input
            id='search'
            type='text'
            name='search'
            inputType='search'
            label='Applicant search...'
            validatorMethod={[VALIDATOR_REQUIRE()]}
            onInputHandler={props.searchInputHandler}
          />
          <Button
            variant='contained'
            type='submit'
            color='primary'
            disableElevation
            style={{
              height: '2.5rem',
              marginTop: '-0.5rem',
              marginLeft: '2rem',
            }}
          >
            search
          </Button>
        </form>
      </div>
    </div>
  );
};

export default QueryBar;
