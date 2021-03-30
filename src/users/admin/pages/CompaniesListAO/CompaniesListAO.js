import React, { useState, useEffect, useReducer } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actionCreators from '../../../../store/actions/index';
import SpinnerCircle from '../../../../shared/UI_Element/Spinner/SpinnerCircle';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Pagination from '@material-ui/lab/Pagination';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import classes from './CompaniesListAO.module.css';

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

const CompaniesListAO = (props) => {
  const [find, setfind] = useState(false);
  const [filter, setfilter] = useState({ value: '' });
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [indexLoading, setIndexLoading] = useState(null);
  const [displayData, setDisplayData] = useState();

  const [state, dispatch] = useReducer(paginationReducer, initPagination);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { getWholeCompanies, admin } = props;
  useEffect(() => {
    const payload = { token: admin.token };
    getWholeCompanies(payload).then((res) => {
      setData(res.wholeCompanies);
    });
  }, [getWholeCompanies, setIsLoading, admin]);

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
      setDisplayData(applicantArray);
      setIsLoading(false);
    }
  }, [state.rowsPerPage, state.startIndex, data]);

  const handleAll = () => {
    setfind(false);
  };

  const handleMember = () => {
    setfind(true);
    setfilter('Member');
  };

  const handleRegular = () => {
    setfind(true);
    setfilter('Blocked');
  };

  const handlePremium = () => {
    setfind(true);
    setfilter('Premium');
  };

  const activateCompanyHandler = async (dataInput) => {
    setIndexLoading(dataInput.index);
    const payload = {
      token: props.admin.token,
      companyId: dataInput.companyId,
    };
    try {
      await props.activateCo(payload);
      setData((prevData) => {
        const tempData = [...prevData];
        tempData[dataInput.index].isActive = true;
        return tempData;
      });
      setIndexLoading(null);
    } catch (err) {
      console.log(err);
      setIndexLoading(null);
    }
  };
  const blockCompanyHandler = async (dataInput) => {
    setIndexLoading(dataInput.index);
    const payload = {
      token: props.admin.token,
      companyId: dataInput.companyId,
    };
    try {
      await props.blockCo(payload);
      setData((prevData) => {
        const tempData = [...prevData];
        tempData[dataInput.index].isActive = false;
        return tempData;
      });
      setIndexLoading(null);
    } catch (err) {
      console.log(err);
      setIndexLoading(null);
    }
  };

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

  console.log(data);
  console.log(displayData);

  let content = <SpinnerCircle />;

  if (!isLoading && data && displayData) {
    content = (
      <div className={classes.FlexContainer}>
        <div className={classes.Container}>
          <div className={classes.HeaderContainer}>
            <h1 className={classes.Header}>Companies Account List</h1>
            <div className={classes.DropDown}>
              <button className={classes.DropButton}>
                Filter
                <ArrowDropDownIcon />
              </button>
              <div className={classes.DropDownContent}>
                <button style={{ color: 'black' }} onClick={handleAll}>
                  All
                </button>

                <button
                  style={{ color: 'red' }}
                  value='Blocked'
                  onClick={handleRegular}
                >
                  Blocked
                </button>

                <button
                  style={{ color: 'rgb(250, 129, 0)' }}
                  value='Premium'
                  onClick={handlePremium}
                >
                  Premium
                </button>

                <button
                  style={{ color: 'rgb(33, 153, 0)' }}
                  value='Member'
                  onClick={handleMember}
                >
                  Member
                </button>
              </div>
            </div>
          </div>

          <div className={classes.TableHolder}>
            <table className={classes.Table}>
              <thead className={classes.RowField}>
                <tr>
                  <th>No</th>
                  <th>Company Name</th>
                  <th>Industry</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              {find ? (
                <tbody className={classes.ColumnField}>
                  {displayData
                    .filter((company) => company.status === filter)
                    .map((company, index) => (
                      <tr key={company.id}>
                        <th> {index + 1}</th>

                        <th>
                          {' '}
                          <Link
                            to={`/co/${company.id}`}
                            style={{ color: 'black', textDecoration: 'none' }}
                          >
                            {company.companyName}
                          </Link>
                        </th>
                        <th>
                          {company.industry ? company.industry : 'no data'}
                        </th>
                        <th>{company.email}</th>
                        <th>{company.address}</th>

                        <th>
                          {props.company.isLoading && indexLoading === index ? (
                            <SpinnerCircle />
                          ) : company.isActive ? (
                            <span
                              style={{ color: 'Green', fontWeight: 'bold' }}
                            >
                              Active
                            </span>
                          ) : (
                            <span
                              style={{ color: 'Orange', fontWeight: 'bold' }}
                            >
                              Pending
                            </span>
                          )}
                        </th>

                        <th>
                          <div className={classes.DropDown}>
                            <button className={classes.DropButton}>
                              <ArrowDropDownIcon />
                            </button>
                            <div className={classes.DropDownContent}>
                              <button
                                style={{ color: 'Green' }}
                                onClick={() =>
                                  activateCompanyHandler({
                                    companyId: company.id,
                                    index,
                                  })
                                }
                              >
                                Activate
                              </button>
                              <button
                                style={{ color: 'red' }}
                                onClick={() =>
                                  blockCompanyHandler({
                                    companyId: company.id,
                                    index,
                                  })
                                }
                              >
                                Block
                              </button>
                            </div>
                          </div>
                        </th>
                      </tr>
                    ))}
                </tbody>
              ) : (
                <tbody className={classes.ColumnField}>
                  {displayData &&
                    displayData.map((company, index) => (
                      <tr key={company.id}>
                        <th> {index + 1}</th>

                        <th>
                          {' '}
                          <Link
                            to={`/co/${company.id}`}
                            style={{ color: 'black', textDecoration: 'none' }}
                          >
                            {company.companyName}
                          </Link>
                        </th>
                        <th
                          style={
                            company.industry
                              ? { color: 'black' }
                              : {
                                  color: 'rgba(255,0,0,0.7)',
                                  fontWeight: 'bold',
                                }
                          }
                        >
                          {company.industry ? company.industry : 'no data'}
                        </th>

                        <th>{company.email}</th>

                        <th
                          style={
                            company.address
                              ? { color: 'black', maxWidth: '24rem' }
                              : {
                                  color: 'rgba(255,0,0,0.7)',
                                  fontWeight: 'bold',
                                }
                          }
                        >
                          {' '}
                          {company.address ? company.address : 'no data'}
                        </th>

                        <th>
                          {props.company.isLoading && indexLoading === index ? (
                            <SpinnerCircle />
                          ) : company.isActive ? (
                            <span
                              style={{ color: 'Green', fontWeight: 'bold' }}
                            >
                              Active
                            </span>
                          ) : (
                            <span
                              style={{ color: 'Orange', fontWeight: 'bold' }}
                            >
                              Pending
                            </span>
                          )}
                        </th>

                        <th>
                          <div className={classes.DropDown}>
                            <button className={classes.DropButton}>
                              <ArrowDropDownIcon />
                            </button>
                            <div className={classes.DropDownContent}>
                              <button
                                style={{ color: 'Green' }}
                                onClick={() =>
                                  activateCompanyHandler({
                                    companyId: company.id,
                                    index,
                                  })
                                }
                              >
                                Activate
                              </button>
                              <button
                                style={{ color: 'red' }}
                                onClick={() =>
                                  blockCompanyHandler({
                                    companyId: company.id,
                                    index,
                                  })
                                }
                              >
                                Block
                              </button>
                            </div>
                          </div>
                        </th>
                      </tr>
                    ))}
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

  if (!props.isLoading && !data && !displayData) {
    content = (
      <p className={classes.EmptyText}>
        Tidak ditemukan data akun terdaftar sebagai perusahaan
      </p>
    );
  }

  return <div>{content}</div>;
};

const mapStateToProps = (state) => {
  return {
    admin: state.admin,
    company: state.company,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getWholeCompanies: (payload) =>
      dispatch(actionCreators.getWholeCompanies(payload)),
    activateCo: (payload) => dispatch(actionCreators.activateCompany(payload)),
    blockCo: (payload) => dispatch(actionCreators.blockCompany(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompaniesListAO);
