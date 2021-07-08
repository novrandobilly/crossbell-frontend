import * as actionTypes from '../actions/actions';

const initJobState = {
  isLoading: false,
  error: false,
};

const jobReducers = (state = initJobState, action) => {
  switch (action.type) {
    case actionTypes.CREATEJOB: {
      return {
        ...state,
        jobs: state.jobs.concat(action.payload.newJob),
      };
    }
    case actionTypes.CREATEJOBSTART: {
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    }
    case actionTypes.JOBRESET:
    case actionTypes.CREATEJOBSUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: false,
      };
    }
    case actionTypes.CREATEJOBFAIL: {
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    }
    case actionTypes.EDITJOB: {
      const jobIndex = state.jobs.findIndex(
        (job) => job.jobId === action.payload.updatedJob.jobId
      );
      const jobArray = [...state.jobs];
      const updatedJob = {
        ...jobArray[jobIndex],
        benefit: action.payload.updatedJob.benefit,
        employment: action.payload.updatedJob.employment,
        educationalStage: action.payload.updatedJob.educationalStage,
        specialRequirement: action.payload.updatedJob.specialRequirement,
        salary: action.payload.updatedJob.salary,
      };

      jobArray[jobIndex] = updatedJob;

      return {
        ...state,
        jobs: jobArray,
      };
    }
    case actionTypes.DELETEJOB: {
      let jobArray = [...state.jobs];
      jobArray = jobArray.filter((job) => job.jobId !== action.payload.jobId);
      return {
        ...state,
        jobs: jobArray,
      };
    }

    case actionTypes.FETCHINGSTART: {
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    }
    case actionTypes.FETCHINGFAIL: {
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    }
    case actionTypes.FETCHINGFINISH: {
      return {
        ...state,
        isLoading: false,
        error: false,
      };
    }

    default:
      return state;
  }
};

export default jobReducers;
