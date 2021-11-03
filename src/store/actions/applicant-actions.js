import * as actionTypes from './actions';

const createApplicantSuccess = payload => {
  return {
    type: actionTypes.CREATEAPPLICANTSUCCESS,
    payload: payload,
  };
};
const createApplicantFail = () => {
  return {
    type: actionTypes.CREATEAPPLICANTFAIL,
  };
};
const createApplicantStart = () => {
  return {
    type: actionTypes.CREATEAPPLICANTSTART,
  };
};

const updateApplicantSuccess = payload => {
  return {
    type: actionTypes.UPDATEAPPLICANT,
    payload: payload,
  };
};
const updateApplicantFail = () => {
  return {
    type: actionTypes.UPDATEAPPLICANTFAIL,
  };
};
const updateApplicantStart = () => {
  return {
    type: actionTypes.UPDATEAPPLICANTSTART,
  };
};

const getApplicantSuccess = payload => {
  return {
    type: actionTypes.GETAPPLICANT,
    payload: payload,
  };
};
const getApplicantFail = () => {
  return {
    type: actionTypes.GETAPPLICANTFAIL,
  };
};
const getApplicantStart = () => {
  return {
    type: actionTypes.GETAPPLICANTSTART,
  };
};

const deleteItemSuccess = payload => {
  return {
    type: actionTypes.DELETEITEM,
    payload: payload,
  };
};
const deleteItemFail = () => {
  return {
    type: actionTypes.DELETEITEMFAIL,
  };
};
const deleteItemStart = () => {
  return {
    type: actionTypes.DELETEITEMSTART,
  };
};

export const deleteItem = payload => {
  return async dispatch => {
    dispatch(deleteItemStart());
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/deleteItem`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${payload.token}`,
        },
        body: JSON.stringify({
          applicantId: payload.applicantId,
          itemId: payload.itemId,
          itemCategories: payload.itemCategories,
        }),
      });
      const responseJSON = await response.json();
      if (!response.ok) {
        throw new Error(responseJSON.message);
      }
      console.log(responseJSON);
      dispatch(deleteItemSuccess(responseJSON));
      return responseJSON;
    } catch (err) {
      dispatch(deleteItemFail());
    }
  };
};

export const createApplicant = ApplicantData => {
  return async dispatch => {
    dispatch(createApplicantStart());
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: ApplicantData.firstName,
          lastName: ApplicantData.lastName,
          email: ApplicantData.email,
          password: ApplicantData.password,
          isCompany: false,
        }),
      });

      const responseJSON = await response.json();
      if (!response.ok) {
        throw new Error(responseJSON.message);
      }
      console.log(responseJSON);

      dispatch(createApplicantSuccess(responseJSON));
      return responseJSON;
    } catch (err) {
      dispatch(createApplicantFail());
      return err;
    }
  };
};

