import * as actionTypes from '../actions/actions';

const initialState = {
	isLoggedIn: false,
	isCompany: false,
	isAdmin: false,
	token: null,
	userId: null
};

const authReducers = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.AUTHLOGIN: {
			console.log(action.payload);
			return {
				...state,
				isLoggedIn: !!action.payload.token,
				isCompany: action.payload.isCompany,
				isAdmin: false,
				token: action.payload.token,
				userId: action.payload.userId
			};
		}
		case actionTypes.AUTHLOGOUT: {
			return {
				...state,
				isLoggedIn: false,
				isCompany: false,
				isAdmin: false,
				token: null,
				userId: null
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
