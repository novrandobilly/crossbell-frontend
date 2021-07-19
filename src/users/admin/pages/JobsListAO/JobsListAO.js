import React, { useState, useEffect, useReducer, useRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

import * as actionCreators from '../../../../store/actions/index';
import SpinnerCircle from '../../../../shared/UI_Element/Spinner/SpinnerCircle';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Pagination from '@material-ui/lab/Pagination';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import classes from './JobsListAO.module.css';

const ACTIONPAGE = {
  PAGEUPDATE: 'PAGEUPDATE',
};

const initPagination = {
  pageCount: 1,
  pageNumber: 1,
  rowsPerPage: 10,
  startIndex: 0,
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

const JobsListAO = (props) => {
  const [find, setfind] = useState(false);
  const [filter, setfilter] = useState({ value: 'Approved' });
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [displayData, setDisplayData] = useState();

  const emptyText = useRef('');

  const [state, dispatch] = useReducer(paginationReducer, initPagination);

  const handleAll = () => {
    setfind(false);
  };

  const handleApproved = () => {
    setfind(true);
    setfilter('Approved');
  };

  const handleCanceled = () => {
    setfind(true);
    setfilter('Canceled');
  };

  const handlePending = () => {
    setfind(true);
    setfilter('Pending');
  };

  const handleExpired = () => {
    setfind(true);
    setfilter('Expired');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { getAllJob, getWholeCompanies, admin } = props;
  useEffect(() => {
    const payload = { token: admin.token };
    if (admin.token) {
      let sort = [];
      getAllJob(payload).then((res) => {
        sort = res.availableJobs;
        sort = sort.sort((a, b) => moment(b.createdAt) - moment(a.createdAt));
        setData(sort);
        setIsLoading(false);

        if (res.message) {
          emptyText.current =
            'Belum ada perusahaan yang membuat pesanan untuk saat ini';
        }
      });
    }
  }, [getAllJob, getWholeCompanies, setIsLoading, admin]);

  useEffect(() => {
    if (data && data.length > 0) {
      let applicantArray = [...data];
      let pageCount = Math.ceil(applicantArray.length / state.rowsPerPage);
      dispatch({ type: ACTIONPAGE.PAGEUPDATE, payload: { pageCount } });

      //Slicing all jobs based on the number jobs may appear in one page
      applicantArray = applicantArray.slice(
        state.startIndex,
        state.startIndex + state.rowsPerPage
      );
      setIsLoading(false);
      setDisplayData(applicantArray);
    }
  }, [state.rowsPerPage, state.startIndex, data]);

  //================= Pagination ===========================

  const pageChangeHandler = (event, value) => {
    dispatch({
      type: ACTIONPAGE.PAGEUPDATE,
      payload: {
        pageNumber: value,
        startIndex: state.rowsPerPage * (value - 1),
      },
    });
  };

  const rowsHandler = (event) => {
    console.log(event.target.value);
    dispatch({
      type: ACTIONPAGE.PAGEUPDATE,
      payload: {
        rowsPerPage: event.target.value,
      },
    });
  };

  let content = <SpinnerCircle />;

  if (!isLoading) {
    content = (
      <div className={classes.FlexContainer}>
        <div className={classes.Container}>
          <div className={classes.HeaderContainer}>
            <h1 className={classes.Header}>Job List</h1>
            <div className={classes.DropDown}>
              <button className={classes.DropButton}>
                Filter
                <ArrowDropDownIcon />
              </button>
              <div className={classes.DropDownContent}>
                <button
                  style={{ color: 'black' }}
                  value='All'
                  onClick={handleAll}
                >
                  All
                </button>
                <button
                  style={{ color: 'rgb(33, 153, 0)' }}
                  value='Approved'
                  onClick={handleApproved}
                >
                  Approved
                </button>
                <button
                  style={{ color: 'red' }}
                  value='Canceled'
                  onClick={handleCanceled}
                >
                  Canceled
                </button>
                <button
                  style={{ color: 'rgb(250, 129, 0)' }}
                  value='Pending'
                  onClick={handlePending}
                >
                  Pending
                </button>
                <button
                  style={{ color: 'rgb(130, 130, 130)' }}
                  value='Expired'
                  onClick={handleExpired}
                >
                  Expired
                </button>
              </div>
            </div>
          </div>

          <div className={classes.TableHolder}>
            <table className={classes.Table}>
              <thead className={classes.RowField}>
                <tr>
                  <th>No</th>
                  <th>Id</th>
                  <th>Company</th>
                  <th>JobTitle</th>
                  <th>Location</th>
                  <th>Date posted</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              {find ? (
                <tbody className={classes.ColumnField}>
                  {displayData &&
                    displayData
                      .filter((status) => status.status === filter)
                      .map((job, i) => {
                        return (
                          <tr key={job.id}>
                            <th>{i + 1}</th>

                            <th>
                              <Link
                                to={`/jobs/${job._id}`}
                                style={{
                                  color: 'black',
                                  textDecoration: 'none',
                                }}
                              >
                                {job._id}
                              </Link>
                            </th>
                            <th>{job.companyId.companyName}</th>
                            <th>{job.jobTitle}</th>
                            <th>{job.placementLocation}</th>
                            <th
                              style={
                                job.releasedAt
                                  ? { color: 'black' }
                                  : { color: 'red' }
                              }
                            >
                              {job.releasedAt
                                ? moment(job.releasedAt).format('D MMM YYYY')
                                : 'Belum terbit'}
                            </th>
                            <th
                              style={
                                job.status === 'Canceled'
                                  ? { color: 'red', fontWeight: 'bold' }
                                  : job.status === 'Approved'
                                  ? {
                                      color: 'rgb(33, 153, 0)',
                                      fontWeight: 'bold',
                                    }
                                  : job.status === 'Expired'
                                  ? {
                                      color: 'rgb(130, 130, 130)',
                                      fontWeight: 'bold',
                                    }
                                  : {
                                      color: 'rgb(250, 129, 0)',
                                      fontWeight: 'bold',
                                    }
                              }
                            >
                              {job.status}
                            </th>
                            <th>
                              <div className={classes.DropDown}>
                                <button className={classes.DropButton}>
                                  <ArrowDropDownIcon />
                                </button>
                                <div className={classes.DropDownContent}>
                                  <button style={{ color: 'rgb(33, 153, 0)' }}>
                                    Approved
                                  </button>
                                  <button style={{ color: 'red' }}>
                                    Canceled
                                  </button>
                                  <button style={{ color: 'rgb(250, 129, 0)' }}>
                                    Pending
                                  </button>
                                </div>
                              </div>
                            </th>
                          </tr>
                        );
                      })}
                </tbody>
              ) : (
                <tbody className={classes.ColumnField}>
                  {displayData &&
                    displayData.map((job, i) => {
                      // let difference = (moment(job.expiredDate).diff(moment()));
                      return (
                        <tr key={job._id}>
                          <th>{i + 1}</th>

                          <th>
                            {' '}
                            <Link
                              to={`/jobs/${job._id}`}
                              style={{ color: 'black', textDecoration: 'none' }}
                            >
                              {job._id}
                            </Link>
                          </th>
                          <th>{job.companyId.companyName}</th>
                          <th>{job.jobTitle}</th>
                          <th style={{ width: '20rem' }}>
                            {job.placementLocation}
                          </th>
                          <th
                            style={
                              job.releasedAt
                                ? { color: 'black' }
                                : { color: 'red' }
                            }
                          >
                            {job.releasedAt
                              ? moment(job.releasedAt).format('D MMM YYYY')
                              : 'Belum terbit'}
                          </th>
                          <th
                            style={
                              moment(job.expiredDate) >= moment()
                                ? { color: 'green', fontWeight: '600' }
                                : { color: 'gray', fontWeight: '600' }
                            }
                          >
                            {moment(job.expiredDate) >= moment()
                              ? 'Aktif'
                              : 'Expired'}
                          </th>
                          <th>
                            <div className={classes.DropDown}>
                              <button className={classes.DropButton}>
                                <ArrowDropDownIcon />
                              </button>
                              <div className={classes.DropDownContent}>
                                <button style={{ color: 'rgb(33, 153, 0)' }}>
                                  Approved
                                </button>
                                <button style={{ color: 'red' }}>
                                  Canceled
                                </button>
                                <button style={{ color: 'rgb(250, 129, 0)' }}>
                                  Pending
                                </button>
                              </div>
                            </div>
                          </th>
                        </tr>
                      );
                    })}
                </tbody>
              )}
            </table>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              width: '100%',
            }}
          >
            <FormControl style={{ width: '4rem' }}>
              <Select
                labelId='rowPerPage'
                id='rowPerPageSelect'
                value={state.rowsPerPage}
                onChange={rowsHandler}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={30}>30</MenuItem>
              </Select>
              <FormHelperText>Rows</FormHelperText>
            </FormControl>
            <Pagination
              count={state.pageCount}
              page={state.pageNumber}
              onChange={pageChangeHandler}
            />
          </div>
        </div>
      </div>
    );
  }

  if (!props.isLoading && emptyText.current) {
    content = <p className={classes.EmptyText}>{emptyText.current}</p>;
  }

  return <div>{content}</div>;
};

const mapStateToProps = (state) => {
  return {
    admin: state.admin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllJob: (payload) => dispatch(actionCreators.getAllJob(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(JobsListAO);
