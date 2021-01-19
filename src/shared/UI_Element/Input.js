import React, { useReducer, useEffect } from 'react';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
// import { makeStyles } from '@material-ui/core/styles';

import { validate } from '../utils/validator';
import TextField from '@material-ui/core/TextField';
import classes from './Input.module.css';

const ACTION = {
  ONCHANGE: 'onchange',
  ONBLUR: 'onblur',
};

const inputReducer = (state, action) => {
  switch (action.type) {
    case ACTION.ONCHANGE:
      return {
        ...state,
        value: action.payload.value,
        isValid: validate(action.payload.value, action.payload.validatorMethod),
      };
    case ACTION.ONBLUR: {
      return {
        ...state,
        isTouched: true,
      };
    }
    default:
      return state;
  }
};

const Input = (props) => {
  const [state, dispatch] = useReducer(inputReducer, {
    value: props.initValue || '',
    isValid: props.initIsValid || false,
    isTouched: false,
  });

  const { id, onInputHandler } = props;

  useEffect(() => {
    onInputHandler && onInputHandler(id, state.value, state.isValid);
  }, [id, state.value, state.isValid, onInputHandler]);

  const onChangeHandler = (event) => {
    dispatch({
      type: ACTION.ONCHANGE,
      payload: {
        value: event.target.value,
        validatorMethod: props.validatorMethod,
      },
    });
  };

  const onCustomDateHandler = (payload) => {
    console.log(moment(payload).format('L'));
    dispatch({
      type: ACTION.ONCHANGE,
      payload: {
        value: moment(payload),
        validatorMethod: props.validatorMethod,
      },
    });
  };

  const onBlurHandler = () => {
    dispatch({ type: ACTION.ONBLUR });
  };


	let inputElement;
	switch (props.inputType) {
		case 'input':
			inputElement = (
				<TextField
					id={id}
					className={[ classes.InputElements, classes[props.InputClass] ].join(' ')}
					label={props.label}
					name={props.name}
					value={state.value}
					type={props.type || 'text'}
					onChange={onChangeHandler}
					onBlur={onBlurHandler}
					helperText={props.helperText && !state.isValid && state.isTouched && props.helperText}
					error={!state.isValid && state.isTouched}
					InputProps={{
						style: { fontSize: 15 },
						inputProps: { min: props.min && props.min, max: props.max && props.max, step: props.step && props.step }
					}}
					style={{ margin: '.6rem 0' }}
				/>
			);
			break;

		case 'textarea':
			inputElement = (
				<TextField
					id={id}
					className={[ classes.TextareaElements, classes[props.InputClass] ].join(' ')}
					style={{ margin: '0.5rem 0' }}
					label={props.label}
					name={props.name}
					value={state.value}
					type={props.type || 'text'}
					onChange={onChangeHandler}
					onBlur={onBlurHandler}
					multiline
					rows={props.rows || 4}
					variant='outlined'
					helperText={props.helperText && !state.isValid && state.isTouched && props.helperText}
					error={!state.isValid && state.isTouched}
				/>
			);
			break;
		case 'date':
			inputElement = (
				<input
					className={[ classes.InputElements, classes[props.InputClass] ].join(' ')}
					style={{
						backgroundColor: state.isValid || !state.isTouched ? 'white' : ' rgb(215, 226, 255)'
					}}
					type='date'
					id={id}
					cols={props.cols || '30'}
					rows={props.rows || '5'}
					name={props.name}
					value={state.value}
					onChange={onChangeHandler}
					onBlur={onBlurHandler}
					placeholder={props.placeholder || ''}
					helperText={props.helperText && !state.isValid && state.isTouched && props.helperText}
				/>
			);
			break;
		case 'customdate':
			inputElement = (
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<DatePicker
						views={props.views || [ 'year', 'month', 'date' ]}
						value={moment(state.value)}
						style={props.style}
						onChange={eventValue => onCustomDateHandler(eventValue)}
						minDate={props.minDate}
						maxDate={props.maxDate}
						id={id}
						format={props.format}
						helperText={props.helperText && !state.isValid && state.isTouched && props.helperText}
					/>
				</MuiPickersUtilsProvider>
			);
			break;
		default:
			return (inputElement = (
				<TextField
					id={id}
					className={[ classes.InputElements, classes[props.InputClass] ].join(' ')}
					label={props.label}
					name={props.name}
					value={state.value}
					type={props.type || 'text'}
					onChange={onChangeHandler}
					onBlur={onBlurHandler}
					helperText={props.helperText && !state.isValid && state.isTouched && props.helperText}
					error={!state.isValid && state.isTouched}
					InputProps={{ style: { fontSize: 15 } }}
					style={{ margin: '.6rem 0' }}
				/>
			));
	}


  return (
    <div
      className={`${classes.InputContainer} ${
        !state.isValid && state.isTouched && classes.InputInvalid
      }`}
    >
      {inputElement}
      {/* {!state.isValid && state.isTouched && props.errorText && <p>{props.errorText}</p>} */}
    </div>
  );
};

export default Input;
