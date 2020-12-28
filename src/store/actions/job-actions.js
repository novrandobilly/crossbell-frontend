import * as actionTypes from "./actions";

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
      const res = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authData.token}`,
        },
        body: JSON.stringify({
          jobTitle: jobData.jobTitle,
          placementLocation: jobData.placementLocation,
          jobDescriptions: jobData.jobDescriptions,
          jobQualification: jobData.jobQualification,
          technicalRequirement: jobData.technicalRequirement,
          emailRecipient: jobData.emailRecipient,
          employment: jobData.employment,
          benefit: jobData.benefit,
          salary: jobData.salary,
          slot: jobData.slot,
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
      const res = await fetch("http://localhost:5000/api/jobs/draft", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authData.token}`,
        },
        body: JSON.stringify({
          jobTitle: jobData.jobTitle,
          placementLocation: jobData.placementLocation,
          jobDescriptions: jobData.jobDescriptions,
          jobQualification: jobData.jobQualification,
          technicalRequirement: jobData.technicalRequirement,
          emailRecipient: jobData.emailRecipient,
          employment: jobData.employment,
          benefit: jobData.benefit,
          salary: jobData.salary,
          slot: jobData.slot,
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
      const res = await fetch("http://localhost:5000/api/jobs");
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

export const getOneJob = (jobId) => {
  return async (dispatch) => {
    dispatch(fetchingStart());
    try {
      const res = await fetch(`http://localhost:5000/api/jobs/${jobId}`);
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
        `http://localhost:5000/api/jobs/${payload.companyId}/all/jobs`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${payload.token}`,
          },
        }
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

export const updateJob = (payload) => {
  return async (dispatch) => {
    dispatch(fetchingStart());
    try {
      const res = await fetch(
        `http://localhost:5000/api/jobs/${payload.jobId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${payload.token}`,
          },
          body: JSON.stringify({
            description: payload.description,
            employment: payload.employment,
            jobQualification: payload.jobQualification,
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
        `http://localhost:5000/api/jobs/${payload.jobId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${payload.token}`,
          },
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

export const applyJob = (payload) => {
  return async (dispatch) => {
    dispatch(fetchingStart());
    try {
      // const response = await fetch(`https://crossbell-corps.herokuapp.com/api/jobs/${props.jobId}/apply`, {
      const response = await fetch(
        `http://localhost:5000/api/jobs/${payload.jobId}/apply`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${payload.token}`,
          },
          body: JSON.stringify({
            applicantId: payload.userId,
          }),
        }
      );
      const responseJSON = await response.json();
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

export const releaseJob = (payload) => {
  return async (dispatch) => {
    dispatch(fetchingStart());
    try {
      const res = await fetch(
        `http://localhost:5000/api/jobs/${payload.jobId}/release`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${payload.token}`,
          },
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
