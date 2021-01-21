import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

import * as actionCreators from '../../../../store/actions';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import IconButton from '../../../../shared/UI_Element/IconButton';
import TextOnly from '../../../../shared/UI_Element/TextOnly';

import classes from './CompanyCard.module.css';

const CompanyCard = (props) => {
  const { companyid } = useParams();

  const [data, setData] = useState();

  const { getJobsInCompany } = props;
  useEffect(() => {
    const token = props.auth.token;
    if (token) {
      const payload = {
        token: token,
        companyId: companyid,
      };

      getJobsInCompany(payload).then((res) => {
        setData(res.foundJob);
      });
    }
  }, [getJobsInCompany, companyid, props.auth]);

  return (
    <div className={classes.Wraper}>
      <div className={classes.Container}>
        <div className={classes.ContainerLeft}>
          {props.logo ? (
            <div
              className={classes.Avatar}
              style={{
                backgroundImage: `url('${props.logo.url}')`,
              }}
            />
          ) : (
            <AccountCircleIcon
              style={{
                fontSize: '15rem',
                marginBottom: '1rem',
              }}
            />
          )}

          <p
            className={classes.Slot}
            style={
              props.slotREG < 1
                ? { color: 'rgb(255, 46, 46)' }
                : { color: 'rgb(0, 135, 9)' }
            }
          >
            Remaining Slot: {props.slotREG}
          </p>

          <p className={classes.CompanyName}>{props.companyName}</p>

          <p className={classes.CompanyIndustry}>{props.industry}</p>

          <p className={classes.CompanyHeadquarter}>{props.address}</p>

          <a
            href={`https://${props.website}`}
            className={classes.CompanyWebsites}
          >
            <img
              className={classes.LinkIcon}
              alt='web-icon'
              src='https://i.pinimg.com/originals/00/50/71/005071cbf1fdd17673607ecd7b7e88f6.png'
              style={{ marginRight: '1rem' }}
            />
            {props.website ? props.website : '-'}
          </a>
        </div>

        <div className={classes.EditProfile}>
          <Link to={`/co/${props.companyId}/compro/intro`}>
            <IconButton />
          </Link>
        </div>
      </div>

      <div className={classes.Content}>
        <TextOnly
          id={props.companyId}
          labelName='Company Brief Descriptions'
          route={`/co/${props.companyId}/compro/details`}
          text={props.briefDescriptions}
        />

        <div className={classes.PicContainer}>
          <div className={classes.PicHeader}>
            <p className={classes.Title}>Contact Person</p>

            <div className={classes.EditPIC}>
              <Link to={`/co/${props.companyId}/compro/personincharge`}>
                <IconButton />
              </Link>
            </div>
          </div>

          <div className={classes.PicContent}>
            <div className={classes.TextHolder}>
              <div className={classes.TextWraper}>
                <p className={classes.PicLabel}>Nama PIC: </p>
                <p>{props.picName}</p>
              </div>

              <div className={classes.TextWraper}>
                <p className={classes.PicLabel}>Bekerja Sebagai: </p>
                <p>{props.picJobTitle}</p>
              </div>
            </div>

            <div className={classes.TextHolder}>
              <div className={classes.TextWraper}>
                <p className={classes.PicLabel}>Email: </p>
                <p>{props.picEmail}</p>
              </div>

              <div className={classes.TextWraper}>
                <p className={classes.PicLabel}>Telepon: </p>
                <p>{props.picPhone}</p>
              </div>

              <div className={classes.TextWraper}>
                <p className={classes.PicLabel}>Kantor: </p>
                <p>{props.picOfficePhone}</p>
              </div>
            </div>
          </div>
        </div>

        <div className={classes.CardContainer}>
          <div className={classes.Header}>
            <p className={classes.Title}>Job Posted</p>
          </div>

          <div className={classes.DivContainer}>
            {data &&
              !props.isLoading &&
              data
                .filter((dat) => dat.releasedAt != null)
                .map((job, i) => {
                  return (
                    <div key={job.id}>
                      <Link to={`/jobs/${job.id}`}>
                        <div className={classes.JobCard}>
                          <div className={classes.CardHeader}>
                            <p>{job.jobTitle}</p>
                            <p className={classes.CardLocation}>
                              {job.placementLocation}
                            </p>
                            <p className={classes.CardRecipient}>
                              {job.emailRecipient}
                            </p>
                          </div>
                          <div className={classes.CardBody}>
                            <p
                              style={{
                                fontSize: '3rem',
                                marginBottom: '-0.5rem',
                                marginTop: '1rem',
                              }}
                            >
                              {job.jobApplicants.length}
                            </p>
                            <p>applicants applied </p>
                          </div>
                          <div className={classes.CardFooter}>
                            {job.expiredDate ? (
                              <p className={classes.ExpDate}>
                                {moment(job.expiredDate).diff(
                                  moment(),
                                  'days'
                                ) > 0
                                  ? [
                                      `expired in ${moment(
                                        job.expiredDate
                                      ).diff(moment(), 'days')} days`,
                                    ]
                                  : 'expired'}
                              </p>
                            ) : (
                              <p className={classes.ExpDate}>
                                belum ditayangkan
                              </p>
                            )}
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </div>
  );

};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    isLoading: state.job.isLoading,
    error: state.job.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getJobsInCompany: (payload) =>
      dispatch(actionCreators.getJobsInCompany(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyCard);