export const getOneApplicant = payload => {
  return async dispatch => {
    dispatch(getApplicantStart());
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/ap/${payload.applicantId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${payload.token}`,
        },
        body: null,
      });
      const responseJSON = await response.json();
      if (!response.ok) {
        throw new Error(responseJSON.message);
      }
      dispatch(getApplicantSuccess(responseJSON));
      return responseJSON;
    } catch (err) {
      dispatch(getApplicantFail());
      return err;
    }
  };
};

export const getApplicantJobsApplied = payload => {
  return async dispatch => {
    dispatch(getApplicantStart());
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/ap/${payload.applicantId}/jobs`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${payload.token}`,
        },
        body: null,
      });
      const responseJSON = await response.json();
      console.log(responseJSON);
      if (!response.ok) {
        throw new Error(responseJSON.message);
      }
      dispatch(getApplicantSuccess(responseJSON));
      return responseJSON;
    } catch (err) {
      dispatch(getApplicantFail());
      return err;
    }
  };
};

export const updateApplicantAvatar = payload => {
  return async dispatch => {
    dispatch(updateApplicantStart());
    try {
      const formData = new FormData();
      formData.append('id', payload.applicantId);
      formData.append('picture', payload.picture);

      console.log(formData);
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/ap/${payload.applicantId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
        body: formData,
      });
      const responseJSON = await response.json();
      if (!response.ok) {
        throw new Error(responseJSON.message);
      }
      dispatch(updateApplicantSuccess(responseJSON.foundApplicant));
      return responseJSON.foundApplicant;
    } catch (err) {
      console.log(err, typeof err);
      dispatch(updateApplicantFail());
      return err;
    }
  };
};
export const updateApplicantBiodata = ApplicantData => {
  return async dispatch => {
    dispatch(updateApplicantStart());
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/ap/${ApplicantData.applicantId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ApplicantData.token}`,
        },
        body: JSON.stringify(ApplicantData),
      });
      const responseJSON = await response.json();
      if (!response.ok) {
        throw new Error(responseJSON.message);
      }
      dispatch(updateApplicantSuccess(responseJSON.foundApplicant));
      return responseJSON.foundApplicant;
    } catch (err) {
      console.log(err, typeof err);
      dispatch(updateApplicantFail());
      return err;
    }
  };
};

export const updateApplicantSubscription = ApplicantData => {
  return async dispatch => {
    dispatch(updateApplicantStart());
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/ap/${ApplicantData.applicantId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ApplicantData.token}`,
        },
        body: JSON.stringify({
          autoSend: {
            isAutoSend: ApplicantData.autoSend.isAutoSend,
            jobIndustry: ApplicantData.autoSend.jobIndustry,
            jobField: ApplicantData.autoSend.jobField,
          },
          autoRemind: {
            isAutoRemind: ApplicantData.autoRemind.isAutoRemind,
            jobIndustry: ApplicantData.autoRemind.jobIndustry,
            jobField: ApplicantData.autoRemind.jobField,
          },
        }),
      });

      const responseJSON = await response.json();
      if (!response.ok) {
        throw new Error(responseJSON.message);
      }

      dispatch(updateApplicantSuccess(responseJSON.foundApplicant));
      return responseJSON.foundApplicant;
    } catch (err) {
      console.log(err, typeof err);
      dispatch(updateApplicantFail());
      return err;
    }
  };
};

export const updateApplicantBriefInformation = ApplicantData => {
  return async dispatch => {
    dispatch(updateApplicantStart());
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/ap/${ApplicantData.applicantId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ApplicantData.token}`,
        },
        body: JSON.stringify({
          id: ApplicantData.applicantId,
          details: ApplicantData.details,
        }),
      });
      const responseJSON = await response.json();
      if (!response.ok) {
        throw new Error(responseJSON.message);
      }
      dispatch(updateApplicantSuccess(responseJSON.foundApplicant));
      return responseJSON.foundApplicant;
    } catch (err) {
      dispatch(updateApplicantFail());
    }
  };
};

export const updateApplicantEducation = payload => {
  return async dispatch => {
    dispatch(updateApplicantStart());
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/ap/${payload.applicantId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${payload.token}`,
        },
        body: JSON.stringify({
          id: payload.applicantId,
          education: {
            id: payload.educationId,
            school: payload.school,
            degree: payload.degree,
            major: payload.major,
            location: payload.location,
            startDate: payload.startDate,
            endDate: payload.endDate,
            description: payload.description,
            IPK: payload.IPK,
          },
        }),
      });
      const responseJSON = await response.json();
      if (!response.ok) {
        throw new Error(responseJSON.message);
      }
      dispatch(updateApplicantSuccess(responseJSON.foundApplicant));
      return responseJSON.foundApplicant;
    } catch (err) {
      dispatch(updateApplicantFail());
    }
  };
};

export const updateApplicantExperience = payload => {
  return async dispatch => {
    dispatch(updateApplicantStart());
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/ap/${payload.applicantId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${payload.token}`,
        },
        body: JSON.stringify({
          id: payload.applicantId,
          experience: {
            id: payload.workingExperienceId,
            prevTitle: payload.prevTitle,
            prevCompany: payload.prevCompany,
            prevIndustry: payload.prevIndustry,
            startDate: payload.startDate,
            endDate: payload.endDate,
            description: payload.description,
          },
        }),
      });
      const responseJSON = await response.json();
      if (!response.ok) {
        throw new Error(responseJSON.message);
      }
      dispatch(updateApplicantSuccess(responseJSON.foundApplicant));
      return responseJSON.foundApplicant;
    } catch (err) {
      dispatch(updateApplicantFail());
    }
  };
};

