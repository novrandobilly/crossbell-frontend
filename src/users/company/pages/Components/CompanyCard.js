import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

import * as actionTypes from '../../../../store/actions/actions';
import * as actionCreators from '../../../../store/actions';
import OutsideClick from '../../../../shared/utils/outsideClick';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import IconButton from '../../../../shared/UI_Element/IconButton';
import TextOnly from '../../../../shared/UI_Element/TextOnly';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

import classes from './CompanyCard.module.css';

const CompanyCard = (props) => {
  const { companyid } = useParams();

  const [companyDropdown, setCompanyDropdown] = useState(false);
  const [unreleasedData, setUnreleasedData] = useState();
  const [displayData, setDisplayData] = useState();

  const ref = useRef();
  const { getJobsInCompany } = props;

  useEffect(() => {
    const token = props.auth.token;
    if (token) {
      const payload = {
        token: token,
        companyId: companyid,
      };

      getJobsInCompany(payload).then((res) => {
        console.log(res);
        if (res && res.foundJob) {
          setDisplayData(
            res.foundJob
              .filter((dat) => dat.releasedAt != null)
              .sort((a, b) => moment(b.createdAt) - moment(a.createdAt))
          );
          setUnreleasedData(
            res.foundJob
              .filter((dat) => dat.releasedAt === null)
              .sort((a, b) => moment(b.createdAt) - moment(a.createdAt))
          );
        } else {
          setDisplayData(null);
          setUnreleasedData(null);
        }
      });
    }
  }, [getJobsInCompany, companyid, props.auth]);

  const DropdownOrder = () => {
    setCompanyDropdown(!companyDropdown);
  };

  OutsideClick(ref, () => {
    if (companyDropdown) setCompanyDropdown(false);
  });

  return (
    <div className={classes.BigContainer}>
      {props.auth.isCompany &&
        props.auth.userId === companyid &&
        !props.isActive && (
          <div className={classes.VerificationNotif}>
            <ErrorOutlineIcon style={{ fontSize: 35 }} />
            <span>Menunggu verifikasi admin Crossbell</span>
          </div>
        )}
      <div className={classes.Wraper}>
        <div className={classes.Container}>
          <div className={classes.CompanyContainer}>
            <div className={classes.ContainerLeft}>
              <div className={classes.ContainerLeftGroup}>
                <div className={classes.DetailLogo}>
                  <Link to={`/co/${props.companyId}/compro/intro`}>
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
                          marginLeft: '-10px',
                          fill: 'black',
                        }}
                      />
                    )}
                  </Link>

                  {props.auth.isCompany && props.auth.userId === companyid && (
                    <div>
                      <p
                        style={
                          props.isActive
                            ? { color: '#007cba', fontSize: '0.9rem' }
                            : { color: 'gray', fontSize: '0.9rem' }
                        }
                      >
                        {props.isActive ? (
                          <div className={classes.VerifiedDiv}>
                            <VerifiedUserIcon /> <span>Verified</span>
                          </div>
                        ) : (
                          'Menunggu verifikasi admin'
                        )}{' '}
                      </p>
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
                    </div>
                  )}
                </div>

                <div className={classes.ContainerLeftDivider}>
                  <p className={classes.CompanyName}>{props.companyName}</p>

                  <p className={classes.CompanyIndustry}>{props.industry}</p>

                  <p className={classes.CompanyHeadquarter}>{props.address}</p>

                  <a
                    href={`https://${props.website}`}
                    className={classes.CompanyWebsites}
                  >
                    {props.website ? props.website : '-'}
                  </a>
                </div>
              </div>

              <div className={classes.EditProfile}>
                <Link to={`/co/${props.companyId}/compro/intro`}>
                  <IconButton />
                </Link>
              </div>
            </div>
          </div>

          {(props.auth.userId === companyid) | props.admin.isAdmin ? (
            <div className={classes.PicContainer}>
              <div className={classes.PicHeader}>
                <p className={classes.PICTitle}>Contact Person</p>
              </div>

              <div className={classes.PicContent}>
                <div className={classes.TextHolder}>
                  <div className={classes.TextWraper}>
                    <p className={classes.PicLabel}>Nama: </p>
                    <p>{props.picName}</p>
                  </div>

                  <div className={classes.TextWraper}>
                    <p className={classes.PicLabel}>Posisi: </p>
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

              <div className={classes.EditPIC}>
                <Link to={`/co/${props.companyId}/compro/personincharge`}>
                  <IconButton />
                </Link>
              </div>
            </div>
          ) : (
            <div />
          )}
        </div>

        <div className={classes.Content}>
          <TextOnly
            id={props.companyId}
            labelName='Company Brief Descriptions'
            route={`/co/${props.companyId}/compro/details`}
            text={props.briefDescriptions}
          />

          <div className={classes.CardContainer}>
            <div className={classes.Header}>
              <div className={classes.HeaderTitleDiv}>
                <p className={classes.Title}>Job Posted</p>
              </div>
              {props.auth.isCompany && props.auth.userId === companyid && (
                <div className={classes.ButtonsDiv}>
                  <Link to={`/jobs/new`}>
                    <Button
                      variant='contained'
                      color='primary'
                      disableElevation
                      size='small'
                    >
                      Pasang Iklan
                    </Button>
                  </Link>

                  <div className={classes.dropdown}>
                    <button className={classes.dropbtn} onClick={DropdownOrder}>
                      BUAT PESANAN
                      <ArrowDropDownIcon
                        style={{ alignSelf: 'center', marginBottom: '-0.4rem' }}
                      />
                    </button>

                    <div
                      className={
                        companyDropdown
                          ? classes.dropdownShow
                          : classes.dropdownContent
                      }
                      id='dropdownCompany'
                      ref={ref}
                    >
                      <Link to={`/co/order/reguler`}>
                        <p>Pesan Slot Iklan</p>
                      </Link>
                      <Link to={`/co/order/candidate`}>
                        <p>Pesan Kandidat</p>
                      </Link>
                      <Link to={`/co/order/es`}>
                        <p>Pesan Pencarian Eksekutif</p>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className={classes.DivContainer}>
              {!props.isLoading &&
                props.auth.isCompany &&
                props.auth.userId === companyid &&
                unreleasedData &&
                unreleasedData.length > 0 &&
                unreleasedData.map((job, i) => {
                  return (
                    <div key={job.id} className={classes.CardHolder}>
                      <Link to={`/jobs/${job.id}`}>
                        <div className={classes.JobCard}>
                          <div className={classes.CardHeader}>
                            <p className={classes.CardTitle}>{job.jobTitle}</p>
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

              {!props.isLoading && displayData && displayData.length > 0 ? (
                displayData.map((job, i) => {
                  return (
                    <div key={job.id} className={classes.CardHolder}>
                      <Link to={`/jobs/${job.id}`}>
                        <div className={classes.JobCard}>
                          <div className={classes.CardHeader}>
                            <p className={classes.CardTitle}>{job.jobTitle}</p>
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
                })
              ) : props.auth.isCompany &&
                unreleasedData &&
                unreleasedData.length > 0 ? (
                <div />
              ) : (
                <p className={classes.EmptyText}>
                  Belum ada pekerjaan yang ditayangkan oleh perusahaan ini
                </p>
              )}
            </div>
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(CompanyCard);
