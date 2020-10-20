import { useReducer, useCallback } from 'react';

const ACTION = { UPDATEFORM: 'update-form' };
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
						isValid: action.payload.isValid
					}
				},
				formIsValid: formValidity
			};
		default:
			return state;
	}
};

export const useForm = (initialInputs, initialValidity) => {
	const [ state, dispatch ] = useReducer(formReducer, {
		inputs: initialInputs,
		formIsValid: initialValidity
	});

	const onInputHandler = useCallback((id, value, isValid) => {
		dispatch({ type: ACTION.UPDATEFORM, payload: { id, value, isValid } });
	}, []);

	return [ state, onInputHandler ];
};
