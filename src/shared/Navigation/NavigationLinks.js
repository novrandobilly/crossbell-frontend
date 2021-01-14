import React, { useState } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/actions";

import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import classes from "./NavigationLinks.module.css";

const NavigationLinks = (props) => {
  const [companyDropdown, setCompanyDropdown] = useState(false);
  const [companyMyList, setCompanyMyList] = useState(false);

  const [adminDropdown, setAdminDropdown] = useState(false);
  const [adminMyList, setAdminMyList] = useState(false);
  const logoutHandler = () => {
    if (props.admin.isLoggedIn) {
      props.admLogout();
    } else {
      props.logout();
    }
    props.history.push("/");
  };

  let logout = null;
  if (props.auth.isLoggedIn || props.admin.isLoggedIn) {
    logout = (
      <li onClick={logoutHandler}>
        <NavLink to="#">Logout</NavLink>
      </li>
    );
  }

  const DropdownOrder = () => {
    setCompanyMyList(false);
    setCompanyDropdown(!companyDropdown);
  };

  const DropdownList = () => {
    setCompanyDropdown(false);
    setCompanyMyList(!companyMyList);
  };

  const DropdownOrderAdmin = () => {
    setAdminMyList(false);
    setAdminDropdown(!adminDropdown);
  };

  const DropdownListAdmin = () => {
    setAdminDropdown(false);
    setAdminMyList(!adminMyList);
  };

  return (
    <div className={classes.NavContainer}>
      <ul className={classes.NavLinks}>
        <li>
          <NavLink to="/" exact activeClassName={classes.active}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/jobs-dashboard" activeClassName={classes.active}>
            Explore Jobs
          </NavLink>
        </li>
        {props.auth.isLoggedIn && !props.auth.isCompany && (
          <li>
            <NavLink
              to={`/ap/${props.auth.userId}`}
              activeClassName={classes.active}
            >
              My Profile
            </NavLink>
          </li>
        )}
        {props.auth.isLoggedIn && props.auth.isCompany && (
          <>
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
            <li>
              <div className={classes.dropdown}>
                <button className={classes.dropbtn} onClick={DropdownOrder}>
                  Place Order
                  <ArrowDropDownIcon
                    style={{ alignSelf: "center", marginBottom: "-0.4rem" }}
                  />
                </button>

                <div
                  className={
                    companyDropdown
                      ? classes.dropdownShow
                      : classes.dropdownContent
                  }
                  id="dropdownCompany"
                >
                  <NavLink
                    to={`/co/order/reguler`}
                    activeClassName={classes.active}
                  >
                    <p>Order Job Slot</p>
                  </NavLink>
                  <NavLink
                    to={`/co/order/candidate`}
                    activeClassName={classes.active}
                  >
                    <p>Order Bulk Candidate</p>
                  </NavLink>
                  <NavLink to={`/co/order/es`} activeClassName={classes.active}>
                    <p>Order Executive Search</p>
                  </NavLink>
                </div>
              </div>
            </li>
            <li>
              <div className={classes.dropdown}>
                <button className={classes.dropbtn} onClick={DropdownList}>
                  My List
                  <ArrowDropDownIcon
                    style={{ alignSelf: "center", marginBottom: "-0.4rem" }}
                  />
                </button>

                <div
                  className={
                    companyMyList
                      ? classes.dropdownShow
                      : classes.dropdownContent
                  }
                  id="dropdownCompany"
                >
                  <NavLink
                    to={`/co/${props.auth.userId}/listOrder`}
                    activeClassName={classes.active}
                  >
                    <p>Order List</p>
                  </NavLink>
                  <NavLink
                    to={`/co/${props.auth.userId}/jobList`}
                    activeClassName={classes.active}
                  >
                    <p>Job list</p>
                  </NavLink>
                </div>
              </div>
            </li>
          </>
        )}

        {props.admin.isAdmin && props.admin.isLoggedIn && (
          <>
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
                  onClick={DropdownOrderAdmin}
                >
                  Order & Finance
                  <ArrowDropDownIcon
                    style={{ alignSelf: "center", marginBottom: "-0.4rem" }}
                  />
                </button>

                <div
                  className={
                    adminDropdown
                      ? classes.dropdownShow
                      : classes.dropdownContent
                  }
                  id="dropdownCompany"
                >
                  <NavLink
                    to={`/ad/alphaomega/order/reguler`}
                    activeClassName={classes.active}
                  >
                    <p>Order Reguler List</p>
                  </NavLink>
                  <NavLink
                    to={`/ad/alphaomega/order/candidate`}
                    activeClassName={classes.active}
                  >
                    <p>Order Bulk Candidate List</p>
                  </NavLink>
                  <NavLink
                    to={`/ad/alphaomega/order/es`}
                    activeClassName={classes.active}
                  >
                    <p>Order Executive Search List</p>
                  </NavLink>
                  <NavLink
                    to={`/ad/alphaomega/financial`}
                    activeClassName={classes.active}
                  >
                    <p>Finance</p>
                  </NavLink>
                </div>
              </div>
            </li>
            <li>
              <div className={classes.dropdown}>
                <button className={classes.dropbtn} onClick={DropdownListAdmin}>
                  List
                  <ArrowDropDownIcon
                    style={{ alignSelf: "center", marginBottom: "-0.4rem" }}
                  />
                </button>

                <div
                  className={
                    adminMyList ? classes.dropdownShow : classes.dropdownContent
                  }
                  id="dropdownCompany"
                >
                  <NavLink
                    to={`/ad/alphaomega/applicants`}
                    activeClassName={classes.active}
                  >
                    <p>Applicant List</p>
                  </NavLink>

                  <NavLink
                    to={`/ad/alphaomega/companies`}
                    activeClassName={classes.active}
                  >
                    <p>Company list</p>
                  </NavLink>

                  <NavLink
                    to={`/ad/alphaomega/jobs`}
                    activeClassName={classes.active}
                  >
                    <p>Job list</p>
                  </NavLink>
                </div>
              </div>
            </li>
          </>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch({ type: actionTypes.AUTHLOGOUT }),
    admLogout: () => dispatch({ type: actionTypes.ADMINLOGOUT }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NavigationLinks));
