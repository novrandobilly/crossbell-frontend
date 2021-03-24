import * as actionTypes from './actions';

const createApplicantSuccess = (payload) => {
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

const updateApplicantSuccess = (payload) => {
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

const getApplicantSuccess = (payload) => {
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

const deleteSegmentSuccess = (payload) => {
  return {
    type: actionTypes.DELETESEGMENT,
    payload: payload,
  };
};
const deleteSegmentFail = () => {
  return {
    type: actionTypes.DELETESEGMENTFAIL,
  };
};
const deleteSegmentStart = () => {
  return {
    type: actionTypes.DELETESEGMENTSTART,
  };
};

export const deleteSegment = (segmentData) => {
  return async (dispatch) => {
    dispatch(deleteSegmentStart());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/segment`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${segmentData.token}`,
          },
          body: JSON.stringify({
            applicantId: segmentData.applicantId,
            elementId: segmentData.elementId,
            segment: segmentData.segment,
            index: segmentData.index,
          }),
        }
      );
      const responseJSON = await response.json();
      if (!response.ok) {
        throw new Error(responseJSON.message);
      }
      console.log(responseJSON);
      dispatch(deleteSegmentSuccess(responseJSON));
      return responseJSON;
    } catch (err) {
      dispatch(deleteSegmentFail());
    }
  };
};

export const createApplicant = (ApplicantData) => {
  return async (dispatch) => {
    dispatch(createApplicantStart());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/signup`,
        {
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
        }
      );

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

export const getOneApplicant = (payload) => {
  return async (dispatch) => {
    dispatch(getApplicantStart());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/ap/${payload.applicantId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${payload.token}`,
          },
          body: null,
        }
      );
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

export const getApplicantJobsApplied = (payload) => {
  return async (dispatch) => {
    dispatch(getApplicantStart());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/ap/${payload.applicantId}/jobs`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${payload.token}`,
          },
          body: null,
        }
      );
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

export const updateApplicantIntro = (ApplicantData) => {
  return async (dispatch) => {
    dispatch(updateApplicantStart());
    console.log('from action', ApplicantData);
    try {
      const formData = new FormData();
      formData.append('id', ApplicantData.applicantId);
      formData.append('picture', ApplicantData.picture);
      formData.append('firstName', ApplicantData.firstName);
      formData.append('lastName', ApplicantData.lastName);
      formData.append('email', ApplicantData.email);
      formData.append('headline', ApplicantData.headline);
      formData.append('dateOfBirth', ApplicantData.dateOfBirth);
      formData.append('gender', ApplicantData.gender);
      formData.append('address', ApplicantData.address);
      formData.append('city', ApplicantData.city);
      formData.append('state', ApplicantData.state);
      formData.append('zip', ApplicantData.zip);
      formData.append('phone', ApplicantData.phone);
      formData.append('outOfTown', ApplicantData.outOfTown);
      formData.append('workShifts', ApplicantData.workShifts);
      formData.append('autoSend', ApplicantData.autoSend);
      formData.append('autoRemind', ApplicantData.autoRemind);
      formData.append('headhunterProgram', ApplicantData.headhunterProgram);
      formData.append('interest', ApplicantData.interest);

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/ap/${ApplicantData.applicantId}`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${ApplicantData.token}`,
          },
          body: formData,
        }
      );
      const responseJSON = await response.json();
      console.log(response, responseJSON);
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

export const updateApplicantSubscription = (ApplicantData) => {
  return async (dispatch) => {
    dispatch(updateApplicantStart());
    console.log('from action', ApplicantData);

    try {
      const formData = new FormData();

      formData.append('autoSend', ApplicantData.autoSend);
      formData.append('autoRemind', ApplicantData.autoRemind);

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/ap/${ApplicantData.applicantId}`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${ApplicantData.token}`,
          },
          body: formData,
        }
      );
      const responseJSON = await response.json();
      console.log(response, responseJSON);
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

export const updateApplicantSummary = (ApplicantData) => {
  return async (dispatch) => {
    dispatch(updateApplicantStart());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/ap/${ApplicantData.applicantId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${ApplicantData.token}`,
          },
          body: JSON.stringify({
            id: ApplicantData.applicantId,
            details: ApplicantData.details,
          }),
        }
      );
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

export const updateApplicantEducation = (ApplicantData) => {
  return async (dispatch) => {
    dispatch(updateApplicantStart());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/ap/${ApplicantData.applicantId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${ApplicantData.token}`,
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
              description: ApplicantData.description,
              IPK: ApplicantData.IPK,
            },
            index: ApplicantData.index ? ApplicantData.index : null,
          }),
        }
      );
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

export const updateApplicantExperience = (ApplicantData) => {
  return async (dispatch) => {
    dispatch(updateApplicantStart());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/ap/${ApplicantData.applicantId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${ApplicantData.token}`,
          },
          body: JSON.stringify({
            id: ApplicantData.applicantId,
            experience: {
              prevTitle: ApplicantData.prevTitle,
              prevCompany: ApplicantData.prevCompany,
              prevLocation: ApplicantData.prevLocation,
              startDate: ApplicantData.startDate,
              endDate: ApplicantData.endDate,
              description: ApplicantData.description,
            },
            index: ApplicantData.index ? ApplicantData.index : null,
          }),
        }
      );
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

export const updateApplicantCertification = (ApplicantData) => {
  return async (dispatch) => {
    dispatch(updateApplicantStart());
    console.log(ApplicantData);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/ap/${ApplicantData.applicantId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${ApplicantData.token}`,
          },
          body: JSON.stringify({
            id: ApplicantData.applicantId,
            certification: {
              title: ApplicantData.title,
              organization: ApplicantData.organization,
              startDate: ApplicantData.startDate,
              endDate: ApplicantData.endDate ? ApplicantData.endDate : null,
              description: ApplicantData.description,
            },
            index: ApplicantData.index ? ApplicantData.index : null,
          }),
        }
      );
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

export const updateApplicantSkills = (ApplicantData) => {
  return async (dispatch) => {
    dispatch(updateApplicantStart());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/ap/${ApplicantData.applicantId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${ApplicantData.token}`,
          },
          body: JSON.stringify({
            id: ApplicantData.applicantId,
            skills: [...ApplicantData.skillsData],
          }),
        }
      );
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

export const updateResume = (payload) => {
  return async (dispatch) => {
    dispatch(updateApplicantStart());
    const resumeData = new FormData();
    resumeData.append('resume', payload.resume);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/ap/${payload.applicantId}/resume`,
        {
          method: 'PATCH',
          header: {
            Authorization: `Bearer ${payload.token}`,
          },
          body: resumeData,
        }
      );
      const responseJSON = await response.json();
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
