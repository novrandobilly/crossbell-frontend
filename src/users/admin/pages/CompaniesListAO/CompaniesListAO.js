import React, { useState, useEffect, useReducer, useRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actionCreators from '../../../../store/actions/index';
import LoadingBar from '../../../../shared/UI_Element/Spinner/LoadingBar';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Pagination from '@material-ui/lab/Pagination';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import styles from './CompaniesListAO.module.scss';
import moment from 'moment';

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
  const [data, setData] = useState();

  const [isLoading, setIsLoading] = useState(true);
  const [indexLoading, setIndexLoading] = useState(null);
  const [displayData, setDisplayData] = useState();

  const [paginationNumber, setPaginationNumber] = useState(1);
  const [rowsNumber, setRowsNumber] = useState(10);

  const emptyText = useRef('');

  const [state, dispatch] = useReducer(paginationReducer, initPagination);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { getWholeCompanies, admin } = props;
  useEffect(() => {
    const payload = { token: admin.token };
    getWholeCompanies(payload).then((res) => {
      setData(res?.wholeCompanies?.reverse());
      if (res.message) {
        emptyText.current = 'Belum ada perusahaan yang membuat pesanan untuk saat ini';
      }
    });
  }, [getWholeCompanies, setIsLoading, admin]);

  useEffect(() => {
    if (data && data.length > 0) {
      let applicantArray = [...data];
      let pageCount = Math.ceil(applicantArray.length / state.rowsPerPage);
      dispatch({ type: ACTIONPAGE.PAGEUPDATE, payload: { pageCount } });

      //Slicing all jobs based on the number jobs may appear in one page
      applicantArray = applicantArray.slice(state.startIndex, state.startIndex + state.rowsPerPage);
      setDisplayData(applicantArray);
      setIsLoading(false);
    }
  }, [state.rowsPerPage, state.startIndex, data]);

  const activateCompanyHandler = async (dataInput) => {
    setIndexLoading(dataInput.index);
    const payload = {
      token: props.admin.token,
      companyId: dataInput.companyId,
    };
    try {
      const response = await props.activateCo(payload);
      if (!response.id) {
        throw new Error(response);
      }

      setData((prevData) => {
        const tempData = [...prevData];
        const trueIndex = dataInput.index + (paginationNumber - 1) * rowsNumber;
        tempData[trueIndex].isActive = true;
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
        const trueIndex = dataInput.index + (paginationNumber - 1) * rowsNumber;
        tempData[trueIndex].isActive = false;
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
    setPaginationNumber(value);
  };

  const rowsHandler = (event) => {
    dispatch({
      type: ACTIONPAGE.PAGEUPDATE,
      payload: {
        rowsPerPage: event.target.value,
      },
    });
    setRowsNumber(event.target.value);
  };

  let content = <LoadingBar />;

  if (!isLoading && data && displayData) {
    content = (
      <div className={styles.FlexContainer}>
        <div className={styles.Container}>
          <div className={styles.HeaderContainer}>
            <h1 className={styles.Header}>Companies Account List</h1>
            <div className={styles.DropDown}>
              <button className={styles.DropButton}>
                Filter
                <ArrowDropDownIcon />
              </button>
              <div className={styles.DropDownContent}>
                <button style={{ color: 'black' }}>All</button>

                <button style={{ color: 'red' }} value='Blocked'>
                  Blocked
                </button>

                <button style={{ color: 'rgb(250, 129, 0)' }} value='Premium'>
                  Premium
                </button>

                <button style={{ color: 'rgb(33, 153, 0)' }} value='Member'>
                  Member
                </button>
              </div>
            </div>
          </div>

          <div className={styles.TableHolder}>
            <table className={styles.Table}>
              <thead className={styles.RowField}>
                <tr className={styles.TitleRow}>
                  <th>No</th>
                  <th>Nama Perusahaan</th>
                  <th>Industri</th>
                  <th>Email</th>
                  <th>Iklan Tayang</th>
                  <th>Total Iklan</th>
                  <th>Slot Terpakai</th>
                  <th>Sisa Slot</th>
                  <th>Slot Expired</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody className={styles.ColumnField}>
                {displayData &&
                  displayData.map((company, index) => {
                    return (
                      <tr key={company.id}>
                        <th> {index + 1}</th>

                        <th>
                          <Link to={`/co/${company.id}/profile`} style={{ color: 'black', textDecoration: 'none' }}>
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
                          }>
                          {company.industry ? company.industry : 'no data'}
                        </th>
                        <th>{company.email}</th>
                        <th className={styles.CenterColumnText}>
                          {
                            company.jobAds.filter((job) => job.releasedAt && moment(job.expiredDate).diff(moment()) > 0)
                              .length
                          }
                        </th>
                        <th className={styles.CenterColumnText}>
                          {company.jobAds.filter((job) => job.releasedAt).length}{' '}
                        </th>
                        <th className={styles.CenterColumnText}>
                          {company.slotREG.filter((slot) => slot.status === 'Used').length}{' '}
                        </th>
                        <th className={styles.CenterColumnText}>
                          {company.slotREG.filter((slot) => slot.status === 'Idle').length}
                        </th>
                        <th className={styles.CenterColumnText}>
                          {company.slotREG.filter((slot) => slot.status === 'Expired').length}
                        </th>

                        <th className={styles.CenterColumnText}>
                          {props.company.isLoading && indexLoading === index ? (
                            <LoadingBar />
                          ) : company.isActive ? (
                            <span style={{ color: 'Green', fontWeight: 'bold' }}>Active</span>
                          ) : (
                            <span style={{ color: 'Orange', fontWeight: 'bold' }}>Pending</span>
                          )}
                        </th>

                        <th className={styles.CenterColumnText}>
                          <div className={styles.DropDown}>
                            <button className={styles.DropButton}>
                              <ArrowDropDownIcon />
                            </button>
                            <div className={styles.DropDownContent}>
                              <button
                                style={{ color: 'Green' }}
                                onClick={() =>
                                  activateCompanyHandler({
                                    companyId: company.id,
                                    index,
                                  })
                                }>
                                Activate
                              </button>
                              <button
                                style={{ color: 'red' }}
                                onClick={() =>
                                  blockCompanyHandler({
                                    companyId: company.id,
                                    index,
                                  })
                                }>
                                Block
                              </button>
                            </div>
                          </div>
                        </th>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              width: '100%',
            }}>
            <FormControl style={{ width: '4rem' }}>
              <Select labelId='rowPerPage' id='rowPerPageSelect' value={state.rowsPerPage} onChange={rowsHandler}>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={30}>30</MenuItem>
              </Select>
              <FormHelperText>Rows</FormHelperText>
            </FormControl>
            <Pagination count={state.pageCount} page={state.pageNumber} onChange={pageChangeHandler} />
          </div>
        </div>
      </div>
    );
  }

  if (!props.isLoading && emptyText.current) {
    content = <p className={styles.EmptyText}>{emptyText.current}</p>;
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
    getWholeCompanies: (payload) => dispatch(actionCreators.getWholeCompanies(payload)),
    activateCo: (payload) => dispatch(actionCreators.activateCompany(payload)),
    blockCo: (payload) => dispatch(actionCreators.blockCompany(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompaniesListAO);
