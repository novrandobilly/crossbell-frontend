import React, { useState } from "react";
import { connect } from "react-redux";

import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import classes from "./ApplicantListAO.module.css";

const ApplicantListAO = (props) => {
  const [find, setfind] = useState(false);
  const [filter, setfilter] = useState({ value: "" });

  const handleAll = () => {
    setfind(false);
  };

  const handleBlocked = () => {
    setfind(true);
    setfilter("Blocked");
  };

  const handleRegular = () => {
    setfind(true);
    setfilter("Regular");
  };

  const handlePremium = () => {
    setfind(true);
    setfilter("Premium");
  };

  return (
    <div className={classes.FlexContainer}>
      <div className={classes.Container}>
        <div className={classes.HeaderContainer}>
          <h1 className={classes.Header}>Applicant Account List</h1>
          <div className={classes.DropDown}>
            <button className={classes.DropButton}>
              Filter
              <ArrowDropDownIcon />
            </button>
            <div className={classes.DropDownContent}>
              <button style={{ color: "black" }} onClick={handleAll}>
                All
              </button>
              <button
                style={{ color: "rgb(33, 153, 0)" }}
                value="Blocked"
                onClick={handleBlocked}
              >
                Blocked
              </button>
              <button
                style={{ color: "red" }}
                value="Regular"
                onClick={handleRegular}
              >
                Regular
              </button>

              <button
                style={{ color: "rgb(250, 129, 0)" }}
                value="Premium"
                onClick={handlePremium}
              >
                Premium
              </button>
            </div>
          </div>
        </div>
        <table className={classes.Table}>
          <thead className={classes.RowField}>
            <tr>
              <th>Id</th>
              <th>Applicant Name</th>
              <th>Headline</th>
              <th>Email</th>
              <th>Address</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          {find ? (
            <tbody className={classes.ColumnField}>
              {props.applicant
                .filter((app) => app.status === filter)
                .map((app) => (
                  <tr key={app.applicantId}>
                    <th>{app.applicantId}</th>
                    <th>
                      {app.firstName} {app.lastName}
                    </th>
                    <th>{app.headline}</th>
                    <th>{app.email}</th>
                    <th>{app.address}</th>
                    <th
                      style={
                        app.status === "Blocked"
                          ? { color: "Red", fontWeight: "bold" }
                          : app.status === "Regular"
                          ? { color: "Green", fontWeight: "bold" }
                          : { color: "Yellow", fontWeight: "bold" }
                      }
                    >
                      {app.status}
                    </th>
                    <th>
                      <div className={classes.DropDown}>
                        <button className={classes.DropButton}>
                          <ArrowDropDownIcon />
                        </button>
                        <div className={classes.DropDownContent}>
                          <button style={{ color: "Green" }}>Activate</button>
                          <button style={{ color: "red" }}>Block</button>
                        </div>
                      </div>
                    </th>
                  </tr>
                ))}
            </tbody>
          ) : (
            <tbody className={classes.ColumnField}>
              {props.applicant.map((app) => (
                <tr key={app.applicantId}>
                  <th>{app.applicantId}</th>
                  <th>
                    {app.firstName} {app.lastName}
                  </th>
                  <th>{app.headline}</th>
                  <th>{app.email}</th>
                  <th>{app.address}</th>
                  <th
                    style={
                      app.status === "Blocked"
                        ? { color: "Red", fontWeight: "bold" }
                        : app.status === "Regular"
                        ? { color: "Green", fontWeight: "bold" }
                        : { color: "Yellow", fontWeight: "bold" }
                    }
                  >
                    {app.status}
                  </th>
                  <th>
                    <div className={classes.DropDown}>
                      <button className={classes.DropButton}>
                        <ArrowDropDownIcon />
                      </button>
                      <div className={classes.DropDownContent}>
                        <button style={{ color: "Green" }}>Activate</button>
                        <button style={{ color: "red" }}>Block</button>
                      </div>
                    </div>
                  </th>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    applicant: state.applicant.applicants,
  };
};

export default connect(mapStateToProps)(ApplicantListAO);
