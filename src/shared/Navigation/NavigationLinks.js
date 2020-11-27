import React, { useState } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/actions";

import SideBar from "./SideBar";

import classes from "./NavigationLinks.module.css";

const NavigationLinks = (props) => {
  const [admin, setAdmin] = useState(true);

  const logoutHandler = () => {
    props.logout();
    props.history.push("/jobs-dashboard");
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
            <NavLink to="/ap/:applicantid" activeClassName={classes.active}>
              My Profile
            </NavLink>
          </li>
        )}
        {props.auth.isLoggedIn && props.auth.isCompany && (
          <li>
            <NavLink
              to={`/co/${props.auth.userId}`}
              activeClassName={classes.active}
            >
              My Company Profile
            </NavLink>
          </li>
        )}

        {props.auth.isLoggedIn && (
          <li onClick={logoutHandler}>
            <NavLink to="#">Logout</NavLink>
          </li>
        )}
      </ul>
      <div>{admin && props.auth.isLoggedIn ? <SideBar /> : <div />}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch({ type: actionTypes.AUTHLOGOUT }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NavigationLinks));
