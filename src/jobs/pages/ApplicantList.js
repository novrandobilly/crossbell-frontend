import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
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
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import CallIcon from '@material-ui/icons/Call';
import BlankProfile from '../../assets/images/Blank_Profile.png';

import classes from './ApplicantList.module.css';

const ApplicantList = (props) => {
  const { jobsid } = useParams();

  const [displayData, setDisplayData] = useState();

  const { getOneJob } = props;

  useEffect(() => {
    getOneJob(jobsid).then((res) => {
      if (res) {
        setDisplayData(res.jobApplicants);
      }
    });
  }, [getOneJob, jobsid, props.auth]);

  let Content = <SpinnerCircle />;

  if (!props.isLoading && displayData) {
    Content = (
      <div className={classes.CardHolder}>
        {displayData.map((dat, i) => {
          return (
            <div className={classes.CardContainer} key={dat.id}>
              <div className={classes.CardLeft}>
                <div
                  className={classes.Avatar}
                  style={{
                    backgroundImage: `url('${
                      dat.picture ? dat.picture.url : <BlankProfile />
                    }')`,
                  }}
                />
              </div>

              <div className={classes.CardMid}>
                <Link to={`/ap/${dat.id}/profile`}>
                  <p className={classes.Name}>
                    {dat.firstName} {dat.lastName}
                  </p>
                </Link>
                <div className={classes.CardMidTitle}>
                  <WorkOutlineIcon
                    fontSize='small'
                    style={{ marginRight: '6px' }}
                  />
                  {dat.experience.length > 0
                    ? dat.experience[0].prevTitle
                    : ' - '}
                </div>
                <div className={classes.CardMidLocation}>
                  <span>at</span>{' '}
                  {dat.experience.length > 0
                    ? dat.experience[0].prevCompany
                    : ' - '}
                </div>

                <div className={classes.CardMidTitle}>
                  <SchoolOutlinedIcon
                    fontSize='small'
                    style={{ marginRight: '6px' }}
                  />
                  {dat.education.length > 0 ? dat.education[0].major : ' - '}
                </div>
                <div className={classes.CardMidLocation}>
                  <span>at</span>{' '}
                  {dat.education.length > 0 ? dat.education[0].school : ' - '}
                </div>
                <div className={classes.CardMidTitle}>
                  GPA: {dat.education.length > 0 ? dat.education[0].IPK : ' - '}
                </div>

                {/* <div className={classes.CardMidTitle}>
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
                </div> */}
              </div>

              <div className={classes.CardRight}>
                <div className={classes.ExtraDetails}>
                  <PinDropOutlinedIcon
                    fontSize='small'
                    style={{ marginRight: '6px' }}
                  />
                  <p className={classes.City}>{dat.city ? dat.city : ' - '}</p>
                </div>

                <div className={classes.ExtraDetails}>
                  <WcOutlinedIcon
                    fontSize='small'
                    style={{ marginRight: '6px' }}
                  />
                  <p className={classes.GenderAge}>
                    {!dat.gender
                      ? ' - '
                      : dat.gender === 'male'
                      ? 'Pria'
                      : 'Wanita'}
                    ,{' '}
                    {dat.dateOfBirth
                      ? moment().diff(moment(dat.dateOfBirth), 'year')
                      : '0'}{' '}
                    tahun
                  </p>{' '}
                </div>

                <div className={classes.ExtraDetails}>
                  <MonetizationOnOutlinedIcon
                    fontSize='small'
                    style={{ marginRight: '6px' }}
                  />
                  <p className={classes.Salary}>
                    Harapan gaji: Rp.{' '}
                    {dat.salary ? dat.salary.toLocaleString() : '0'}
                  </p>
                </div>

                <div className={classes.ExtraDetails}>
                  <AlternateEmailIcon
                    fontSize='small'
                    style={{ marginRight: '6px' }}
                  />
                  <p className={classes.Mail}>{dat.email}</p>
                </div>

                <div className={classes.ExtraDetails}>
                  <CallIcon fontSize='small' style={{ marginRight: '6px' }} />
                  <p className={classes.Phone}>
                    {dat.phone ? dat.phone : ' - '}
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
    getOneJob: (jobsid) => dispatch(actionCreators.getOneJob(jobsid)),
    resetCompany: () => dispatch({ type: actionTypes.FETCHINGFINISH }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplicantList);
