import React, { useReducer, useCallback, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions';

import JobsList from '../../components/JobsList';
import QueryBar from '../../components/QueryBar';
import HeaderBanner from '../../../shared/UI_Element/HeaderBanner';

import styles from './JobsDashboard.module.scss';
import MeetingDashboard from '../../../assets/images/Meeting-Dashboard.png';

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
      const filteredJob = action.payload.jobs.filter(job => {
        let searchValidity = false;
        for (const key in job) {
          if (typeof job[key] === 'string') {
            searchValidity = searchValidity || job[key].toLowerCase().includes(state.search.value.toLowerCase());
          }
        }
        return searchValidity;
      });
      console.log(filteredJob);

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

const JobsDashboard = props => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  let search = window.location.search;
  let params = new URLSearchParams(search);

  const searchValue = useState(params.get('search'))[0];
  const [jobEmpty, setJobEmpty] = useState(false);
  const [allAvailableJobs, setAllAvailableJobs] = useState();
  const [state, dispatch] = useReducer(searchReducer, {
    search: {
      id: '',
      value: '',
      isValid: '',
    },
    jobList: null,
  });

  const { getAllAvailableJobs } = props;

  const checkQueryParams = useCallback(
    res => {
      if (!searchValue) {
        dispatch({
          type: ACTION.SEARCHEMPTY,
          payload: { jobs: res.availableJobs },
        });
        return;
      }
      dispatch({
        type: ACTION.SEARCHUPDATE,
        payload: {
          id: 'name',
          value: searchValue,
          isValid: true,
        },
      });
      dispatch({
        type: ACTION.SEARCHEXECUTE,
        payload: { jobs: res.availableJobs },
      });
      return;
    },
    [searchValue]
  );

  useEffect(() => {
    const getJobs = async () => {
      setJobEmpty(false);
      try {
        const res = await getAllAvailableJobs();
        if (!res.availableJobs) throw new Error('No Job available at the moment');
        checkQueryParams(res);
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
  }, [getAllAvailableJobs, checkQueryParams]);

  const onSearchSubmitHandler = event => {
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

  const clearHandler = event => {
    event.preventDefault();

    dispatch({
      type: ACTION.SEARCHEMPTY,
      payload: { jobs: allAvailableJobs },
    });
  };

  const onChangeValueHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: ACTION.SEARCHUPDATE,
      payload: {
        id,
        value,
        isValid,
      },
    });
  }, []);

  return (
    <div className={styles.JobsDashboard}>
      <HeaderBanner imageSource={MeetingDashboard} />

      <section className={styles.JobListing}>
        <div className={styles.SearchQuery}>
          <div className={styles.Title}>
            <h2>
              Job <span>Dashboard</span>
            </h2>
          </div>
          <div className={styles.QueryBarContainer}>
            <QueryBar
              onChange={onChangeValueHandler}
              onSubmit={onSearchSubmitHandler}
              clearHandler={clearHandler}
              initValue={searchValue || ''}
            />
          </div>
        </div>

        <JobsList items={state.jobList} jobEmpty={jobEmpty} />
      </section>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    jobs: state.job,
    companyStore: state.company.companies,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllAvailableJobs: () => dispatch(actionCreators.getAllAvailableJobs()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(JobsDashboard));
