import React, { useState, useCallback, useReducer, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import moment from 'moment';

import * as actionCreators from '../../../../store/actions/index';
import LoadingBar from '../../../../shared/UI_Element/Spinner/LoadingBar';
import QueryBar from './Component/QueryBar';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Pagination from '@material-ui/lab/Pagination';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import classes from './ApplicantListAO.module.css';

const ACTION = {
  SEARCHUPDATE: 'update-search',
  SEARCHEXECUTE: 'search-execute',
  SEARCHEMPTY: 'search-empty',
  DATAINIT: 'data-init',
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

    case ACTION.DATAINIT: {
      return {
        ...state,
        applicantList: action.payload.init,
      };
    }

    case ACTION.SEARCHEXECUTE: {
      const filteredApplicant = action.payload.applicant.filter((app, i) => {
        let searchValidity = false;
        for (const key in app) {
          searchValidity =
            searchValidity ||
            (typeof app[key] === 'string' && app[key].toLowerCase().includes(state.search.value.toLowerCase()));

          let eduValidity = false;
          app.education.forEach((edu) => {
            for (const key in edu) {
              eduValidity =
                eduValidity ||
                (typeof edu[key] === 'string' && edu[key].toLowerCase().includes(state.search.value.toLowerCase()));
            }
          });
          searchValidity = searchValidity || eduValidity;

          let expValidity = false;
          app.experience.forEach((exp) => {
            for (const key in exp) {
              expValidity =
                expValidity ||
                (typeof exp[key] === 'string' && exp[key].toLowerCase().includes(state.search.value.toLowerCase()));
            }
          });
          searchValidity = searchValidity || expValidity;

          let skillValidity = false;
          app.skills.forEach((skill) => {
            skillValidity =
              skillValidity ||
              (typeof skill === 'string' && skill.toLowerCase().includes(state.search.value.toLowerCase()));
          });
          searchValidity = searchValidity || skillValidity;
        }

        return searchValidity;
      });
      console.log(filteredApplicant);
      return {
        ...state,
        applicantList: filteredApplicant,
      };
    }
    case ACTION.SEARCHEMPTY: {
      return {
        ...state,
        applicantList: action.payload.applicant,
      };
    }
    default: {
      return state;
    }
  }
};

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

