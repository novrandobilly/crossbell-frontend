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
			// if (!response.ok) {
			// 	throw new Error(responseJSON.message);
			// }
			// }
			dispatch(createCompanySuccess(responseJSON.newCompany));
			return responseJSON.newCompany;
		} catch (err) {
			dispatch(createCompanyFail);
		}
	};
};
