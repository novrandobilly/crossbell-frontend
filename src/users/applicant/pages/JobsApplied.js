import React, { useState, useReducer, useEffect } from 'react';
import { withRouter, useParams, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

import * as actionCreators from '../../../store/actions';
import HeaderBanner from '../../../shared/UI_Element/HeaderBanner';
import MeetingDashboard from '../../../assets/images/Meeting-Dashboard.png';
import LoadingBar from '../../../shared/UI_Element/Spinner/LoadingBar';
import Pagination from '@mui/material/Pagination';

import styles from './JobsApplied.module.scss';

const ACTIONPAGE = {
  PAGEUPDATE: 'PAGEUPDATE',
};

const initPagination = {
  pageCount: 1,
  pageNumber: 1,
  startIndex: 0,
  itemsPerPage: 10,
};

const paginationReducer = (state, action) => {
  switch (action.type) {
    case ACTIONPAGE.PAGEUPDATE: {
      let update = {};
      for (const key in action.payload) {
        update[key] = action.payload[key];
      }
      return {
        ...state,
        ...update,
      };
    }
    default:
      return state;
  }
};

const JobsApplied = props => {
  const { applicantid } = useParams();
  const [fetchdata, setFetchData] = useState([]);
  const [displayData, setDisplayData] = useState([]);

  const [state, dispatch] = useReducer(paginationReducer, initPagination);

  const { getApplicantJobsApplied } = props;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const token = props.auth.token;
    if (token) {
      const payload = {
        token: token,
        applicantId: applicantid,
      };

      getApplicantJobsApplied(payload).then(res => {
        setFetchData(res.Jobs.sort((a, b) => moment(b.jobItem.releasedAt) - moment(a.jobItem.releasedAt)));
      });
    }
  }, [getApplicantJobsApplied, applicantid, props.auth]);

  const pageChangeHandler = (event, value) => {
    dispatch({
      type: ACTIONPAGE.PAGEUPDATE,
      payload: {
        pageNumber: value,
        startIndex: state.itemsPerPage * (value - 1),
      },
    });
  };

  // Change Page Job Data
  useEffect(() => {
    dispatch({
      type: ACTIONPAGE.PAGEUPDATE,
      payload: {
        pageCount: Math.ceil(fetchdata.length / state.itemsPerPage),
      },
    });
    let jobsDataTemp = fetchdata.slice(state.startIndex, state.startIndex + state.itemsPerPage);
    setDisplayData(jobsDataTemp);
  }, [fetchdata, state.startIndex, state.itemsPerPage]);

  let content = <LoadingBar />;
  if (!props.isLoading && displayData) {
    content = (
      <div className={styles.AppliedJobsContainer}>
        {displayData.map((items, i) => {
          return (
            <div className={styles.JobItem} key={items.jobItem.id}>
              <p>{state.startIndex + i + 1}</p>
              <Link to={`/co/${items.jobItem?.companyId?.id}/profile`}>
                <img className={styles.CompanyLogo} src={`${items.jobItem.companyId.logo?.url}`} alt='Logo' />
              </Link>
              <Link to={`/co/${items.jobItem?.companyId?.id}/profile`}>
                <p className={styles.CompanyName}>{items.jobItem.companyId.companyName}</p>
              </Link>
              <Link to={`/jobs/${items.jobItem.id}`}>
                <p className={styles.JobTitle}>{items.jobItem.jobTitle}</p>
              </Link>
              <p className={styles.DateApplied}>{moment(items.appliedDate).fromNow()}</p>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={styles.Container}>
      <HeaderBanner imageSource={MeetingDashboard} />

      <h2 className={styles.PageTitle}>
        Pekerjaan Yang <span>Telah Dilamar</span>
      </h2>
      {content}
      {displayData.length > 0 && (
        <div className={styles.PaginationContainer}>
          <Pagination count={state.pageCount} page={state.pageNumber} onChange={pageChangeHandler} />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    applicant: state.applicant,
    isLoading: state.applicant.isLoading,
    error: state.applicant.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getApplicantJobsApplied: payload => dispatch(actionCreators.getApplicantJobsApplied(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(JobsApplied));
