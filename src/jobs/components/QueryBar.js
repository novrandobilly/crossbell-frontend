import React from 'react';
import { VALIDATOR_REQUIRE } from '../../shared/utils/validator';

import Input from '../../shared/UI_Element/Input';

import styles from './QueryBar.module.scss';

const QueryBar = props => {
  return (
    <form onSubmit={props.onSubmit} action='/jobs-dashboard' method='GET' className={styles.SearchForm}>
      <Input
        inputType='input'
        id='search'
        type='text'
        label={false}
        validatorMethod={[VALIDATOR_REQUIRE()]}
        name='search'
        onInputHandler={props.onChange}
        placeholder='Cari pekerjaan...'
        initValue={props.initValue}
        InputElementStyle={{ minHeight: '45px', borderRadius: '6px', fontSize: '16px' }}
        InputContainerStyle={{ maxWidth: '600px' }}
      />
      <div className={styles.ButtonContainer}>
        <button type='submit'>Cari</button>
        <button type='button' onClick={props.clearHandler}>
          Hapus Pencarian
        </button>
      </div>
    </form>
  );
};

export default QueryBar;
