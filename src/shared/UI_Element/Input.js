import React, { useReducer, useEffect } from 'react';

import classes from './Input.module.css';

const ACTION = {
	ONCHANGE: 'onchange'
};

const inputReducer = (state, action) => {
	switch (action.type) {
		case ACTION.ONCHANGE:
			let validator = true;
			if (action.payload.value.trim().length < 1) {
				validator = false;
			}
			return { value: action.payload.value, isValid: validator, isTouched: true };
		default:
			return state;
	}
};

const Input = props => {
	const [ state, dispatch ] = useReducer(inputReducer, { value: '', isValid: false, isTouched: false });

	const { id, onInputHandler } = props;
	useEffect(
		() => {
			onInputHandler(id, state.value, state.isValid);
		},
		[ id, state.value, state.isValid, onInputHandler ]
	);

	const onChangeHandler = event => {
		dispatch({ type: ACTION.ONCHANGE, payload: { value: event.target.value } });
	};

	let inputElement = null;
	switch (props.inputType) {
		case 'input':
			inputElement = (
				<input
					className={classes.InputElements}
					style={{ backgroundColor: state.isValid || !state.isTouched ? 'white' : ' rgb(215, 226, 255)' }}
					id={id}
					type={props.type || 'text'}
					value={state.value}
					onChange={onChangeHandler}
					placeholder={props.placeholder || ''}
				/>
			);
			break;
		case 'textarea':
			inputElement = (
				<textarea
					className={classes.InputElements}
					style={{ backgroundColor: state.isValid || !state.isTouched ? 'white' : ' rgb(215, 226, 255)' }}
					id={id}
					cols={props.cols || '30'}
					rows={props.rows || '5'}
					value={state.value}
					onChange={onChangeHandler}
					placeholder={props.placeholder || ''}
				/>
			);
			break;
		default:
			return (inputElement = (
				<input
					className={classes.InputElements}
					style={{ backgroundColor: state.isValid || !state.isTouched ? 'white' : ' rgb(215, 226, 255)' }}
					id={id}
					type={props.type || 'text'}
					value={state.value}
					onChange={e => dispatch({ type: ACTION.ONCHANGE, payload: { value: e.target.value } })}
					placeholder={props.placeholder || ''}
				/>
			));
	}

	return <React.Fragment>{inputElement}</React.Fragment>;
};

export default Input;