export const updateApplicantCertification = payload => {
  return async dispatch => {
    dispatch(updateApplicantStart());
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/ap/${payload.applicantId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${payload.token}`,
        },
        body: JSON.stringify({
          id: payload.applicantId,
          certification: {
            id: payload.certificationId,
            title: payload.title,
            organization: payload.organization,
            startDate: payload.startDate,
            endDate: payload.endDate ? payload.endDate : null,
            description: payload.description,
          },
        }),
      });
      const responseJSON = await response.json();
      if (!response.ok) {
        throw new Error(responseJSON.message);
      }
      dispatch(updateApplicantSuccess(responseJSON.foundApplicant));
      return responseJSON.foundApplicant;
    } catch (err) {
      dispatch(updateApplicantFail);
    }
  };
};

export const updateApplicantOrganization = payload => {
  return async dispatch => {
    dispatch(updateApplicantStart());
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/ap/${payload.applicantId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${payload.token}`,
        },
        body: JSON.stringify({
          id: payload.applicantId,
          organization: {
            id: payload.organizationId,
            organization: payload.organization,
            startDate: payload.startDate,
            endDate: payload.endDate ? payload.endDate : null,
            description: payload.description,
          },
        }),
      });
      const responseJSON = await response.json();
      if (!response.ok) {
        throw new Error(responseJSON.message);
      }
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
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/ap/${ApplicantData.applicantId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ApplicantData.token}`,
        },
        body: JSON.stringify({
          id: ApplicantData.applicantId,
          skills: [...ApplicantData.skillsData],
        }),
      });
      const responseJSON = await response.json();
      if (!response.ok) {
        throw new Error(responseJSON.message);
      }
      dispatch(updateApplicantSuccess(responseJSON.foundApplicant));
      return responseJSON.foundApplicant;
    } catch (err) {
      dispatch(updateApplicantFail());
      return err;
    }
  };
};

export const updateApplicantLanguages = ApplicantData => {
  return async dispatch => {
    dispatch(updateApplicantStart());
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/ap/${ApplicantData.applicantId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ApplicantData.token}`,
        },
        body: JSON.stringify({
          id: ApplicantData.applicantId,
          languages: [...ApplicantData.languagesData],
        }),
      });
      const responseJSON = await response.json();
      console.log(responseJSON);
      if (!response.ok) {
        throw new Error(responseJSON.message);
      }
      dispatch(updateApplicantSuccess(responseJSON.foundApplicant));
      return responseJSON.foundApplicant;
    } catch (err) {
      dispatch(updateApplicantFail());
      return err;
    }
  };
};

export const updateResume = payload => {
  return async dispatch => {
    dispatch(updateApplicantStart());
    const resumeData = new FormData();
    resumeData.append('resume', payload.resume);
    console.log(payload);
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/ap/${payload.applicantId}/resume`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
        body: resumeData,
      });
      const responseJSON = await response.json();
      console.log(responseJSON);
      if (!response.ok) {
        throw new Error(responseJSON.message);
      }
      dispatch(updateApplicantSuccess());
      return responseJSON;
    } catch (err) {
      dispatch(updateApplicantFail());
      return err;
    }
  };
};
