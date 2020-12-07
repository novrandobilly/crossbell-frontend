import * as actionTypes from "./actions";

const createCompanySuccess = (payload) => {
  return {
    type: actionTypes.CREATECOMPANY,
    payload: payload,
  };
};
const createCompanyFail = () => {
  return {
    type: actionTypes.CREATECOMPANYFAIL,
  };
};
const createCompanyStart = () => {
  return {
    type: actionTypes.CREATECOMPANYSTART,
  };
};

const getCompanySuccess = (payload) => {
  return {
    type: actionTypes.GETCOMPANY,
    payload: payload,
  };
};
const getCompanyFail = () => {
  return {
    type: actionTypes.GETCOMPANYFAIL,
  };
};
const getCompanyStart = () => {
  return {
    type: actionTypes.GETCOMPANYSTART,
  };
};

const updateCompanySuccess = (payload) => {
  return {
    type: actionTypes.UPDATECOMPANY,
    payload: payload,
  };
};
const updateCompanyFail = () => {
  return {
    type: actionTypes.UPDATECOMPANYFAIL,
  };
};
const updateCompanyStart = () => {
  return {
    type: actionTypes.UPDATECOMPANYSTART,
  };
};

export const getOneCompany = (payload) => {
  return async (dispatch) => {
    dispatch(getCompanyStart());
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/co/${payload.userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: null,
        }
      );
      const responseJSON = await response.json();

      dispatch(getCompanySuccess(responseJSON));
      return responseJSON;
    } catch (err) {
      dispatch(getCompanyFail());
    }
  };
};

export const createCompany = (companyData) => {
  return async (dispatch) => {
    dispatch(createCompanyStart());
    try {
      const response = await fetch(`http://localhost:5000/api/users/signup`, {
        // const response = await fetch(`https://crossbell-corps.herokuapp.com/api/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyName: companyData.companyName,
          email: companyData.email,
          password: companyData.password,
          isCompany: true,
        }),
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


export const updateCompanyIntro = CompanyData => {
	return async dispatch => {
		dispatch(updateCompanyStart());
		try {
			const response = await fetch(`http://localhost:5000/api/users/co/${CompanyData.companyId}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					id: CompanyData.companyId,
					logo: CompanyData.logo,
					companyName: CompanyData.companyName,
					email: CompanyData.email,
					password: CompanyData.password,
					industry: CompanyData.industry,
					address: CompanyData.address,
					website: CompanyData.website,
					briefDescriptions: CompanyData.briefDescriptions
				})
			});
			const responseJSON = await response.json();

			dispatch(updateCompanySuccess(responseJSON.foundCompany));
			return responseJSON.foundCompany;
		} catch (err) {
			dispatch(updateCompanyFail);
		}
	};
};

export const updateCompanyBriefDescriptions = CompanyData => {
	return async dispatch => {
		dispatch(updateCompanyStart());
		try {
			const response = await fetch(`http://localhost:5000/api/users/co/${CompanyData.companyId}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					id: CompanyData.companyId,
					briefDescriptions: CompanyData.briefDescriptions
				})
			});
			const responseJSON = await response.json();


      dispatch(updateCompanySuccess(responseJSON.foundCompany));
      return responseJSON.foundCompany;
    } catch (err) {
      dispatch(updateCompanyFail());
    }
  };
};


export const updateCompanyPIC = CompanyData => {
	return async dispatch => {
		dispatch(updateCompanyStart());
		try {
			const response = await fetch(`http://localhost:5000/api/users/co/${CompanyData.companyId}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					id: CompanyData.companyId,
					picName: CompanyData.picName,
					picJobTitle: CompanyData.picJobTitle,
					picEmail: CompanyData.picEmail,
					picPhone: CompanyData.picPhone,
					picOfficePhone: CompanyData.picOfficePhone
				})
			});
			const responseJSON = await response.json();
			if (!response.ok) {
				throw new Error(responseJSON.message);
			}
			dispatch(updateCompanySuccess(responseJSON.foundCompany));
			return responseJSON.foundCompany;
		} catch (err) {
			dispatch(updateCompanyFail());
		}
	};

};
