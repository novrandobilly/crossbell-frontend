import * as actionTypes from './actions';

const adminStart = () => {
	return {
		type: actionTypes.AUTHADMINSTART
	};
};

const adminFinish = payload => {
	return {
		type: actionTypes.AUTHADMINFINISH,
		payload
	};
};

const adminFail = () => {
	return {
		type: actionTypes.AUTHADMINFAIL
	};
};

export const admReg = payload => {
	return async dispatch => {
		dispatch(adminStart());
		const newAdminData = {
			NIK: payload.NIK,
			firstName: payload.firstName,
			lastName: payload.lastName,
			email: payload.email,
			password: payload.password,
			gender: payload.gender,
			dateOfBirth: payload.dateOfBirth,
			address: payload.address,
			phoneNumber: payload.phoneNumber,
			jobTitle: payload.jobTitle,
			verificationKey: payload.verificationKey
		};
		console.log(newAdminData);
		try {
			const res = await fetch('http://localhost:5000/api/alphaomega/admreg', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(newAdminData)
			});
			const responseJSON = await res.json();
			console.log(responseJSON);
			if (!res.ok) {
				throw new Error('Admin sign up failed');
			}
			dispatch(adminFinish(responseJSON));
			return responseJSON;
		} catch (err) {
			dispatch(adminFail());
			return err;
		}
	};
};

export const admSignIn = loginData => {
	return async dispatch => {
		dispatch(adminStart());
		try {
			const res = await fetch('http://localhost:5000/api/alphaomega/admsign', {
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
			console.log(resJSON);
			if (!resJSON.token) {
				throw new Error('Error');
			}

			dispatch(adminFinish({ token: resJSON.token, userId: resJSON.userId, isAdmin: resJSON.isAdmin }));
			return resJSON;
		} catch (err) {
			console.log(err);
			dispatch(adminFail());
			return err;
		}
	};
};
