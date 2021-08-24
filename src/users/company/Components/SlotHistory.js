import React, { useState, useEffect, useReducer } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { useForm } from '../../../shared/utils/useForm';

import * as actionTypes from '../../../store/actions/actions';
import * as actionCreators from '../../../store/actions';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '../../../shared/UI_Element/Input';
import FormControl from '@material-ui/core/FormControl';
import Pagination from '@material-ui/lab/Pagination';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { VALIDATOR_ALWAYSTRUE } from '../../../shared/utils/validator';
import SpinnerCircle from '../../../shared/UI_Element/Spinner/SpinnerCircle';

import classes from './SlotHistory.module.css';

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

const SlotHistory = (props) => {
  const { companyid } = useParams();

  const [fetchData, setFetchData] = useState();
  const [tempData, setTempData] = useState();
  const [displayData, setDisplayData] = useState();

  const [state, dispatch] = useReducer(paginationReducer, initPagination);

  const { getJobsInCompany } = props;

  const [formState, onInputHandler] = useForm(
    {
      sortDate: {
        value: null,
        isValid: true,
      },
    },
    true
  );

  useEffect(() => {
    const token = props.auth.token;
    const payload = {
      token: token,
      companyId: companyid,
    };

    getJobsInCompany(payload).then((res) => {
      if (res && res.foundJob) {
        setFetchData(
          res.foundJob
            .filter((dat) => dat.releasedAt != null)
            .sort((a, b) => moment(b.expiredDate) - moment(a.expiredDate))
        );
      } else {
        setFetchData(null);
      }
    });
  }, [getJobsInCompany, companyid, props.auth]);

  //================= Pagination ===========================

  useEffect(() => {
    if (tempData && tempData.length > 0) {
      let applicantArray = [...tempData];
      let pageCount = Math.ceil(applicantArray.length / state.rowsPerPage);
      dispatch({ type: ACTIONPAGE.PAGEUPDATE, payload: { pageCount } });

      //Slicing all jobs based on the number jobs may appear in one page
      applicantArray = applicantArray.slice(
        state.startIndex,
        state.startIndex + state.rowsPerPage
      );
      setDisplayData(applicantArray);
    }
  }, [state.rowsPerPage, state.startIndex, tempData]);

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
    dispatch({
      type: ACTIONPAGE.PAGEUPDATE,
      payload: {
        rowsPerPage: event.target.value,
      },
    });
  };

  //=========================== Filter ============================
  useEffect(() => {
    if (fetchData) {
      let filterData = [...fetchData];
      if (formState?.inputs?.sortDate?.value) {
        filterData = filterData.filter((order) =>
          moment(order.releasedAt).isSame(
            moment(formState.inputs.sortDate.value),
            'month'
          )
        );
      }
      setTempData(filterData);
    }
  }, [fetchData, formState.inputs.sortDate.value]);

  let content = <SpinnerCircle />;
  if (!props.isLoading && displayData) {
    content = (
      <div className={classes.Table}>
        <div className={classes.Header}>
          <div className={classes.HeaderMain}>Iklan pekerjaan</div>

          <div className={classes.HeaderSlot}>Slot terpakai</div>

          <div className={classes.HeaderApplied}>Jumlah pendaftar</div>

          <div className={classes.HeaderTime}>Masa tayang</div>
        </div>

        <div className={classes.Content}>
          {displayData.map((dat, i) => {
            return (
              <Link to={`/jobs/applicantlist/${dat.id}`} key={i}>
                <div className={classes.HistoryCard}>
                  <div className={classes.CardMain}>{dat.jobTitle}</div>
                  <div className={classes.CardSlot}>{dat.slot}</div>
                  <div className={classes.CardApplied}>
                    {dat.jobApplicants.length}
                  </div>
                  <div
                    className={classes.CardTime}
                    style={
                      moment(dat.expiredDate).diff(moment(), 'days') > 7
                        ? { color: 'green' }
                        : { color: 'grey' }
                    }
                  >
                    {moment(dat.expiredDate) > moment()
                      ? `${moment(dat.expiredDate).diff(moment(), 'days')} hari`
                      : 'expired'}
                  </div>
                </div>
              </Link>
            );
          })}

          {/* {expiredData.map((dat, i) => {
            return (
              <Link to={`/jobs/applicantlist/${dat.id}`} key={i}>
                <div className={classes.HistoryCard}>
                  <div className={classes.CardMain}>{dat.jobTitle}</div>
                  <div className={classes.CardSlot}>{dat.slot}</div>
                  <div className={classes.CardApplied}>
                    {dat.jobApplicants.length}
                  </div>
                  <div className={classes.CardTime} style={{ color: 'grey' }}>
                    expired
                  </div>
                </div>
              </Link>
            );
          })} */}
        </div>
      </div>
    );
  }

  if (!props.isLoading && !displayData) {
    content = <h2>Belum ada iklan lowongan pekerjaan</h2>;
  }

  return (
    <div className={classes.Container}>
      <div className={classes.TableFilter}>
        <div>
          <Input
            inputType='customdate'
            id='sortDate'
            validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
            onInputHandler={onInputHandler}
            views={['year', 'month']}
            maxDate={moment()}
            initIsValid={true}
            format='MM/yyyy'
            label='Filter History'
          />
        </div>
      </div>
      {content}{' '}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '90%',
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
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    admin: state.admin,
    isLoading: state.job.isLoading,
    error: state.job.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getJobsInCompany: (payload) =>
      dispatch(actionCreators.getJobsInCompany(payload)),
    resetCompany: () => dispatch({ type: actionTypes.FETCHINGFINISH }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SlotHistory);
