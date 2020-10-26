import React from 'react';
import { VALIDATOR_REQUIRE } from '../../shared/utils/validator';

import Input from '../../shared/UI_Element/Input';

import classes from './QueryBar.module.css';

const QueryBar = props => {
	return (
		<div className={classes.QueryBar}>
			<div className={classes.SearchContainer}>
				<form onSubmit={props.searchHandler} action='/jobs-dashboard' method='GET' className={classes.SearchForm}>
					<Input
						id='search'
						type='text'
						placeholder='Job search...'
						validatorMethod={[ VALIDATOR_REQUIRE() ]}
						name='search'
						onInputHandler={props.searchInputHandler}
					/>
					<button type='submit'>Search</button>
				</form>
			</div>
		</div>
	);
};

export default QueryBar;
