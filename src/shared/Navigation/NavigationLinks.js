import React, { useState, useEffect, useRef, Fragment } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import OutsideClick from '../utils/outsideClick';

import * as actionTypes from '../../store/actions/actions';
import * as actionCreators from '../../store/actions/index';
import BellIcon from '../../assets/icons/bell.svg';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import styles from './NavigationLinks.module.scss';

const NavigationLinks = (props) => {
  const [companyDropdown, setCompanyDropdown] = useState(false);
  const [applicantFirstName, setApplicantFirstName] = useState('');
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

  const { getOneApplicant } = props;

  useEffect(() => {
    if (props.auth.isLoggedIn && !props.auth.isCompany) {
      const applicantid = props.auth.userId;
      const payload = {
        applicantId: applicantid,
        token: props.auth.token,
      };
      getOneApplicant(payload)
        .then((res) => {
          setApplicantFirstName(res.applicant.firstName);
        })
        .catch((err) => console.log(err));
    }
  }, [getOneApplicant, props.auth.isLoggedIn, props.auth.isCompany, props.auth.userId, props.auth.token]);

  let logout = null;

  if (props.auth.isLoggedIn || props.admin.isLoggedIn) {
    logout = (
      <li onClick={logoutHandler}>
        <NavLink to='#' activeClassName={styles.Logout}>
          Keluar
          <ExitToAppIcon style={{ marginLeft: '4px' }} />
        </NavLink>
      </li>
    );
  }
  return (
    <Fragment>
      <ul className={styles.NavigationLink}>
        {props?.auth?.isLoggedIn && !props?.auth?.isCompany && (
          <li>
            <span>Selamat datang, </span>
            <NavLink to={`/ap/${props.auth.userId}/profile`} activeClassName={styles.active}>
              {applicantFirstName}
            </NavLink>
          </li>
        )}

        <li>
          <NavLink
            to={props.auth.isLoggedIn && props.auth.isCompany ? `/co/${props.auth.userId}/jobList` : '/jobs-dashboard'}
            activeClassName={styles.active}>
            {props.auth.isLoggedIn && props.auth.isCompany ? 'Dashboard Iklan' : 'Lowongan'}
          </NavLink>
        </li>
        {!props.auth.isLoggedIn && !props.admin.isLoggedIn && (
          <Fragment>
            <div className={styles.ApplicantAuthenticationWrapper}>
              <li>
                <button onClick={props.showRegistration}>Daftar</button>
              </li>
              <span>|</span>
              <li>
                <button onClick={props.showLogin}>Masuk</button>
              </li>
            </div>
            <NavLink id={styles.CompanyPageLink} to={`/authentication/co`} activeClassName={styles.active}>
              Perusahaan
            </NavLink>
          </Fragment>
        )}

        {props?.auth?.isLoggedIn && !props?.auth?.isCompany && (
          <li>
            <NavLink to={`/ap/${props.auth.userId}/appliedjobs`} activeClassName={styles.active}>
              Pekerjaan Dilamar
            </NavLink>
          </li>
        )}

        {props.auth.isLoggedIn && props.auth.isCompany && (
          <Fragment>
            <li>
              <NavLink to={`/co/${props.auth.userId}/profile`} activeClassName={styles.active}>
                Perusahaan anda
              </NavLink>
            </li>
            <li>
              <NavLink to={`/jobs/new`} activeClassName={styles.active}>
                Pasang Iklan
              </NavLink>
            </li>
            <li>
              <div className={styles.dropdown}>
                <button className={styles.dropbtn} onClick={DropdownOrder}>
                  Pesan
                  <ArrowDropDownIcon style={{ alignSelf: 'center', marginBottom: '-0.4rem' }} />
                </button>

                <div className={companyDropdown ? styles.dropdownShow : styles.dropdownContent} ref={ref}>
                  <NavLink to={`/co/order/reguler`} activeClassName={styles.active} onClick={DropdownOrder}>
                    <p>Pesan Slot Iklan</p>
                  </NavLink>
                  {/* <NavLink
                    to={`/co/order/candidate`}
                    to={`#`}
                    className={styles.BulkCandidates}
                    activeClassName={styles.active}
                    onClick={DropdownOrder}>
                    <p>
                      Pesan <em>Bulk Candidates</em> (Coming Soon)
                    </p>
                  </NavLink> */}

                  <NavLink to={`/co/order/es`} activeClassName={styles.active} onClick={DropdownOrder}>
                    <p>Executive Search (Headhunter)</p>
                  </NavLink>
                  <NavLink
                    to={`/co/${props.auth.userId}/listOrder`}
                    activeClassName={styles.active}
                    onClick={DropdownOrder}>
                    <p>Riwayat Pesanan</p>
                  </NavLink>
                </div>
              </div>
            </li>
            <li className={styles.NotificationIcon}>
              <NavLink to={`/co/notifications`} activeClassName={styles.active}>
                <img src={BellIcon} id={styles.BellIcon} alt='Bell Notification' />
                {props.notificationsLength > 0 && (
                  <span className={styles.NotificationNumber}>{props.notificationsLength}</span>
                )}
              </NavLink>
            </li>
          </Fragment>
        )}

        {props.admin.isAdmin && props.admin.isLoggedIn && (
          <Fragment>
            <li>
              <NavLink to={`/ad/alphaomega/profile`} activeClassName={styles.active}>
                My Profile
              </NavLink>
            </li>
            <li>
              <NavLink to={`/ad/alphaomega/customer-supports`} activeClassName={styles.active}>
                Feedback
              </NavLink>
            </li>
            <li className={styles.dropdown}>
              <button className={styles.dropbtn} onClick={DropdownOrderAdminFinance} ref={ref}>
                Finance
                <ArrowDropDownIcon style={{ alignSelf: 'center', marginBottom: '-0.4rem' }} />
              </button>

              <div className={adminDropdownFinance ? styles.dropdownShow : styles.dropdownContent}>
                {/* <div className={styles.FinanceDropdown}> */}
                <NavLink to={`/ad/alphaomega/promo`} activeClassName={styles.active}>
                  <p>Update Promo</p>
                </NavLink>
                <NavLink
                  to={`/ad/alphaomega/order/reguler/fin`}
                  activeClassName={styles.active}
                  onClick={DropdownOrderAdminFinance}>
                  <p>Order Reguler</p>
                </NavLink>
                <NavLink
                  to={`/ad/alphaomega/order/candidate/fin`}
                  activeClassName={styles.active}
                  onClick={DropdownOrderAdminFinance}>
                  <p>Order Bulk Candidate</p>
                </NavLink>

                <NavLink
                  to={`/ad/alphaomega/financial`}
                  activeClassName={styles.active}
                  onClick={DropdownOrderAdminFinance}>
                  <p>Finance</p>
                </NavLink>
              </div>
            </li>

            <li>
              <div className={styles.dropdown}>
                <button className={styles.dropbtn} onClick={DropdownOrderAdminOperational} ref={ref}>
                  Operational
                  <ArrowDropDownIcon style={{ alignSelf: 'center', marginBottom: '-0.4rem' }} />
                </button>

                <div className={adminDropdownOperational ? styles.dropdownShow : styles.dropdownContent}>
                  <NavLink
                    to={`/ad/alphaomega/order/reguler/opr`}
                    activeClassName={styles.active}
                    onClick={DropdownOrderAdminOperational}>
                    <p>Order Reguler</p>
                  </NavLink>
                  <NavLink
                    to={`/ad/alphaomega/order/candidate/opr`}
                    activeClassName={styles.active}
                    onClick={DropdownOrderAdminOperational}>
                    <p>Order Bulk Candidate</p>
                  </NavLink>
                  <NavLink
                    to={`/ad/alphaomega/order/es/opr`}
                    activeClassName={styles.active}
                    onClick={DropdownOrderAdminOperational}>
                    <p>Order Executive Search</p>
                  </NavLink>
                  <NavLink
                    to={`/ad/alphaomega/applicants`}
                    activeClassName={styles.active}
                    onClick={DropdownOrderAdminOperational}>
                    <p>Applicant List</p>
                  </NavLink>
                  <NavLink
                    to={`/ad/alphaomega/companies`}
                    activeClassName={styles.active}
                    onClick={DropdownOrderAdminOperational}>
                    <p>Company list</p>
                  </NavLink>
                  <NavLink
                    to={`/ad/alphaomega/jobs`}
                    activeClassName={styles.active}
                    onClick={DropdownOrderAdminOperational}>
                    <p>Job list</p>
                  </NavLink>
                  <NavLink
                    to={`/ad/alphaomega/slot/reguler`}
                    activeClassName={styles.active}
                    onClick={DropdownOrderAdminOperational}>
                    <p>Slot list</p>
                  </NavLink>
                </div>
              </div>
            </li>

            <li className={styles.NotificationIcon}>
              <NavLink to={`/ad/alphaomega/notifications`} activeClassName={styles.active}>
                <img src={BellIcon} id={styles.BellIcon} alt='Bell Notification' />
                {props.notificationsLength > 0 && (
                  <span className={styles.NotificationNumber}>{props.notificationsLength}</span>
                )}
              </NavLink>
            </li>
          </Fragment>
        )}
        {logout}
      </ul>

      {/*======================================================================*/}

      <ul className={styles.MobileNavigationLink}>
        {props.auth.isLoggedIn && !props.auth.isCompany && (
          <li>
            <span>Welcome, </span>
            <NavLink to={`/ap/${props.auth.userId}/profile`} activeClassName={styles.active}>
              {applicantFirstName}
            </NavLink>
          </li>
        )}
        <li>
          <NavLink to='/' exact activeClassName={styles.active}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to={props.auth.isLoggedIn && props.auth.isCompany ? `/co/${props.auth.userId}/jobList` : '/jobs-dashboard'}
            activeClassName={styles.active}>
            Lowongan
          </NavLink>
        </li>

        {!props.auth.isLoggedIn && !props.admin.isLoggedIn && (
          <Fragment>
            <div className={styles.ApplicantAuthenticationWrapper}>
              <li>
                <button onClick={props.showRegistration}>Daftar</button>
              </li>
              <span>|</span>
              <li>
                <button onClick={props.showLogin}>Masuk</button>
              </li>
            </div>
            <NavLink id={styles.CompanyPageLink} to={`/authentication/co`} activeClassName={styles.active}>
              Perusahaan
            </NavLink>
          </Fragment>
        )}

        {props?.auth?.isLoggedIn && !props?.auth?.isCompany && (
          <li>
            <NavLink to={`/ap/${props.auth.userId}/appliedjobs`} activeClassName={styles.active}>
              Pekerjaan Dilamar
            </NavLink>
          </li>
        )}

        {props.auth.isLoggedIn && props.auth.isCompany && (
          <Fragment>
            <li>
              <NavLink to={`/co/${props.auth.userId}/profile`} activeClassName={styles.active}>
                Perusahaan Anda
              </NavLink>
            </li>
            <li>
              <NavLink to={`/jobs/new`} activeClassName={styles.active}>
                Pasang Iklan
              </NavLink>
            </li>

            <div className={styles.Divider}> Pesan </div>

            <li>
              <NavLink to={`/co/order/reguler`} activeClassName={styles.active}>
                Pesan Slot Iklan
              </NavLink>
            </li>
            <li>
              <NavLink to={`/co/order/candidate`} activeClassName={styles.active}>
                <em>Pesan Bulk Candidates</em>
              </NavLink>
            </li>

            <li>
              <NavLink to={`/co/${props.auth.userId}/listOrder`} activeClassName={styles.active}>
                Riwayat Pesanan
              </NavLink>
            </li>
            <li className={styles.NotificationIcon}>
              <NavLink to={`/co/notifications`} activeClassName={styles.active}>
                <img src={BellIcon} id={styles.BellIcon} alt='Bell Notification' />
                {props.notificationsLength > 0 && (
                  <span className={styles.NotificationNumber}>{props.notificationsLength}</span>
                )}
              </NavLink>
            </li>
          </Fragment>
        )}

        {props.admin.isAdmin && props.admin.isLoggedIn && (
          <Fragment>
            <li>
              <NavLink to={`/ad/alphaomega/profile`} activeClassName={styles.active}>
                My Profile
              </NavLink>
            </li>
            <li>
              <NavLink to={`/ad/alphaomega/customer-supports`} activeClassName={styles.active}>
                Feedback
              </NavLink>
            </li>

            <div className={styles.Divider}>Finance</div>
            <li>
              <NavLink to={`/ad/alphaomega/promo`} activeClassName={styles.active}>
                Update Promo
              </NavLink>
            </li>
            <li>
              <NavLink to={`/ad/alphaomega/order/reguler/fin`} activeClassName={styles.active}>
                Order Reguler
              </NavLink>
            </li>
            <li>
              <NavLink to={`/ad/alphaomega/order/candidate/fin`} activeClassName={styles.active}>
                Order Bulk Candidate
              </NavLink>
            </li>
            <li>
              <NavLink to={`/ad/alphaomega/financial`} activeClassName={styles.active}>
                Finance
              </NavLink>
            </li>

            <div className={styles.Divider}>Operational</div>

            <li>
              <NavLink to={`/ad/alphaomega/order/reguler/opr`} activeClassName={styles.active}>
                Order Reguler
              </NavLink>
            </li>
            <li>
              <NavLink to={`/ad/alphaomega/order/candidate/opr`} activeClassName={styles.active}>
                Order Bulk Candidate
              </NavLink>
            </li>
            <li>
              <NavLink to={`/ad/alphaomega/order/es/opr`} activeClassName={styles.active}>
                Order Executive Search
              </NavLink>
            </li>
            <li>
              <NavLink to={`/ad/alphaomega/applicants`} activeClassName={styles.active}>
                Applicant List
              </NavLink>
            </li>
            <li>
              <NavLink to={`/ad/alphaomega/companies`} activeClassName={styles.active}>
                Company list
              </NavLink>
            </li>
            <li>
              <NavLink to={`/ad/alphaomega/jobs`} activeClassName={styles.active}>
                Job list
              </NavLink>
            </li>
            <li>
              <NavLink to={`/ad/alphaomega/slot/reguler`} activeClassName={styles.active}>
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

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    admin: state.admin,
    applicant: state.applicant,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch({ type: actionTypes.AUTHLOGOUT }),
    admLogout: () => dispatch({ type: actionTypes.ADMINLOGOUT }),
    getOneApplicant: (payload) => dispatch(actionCreators.getOneApplicant(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavigationLinks));
