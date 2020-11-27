import * as actionTypes from '../actions/actions';

const initialState = {
	isLoading: false,
	error: false,
	token: null,
	userId: null,
	isAdmin: false
};

const adminReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.AUTHADMINSTART: {
			return {
				...state,
				isLoading: true,
				error: false,
				token: null,
				userId: null,
				isAdmin: false
			};
		}
		case actionTypes.AUTHADMINFINISH: {
			console.log(action);
			return {
				...state,
				isLoading: false,
				error: false,
				token: action.payload.token,
				userId: action.payload.userId,
				isAdmin: action.payload.isAdmin
			};
		}
		case actionTypes.AUTHADMINFAIL: {
			return {
				...state,
				isLoading: false,
				error: true,
				token: null,
				userId: null,
				isAdmin: false
			};
		}
		default: {
			return state;
		}
	}
};

export default adminReducer;
