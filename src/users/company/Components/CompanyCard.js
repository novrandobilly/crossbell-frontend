import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actionTypes from '../../../store/actions/actions';
import * as actionCreators from '../../../store/actions';

import IconButton from '../../../shared/UI_Element/IconButton';
import TextOnly from '../../../shared/UI_Element/TextOnly';
import SlotHistory from './SlotHistory';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Tabs from './Tabs';

import classes from './CompanyCard.module.css';

const CompanyCard = (props) => {
  const { companyid } = useParams();

  return (
    <div className={classes.BigContainer}>
      {props.auth.isCompany &&
        props.auth.userId === companyid &&
        !props.isActive && (
          <div className={classes.VerificationNotif}>
            <ErrorOutlineIcon style={{ fontSize: 35 }} />
            <span>
              Perusahaan berhasil terdaftar dan sedang dalam proses verifikasi.
            </span>
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
                      <div
                        className={classes.Avatar}
                        style={{
                          backgroundImage: `url('https://res.cloudinary.com/kalkulus/image/upload/v1616503057/Profile_w6vts3.png')`,
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
                          <span className={classes.VerifiedDiv}>
                            <VerifiedUserIcon /> Verified
                          </span>
                        ) : (
                          'Menunggu verifikasi admin'
                        )}{' '}
                      </p>
                      <p
                        className={classes.Slot}
                        style={
                          props.slotREG.filter((slot) => {
                            return slot.status === 'Idle';
                          }).length < 1
                            ? { color: 'rgb(255, 46, 46)' }
                            : { color: 'rgb(0, 135, 9)' }
                        }
                      >
                        Remaining Slot:{' '}
                        {
                          props.slotREG.filter((slot) => {
                            return slot.status === 'Idle';
                          }).length
                        }
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

              {(props.auth.isCompany && props.auth.userId === companyid) |
                props.admin.isAdmin && (
                <div className={classes.EditProfile}>
                  <Link to={`/co/${props.companyId}/compro/intro`}>
                    <IconButton />
                  </Link>
                </div>
              )}
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
                    <p>{props.picEmail ? props.picEmail : props.email}</p>
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

              {(props.auth.userId === companyid) | props.admin.isAdmin && (
                <div className={classes.EditPIC}>
                  <Link to={`/co/${props.companyId}/compro/personincharge`}>
                    <IconButton />
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div />
          )}
        </div>

        <div className={classes.Content}>
          <div className={classes.CompanyExclusive}>
            {props.auth.isCompany && props.auth.userId === companyid && (
              <Tabs />
            )}
            <TextOnly
              id={props.companyId}
              labelName='COMPANY BRIEF DESCRIPTION'
              route={`/co/${props.companyId}/compro/details`}
              text={props.briefDescriptions}
              companyid={companyid}
            />
          </div>

          <div className={classes.CardContainer}>
            <div className={classes.Header}>
              <div className={classes.HeaderTitleDiv}>
                <p className={classes.Title}>IKLAN PEKERJAAN</p>
              </div>
            </div>
            {(props.auth.userId === companyid || props.admin.isAdmin) && (
              <SlotHistory />
            )}
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
