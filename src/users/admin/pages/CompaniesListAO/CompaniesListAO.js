import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import * as actionCreators from "../../../../store/actions/index";
import SpinnerCircle from "../../../../shared/UI_Element/Spinner/SpinnerCircle";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import classes from "./CompaniesListAO.module.css";

const CompaniesListAO = (props) => {
  const [find, setfind] = useState(false);
  const [filter, setfilter] = useState({ value: "" });
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { getAllCompany } = props;
  useEffect(() => {
    getAllCompany().then((res) => {
      setData(res.wholeCompanies);
      setIsLoading(false);
    });
  }, [getAllCompany, setIsLoading]);

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

  console.log(data);

  let content = (
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
              {data
                .filter((company) => company.status === filter)
                .map((company) => (
                  <tr key={company.id}>
                    <Link
                      to={`/co/${company.id}`}
                      style={{ color: "black", textDecoration: "none" }}
                    >
                      <th>{company.id}</th>
                    </Link>
                    <th>{company.companyName}</th>
                    <th>{company.industry ? company.industry : "no data"}</th>
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
              {data.map((company) => (
                <tr key={company.id}>
                  <Link
                    to={`/co/${company.id}`}
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    <th>{company.id}</th>
                  </Link>
                  <th>{company.companyName}</th>
                  <th
                    style={
                      company.industry
                        ? { color: "black" }
                        : { color: "rgba(255,0,0,0.7)", fontWeight: "bold" }
                    }
                  >
                    {company.industry ? company.industry : "no data"}
                  </th>
                  <th>{company.email}</th>
                  <th
                    style={
                      company.address
                        ? { color: "black" }
                        : { color: "rgba(255,0,0,0.7)", fontWeight: "bold" }
                    }
                  >
                    {" "}
                    {company.address ? company.address : "no data"}
                  </th>
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

  if (isLoading) {
    content = <SpinnerCircle />;
  }

  return <div>{content};</div>;
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCompany: () => dispatch(actionCreators.getAllCompany()),
  };
};

export default connect(null, mapDispatchToProps)(CompaniesListAO);
