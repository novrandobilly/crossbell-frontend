import * as actionTypes from '../actions/actions';

const initialState = {
	isLoading: false,
	error: false
};

const applicantReducers = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.CREATEAPPLICANTSTART:
		case actionTypes.UPDATEAPPLICANTSTART: {
			return {
				...state,
				isLoading: true,
				error: false
			};
		}

		case actionTypes.CREATEAPPLICANTSUCCESS: {
			return {
				...state,
				isLoading: false,
				error: false
			};
		}

		case actionTypes.CREATEAPPLICANTFAIL:
		case actionTypes.UPDATEAPPLICANTFAIL: {
			return {
				...state,
				isLoading: false,
				error: true
			};
		}

		case actionTypes.DELETESEGMENT: {
			let applicantArray = [ ...state.applicants ];

			const applicantIndex = applicantArray.findIndex(app => app.applicantId === action.payload.applicantId);

			let segmentArray = [ ...applicantArray[applicantIndex][action.payload.stateName] ];

			segmentArray = segmentArray.filter((segment, segmentIndex) => segmentIndex !== action.payload.index);

			applicantArray[applicantIndex][action.payload.stateName] = segmentArray;

			return {
				...state,
				applicants: applicantArray
			};
		}

		default:
			return state;
	}
};

export default applicantReducers;
