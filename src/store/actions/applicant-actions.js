import * as actionTypes from './actions';

const createApplicantSuccess = payload => {
	return {
		type: actionTypes.CREATEAPPLICANTSUCCESS,
		payload: payload
	};
};
const createApplicantFail = () => {
	return {
		type: actionTypes.CREATEAPPLICANTFAIL
	};
};
const createApplicantStart = () => {
	return {
		type: actionTypes.CREATEAPPLICANTSTART
	};
};

const updateApplicantSuccess = payload => {
	return {
		type: actionTypes.UPDATEAPPLICANT,
		payload: payload
	};
};
const updateApplicantFail = () => {
	return {
		type: actionTypes.UPDATEAPPLICANTFAIL
	};
};
const updateApplicantStart = () => {
	return {
		type: actionTypes.UPDATEAPPLICANTSTART
	};
};

const getApplicantSuccess = payload => {
	return {
		type: actionTypes.GETAPPLICANT,
		payload: payload
	};
};
const getApplicantFail = () => {
	return {
		type: actionTypes.GETAPPLICANTFAIL
	};
};
const getApplicantStart = () => {
	return {
		type: actionTypes.GETAPPLICANTSTART
	};
};

export const createApplicant = ApplicantData => {
	return async dispatch => {
		dispatch(createApplicantStart());
		try {
			const response = await fetch(`http://localhost:5000/api/users/signup`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					firstName: ApplicantData.firstName,
					lastName: ApplicantData.lastName,
					email: ApplicantData.email,
					password: ApplicantData.password,
					isCompany: false
				})
			});
			const responseJSON = await response.json();

			dispatch(createApplicantSuccess(responseJSON.newApplicant));
			return responseJSON.newApplicant;
		} catch (err) {
			dispatch(createApplicantFail);
		}
	};
};

export const getOneApplicant = ApplicantId => {
	return async dispatch => {
		dispatch(getApplicantStart());
		try {
			const response = await fetch(`http://localhost:5000/api/users/ap/${ApplicantId}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
				body: null
			});
			const responseJSON = await response.json();

			dispatch(getApplicantSuccess(responseJSON));
			return responseJSON;
		} catch (err) {
			dispatch(getApplicantFail);
		}
	};
};

export const updateApplicantIntro = ApplicantData => {
	return async dispatch => {
		dispatch(updateApplicantStart());
		try {
			const response = await fetch(`http://localhost:5000/api/users/ap/${ApplicantData.applicantId}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					id: ApplicantData.applicantId,
					picture: ApplicantData.picture,
					firstName: ApplicantData.firstName,
					lastName: ApplicantData.lastName,
					email: ApplicantData.email,
					headline: ApplicantData.headline,
					address: ApplicantData.address,
					city: ApplicantData.city,
					state: ApplicantData.state,
					zip: ApplicantData.zip,
					phone: ApplicantData.phone,
					website: ApplicantData.website
				})
			});
			const responseJSON = await response.json();
			dispatch(updateApplicantSuccess(responseJSON.foundApplicant));
			return responseJSON.foundApplicant;
		} catch (err) {
			dispatch(updateApplicantFail);
		}
	};
};

export const updateApplicantSummary = ApplicantData => {
	return async dispatch => {
		dispatch(updateApplicantStart());
		try {
			const response = await fetch(`http://localhost:5000/api/users/ap/${ApplicantData.applicantId}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					id: ApplicantData.applicantId,
					details: ApplicantData.details,
					dateOfBirth: ApplicantData.dateOfBirth
				})
			});
			const responseJSON = await response.json();

			dispatch(updateApplicantSuccess(responseJSON.foundApplicant));
			return responseJSON.foundApplicant;
		} catch (err) {
			dispatch(updateApplicantFail);
		}
	};
};

export const updateApplicantEducation = ApplicantData => {
	return async dispatch => {
		dispatch(updateApplicantStart());
		try {
			const response = await fetch(`http://localhost:5000/api/users/ap/${ApplicantData.applicantId}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					id: ApplicantData.applicantId,
					education: {
						school: ApplicantData.school,
						degree: ApplicantData.degree,
						major: ApplicantData.major,
						location: ApplicantData.location,
						startDate: ApplicantData.startDate,
						endDate: ApplicantData.endDate,
						description: ApplicantData.description
					},
					index: ApplicantData.index ? ApplicantData.index : 0
				})
			});
			const responseJSON = await response.json();

			dispatch(updateApplicantSuccess(responseJSON.foundApplicant));
			return responseJSON.foundApplicant;
		} catch (err) {
			dispatch(updateApplicantFail);
		}
	};
};

export const updateApplicantExperience = ApplicantData => {
	return async dispatch => {
		dispatch(updateApplicantStart());
		try {
			const response = await fetch(`http://localhost:5000/api/users/ap/${ApplicantData.applicantId}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					id: ApplicantData.applicantId,
					experience: {
						prevTitle: ApplicantData.prevTitle,
						prevCompany: ApplicantData.prevCompany,
						prevLocation: ApplicantData.prevLocation,
						startDate: ApplicantData.startDate,
						endDate: ApplicantData.endDate,
						description: ApplicantData.description
					},
					index: ApplicantData.index ? ApplicantData.index : 0
				})
			});
			const responseJSON = await response.json();

			dispatch(updateApplicantSuccess(responseJSON.foundApplicant));
			return responseJSON.foundApplicant;
		} catch (err) {
			dispatch(updateApplicantFail);
		}
	};
};

export const updateApplicantCertification = ApplicantData => {
	return async dispatch => {
		dispatch(updateApplicantStart());
		try {
			const response = await fetch(`http://localhost:5000/api/users/ap/${ApplicantData.applicantId}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					id: ApplicantData.applicantId,
					certification: {
						title: ApplicantData.title,
						organization: ApplicantData.organization,
						startDate: ApplicantData.startDate,
						endDate: ApplicantData.endDate,
						description: ApplicantData.description
					},
					index: ApplicantData.index ? ApplicantData.index : 0
				})
			});
			const responseJSON = await response.json();

			dispatch(updateApplicantSuccess(responseJSON.foundApplicant));
			return responseJSON.foundApplicant;
		} catch (err) {
			dispatch(updateApplicantFail);
		}
	};
};

export const updateApplicantSkills = ApplicantData => {
	return async dispatch => {
		dispatch(updateApplicantStart());
		try {
			const response = await fetch(`http://localhost:5000/api/users/ap/${ApplicantData.applicantId}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					id: ApplicantData.applicantId,
					skills: [ ApplicantData.skills ],
					index: ApplicantData.index ? ApplicantData.index : 0
				})
			});
			const responseJSON = await response.json();

			dispatch(updateApplicantSuccess(responseJSON.foundApplicant));
			return responseJSON.foundApplicant;
		} catch (err) {
			dispatch(updateApplicantFail);
		}
	};
};
