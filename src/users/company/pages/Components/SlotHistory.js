import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

import * as actionTypes from '../../../../store/actions/actions';
import * as actionCreators from '../../../../store/actions';
import SpinnerCircle from '../../../../shared/UI_Element/Spinner/SpinnerCircle';

import classes from './SlotHistory.module.css';

const SlotHistory = (props) => {
  const { companyid } = useParams();

  const [expiredData, setExpiredData] = useState();
  const [displayData, setDisplayData] = useState();

  const { getJobsInCompany } = props;

  useEffect(() => {
    const token = props.auth.token;
    const payload = {
      token: token,
      companyId: companyid,
    };

    getJobsInCompany(payload).then((res) => {
      if (res && res.foundJob) {
        setDisplayData(
          res.foundJob
            .filter(
              (dat) =>
                dat.releasedAt != null && moment(dat.expiredDate) > moment()
            )
            .sort((a, b) => moment(b.createdAt) - moment(a.createdAt))
        );

        setExpiredData(
          res.foundJob
            .filter(
              (dat) =>
                dat.releasedAt != null && moment(dat.expiredDate) < moment()
            )
            .sort((a, b) => moment(b.createdAt) - moment(a.createdAt))
        );
      } else {
        setDisplayData(null);
        setExpiredData(null);
      }
    });
  }, [getJobsInCompany, companyid, props.auth]);

  let Content = <SpinnerCircle />;
  if (!props.isLoading && displayData && expiredData) {
    Content = (
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
                        : { color: 'orange' }
                    }
                  >{`${moment(dat.expiredDate).diff(
                    moment(),
                    'days'
                  )} hari`}</div>
                </div>
              </Link>
            );
          })}

          {expiredData.map((dat, i) => {
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
          })}
        </div>
      </div>
    );
  }

  return <div className={classes.Container}>{Content}</div>;
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
