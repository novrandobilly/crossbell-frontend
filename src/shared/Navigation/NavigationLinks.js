import React, { useState, useEffect, useRef } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import OutsideClick from '../utils/outsideClick';

import * as actionTypes from '../../store/actions/actions';
import * as actionCreators from '../../store/actions/index';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import classes from './NavigationLinks.module.css';

const NavigationLinks = (props) => {
  const [companyDropdown, setCompanyDropdown] = useState(false);
  const [companyMyList, setCompanyMyList] = useState(false);

  const [adminDropdownFinance, setAdminDropdownFinance] = useState(false);
  const [adminDropdownOperational, setAdminDropdownOperational] =
    useState(false);

  const [adminMyList, setAdminMyList] = useState(false);

  const ref = useRef();

  OutsideClick(ref, () => {
    if (companyDropdown) setCompanyDropdown(false);
    if (companyMyList) setCompanyMyList(false);
    if (adminDropdownFinance) setAdminDropdownFinance(false);
    if (adminDropdownOperational) setAdminDropdownOperational(false);
    if (adminMyList) setAdminMyList(false);
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
    setCompanyMyList(false);
    setCompanyDropdown(!companyDropdown);
  };

  const DropdownList = () => {
    setCompanyDropdown(false);
    setCompanyMyList(!companyMyList);
  };

  const DropdownOrderAdminFinance = () => {
    setAdminMyList(false);
    setAdminDropdownOperational(false);
    setAdminDropdownFinance(!adminDropdownFinance);
  };

  const DropdownListAdmin = () => {
    setAdminDropdownFinance(false);
    setAdminDropdownOperational(false);
    setAdminMyList(!adminMyList);
  };

  const DropdownOrderAdminOperational = () => {
    setAdminMyList(false);
    setAdminDropdownFinance(false);
    setAdminDropdownOperational(!adminDropdownOperational);
  };

  const [data, setData] = useState('');

  const { getOneApplicant } = props;

  useEffect(() => {
    if (props.auth.isLoggedIn && !props.auth.isCompany) {
      const applicantid = props.auth.userId;
      const payload = {
        applicantId: applicantid,
        token: props.auth.token,
      };
      getOneApplicant(payload).then((res) => {
        setData(res.applicant.firstName);
      });
    }
  }, [
    getOneApplicant,
    props.auth.isLoggedIn,
    props.auth.isCompany,
    props.auth.userId,
    props.auth.token,
  ]);

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
    <div className={classes.NavContainer}>
      <ul className={classes.NavLinks}>
        {props?.auth?.isLoggedIn && !props?.auth?.isCompany && (
          <li>
            <NavLink
              to={`/ap/${props.auth.userId}`}
              activeClassName={classes.active}
            >
              <span>Selamat datang, </span>
              {data}
            </NavLink>
          </li>
        )}

        <li>
          <NavLink to='/' exact activeClassName={classes.active}>
            Beranda
          </NavLink>
        </li>
        <li>
          <NavLink
            to={
              props?.auth?.isLoggedIn && !props?.auth?.isCompany
                ? '/jobs-dashboard'
                : `/co/${props.auth.userId}/jobList`
            }
            activeClassName={classes.active}
          >
            Dasboard Pekerjaan
          </NavLink>
        </li>

        {props?.auth?.isLoggedIn && !props?.auth?.isCompany && (
          <li>
            <NavLink
              to={`/ap/${props.auth.userId}/appliedjobs`}
              activeClassName={classes.active}
            >
              Pekerjaan Dilamar
            </NavLink>
          </li>
        )}

        {props.auth.isLoggedIn && props.auth.isCompany && (
          <React.Fragment>
            <li>
              <NavLink
                to={`/co/${props.auth.userId}`}
                activeClassName={classes.active}
              >
                Profil Perusahaan
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
                  Pesan Slot
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
                  <NavLink
                    to={`/co/order/reguler`}
                    activeClassName={classes.active}
                    onClick={DropdownOrder}
                  >
                    <p>Pesan Slot Iklan</p>
                  </NavLink>
                  <NavLink
                    to={`/co/order/candidate`}
                    activeClassName={classes.active}
                    onClick={DropdownOrder}
                  >
                    <p>
                      Pesan <em>Bulk Candidates</em>
                    </p>
                  </NavLink>
                  <NavLink
                    to={`/co/order/es`}
                    activeClassName={classes.active}
                    onClick={DropdownOrder}
                  >
                    <p>Pesan Kandidat Eksekutif</p>
                  </NavLink>
                </div>
              </div>
            </li>
            <li>
              <div className={classes.dropdown}>
                <button
                  className={classes.dropbtn}
                  onClick={DropdownList}
                  ref={ref}
                >
                  List
                  <ArrowDropDownIcon
                    style={{ alignSelf: 'center', marginBottom: '-0.4rem' }}
                  />
                </button>

                <div
                  className={
                    companyMyList
                      ? classes.dropdownShow
                      : classes.dropdownContent
                  }
                  id='dropdownCompany'
                >
                  <NavLink
                    to={`/co/${props.auth.userId}/listOrder`}
                    activeClassName={classes.active}
                    onClick={DropdownList}
                  >
                    <p>Pesanan</p>
                  </NavLink>
                  {/* <NavLink
                    to={`/co/${props.auth.userId}/jobList`}
                    activeClassName={classes.active}
                    onClick={DropdownList}
                  >
                    <p>Iklan Pekerjaan</p>
                  </NavLink> */}
                </div>
              </div>
            </li>
          </React.Fragment>
        )}

        {props.admin.isAdmin && props.admin.isLoggedIn && (
          <React.Fragment>
            <li>
              <NavLink
                to={`/ad/alphaomega/profile`}
                activeClassName={classes.active}
              >
                My Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/ad/alphaomega/customer-supports`}
                activeClassName={classes.active}
              >
                Feedback
              </NavLink>
            </li>
            <li>
              <div className={classes.dropdown}>
                <button
                  className={classes.dropbtn}
                  onClick={DropdownOrderAdminFinance}
                  ref={ref}
                >
                  Finance
                  <ArrowDropDownIcon
                    style={{ alignSelf: 'center', marginBottom: '-0.4rem' }}
                  />
                </button>

                <div
                  className={
                    adminDropdownFinance
                      ? classes.dropdownShow
                      : classes.dropdownContent
                  }
                  id='dropdownCompany'
                >
                  <NavLink
                    to={`/ad/alphaomega/promo`}
                    activeClassName={classes.active}
                  >
                    <p>Update Promo</p>
                  </NavLink>
                  <NavLink
                    to={`/ad/alphaomega/order/reguler/fin`}
                    activeClassName={classes.active}
                    onClick={DropdownOrderAdminFinance}
                  >
                    <p>Order Reguler</p>
                  </NavLink>
                  <NavLink
                    to={`/ad/alphaomega/order/candidate/fin`}
                    activeClassName={classes.active}
                    onClick={DropdownOrderAdminFinance}
                  >
                    <p>Order Bulk Candidate</p>
                  </NavLink>
                  {/* <NavLink
                    to={`/ad/alphaomega/order/es`}
                    activeClassName={classes.active}
                    onClick={DropdownOrderAdmin}
                  >
                    <p>Order Executive Search</p>
                  </NavLink> */}
                  <NavLink
                    to={`/ad/alphaomega/financial`}
                    activeClassName={classes.active}
                    onClick={DropdownOrderAdminFinance}
                  >
                    <p>Finance</p>
                  </NavLink>
                </div>
              </div>
            </li>
            <li>
              <div className={classes.dropdown}>
                <button
                  className={classes.dropbtn}
                  onClick={DropdownOrderAdminOperational}
                  ref={ref}
                >
                  Operational
                  <ArrowDropDownIcon
                    style={{ alignSelf: 'center', marginBottom: '-0.4rem' }}
                  />
                </button>

                <div
                  className={
                    adminDropdownOperational
                      ? classes.dropdownShow
                      : classes.dropdownContent
                  }
                  id='dropdownCompany'
                >
                  <NavLink
                    to={`/ad/alphaomega/order/reguler/opr`}
                    activeClassName={classes.active}
                    onClick={DropdownOrderAdminOperational}
                  >
                    <p>Order Reguler</p>
                  </NavLink>
                  <NavLink
                    to={`/ad/alphaomega/order/candidate/opr`}
                    activeClassName={classes.active}
                    onClick={DropdownOrderAdminOperational}
                  >
                    <p>Order Bulk Candidate</p>
                  </NavLink>
                  <NavLink
                    to={`/ad/alphaomega/order/es/opr`}
                    activeClassName={classes.active}
                    onClick={DropdownOrderAdminOperational}
                  >
                    <p>Order Executive Search</p>
                  </NavLink>
                </div>
              </div>
            </li>
            <li>
              <div className={classes.dropdown}>
                <button
                  className={classes.dropbtn}
                  onClick={DropdownListAdmin}
                  ref={ref}
                >
                  List
                  <ArrowDropDownIcon
                    style={{ alignSelf: 'center', marginBottom: '-0.4rem' }}
                  />
                </button>

                <div
                  className={
                    adminMyList ? classes.dropdownShow : classes.dropdownContent
                  }
                  id='dropdownCompany'
                >
                  <NavLink
                    to={`/ad/alphaomega/applicants`}
                    activeClassName={classes.active}
                    onClick={DropdownListAdmin}
                  >
                    <p>Applicant List</p>
                  </NavLink>

                  <NavLink
                    to={`/ad/alphaomega/companies`}
                    activeClassName={classes.active}
                    onClick={DropdownListAdmin}
                  >
                    <p>Company list</p>
                  </NavLink>

                  <NavLink
                    to={`/ad/alphaomega/jobs`}
                    activeClassName={classes.active}
                    onClick={DropdownListAdmin}
                  >
                    <p>Job list</p>
                  </NavLink>
                </div>
              </div>
            </li>
          </React.Fragment>
        )}
        {logout}
      </ul>

      {/*======================================================================*/}

      <ul className={classes.PhoneLinks}>
        {props.auth.isLoggedIn && !props.auth.isCompany && (
          <li>
            <span>
              Welcome,{' '}
              <NavLink
                to={`/ap/${props.auth.userId}`}
                activeClassName={classes.active}
              >
                {data}
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
          <NavLink to='/jobs-dashboard' activeClassName={classes.active}>
            Explore Jobs
          </NavLink>
        </li>

        {props.auth.isLoggedIn && props.auth.isCompany && (
          <React.Fragment>
            <li>
              <NavLink
                to={`/co/${props.auth.userId}`}
                activeClassName={classes.active}
              >
                My Company Profile
              </NavLink>
            </li>
            <li>
              <NavLink to={`/jobs/new`} activeClassName={classes.active}>
                Post New Job
              </NavLink>
            </li>

            <div className={classes.Divider}> Post Order </div>

            <li>
              <NavLink
                to={`/co/order/reguler`}
                activeClassName={classes.active}
              >
                Order Job Slot
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/co/order/candidate`}
                activeClassName={classes.active}
              >
                Order Bulk Candidate
              </NavLink>
            </li>
            <li>
              <NavLink to={`/co/order/es`} activeClassName={classes.active}>
                Order Executive Search
              </NavLink>
            </li>

            <div className={classes.Divider}> My List </div>

            <li>
              <NavLink
                to={`/co/${props.auth.userId}/listOrder`}
                activeClassName={classes.active}
              >
                Order List
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/co/${props.auth.userId}/jobList`}
                activeClassName={classes.active}
              >
                Job list
              </NavLink>
            </li>
          </React.Fragment>
        )}

        {props.admin.isAdmin && props.admin.isLoggedIn && (
          <React.Fragment>
            <li>
              <NavLink
                to={`/ad/alphaomega/profile`}
                activeClassName={classes.active}
              >
                My Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/ad/alphaomega/customer-supports`}
                activeClassName={classes.active}
              >
                Feedback
              </NavLink>
            </li>

            <div className={classes.Divider}>Finance</div>
            <li>
              <NavLink
                to={`/ad/alphaomega/promo`}
                activeClassName={classes.active}
              >
                Update Promo
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/ad/alphaomega/order/reguler/fin`}
                activeClassName={classes.active}
              >
                Order Reguler
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/ad/alphaomega/order/candidate/fin`}
                activeClassName={classes.active}
              >
                Order Bulk Candidate
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/ad/alphaomega/financial`}
                activeClassName={classes.active}
              >
                Finance
              </NavLink>
            </li>

            <div className={classes.Divider}>Operational</div>

            <li>
              <NavLink
                to={`/ad/alphaomega/order/reguler/opr`}
                activeClassName={classes.active}
              >
                Order Reguler
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/ad/alphaomega/order/candidate/opr`}
                activeClassName={classes.active}
              >
                Order Bulk Candidate
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/ad/alphaomega/order/es/opr`}
                activeClassName={classes.active}
              >
                Order Executive Search
              </NavLink>
            </li>

            <div className={classes.Divider}>List</div>
            <li>
              <NavLink
                to={`/ad/alphaomega/applicants`}
                activeClassName={classes.active}
              >
                Applicant List
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/ad/alphaomega/companies`}
                activeClassName={classes.active}
              >
                Company list
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/ad/alphaomega/jobs`}
                activeClassName={classes.active}
              >
                Job list
              </NavLink>
            </li>
          </React.Fragment>
        )}
        {logout}
      </ul>
    </div>
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
    getOneApplicant: (payload) =>
      dispatch(actionCreators.getOneApplicant(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NavigationLinks));
