import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

import * as actionTypes from '../../store/actions/actions';
import * as actionCreators from '../../store/actions';
import SpinnerCircle from '../../shared/UI_Element/Spinner/SpinnerCircle';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import SchoolOutlinedIcon from '@material-ui/icons/SchoolOutlined';
import PinDropOutlinedIcon from '@material-ui/icons/PinDropOutlined';
import WcOutlinedIcon from '@material-ui/icons/WcOutlined';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';

import classes from './ApplicantList.module.css';

const ApplicantList = (props) => {
  const { jobsid } = useParams();

  const [displayData, setDisplayData] = useState();

  const { getOneJob } = props;

  useEffect(() => {
    const token = props.auth.token;
    const payload = {
      token: token,
      jobsid: jobsid,
    };
    getOneJob(payload).then((res) => {
      if (res) {
        setDisplayData(res.jobApplicants);
      }
    });
  }, [getOneJob, jobsid, props.auth]);

  console.log(displayData);

  let Content = <SpinnerCircle />;
  if (!props.isLoading && displayData) {
    Content = (
      <div className={classes.CardHolder}>
        {displayData.map((dat, i) => {
          return (
            <div className={classes.CardContainer} key={i}>
              <div className={classes.CardLeft}>
                <div
                  className={classes.Avatar}
                  style={{
                    backgroundImage: `url('${dat.picture.url}')`,
                  }}
                />
              </div>

              <div className={classes.CardMid}>
                <p className={classes.Name}>
                  {dat.firstName} {dat.lastName}
                </p>
                <div className={classes.CardMidTitle}>
                  <WorkOutlineIcon
                    fontSize='small'
                    style={{ marginRight: '6px' }}
                  />
                  {dat.experience[0].prevTitle}
                </div>
                <div className={classes.CardMidLocation}>
                  <span>at</span> {dat.experience[0].prevCompany}
                </div>

                <div className={classes.CardMidTitle}>
                  <SchoolOutlinedIcon
                    fontSize='small'
                    style={{ marginRight: '6px' }}
                  />
                  {dat.education[0].major}
                </div>
                <div className={classes.CardMidLocation}>
                  <span>at</span> {dat.education[0].school}
                </div>
                <div className={classes.CardMidTitle}>
                  GPA: {dat.education[0].IPK}
                </div>

                <div className={classes.CardMidTitle}>
                  <AssignmentTurnedInOutlinedIcon
                    fontSize='small'
                    style={{ marginRight: '6px' }}
                  />
                  {dat.certification[0].title}
                </div>
                <div className={classes.CardMidLocation}>
                  <span>from</span> {dat.certification[0].organization}
                </div>

                <div className={classes.CardMidTitle}>
                  <PeopleAltOutlinedIcon
                    fontSize='small'
                    style={{ marginRight: '6px' }}
                  />
                  <span>
                    Organisasi <span> </span>
                  </span>
                  {dat.organization[0].organization}
                </div>
              </div>

              <div className={classes.CardRight}>
                <div className={classes.ExtraDetails}>
                  <PinDropOutlinedIcon
                    fontSize='small'
                    style={{ marginRight: '6px' }}
                  />
                  <p className={classes.City}>{dat.city}</p>
                </div>

                <div className={classes.ExtraDetails}>
                  <WcOutlinedIcon
                    fontSize='small'
                    style={{ marginRight: '6px' }}
                  />
                  <p className={classes.GenderAge}>
                    {dat.gender === 'male' ? 'Pria' : 'Wanita'},{' '}
                    {moment().diff(moment(dat.dateOfBirth), 'year')} tahun
                  </p>{' '}
                </div>

                <div className={classes.ExtraDetails}>
                  <MonetizationOnOutlinedIcon
                    fontSize='small'
                    style={{ marginRight: '6px' }}
                  />
                  <p className={classes.Salary}>
                    Harapan gaji: Rp. {dat.salary.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
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
    getOneJob: (payload) => dispatch(actionCreators.getOneJob(payload)),
    resetCompany: () => dispatch({ type: actionTypes.FETCHINGFINISH }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplicantList);
