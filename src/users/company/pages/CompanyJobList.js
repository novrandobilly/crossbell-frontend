import React, { useState, useEffect, useReducer } from 'react';
// import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import * as actionCreators from '../../../store/actions';

import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import DraftJobs from '../components/DraftJobs';
import LiveJobs from '../components/LiveJobs';
import ExpiredJobs from '../components/ExpiredJobs';
import HeaderBanner from '../../../shared/UI_Element/HeaderBanner';
import MeetingCompany from '../../../assets/images/CompanyMeeting.png';
import LoadingBar from '../../../shared/UI_Element/Spinner/LoadingBar';
// import QueryBar from '../components/QueryBar';
import styles from './CompanyJobList.module.scss';
import ExecutiveSearchBanner from '../../../shared/UI_Element/ExecutiveSearchBanner';
import ExecutiveSearchImage from '../../../assets/images/ES_Banner_2.jpeg';

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
            searchValidity = searchValidity || job[key].toLowerCase().includes(state.search.value.toLowerCase());
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

const CompanyJobList = (props) => {
  const { companyid } = useParams();
  const [allCompanyJobs, setAllCompanyJobs] = useState();

  const [unreleasedData, setUnreleasedData] = useState();
  const [expiredData, setExpiredData] = useState();
  const [displayData, setDisplayData] = useState();
  const [tabValue, setTabValue] = useState('live');

  const tabChangeHandler = (event, newValue) => {
    setTabValue(newValue);
  };

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

  const { getJobsInCompany } = props;
  useEffect(() => {
    const token = props.auth.token;
    if (token) {
      const payload = {
        token: token,
        companyId: companyid,
      };

      getJobsInCompany(payload).then((res) => {
        setAllCompanyJobs(res.foundJob);
        dispatch({
          type: ACTION.SEARCHEMPTY,
          payload: { jobs: res.foundJob },
        });
      });
    }
  }, [getJobsInCompany, companyid, props.auth]);

  useEffect(() => {
    if (allCompanyJobs && state.jobList) {
      setDisplayData(
        state.jobList
          .filter((dat) => dat.releasedAt != null && moment(dat.expiredDate) > moment())
          .sort((a, b) => moment(b.createdAt) - moment(a.createdAt))
      );

      setExpiredData(
        state.jobList
          .filter((dat) => dat.releasedAt != null && moment(dat.expiredDate) < moment())
          .sort((a, b) => moment(b.createdAt) - moment(a.createdAt))
      );

      setUnreleasedData(
        state.jobList.filter((dat) => dat.releasedAt === null).sort((a, b) => moment(b.createdAt) - moment(a.createdAt))
      );
    }
  }, [state.jobList, allCompanyJobs]);

  const onDeleteHandler = async (id, tes) => {
    const token = props.auth.token;
    console.log(tes);
    try {
      const payload = {
        jobId: id,
        token: token,
      };
      const res = await props.deleteJob(payload);
      if (res) {
        console.log(res);
        setUnreleasedData(unreleasedData.filter((item) => item._id !== id));
      } else {
        console.log('No job with id:' + { id } + 'found');
      }
    } catch (err) {
      console.log(err);
    }
  };

  // const searchHandler = event => {
  //   event.preventDefault();
  //   console.log(state.search.value);
  //   if (state.search.value) {
  //     dispatch({
  //       type: ACTION.SEARCHEXECUTE,
  //       payload: { jobs: allCompanyJobs },
  //     });
  //   } else {
  //     dispatch({
  //       type: ACTION.SEARCHEMPTY,
  //       payload: { jobs: allCompanyJobs },
  //     });
  //   }
  // };

  // const clearHandler = event => {
  //   event.preventDefault();
  //   dispatch({
  //     type: ACTION.SEARCHEMPTY,
  //     payload: { jobs: allCompanyJobs },
  //   });
  // };

  // const searchInputHandler = useCallback((id, value, isValid) => {
  //   dispatch({
  //     type: ACTION.SEARCHUPDATE,
  //     payload: {
  //       id,
  //       value,
  //       isValid,
  //     },
  //   });
  // }, []);

  return (
    <div className={styles.Container}>
      <HeaderBanner imageSource={MeetingCompany} />
      <div className={styles.ContentContainer}>
        <div className={styles.CompanyJobListContainer}>
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: '#f79f35' }}>
              <TabList
                TabIndicatorProps={{ style: { background: '#f79f35' } }}
                onChange={tabChangeHandler}
                aria-label='lab API tabs example'>
                <Tab
                  className={styles.DraftTab}
                  label={<strong style={{ color: '#666' }}>Draft</strong>}
                  value='draft'
                />
                <Tab
                  className={styles.LiveTab}
                  label={<strong style={{ color: '#00a31b' }}>Live</strong>}
                  value='live'
                />
                <Tab
                  className={styles.ExpiredTab}
                  label={<strong style={{ color: '#ef3f37' }}>Expired</strong>}
                  value='expired'
                />
              </TabList>
            </Box>
            <TabPanel value='draft' className={styles.TabPanel}>
              <section className={styles.DraftContainer}>
                <h2>Draft Iklan Pekerjaan</h2>
                {props.job.isLoading ? (
                  <LoadingBar />
                ) : (
                  <DraftJobs
                    draftJobs={unreleasedData || []}
                    onDelete={onDeleteHandler}
                    isLoading={props.job.isLoading}
                  />
                )}
              </section>
            </TabPanel>
            <TabPanel value='live' className={styles.TabPanel}>
              <section className={styles.LiveContainer}>
                <h2>Iklan Pekerjaan Sedang Tayang</h2>
                {props.job.isLoading ? <LoadingBar /> : <LiveJobs liveJobs={displayData || []} />}
              </section>
            </TabPanel>
            <TabPanel value='expired' className={styles.TabPanel}>
              <section className={styles.ExpiredContainer}>
                <h2>Iklan Pekerjaan Selesai Tayang</h2>
                {props.job.isLoading ? <LoadingBar /> : <ExpiredJobs expiredData={expiredData || []} />}
              </section>
            </TabPanel>
          </TabContext>
        </div>
        <ExecutiveSearchBanner imageSource={ExecutiveSearchImage} />
        {/* <QueryBar searchInputHandler={searchInputHandler} searchHandler={searchHandler} clearHandler={clearHandler} /> */}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    job: state.job,
    error: state.job.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteJob: (payload) => dispatch(actionCreators.deleteJob(payload)),
    getJobsInCompany: (payload) => dispatch(actionCreators.getJobsInCompany(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyJobList);
