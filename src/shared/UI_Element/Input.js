import React, { useReducer, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import moment from 'moment';

import { validate } from '../utils/validator';
import styles from './Input.module.scss';

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

const Input = props => {
  const [state, dispatch] = useReducer(inputReducer, {
    value: props.initValue || '',
    isValid: props.initIsValid || false,
    isTouched: false,
  });

  const { id, onInputHandler } = props;

  useEffect(() => {
    onInputHandler && onInputHandler(id, state.value, state.isValid);
  }, [id, state.value, state.isValid, onInputHandler]);

  const onChangeHandler = event => {
    dispatch({
      type: ACTION.ONCHANGE,
      payload: {
        value: event.target.value,
        validatorMethod: props.validatorMethod,
      },
    });
    props.onChange && props.onChange(event);
  };

  const onCustomDateHandler = payload => {
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
        <input
          id={id}
          className={[styles.InputElements, styles[props.InputClass]].join(' ')}
          style={props.style}
          label={props.labelName}
          name={props.name}
          value={props.value || state.value}
          placeholder={props.placeholder || ''}
          type={props.type || 'text'}
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
          onKeyUp={props.onKeyUp}
          step={props.step}
          min={props.min}
          max={props.max}
        />
      );
      break;

    case 'search':
      inputElement = (
        <TextField
          id={id}
          className={[styles.InputElements, styles[props.InputClass]].join(' ')}
          label={props.label}
          name={props.name}
          value={props.value || state.value}
          variant='outlined'
          type={props.type || 'text'}
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
          helperText={props.helperText && !state.isValid && state.isTouched && props.helperText}
          error={props.error !== undefined ? props.error : !state.isValid && state.isTouched}
          size='small'
          InputProps={{
            style: { fontSize: 15 },
            inputProps: {
              min: props.min && props.min,
              max: props.max && props.max,
              step: props.step && props.step,
            },
          }}
          style={{ margin: '.6rem 0' }}
          InputLabelProps={{
            style: { fontSize: props.labelFontSize || 15 },
          }}
        />
      );
      break;

    case 'textarea':
      inputElement = (
        <textarea
          id={id}
          className={[styles.Textarea, styles[props.InputClass]].join(' ')}
          label={props.labelName}
          name={props.name}
          value={props.value || state.value}
          onChange={props.onChange || onChangeHandler}
          onBlur={props.onBlurHandler && onBlurHandler}
          rows={props.rows || 4}
          style={props.style}
          maxLength={props.maxLength || 1500}
        />
      );
      break;

    case 'datePicker':
      inputElement = (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MobileDatePicker
            minDate={props.minDate && props.minDate}
            maxDate={props.maxDate && props.maxDate}
            id={id}
            disableFuture={props.disableFuture === undefined ? true : props.disableFuture}
            views={props.views || ['year', 'day']}
            value={moment(state.value).format('L')}
            onChange={eventValue => onCustomDateHandler(eventValue)}
            renderInput={({ inputRef, inputProps, InputProps }) => (
              <div className={styles.DatePickerContainer} style={props.ContainerStyle}>
                <input
                  ref={inputRef}
                  {...inputProps}
                  value={state.value ? moment(state.value).format(`${props.format || 'LL'}`) : '-'}
                  onChange={eventValue => onCustomDateHandler(eventValue)}
                  style={props.style}
                  className={styles.DatePickerInput}
                />
                {InputProps?.endAdornment}
              </div>
            )}
          />
        </LocalizationProvider>
      );
      break;

    case 'autoComplete':
      inputElement = (
        <TextField
          {...props.params}
          style={{ margin: '0' }}
          error={props.error !== undefined ? props.error : !state.isValid && state.isTouched}
          helperText={props.helperText && !state.isValid && state.isTouched && props.helperText}
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
          label={props.label}
          margin='normal'
          variant='standard'
        />
      );
      break;

    default:
      return (inputElement = (
        <TextField
          id={id}
          className={[styles.InputElements, styles[props.InputClass]].join(' ')}
          label={props.label}
          name={props.name}
          value={props.value || state.value}
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
      className={`${styles.InputContainer} ${!state.isValid && state.isTouched && styles.InputInvalid}`}
      style={props.InputContainerStyle}>
      {props.label && <label htmlFor={id}>{props.labelName || [id[0].toUpperCase(), id.slice(1)].join('')}</label>}
      {inputElement}
      {!state.isValid && state.isTouched && props.errorText && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
