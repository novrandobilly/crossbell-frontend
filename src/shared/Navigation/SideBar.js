import React, { useState } from "react";
import { Link } from "react-router-dom";

import CloseIcon from "@material-ui/icons/Close";
import MenuIcon from "@material-ui/icons/Menu";
import classes from "./SideBar.module.css";

const SideBar = () => {
  const [sideBar, setSideBar] = useState(false);

  const toggleSideBar = () => {
    setSideBar(!sideBar);
  };

  let Content = (
    <nav className={sideBar ? classes.ContainerActive : classes.Container}>
      <ul className={classes.MenuItem}>
        <li>
          <Link to={"/ad/alphaomega/profile"}>
            <span>Profile</span>
          </Link>
        </li>
        <li>
          <Link to={"/ad/alphaomega/companies"}>
            <span>Company List</span>
          </Link>
        </li>
        <li>
          <Link to={"/ad/alphaomega/applicants"}>
            <span>Applicant List</span>
          </Link>
        </li>
        <li>
          <Link to={"/ad/alphaomega/jobs"}>
            <span>Job List</span>
          </Link>
        </li>
        <li>
          <Link to={"/ad/alphaomega/financial"}>
            <span>Finance</span>
          </Link>
        </li>
        <li>
          <Link to={"/ad/alphaomega/customer-supports"}>
            <span>Feedback List</span>
          </Link>
        </li>
      </ul>
    </nav>
  );

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
      {Content}
    </React.Fragment>
  );
};

export default SideBar;
