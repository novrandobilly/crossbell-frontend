import React, { useState, useEffect, useRef, Fragment } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import OutsideClick from '../utils/outsideClick';

import * as actionTypes from '../../store/actions/actions';
import * as actionCreators from '../../store/actions/index';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import NotificationsIcon from '@material-ui/icons/Notifications';

import classes from './NavigationLinks.module.css';

const NavigationLinks = props => {
  const [companyDropdown, setCompanyDropdown] = useState(false);
  const [applicantFirstName, setApplicantFirstName] = useState('');
  const [adminNotifications, setAdminNotifications] = useState(0);
  const [adminDropdownFinance, setAdminDropdownFinance] = useState(false);
  const [adminDropdownOperational, setAdminDropdownOperational] = useState(false);

  const ref = useRef();

  OutsideClick(ref, () => {
    if (companyDropdown) setCompanyDropdown(false);
    if (adminDropdownFinance) setAdminDropdownFinance(false);
    if (adminDropdownOperational) setAdminDropdownOperational(false);
  });

  const logoutHandler = () => {
    if (props.admin.isLoggedIn) {
      props.admLogout();
    } else {
      props.logout();
    }
    props.history.push('/');
  };

  const DropdownOrder = () => {
    setCompanyDropdown(!companyDropdown);
  };

  const DropdownOrderAdminFinance = () => {
    setAdminDropdownOperational(false);

    setAdminDropdownFinance(!adminDropdownFinance);
  };

  const DropdownOrderAdminOperational = () => {
    setAdminDropdownFinance(false);

    setAdminDropdownOperational(!adminDropdownOperational);
  };

  const { getOneApplicant, getAdmin } = props;

  useEffect(() => {
    if (props.auth.isLoggedIn && !props.auth.isCompany) {
      const applicantid = props.auth.userId;
      const payload = {
        applicantId: applicantid,
        token: props.auth.token,
      };
      getOneApplicant(payload).then(res => {
        setApplicantFirstName(res.applicant.firstName);
      });
    }
  }, [getOneApplicant, props.auth.isLoggedIn, props.auth.isCompany, props.auth.userId, props.auth.token]);

  useEffect(() => {
    const fetchAdmin = async () => {
      if (props.admin.isLoggedIn && props.admin.isAdmin) {
        const payload = {
          userId: props.admin.userId,
          token: props.admin.token,
        };

        try {
          let res = await getAdmin(payload);
          const dummyCount = res.admin.notifications.filter(notif => !notif.isOpened);
          setAdminNotifications(dummyCount.length);
        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchAdmin();
  }, [props.admin.isLoggedIn, props.admin.isAdmin, props.admin.userId, props.admin.token, getAdmin]);

  useEffect(() => {
    if (props.notification.adminNotification !== null) {
      setAdminNotifications(props.notification.adminNotification);
    }
  }, [props.notification]);

  let logout = null;

  if (props.auth.isLoggedIn || props.admin.isLoggedIn) {
    logout = (
      <li onClick={logoutHandler}>
        <NavLink to='#' activeClassName={classes.Logout}>
          Keluar
          <ExitToAppIcon style={{ marginLeft: '4px' }} />
        </NavLink>
      </li>
    );
  }

  return (
    <Fragment>
      <ul className={classes.NavigationLink}>
        {props?.auth?.isLoggedIn && !props?.auth?.isCompany && (
          <li>
            <NavLink to={`/ap/${props.auth.userId}/profile`} activeClassName={classes.active}>
              <span>Selamat datang, </span>
              {applicantFirstName}
            </NavLink>
          </li>
        )}

        <li>
          <NavLink
            to={props.auth.isLoggedIn && props.auth.isCompany ? `/co/${props.auth.userId}/jobList` : '/jobs-dashboard'}
            activeClassName={classes.active}>
            Explore
          </NavLink>
        </li>
        {!props.auth.isLoggedIn && !props.admin.isLoggedIn && (
          <Fragment>
            <div className={classes.ApplicantAuthenticationWrapper}>
              <li>
                <button onClick={props.showRegistration}>Daftar</button>
              </li>
              <span>|</span>
              <li>
                <button onClick={props.showLogin}>Masuk</button>
              </li>
            </div>
            <NavLink id={classes.CompanyPageLink} to={`/authentication/co`} activeClassName={classes.active}>
              Perusahaan
            </NavLink>
          </Fragment>
        )}

        {props?.auth?.isLoggedIn && !props?.auth?.isCompany && (
          <li>
            <NavLink to={`/ap/${props.auth.userId}/appliedjobs`} activeClassName={classes.active}>
              Pekerjaan Dilamar
            </NavLink>
          </li>
        )}

        {props.auth.isLoggedIn && props.auth.isCompany && (
          <Fragment>
            <li>
              <NavLink to={`/co/${props.auth.userId}/profile`} activeClassName={classes.active}>
                Perusahaan anda
              </NavLink>
            </li>
            <li>
              <NavLink to={`/jobs/new`} activeClassName={classes.active}>
                Pasang Iklan
              </NavLink>
            </li>
            <li>
              <div className={classes.dropdown}>
                <button className={classes.dropbtn} onClick={DropdownOrder}>
                  Pesan
                  <ArrowDropDownIcon style={{ alignSelf: 'center', marginBottom: '-0.4rem' }} />
                </button>

                <div className={companyDropdown ? classes.dropdownShow : classes.dropdownContent} ref={ref}>
                  <NavLink to={`/co/order/reguler`} activeClassName={classes.active} onClick={DropdownOrder}>
                    <p>Pesan Slot Iklan</p>
                  </NavLink>
                  <NavLink to={`/co/order/candidate`} activeClassName={classes.active} onClick={DropdownOrder}>
                    <p>
                      Pesan <em>Bulk Candidates</em>
                    </p>
                  </NavLink>

                  <NavLink
                    to={`/co/${props.auth.userId}/listOrder`}
                    activeClassName={classes.active}
                    onClick={DropdownOrder}>
                    <p>Riwayat pesanan</p>
                  </NavLink>
                </div>
              </div>
            </li>
          </Fragment>
        )}

        {props.admin.isAdmin && props.admin.isLoggedIn && (
          <Fragment>
            <li>
              <NavLink to={`/ad/alphaomega/profile`} activeClassName={classes.active}>
                My Profile
              </NavLink>
            </li>
            <li>
              <NavLink to={`/ad/alphaomega/customer-supports`} activeClassName={classes.active}>
                Feedback
              </NavLink>
            </li>
            <li>
              <div className={classes.dropdown}>
                <button className={classes.dropbtn} onClick={DropdownOrderAdminFinance} ref={ref}>
                  Finance
                  <ArrowDropDownIcon style={{ alignSelf: 'center', marginBottom: '-0.4rem' }} />
                </button>

                <div className={adminDropdownFinance ? classes.dropdownShow : classes.dropdownContent}>
                  <NavLink to={`/ad/alphaomega/promo`} activeClassName={classes.active}>
                    <p>Update Promo</p>
                  </NavLink>
                  <NavLink
                    to={`/ad/alphaomega/order/reguler/fin`}
                    activeClassName={classes.active}
                    onClick={DropdownOrderAdminFinance}>
                    <p>Order Reguler</p>
                  </NavLink>
                  <NavLink
                    to={`/ad/alphaomega/order/candidate/fin`}
                    activeClassName={classes.active}
                    onClick={DropdownOrderAdminFinance}>
                    <p>Order Bulk Candidate</p>
                  </NavLink>

                  <NavLink
                    to={`/ad/alphaomega/financial`}
                    activeClassName={classes.active}
                    onClick={DropdownOrderAdminFinance}>
                    <p>Finance</p>
                  </NavLink>
                </div>
              </div>
            </li>

            <li>
              <div className={classes.dropdown}>
                <button className={classes.dropbtn} onClick={DropdownOrderAdminOperational} ref={ref}>
                  Operational
                  <ArrowDropDownIcon style={{ alignSelf: 'center', marginBottom: '-0.4rem' }} />
                </button>

                <div className={adminDropdownOperational ? classes.dropdownShow : classes.dropdownContent}>
                  <NavLink
                    to={`/ad/alphaomega/order/reguler/opr`}
                    activeClassName={classes.active}
                    onClick={DropdownOrderAdminOperational}>
                    <p>Order Reguler</p>
                  </NavLink>
                  <NavLink
                    to={`/ad/alphaomega/order/candidate/opr`}
                    activeClassName={classes.active}
                    onClick={DropdownOrderAdminOperational}>
                    <p>Order Bulk Candidate</p>
                  </NavLink>
                  <NavLink
                    to={`/ad/alphaomega/order/es/opr`}
                    activeClassName={classes.active}
                    onClick={DropdownOrderAdminOperational}>
                    <p>Order Executive Search</p>
                  </NavLink>
                  <NavLink
                    to={`/ad/alphaomega/applicants`}
                    activeClassName={classes.active}
                    onClick={DropdownOrderAdminOperational}>
                    <p>Applicant List</p>
                  </NavLink>
                  <NavLink
                    to={`/ad/alphaomega/companies`}
                    activeClassName={classes.active}
                    onClick={DropdownOrderAdminOperational}>
                    <p>Company list</p>
                  </NavLink>
                  <NavLink
                    to={`/ad/alphaomega/jobs`}
                    activeClassName={classes.active}
                    onClick={DropdownOrderAdminOperational}>
                    <p>Job list</p>
                  </NavLink>
                  <NavLink
                    to={`/ad/alphaomega/slot/reguler`}
                    activeClassName={classes.active}
                    onClick={DropdownOrderAdminOperational}>
                    <p>Slot list</p>
                  </NavLink>
                </div>
              </div>
            </li>
            <li className={classes['AdminNotification']}>
              <NavLink to='/ad/alphaomega/notifications' id={classes['NotificationButton']} ref={ref}>
                <NotificationsIcon style={{ color: '#f79f35' }} />
                <span className={adminNotifications > 0 ? classes.notificationVisible : classes.notificationInvisible}>
                  {adminNotifications}
                </span>
              </NavLink>
            </li>
          </Fragment>
        )}
        {logout}
      </ul>

      {/*======================================================================*/}

      <ul className={classes.MobileNavigationLink}>
        {props.auth.isLoggedIn && !props.auth.isCompany && (
          <li>
            <span>
              Welcome,{' '}
              <NavLink to={`/ap/${props.auth.userId}`} activeClassName={classes.active}>
                {applicantFirstName}
              </NavLink>
            </span>
          </li>
        )}
        <li>
          <NavLink to='/' exact activeClassName={classes.active}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to={props.auth.isLoggedIn && props.auth.isCompany ? `/co/${props.auth.userId}/jobList` : '/jobs-dashboard'}
            activeClassName={classes.active}>
            Dasboard Pekerjaan
          </NavLink>
        </li>

        {props?.auth?.isLoggedIn && !props?.auth?.isCompany && (
          <li>
            <NavLink to={`/ap/${props.auth.userId}/appliedjobs`} activeClassName={classes.active}>
              Pekerjaan Dilamar
            </NavLink>
          </li>
        )}

        {props.auth.isLoggedIn && props.auth.isCompany && (
          <Fragment>
            <li>
              <NavLink to={`/co/${props.auth.userId}/profile`} activeClassName={classes.active}>
                Perusahaan Anda
              </NavLink>
            </li>
            <li>
              <NavLink to={`/jobs/new`} activeClassName={classes.active}>
                Pasan Iklan
              </NavLink>
            </li>

            <div className={classes.Divider}> Pesan </div>

            <li>
              <NavLink to={`/co/order/reguler`} activeClassName={classes.active}>
                Pesan Slot Iklan
              </NavLink>
            </li>
            <li>
              <NavLink to={`/co/order/candidate`} activeClassName={classes.active}>
                <em>Pesan Bulk Candidates</em>
              </NavLink>
            </li>

            <li>
              <NavLink to={`/co/${props.auth.userId}/listOrder`} activeClassName={classes.active}>
                Riwayat Pesanan
              </NavLink>
            </li>
          </Fragment>
        )}

        {props.admin.isAdmin && props.admin.isLoggedIn && (
          <Fragment>
            <li>
              <NavLink to={`/ad/alphaomega/profile`} activeClassName={classes.active}>
                My Profile
              </NavLink>
            </li>
            <li>
              <NavLink to={`/ad/alphaomega/customer-supports`} activeClassName={classes.active}>
                Feedback
              </NavLink>
            </li>

            <div className={classes.Divider}>Finance</div>
            <li>
              <NavLink to={`/ad/alphaomega/promo`} activeClassName={classes.active}>
                Update Promo
              </NavLink>
            </li>
            <li>
              <NavLink to={`/ad/alphaomega/order/reguler/fin`} activeClassName={classes.active}>
                Order Reguler
              </NavLink>
            </li>
            <li>
              <NavLink to={`/ad/alphaomega/order/candidate/fin`} activeClassName={classes.active}>
                Order Bulk Candidate
              </NavLink>
            </li>
            <li>
              <NavLink to={`/ad/alphaomega/financial`} activeClassName={classes.active}>
                Finance
              </NavLink>
            </li>

            <div className={classes.Divider}>Operational</div>

            <li>
              <NavLink to={`/ad/alphaomega/order/reguler/opr`} activeClassName={classes.active}>
                Order Reguler
              </NavLink>
            </li>
            <li>
              <NavLink to={`/ad/alphaomega/order/candidate/opr`} activeClassName={classes.active}>
                Order Bulk Candidate
              </NavLink>
            </li>
            <li>
              <NavLink to={`/ad/alphaomega/order/es/opr`} activeClassName={classes.active}>
                Order Executive Search
              </NavLink>
            </li>
            <li>
              <NavLink to={`/ad/alphaomega/applicants`} activeClassName={classes.active}>
                Applicant List
              </NavLink>
            </li>
            <li>
              <NavLink to={`/ad/alphaomega/companies`} activeClassName={classes.active}>
                Company list
              </NavLink>
            </li>
            <li>
              <NavLink to={`/ad/alphaomega/jobs`} activeClassName={classes.active}>
                Job list
              </NavLink>
            </li>
            <li>
              <NavLink to={`/ad/alphaomega/slot/reguler`} activeClassName={classes.active}>
                Slot list
              </NavLink>
            </li>
          </Fragment>
        )}
        {logout}
      </ul>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    admin: state.admin,
    applicant: state.applicant,
    notification: state.notification,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch({ type: actionTypes.AUTHLOGOUT }),
    admLogout: () => dispatch({ type: actionTypes.ADMINLOGOUT }),
    getOneApplicant: payload => dispatch(actionCreators.getOneApplicant(payload)),
    getAdmin: payload => dispatch(actionCreators.getAdmin(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavigationLinks));
