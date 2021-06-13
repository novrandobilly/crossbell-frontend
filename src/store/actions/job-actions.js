import * as actionTypes from './actions';

const createJobStart = () => {
  return {
    type: actionTypes.CREATEJOBSTART,
  };
};
const createJobSuccess = () => {
  return {
    type: actionTypes.CREATEJOBSUCCESS,
  };
};
const createJobFail = () => {
  return {
    type: actionTypes.CREATEJOBFAIL,
  };
};

export const createJob = (jobData, authData) => {
  return async (dispatch) => {
    dispatch(createJobStart());
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/jobs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authData.token}`,
        },
        body: JSON.stringify({
          jobTitle: jobData.jobTitle,
          isHidden: jobData.isHidden,
          placementLocation: jobData.placementLocation,
          jobDescriptions: jobData.jobDescriptions,
          educationalStage: jobData.educationalStage,
          technicalRequirement: jobData.technicalRequirement,
          emailRecipient: jobData.emailRecipient,
          employment: jobData.employment,
          benefit: jobData.benefit,
          salary: jobData.salary,
          slot: jobData.slot,
          fieldOfWork: jobData.fieldOfWork,
          companyId: authData.userId,
        }),
      });
      const responseJSON = await res.json();
      if (!res.ok) {
        throw new Error(responseJSON.message);
      }
      console.log(responseJSON);
      dispatch(createJobSuccess());
      return responseJSON;
    } catch (err) {
      dispatch(createJobFail());
      return err;
    }
  };
};

export const saveJobDraft = (jobData, authData) => {
  return async (dispatch) => {
    dispatch(createJobStart());
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/jobs/draft`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authData.token}`,
          },
          body: JSON.stringify({
            jobTitle: jobData.jobTitle,
            isHidden: jobData.isHidden,
            placementLocation: jobData.placementLocation,
            jobDescriptions: jobData.jobDescriptions,
            educationalStage: jobData.educationalStage,
            technicalRequirement: jobData.technicalRequirement,
            emailRecipient: jobData.emailRecipient,
            employment: jobData.employment,
            benefit: jobData.benefit,
            salary: jobData.salary,
            slot: jobData.slot,
            fieldOfWork: jobData.fieldOfWork,
            companyId: authData.userId,
          }),
        }
      );
      const responseJSON = await res.json();
      if (!res.ok) {
        throw new Error(responseJSON.message);
      }
      console.log(responseJSON);
      dispatch(createJobSuccess());
      return responseJSON;
    } catch (err) {
      dispatch(createJobFail());
      return err;
    }
  };
};

export const editJobDraft = (jobData, authData) => {
  return async (dispatch) => {
    dispatch(createJobStart());
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/jobs/draft/${authData.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authData.token}`,
          },
          body: JSON.stringify({
            jobTitle: jobData.jobTitle,
            isHidden: jobData.isHidden,
            placementLocation: jobData.placementLocation,
            jobDescriptions: jobData.jobDescriptions,
            educationalStage: jobData.educationalStage,
            technicalRequirement: jobData.technicalRequirement,
            emailRecipient: jobData.emailRecipient,
            employment: jobData.employment,
            benefit: jobData.benefit,
            salary: jobData.salary,
            slot: jobData.slot,
            fieldOfWork: jobData.fieldOfWork,
            companyId: authData.userId,
          }),
        }
      );
      const responseJSON = await res.json();
      if (!res.ok) {
        throw new Error(responseJSON.message);
      }
      console.log(responseJSON);
      dispatch(createJobSuccess());
      return responseJSON;
    } catch (err) {
      dispatch(createJobFail());
      return err;
    }
  };
};

const fetchingStart = () => {
  return {
    type: actionTypes.FETCHINGSTART,
  };
};
const fetchingFail = () => {
  return {
    type: actionTypes.FETCHINGFAIL,
  };
};
const fetchingFinish = () => {
  return {
    type: actionTypes.FETCHINGFINISH,
  };
};

