import * as actionTypes from './actions';

const loginStart = () => {
	return {
		type: actionTypes.AUTHLOGINSTART
	};
};
const loginSuccess = payload => {
	return {
		type: actionTypes.AUTHLOGIN,
		payload
	};
};
const loginFail = () => {
	return {
		type: actionTypes.AUTHLOGINFAIL
	};
};

const authStart = () => {
	return {
		type: actionTypes.AUTHSTART
	};
};
const authSuccess = () => {
	return {
		type: actionTypes.AUTHSUCCESS
	};
};
const authFail = () => {
	return {
		type: actionTypes.AUTHFAIL
	};
};

export const login = loginData => {
	return async dispatch => {
		dispatch(loginStart());
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
			if (!resJSON.token) {
				throw new Error('Error');
			}

			dispatch(
				loginSuccess({
					token: resJSON.token,
					userId: resJSON.userId,
					isCompany: resJSON.isCompany,
					isActive: resJSON.isActive
				})
			);
			return resJSON;
		} catch (err) {
			console.log(err);
			dispatch(loginFail());
			return err;
		}
	};
};

export const forgotPwd = payload => {
	return async dispatch => {
		dispatch(authStart());
		try {
			const res = await fetch('http://localhost:5000/api/users/forgot', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: payload.email
				})
			});
			const resJSON = await res.json();
			if (!res.ok) {
				throw new Error(resJSON.message);
			}
			dispatch(authSuccess());
			return resJSON;
		} catch (err) {
			dispatch(authFail());
			return err;
		}
	};
};

export const getResetPwd = payload => {
	return async dispatch => {
		dispatch(authStart());
		try {
			const res = await fetch(`http://localhost:5000/api/users/reset/${payload.token}`);
			const resJSON = await res.json();
			if (!res.ok) {
				throw new Error(resJSON.message);
			}
			dispatch(authSuccess());
			return resJSON;
		} catch (err) {
			dispatch(authFail());
			return err;
		}
	};
};

export const resetPwd = payload => {
	return async dispatch => {
		console.log(payload);
		dispatch(authStart());
		try {
			const res = await fetch(`http://localhost:5000/api/users/reset/${payload.resetToken}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					newPassword: payload.newPassword,
					confirmPassword: payload.confirmPassword
				})
			});
			const resJSON = await res.json();
			console.log(res);
			if (!res.ok) {
				throw new Error(resJSON.message);
			}
			dispatch(
				loginSuccess({
					token: resJSON.token,
					userId: resJSON.userId,
					isCompany: resJSON.isCompany,
					isActive: resJSON.isActive
				})
			);
			return resJSON;
		} catch (err) {
			dispatch(authFail());
			return err;
		}
	};
};
