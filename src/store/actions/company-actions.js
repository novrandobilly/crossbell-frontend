import * as actionTypes from './actions';

const createCompanySuccess = payload => {
	return {
		type: actionTypes.CREATECOMPANY,
		payload: payload
	};
};
const createCompanyFail = () => {
	return {
		type: actionTypes.CREATECOMPANYFAIL
	};
};
const createCompanyStart = () => {
	return {
		type: actionTypes.CREATECOMPANYSTART
	};
};

export const createCompany = companyData => {
	return async dispatch => {
		dispatch(createCompanyStart());
		try {
			const response = await fetch(`http://localhost:5000/api/users/signup`, {
				// const response = await fetch(`https://crossbell-corps.herokuapp.com/api/users/signup`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					companyName: companyData.companyName,
					email: companyData.email,
					password: companyData.password,
					isCompany: true
				})
			});
			const responseJSON = await response.json();
			console.log(responseJSON);
			if (!response.ok) {
				throw new Error(responseJSON.message);
			}
			dispatch(createCompanySuccess(responseJSON));
			return responseJSON;
		} catch (err) {
			dispatch(createCompanyFail());
			return err;
		}
	};
};

export const getOneCompany = companyData => {
	return async dispatch => {
		try {
			const res = await fetch(`http://localhost:5000/api/users/co/${companyData.userId}`);
			console.log(res);
			if (!res.ok) {
				throw new Error('Could not find company, please try again');
			}
			const responseJSON = res.json();
			return responseJSON;
		} catch (err) {
			return err;
		}
	};
};

//=======================================================================

const loginSuccess = () => {
	return {
		type: actionTypes.AUTHLOGIN
	};
};

export const login = loginData => {
	return async dispatch => {
		//login
		try {
			const res = await fetch('http://localhost:5000/api/users/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: loginData.email,
					password: loginData.password
				})
			});

			const resJSON = await res.json();

			dispatch(loginSuccess);
			return resJSON;
		} catch (err) {
			console.log(err);
		}

		//login success
		//login fail
	};
};
