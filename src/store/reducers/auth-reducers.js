import * as actionTypes from '../actions/actions';

const initialState = {
	isLoggedIn: false,
	isCompany: false,
	isAdmin: false,
	token: null,
	userId: null,
	isLoading: false,
	isError: false
};

const authReducers = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.AUTHLOGINSTART: {
			return {
				...state,
				isLoading: true,
				isError: false
			};
		}
		case actionTypes.AUTHLOGINFAIL: {
			return {
				...state,
				isLoading: false,
				isError: true
			};
		}
		case actionTypes.AUTHLOGIN: {
			console.log(action.payload);
			return {
				...state,
				isLoggedIn: !!action.payload.token,
				isCompany: action.payload.isCompany,
				isAdmin: false,
				token: action.payload.token,
				userId: action.payload.userId,
				isLoading: false,
				isError: false
			};
		}
		case actionTypes.AUTHLOGOUT: {
			return {
				...state,
				isLoggedIn: false,
				isCompany: false,
				isAdmin: false,
				token: null,
				userId: null,
				isLoading: false,
				isError: false
			};
		}
		case actionTypes.AUTHCOMPANY: {
			return {
				...state,
				isCompany: true
			};
		}
		case actionTypes.AUTHADMIN: {
			return {
				...state,
				isLogin: true,
				isAdmin: true
			};
		}
		default: {
			return state;
		}
	}
};

export default authReducers;
