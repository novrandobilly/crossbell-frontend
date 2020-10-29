import React, { useReducer, useEffect } from 'react';

import { validate } from '../utils/validator';
import classes from './Input.module.css';

const ACTION = {
	ONCHANGE: 'onchange',
	ONBLUR: 'onblur'
};

const inputReducer = (state, action) => {
	switch (action.type) {
		case ACTION.ONCHANGE:
			return {
				...state,
				value: action.payload.value,
				isValid: validate(action.payload.value, action.payload.validatorMethod)
			};
		case ACTION.ONBLUR: {
			return {
				...state,
				isTouched: true
			};
		}
		default:
			return state;
	}
};

const Input = props => {
	const [ state, dispatch ] = useReducer(inputReducer, {
		value: props.initValue || '',
		isValid: props.initIsValid || false,
		isTouched: false
	});

	const { id, onInputHandler } = props;

	useEffect(
		() => {
			onInputHandler && onInputHandler(id, state.value, state.isValid);
		},
		[ id, state.value, state.isValid, onInputHandler ]
	);

	const onChangeHandler = event => {
		dispatch({
			type: ACTION.ONCHANGE,
			payload: {
				value: event.target.value,
				validatorMethod: props.validatorMethod
			}
		});
	};

	const onBlurHandler = () => {
		dispatch({ type: ACTION.ONBLUR });
	};

	let inputElement = null;
	switch (props.inputType) {
		case 'input':
			inputElement = (
				<input
					className={[ classes.InputElements, classes[props.inputClass] ].join(' ')}
					style={{
						backgroundColor: state.isValid || !state.isTouched ? 'white' : ' rgb(215, 226, 255)'
					}}
					id={id}
					type={props.type || 'text'}
					name={props.name}
					value={state.value}
					onChange={onChangeHandler}
					onBlur={onBlurHandler}
					placeholder={props.placeholder || ''}
				/>
			);
			break;
		case 'textarea':
			inputElement = (
				<textarea
					className={[ classes.InputElements, classes[props.inputClass] ].join(' ')}
					style={{
						backgroundColor: state.isValid || !state.isTouched ? 'white' : ' rgb(215, 226, 255)'
					}}
					id={id}
					cols={props.cols || '30'}
					rows={props.rows || '5'}
					name={props.name}
					value={state.value}
					onChange={onChangeHandler}
					onBlur={onBlurHandler}
					placeholder={props.placeholder || ''}
				/>
			);
			break;
		default:
			return (inputElement = (
				<input
					className={[ classes.InputElements, classes[props.inputClass] ].join(' ')}
					style={{
						backgroundColor: state.isValid || !state.isTouched ? 'white' : ' rgb(215, 226, 255)'
					}}
					id={id}
					type={props.type || 'text'}
					name={props.name}
					value={state.value}
					onChange={onChangeHandler}
					onBlur={onBlurHandler}
					placeholder={props.placeholder || ''}
				/>
			));
	}

	return (
		<div className={classes.inputContainer}>
			{props.label && (
				<label className={classes.inputLabel} htmlFor={id}>
					{props.label}
				</label>
			)}
			{inputElement}
		</div>
	);
};

export default Input;
