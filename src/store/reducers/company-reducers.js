import * as actionTypes from '../actions/actions';

const initialState = {

  companies: [
    {
      companyId: "5fc7703579182d0c786cc17c",
      companyName: "Shielded Should Shout",
      address: "jl.wijaya kusuma",
      email: "User@SSS.com",
      size: "900",
      industry: "Oil & ore",
      website: "inicompanyku.sss.com",
      emailRecipient: "Penerima@SSS.com",
      details: "Lorem ipsum dolor si amt",
      mission:
        "To be the no.1 oil company in the world & mining company underground",
    },
  ],
  isLoading: false,
  error: false,

};

const companyReducers = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.CREATECOMPANY:
		case actionTypes.COMPANYRESET:
		case actionTypes.GETCOMPANY:
		case actionTypes.UPDATECOMPANY: {
			return {
				...state,
				error: false,
				isLoading: false
			};
		}
		case actionTypes.UPDATECOMPANYSTART:
		case actionTypes.CREATECOMPANYSTART:
		case actionTypes.GETCOMPANYSTART: {
			return {
				...state,
				isLoading: true,
				error: false
			};
		}


		case actionTypes.UPDATECOMPANYFAIL:
		case actionTypes.CREATECOMPANYFAIL:
		case actionTypes.GETCOMPANYFAIL: {
			return {
				...state,
				isLoading: false,
				error: true
			};
		}


		case actionTypes.FETCHCOMPANYSTART: {
			return {
				...state,
				isLoading: true,
				error: false
			};
		}
		case actionTypes.FETCHCOMPANYSUCCESS: {
			return {
				...state,
				isLoading: false,
				error: false
			};
		}
		case actionTypes.FETCHCOMPANYFAIL: {
			return {
				...state,
				isLoading: false,
				error: true
			};
		}
		default:
			return state;
	}

};

export default companyReducers;
