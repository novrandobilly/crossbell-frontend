import * as actionTypes from '../actions/actions';

const initialState = {
	isLoggedIn: false,
	isCompany: false,
	token: null,
	userId: null,
	isLoading: false,
	isError: false,
	tokenExpirationDate: null
};

const authReducers = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.AUTHLOGINSTART: {
			return {
				...state,
				isLoggedIn: false,
				isCompany: false,
				token: null,
				userId: null,
				isLoading: true,
				isError: false,
				tokenExpirationDate: null
			};
		}
		case actionTypes.AUTHLOGINFAIL: {
			return {
				...state,
				isLoggedIn: false,
				isCompany: false,
				token: null,
				userId: null,
				isLoading: false,
				isError: true,
				tokenExpirationDate: null
			};
		}
		case actionTypes.AUTHLOGIN: {
			const tokenExpirationDate = action.payload.expiration || new Date(new Date().getTime() + 1000 * 60 * 60 * 3).toISOString();
			localStorage.setItem(
				'userData',
				JSON.stringify({
					userId: action.payload.userId,
					token: action.payload.token,
					isCompany: action.payload.isCompany,
					expiration: tokenExpirationDate
				})
			);

			return {
				...state,
				isLoggedIn: !!action.payload.token,
				isCompany: action.payload.isCompany,
				token: action.payload.token,
				userId: action.payload.userId,
				isLoading: false,
				isError: false,
				tokenExpirationDate
			};
		}
		case actionTypes.AUTHLOGOUT: {
			localStorage.removeItem('userData');
			return {
				...state,
				isLoggedIn: false,
				isCompany: false,
				token: null,
				userId: null,
				isLoading: false,
				isError: false,
				tokenExpirationDate: null
			};
		}
		case actionTypes.AUTHCOMPANY: {
			return {
				...state,
				isCompany: true
			};
		}

		default: {
			return state;
		}
	}
};

export default authReducers;
