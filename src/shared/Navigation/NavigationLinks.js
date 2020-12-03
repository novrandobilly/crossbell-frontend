import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/actions";

import SideBar from "./SideBar";

import classes from "./NavigationLinks.module.css";


const NavigationLinks = props => {
	const logoutHandler = () => {
		if (props.admin.isLoggedIn) {
			props.admLogout();
		} else {
			props.logout();
		}
		props.history.push('/');
	};

	let logout = null;
	if (props.auth.isLoggedIn || props.admin.isLoggedIn) {
		logout = (
			<li onClick={logoutHandler}>
				<NavLink to='#'>Logout</NavLink>
			</li>
		);
	}
	return (
		<div className={classes.NavContainer}>
			<ul className={classes.NavLinks}>
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
				<li>
					<NavLink to='#' activeClassName={classes.active}>
						Development Pages
					</NavLink>
				</li>
				{props.auth.isLoggedIn &&
				!props.auth.isCompany && (
					<li>
						<NavLink to={`/ap/${props.auth.userId}`} activeClassName={classes.active}>
							My Profile
						</NavLink>
					</li>
				)}
				{props.auth.isLoggedIn &&
				props.auth.isCompany && (
					<li>
						<NavLink to={`/co/${props.auth.userId}`} activeClassName={classes.active}>
							My Company Profile
						</NavLink>
					</li>
				)}
				{logout}
			</ul>
			{props.admin.isAdmin &&
			props.admin.isLoggedIn && (
				<div className={classes.active}>
					<SideBar />
				</div>
			)}
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