export const getAllAvailableJobs = () => {
  return async (dispatch) => {
    dispatch(fetchingStart());
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/jobs`);
      const responseJSON = await res.json();
      if (!res.ok && !res.status === 404) {
        throw new Error(responseJSON.message);
      }

      dispatch(fetchingFinish());
      return responseJSON;
    } catch (err) {
      dispatch(fetchingFail());
      return err;
    }
  };
};

export const getOneJob = (jobId) => {
  return async (dispatch) => {
    dispatch(fetchingStart());
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/jobs/${jobId}`
      );
      const responseJSON = await res.json();
      if (!res.ok) {
        throw new Error(responseJSON.message);
      }
      dispatch(fetchingFinish());
      return responseJSON;
    } catch (err) {
      dispatch(fetchingFail());
      return err;
    }
  };
};

export const getJobsInCompany = (payload) => {
  return async (dispatch) => {
    dispatch(fetchingStart());

    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/jobs/${payload.companyId}/all/jobs`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${payload.token}`,
          },
        }
      );
      const responseJSON = await res.json();
      if (!res.ok && !res.status === 404) {
        throw new Error(responseJSON.message);
      }

      dispatch(fetchingFinish());
      return responseJSON;
    } catch (err) {
      dispatch(fetchingFail());
      console.log(err);
      return err;
    }
  };
};

export const updateJob = (payload) => {
  return async (dispatch) => {
    dispatch(fetchingStart());
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/jobs/${payload.jobId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${payload.token}`,
          },
          body: JSON.stringify({
            jobDescriptions: payload.jobDescriptions,
            employment: payload.employment,
            educationalStage: payload.educationalStage,
            salary: payload.salary,
            technicalRequirement: payload.technicalRequirement,
          }),
        }
      );
      const responseJSON = res.json();
      if (!res.ok) {
        throw new Error(responseJSON.message);
      }
      dispatch(fetchingFinish());
      return responseJSON;
    } catch (err) {
      dispatch(fetchingFail());
      return err;
    }
  };
};

export const deleteJob = (payload) => {
  return async (dispatch) => {
    dispatch(fetchingStart());
    console.log(payload);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/jobs/${payload.jobId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${payload.token}`,
          },
        }
      );
      const responseJSON = res.json();
      console.log(responseJSON);
      dispatch(fetchingFinish());

      return responseJSON;
    } catch (err) {
      dispatch(fetchingFail());
      return err;
    }
  };
};

export const applyJob = (payload) => {
  return async (dispatch) => {
    dispatch(fetchingStart());
    try {
      // const response = await fetch(`https://crossbell-corps.herokuapp.com/api/jobs/${props.jobId}/apply`, {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/jobs/${payload.jobId}/apply`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${payload.token}`,
          },
          body: JSON.stringify({
            applicantId: payload.userId,
          }),
        }
      );
      const responseJSON = await response.json();
      console.log(responseJSON);
      if (!response.ok) {
        throw new Error(responseJSON.message);
      }
      dispatch(fetchingFinish());
      return responseJSON;
    } catch (err) {
      dispatch(fetchingFail());
      return err;
    }
  };
};

export const releaseJob = (jobData, authData) => {
  return async (dispatch) => {
    dispatch(fetchingStart());
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/jobs/${authData.jobId}/release`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authData.token}`,
          },
          body: JSON.stringify({
            jobTitle: jobData.jobTitle,
            isHidden: jobData.isHidden,
            placementLocation: jobData.placementLocation,
            jobDescriptions: jobData.jobDescriptions,
            educationalStage: jobData.educationalStage,
            technicalRequirement: jobData.technicalRequirement,
            emailRecipient: jobData.emailRecipient,
            employment: jobData.employment,
            benefit: jobData.benefit,
            salary: jobData.salary,
            slot: jobData.slot,
            fieldOfWork: jobData.fieldOfWork,
            companyId: authData.userId,
          }),
        }
      );
      const responseJSON = res.json();
      if (!res.ok) {
        throw new Error(responseJSON.message);
      }
      dispatch(fetchingFinish());
      return responseJSON;
    } catch (err) {
      dispatch(fetchingFail());
      return err;
    }
  };
};
