import React, { useState } from "react";
import { connect } from "react-redux";

import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import classes from "./CompaniesListAO.module.css";

const CompaniesListAO = (props) => {
  const [find, setfind] = useState(false);
  const [filter, setfilter] = useState({ value: "" });

  const handleAll = () => {
    setfind(false);
  };

  const handleMember = () => {
    setfind(true);
    setfilter("Member");
  };

  const handleRegular = () => {
    setfind(true);
    setfilter("Blocked");
  };

  const handlePremium = () => {
    setfind(true);
    setfilter("Premium");
  };

  return (
    <div className={classes.FlexContainer}>
      <div className={classes.Container}>
        <div className={classes.HeaderContainer}>
          <h1 className={classes.Header}>Companies Account List</h1>
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
                style={{ color: "red" }}
                value="Blocked"
                onClick={handleRegular}
              >
                Blocked
              </button>

              <button
                style={{ color: "rgb(250, 129, 0)" }}
                value="Premium"
                onClick={handlePremium}
              >
                Premium
              </button>

              <button
                style={{ color: "rgb(33, 153, 0)" }}
                value="Member"
                onClick={handleMember}
              >
                Member
              </button>
            </div>
          </div>
        </div>
        <table className={classes.Table}>
          <thead className={classes.RowField}>
            <tr>
              <th>Id</th>
              <th>Company Name</th>
              <th>Industry</th>
              <th>Email</th>
              <th>Address</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          {find ? (
            <tbody className={classes.ColumnField}>
              {props.company
                .filter((company) => company.status === filter)
                .map((company) => (
                  <tr key={company.companyId}>
                    <th>{company.companyId}</th>
                    <th>{company.companyName}</th>
                    <th>{company.industry}</th>
                    <th>{company.email}</th>
                    <th>{company.address}</th>
                    <th
                      style={
                        company.status === "Blocked"
                          ? { color: "Red", fontWeight: "bold" }
                          : company.status === "Member"
                          ? { color: "Green", fontWeight: "bold" }
                          : { color: "Yellow", fontWeight: "bold" }
                      }
                    >
                      {company.status}
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
              {props.company.map((company) => (
                <tr key={company.companyId}>
                  <th>{company.companyId}</th>
                  <th>{company.companyName}</th>
                  <th>{company.industry}</th>
                  <th>{company.email}</th>
                  <th>{company.address}</th>
                  <th
                    style={
                      company.status === "Blocked"
                        ? { color: "Brown", fontWeight: "bold" }
                        : company.status === "Member"
                        ? { color: "Green", fontWeight: "bold" }
                        : { color: "Yellow", fontWeight: "bold" }
                    }
                  >
                    {company.status}
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
    company: state.company.companies,
  };
};

export default connect(mapStateToProps)(CompaniesListAO);
