import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import DescriptionIcon from "@material-ui/icons/Description";
import FeedbackIcon from "@material-ui/icons/Feedback";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import WorkIcon from "@material-ui/icons/Work";
import GroupIcon from "@material-ui/icons/Group";
import PersonIcon from "@material-ui/icons/Person";
import BusinessIcon from "@material-ui/icons/Business";
import CloseIcon from "@material-ui/icons/Close";
import MenuIcon from "@material-ui/icons/Menu";
import classes from "./SideBar.module.css";

const SideBar = (props) => {
  const [sideBar, setSideBar] = useState(false);

  const toggleSideBar = () => {
    setSideBar(!sideBar);
  };

  let content = (
    <nav className={sideBar ? classes.ContainerActive : classes.Container}>
      <ul className={classes.MenuItem}>
        <li>
          <Link to={"/co/order/reguler"}>
            <span>Purchase Job Ads Slot</span>
            <LocalOfferIcon
              fontSize="large"
              style={{
                margin: "0.5rem 0rem -0.5rem 1rem",
                color: "black",
              }}
            />
          </Link>
        </li>

        <li>
          <Link to={"#"}>
            <span>Order Bulk Candidate</span>
            <AssignmentIndIcon
              fontSize="large"
              style={{
                margin: "0.5rem 0rem -0.5rem 1rem",
                color: "black",
              }}
            />
          </Link>
        </li>

        <li>
          <Link to={"#"}>
            <span>Order Headhunter</span>
            <DescriptionIcon
              fontSize="large"
              style={{
                margin: "0.5rem 0rem -0.5rem 1rem",
                color: "black",
              }}
            />
          </Link>
        </li>
      </ul>
    </nav>
  );

  if (props.admin.isAdmin && props.admin.isLoggedIn) {
    content = (
      <nav className={sideBar ? classes.ContainerActive : classes.Container}>
        <ul className={classes.MenuItem}>
          <li>
            <Link to={"/ad/alphaomega/profile"}>
              <span>Profile</span>
            </Link>
            <PersonIcon
              fontSize="large"
              style={{ margin: "0.5rem 0rem -0.5rem 1rem", color: "black" }}
            />
          </li>

          <li>
            <Link to={"/ad/alphaomega/companies"}>
              <span>Company List</span>
              <BusinessIcon
                fontSize="large"
                style={{
                  margin: "0.5rem 0rem -0.5rem 1rem",
                  color: "black",
                }}
              />
            </Link>
          </li>
          <li>
            <Link to={"/ad/alphaomega/applicants"}>
              <span>Applicant List </span>
              <GroupIcon
                fontSize="large"
                style={{
                  margin: "0.5rem 0rem -0.5rem 1rem",
                  color: "black",
                }}
              />
            </Link>
          </li>
          <li>
            <Link to={"/ad/alphaomega/jobs"}>
              <span>Job List</span>
              <WorkIcon
                fontSize="large"
                style={{
                  margin: "0.5rem 0rem -0.5rem 1rem",
                  color: "black",
                }}
              />
            </Link>
          </li>
          <li>
            <Link to={"/ad/alphaomega/financial"}>
              <span>Finance</span>
              <AttachMoneyIcon
                fontSize="large"
                style={{
                  margin: "0.5rem 0rem -0.5rem 1rem",
                  color: "black",
                }}
              />
            </Link>
          </li>
          <li>
            <Link to={"/ad/alphaomega/customer-supports"}>
              <span>Feedback List</span>
              <FeedbackIcon
                fontSize="large"
                style={{
                  margin: "0.5rem 0rem -0.5rem 1rem",
                  color: "black",
                }}
              />
            </Link>
          </li>
          <li>
            <Link to={"/ad/alphaomega/order/reguler"}>
              <span>Order Reguler</span>
              <LocalOfferIcon
                fontSize="large"
                style={{
                  margin: "0.5rem 0rem -0.5rem 1rem",
                  color: "black",
                }}
              />
            </Link>
          </li>
          <li>
            <Link to={"/ad/alphaomega/order/candidate"}>
              <span>Order Bulk Candidate</span>
              <AssignmentIndIcon
                fontSize="large"
                style={{
                  margin: "0.5rem 0rem -0.5rem 1rem",
                  color: "black",
                }}
              />
            </Link>
          </li>
          <li>
            <Link to={"/ad/alphaomega/order/headhunter"}>
              <span>Order Headhunter</span>
              <DescriptionIcon
                fontSize="large"
                style={{
                  margin: "0.5rem 0rem -0.5rem 1rem",
                  color: "black",
                }}
              />
            </Link>
          </li>
        </ul>
      </nav>
    );
  }

  return (
    <React.Fragment>
      <div className={classes.Burger}>
        {!sideBar ? (
          <MenuIcon
            onClick={toggleSideBar}
            style={{ fontSize: 40, cursor: "pointer" }}
          />
        ) : (
          <CloseIcon
            onClick={toggleSideBar}
            style={{ fontSize: 40, cursor: "pointer" }}
          />
        )}
      </div>
      {content}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    admin: state.admin,
  };
};

export default connect(mapStateToProps)(SideBar);
