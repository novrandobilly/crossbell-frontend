import React, { useReducer, useCallback, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';

import Spinner from '../../shared/UI_Element/Spinner/SpinnerCircle';
import JobsList from '../components/JobsList';
import QueryBar from '../components/QueryBar';
import Modal from '../../shared/UI_Element/Modal';

import classes from './JobsDashboard.module.css';

const ACTION = {
  SEARCHUPDATE: 'update-search',
  SEARCHEXECUTE: 'search-execute',
  SEARCHEMPTY: 'search-empty',
};
const searchReducer = (state, action) => {
  switch (action.type) {
    case ACTION.SEARCHUPDATE: {
      return {
        ...state,
        search: {
          ...state.search,
          id: action.payload.id,
          value: action.payload.value,
          isValid: action.payload.isValid,
        },
      };
    }
    case ACTION.SEARCHEXECUTE: {
      const filteredJob = action.payload.jobs.filter((job) => {
        let searchValidity = false;
        for (const key in job) {
          if (typeof job[key] === 'string') {
            searchValidity =
              searchValidity ||
              job[key].toLowerCase().includes(state.search.value.toLowerCase());
          }
        }
        return searchValidity;
      });
      return {
        ...state,
        jobList: filteredJob,
      };
    }
    case ACTION.SEARCHEMPTY: {
      return {
        ...state,
        jobList: action.payload.jobs,
      };
    }
    default: {
      return state;
    }
  }
};

const JobsDashboard = (props) => {
  const [jobEmpty, setJobEmpty] = useState(false);
  const [allAvailableJobs, setAllAvailableJobs] = useState();
  const [modalError, setModalError] = useState(false);
  const [state, dispatch] = useReducer(searchReducer, {
    search: {
      id: '',
      value: '',
      isValid: '',
    },
    jobList: null,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { getAllAvailableJobs } = props;
  useEffect(() => {
    const getJobs = async () => {
      setJobEmpty(false);
      try {
        const res = await getAllAvailableJobs();
        if (!res.availableJobs) {
          throw new Error('No Job available at the moment');
        }
        dispatch({
          type: ACTION.SEARCHEMPTY,
          payload: { jobs: res.availableJobs },
        });
        setAllAvailableJobs(res.availableJobs);
      } catch (err) {
        setJobEmpty(true);
        setAllAvailableJobs([]);
        dispatch({
          type: ACTION.SEARCHEMPTY,
          payload: { jobs: [] },
        });
        console.log(err);
      }
    };
    getJobs();
  }, [getAllAvailableJobs]);

  const searchHandler = (event) => {
    event.preventDefault();
    if (state.search.value) {
      dispatch({
        type: ACTION.SEARCHEXECUTE,
        payload: { jobs: allAvailableJobs },
      });
    } else {
      dispatch({
        type: ACTION.SEARCHEMPTY,
        payload: { jobs: allAvailableJobs },
      });
    }
  };

  const clearHandler = (event) => {
    event.preventDefault();
    dispatch({
      type: ACTION.SEARCHEMPTY,
      payload: { jobs: allAvailableJobs },
    });
  };

  const searchInputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: ACTION.SEARCHUPDATE,
      payload: {
        id,
        value,
        isValid,
      },
    });
  }, []);

  let jobLists = <Spinner />;
  if (state.jobList) {
    jobLists = (
      <JobsList
        items={state.jobList}
        jobEmpty={jobEmpty}
        setModalError={setModalError}
        modalError={modalError}
      />
    );
  }

  const onCancelHandler = () => {
    setModalError(false);
    props.history.push('/');
  };

  return (
    <div className={classes.JobsDashboard}>
      <Modal show={modalError} onCancel={onCancelHandler}>
        Mohon masuk terlebih dahulu agar dapat melamar pekerjaan
      </Modal>
      <div className={classes.Dashboard}>
        <div className={classes.Header}>
          <div className={classes.HeaderSection1} />
          <div className={classes.HeaderSection2}>
            <QueryBar
              searchInputHandler={searchInputHandler}
              searchHandler={searchHandler}
              clearHandler={clearHandler}
            />
          </div>
        </div>

        <div className={classes.Content}>{jobLists}</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    jobs: state.job,
    companyStore: state.company.companies,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllAvailableJobs: () => dispatch(actionCreators.getAllAvailableJobs()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(JobsDashboard));