const ApplicantListAO = (props) => {
  const [find, setfind] = useState(false);
  const [filter, setfilter] = useState({ value: '' });
  const [data, setData] = useState();
  const [displayData, setDisplayData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const emptyText = useRef('');

  const [statePage, dispatchPage] = useReducer(paginationReducer, initPagination);

  const [state, dispatch] = useReducer(searchReducer, {
    search: {
      id: '',
      value: '',
      isValid: '',
    },
    applicantList: [],
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { getAllApplicant, admin } = props;
  useEffect(() => {
    const payload = { token: admin.token };
    getAllApplicant(payload).then((res) => {
      setData(res.wholeApplicants.reverse());
      dispatch({
        type: ACTION.DATAINIT,
        payload: { init: res.wholeApplicants },
      });

      if (res.message) {
        emptyText.current = 'Belum ada perusahaan yang membuat pesanan untuk saat ini';
      }
    });
  }, [getAllApplicant, setIsLoading, admin.token]);

  useEffect(() => {
    if (state.applicantList && state.applicantList.length > 0) {
      let applicantArray = [...state.applicantList];
      let pageCount = Math.ceil(applicantArray.length / statePage.rowsPerPage);
      dispatchPage({ type: ACTIONPAGE.PAGEUPDATE, payload: { pageCount } });

      //Slicing all jobs based on the number jobs may appear in one page
      applicantArray = applicantArray.slice(statePage.startIndex, statePage.startIndex + statePage.rowsPerPage);
      setIsLoading(false);
      setDisplayData(applicantArray);
    }
  }, [statePage.rowsPerPage, statePage.startIndex, state.applicantList]);

  const handleAll = () => {
    setfind(false);
  };

  const handleBlocked = () => {
    setfind(true);
    setfilter('Blocked');
  };

  const handleRegular = () => {
    setfind(true);
    setfilter('Regular');
  };

  const handlePremium = () => {
    setfind(true);
    setfilter('Premium');
  };

  const searchHandler = (event) => {
    event.preventDefault();
    if (state.search.value) {
      dispatch({
        type: ACTION.SEARCHEXECUTE,
        payload: { applicant: data },
      });
    } else {
      dispatch({
        type: ACTION.SEARCHEMPTY,
        payload: { applicant: data },
      });
    }
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

  //================= Pagination ===========================

  const pageChangeHandler = (event, value) => {
    dispatchPage({
      type: ACTIONPAGE.PAGEUPDATE,
      payload: {
        pageNumber: value,
        startIndex: statePage.rowsPerPage * (value - 1),
      },
    });
  };

  const rowsHandler = (event) => {
    console.log(event.target.value);
    dispatchPage({
      type: ACTIONPAGE.PAGEUPDATE,
      payload: {
        rowsPerPage: event.target.value,
      },
    });
  };

  let content = <LoadingBar />;

  console.log(displayData);

  if (!isLoading && displayData && displayData.length > 0) {
    content = (
      <div className={classes.FlexContainer}>
        <QueryBar searchInputHandler={searchInputHandler} searchHandler={searchHandler} action={`/AO/applicantlist`} />

        <div className={classes.Container}>
          <div className={classes.HeaderContainer}>
            <h1 className={classes.Header}>Applicant Account List</h1>
            <div className={classes.DropDown}>
              <button className={classes.DropButton}>
                Filter
                <ArrowDropDownIcon />
              </button>
              <div className={classes.DropDownContent}>
                <button style={{ color: 'black' }} onClick={handleAll}>
                  All
                </button>
                <button style={{ color: 'rgb(33, 153, 0)' }} value='Blocked' onClick={handleBlocked}>
                  Blocked
                </button>
                <button style={{ color: 'red' }} value='Regular' onClick={handleRegular}>
                  Regular
                </button>

                <button style={{ color: 'rgb(250, 129, 0)' }} value='Premium' onClick={handlePremium}>
                  Premium
                </button>
              </div>
            </div>
          </div>

          <div className={classes.TableHolder}>
            <table className={classes.Table}>
              <thead className={classes.RowField}>
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>Email</th>
                  <th>Usia</th>
                  <th>Jenis Kelamin</th>
                  <th>Pendidikan</th>
                  <th>Jurusan</th>
                </tr>
              </thead>

              {find ? (
                <tbody className={classes.ColumnField}>
                  {displayData &&
                    displayData
                      .filter((app) => app.status === filter)
                      .map((app, i) => (
                        <tr key={app.id}>
                          <th>{i + 1}</th>

                          <th>
                            <div className={classes.NameRow}>
                              <div className={classes.ApplicantName}>
                                {app.firstName} {app.lastName}
                              </div>
                              <p />
                              {app.headline}
                            </div>
                          </th>
                          <th>{app.email}</th>

                          <th>{app.dateOfBirth ? moment().diff(moment(app.dateOfBirth), 'year') : 'null'}</th>
                        </tr>
                      ))}
                </tbody>
              ) : (
                <tbody className={classes.ColumnField}>
                  {displayData &&
                    displayData.map((app, i) => (
                      <tr key={app.id}>
                        <th>{i + 1}</th>

                        <th>
                          <div className={classes.NameRow}>
                            <div className={classes.ApplicantName}>
                              {app.firstName} {app.lastName}
                            </div>
                            <p />
                            {app.headline ? app.headline : 'No info'}
                          </div>
                        </th>
                        <th>{app.email}</th>

                        <th>{app.dateOfBirth ? moment().diff(moment(app.dateOfBirth), 'year') : 'null'}</th>

                        <th>{app.gender === 'male' ? 'Pria' : 'Wanita'}</th>

                        <th>{app.education[0]?.degree || '-'}</th>
                        <th>{app.education[0]?.major || '-'}</th>
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
            }}>
            <FormControl style={{ width: '4rem' }}>
              <Select labelId='rowPerPage' id='rowPerPageSelect' value={statePage.rowsPerPage} onChange={rowsHandler}>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={30}>30</MenuItem>
              </Select>
              <FormHelperText>Rows</FormHelperText>
            </FormControl>
            <Pagination count={statePage.pageCount} page={statePage.pageNumber} onChange={pageChangeHandler} />
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
    getAllApplicant: (payload) => dispatch(actionCreators.getAllApplicant(payload)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ApplicantListAO);
