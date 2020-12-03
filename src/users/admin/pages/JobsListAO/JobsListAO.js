import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import * as actionCreators from "../../../../store/actions/index";
import SpinnerCircle from "../../../../shared/UI_Element/Spinner/SpinnerCircle";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import classes from "./JobsListAO.module.css";

const JobsListAO = (props) => {
  const [find, setfind] = useState(false);
  const [filter, setfilter] = useState({ value: "Approved" });
  const [data, setData] = useState([]);
  const [companyData, setCompanyData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleAll = () => {
    setfind(false);
  };

  const handleApproved = () => {
    setfind(true);
    setfilter("Approved");
  };

  const handleCanceled = () => {
    setfind(true);
    setfilter("Canceled");
  };

  const handlePending = () => {
    setfind(true);
    setfilter("Pending");
  };

  const handleExpired = () => {
    setfind(true);
    setfilter("Expired");
  };

  const { getAllJob, getAllCompany } = props;
  useEffect(() => {
    getAllJob().then((res) => {
      setData(res.wholeJobs);
    });
    getAllCompany().then((res) => {
      setCompanyData(res.wholeCompanies);
      setIsLoading(false);
    });
  }, [getAllJob, getAllCompany, setIsLoading]);

  console.log(companyData);

  let content = (
    <div className={classes.FlexContainer}>
      <div className={classes.Container}>
        <div className={classes.HeaderContainer}>
          <h1 className={classes.Header}>Job List</h1>
          <div className={classes.DropDown}>
            <button className={classes.DropButton}>
              Filter
              <ArrowDropDownIcon />
            </button>
            <div className={classes.DropDownContent}>
              <button
                style={{ color: "black" }}
                value="All"
                onClick={handleAll}
              >
                All
              </button>
              <button
                style={{ color: "rgb(33, 153, 0)" }}
                value="Approved"
                onClick={handleApproved}
              >
                Approved
              </button>
              <button
                style={{ color: "red" }}
                value="Canceled"
                onClick={handleCanceled}
              >
                Canceled
              </button>
              <button
                style={{ color: "rgb(250, 129, 0)" }}
                value="Pending"
                onClick={handlePending}
              >
                Pending
              </button>
              <button
                style={{ color: "rgb(130, 130, 130)" }}
                value="Expired"
                onClick={handleExpired}
              >
                Expired
              </button>
            </div>
          </div>
        </div>
        <table className={classes.Table}>
          <thead className={classes.RowField}>
            <tr>
              <th>Id</th>
              <th>Company</th>
              <th>JobTitle</th>
              <th>Location</th>
              <th>Date posted</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          {find ? (
            <tbody className={classes.ColumnField}>
              {data
                .filter((status) => status.status === filter)
                .map((job) => {
                  //   let company = companyData.find(
                  //     (comp) => comp.id === job.companyId
                  //   );
                  return (
                    <tr key={job.id}>
                      <th>
                        <Link
                          to={`/jobs/${job.id}`}
                          style={{ color: "black", textDecoration: "none" }}
                        >
                          {job.id}
                        </Link>
                      </th>
                      <th>{job.companyId}</th>
                      <th>{job.jobTitle}</th>
                      <th>
                        {job.city}, {job.region}
                      </th>
                      <th>{job.datePosted} days ago</th>
                      <th
                        style={
                          job.status === "Canceled"
                            ? { color: "red", fontWeight: "bold" }
                            : job.status === "Approved"
                            ? { color: "rgb(33, 153, 0)", fontWeight: "bold" }
                            : job.status === "Expired"
                            ? {
                                color: "rgb(130, 130, 130)",
                                fontWeight: "bold",
                              }
                            : { color: "rgb(250, 129, 0)", fontWeight: "bold" }
                        }
                      >
                        {job.status}
                      </th>
                      <th>
                        <div className={classes.DropDown}>
                          <button className={classes.DropButton}>
                            <ArrowDropDownIcon />
                          </button>
                          <div className={classes.DropDownContent}>
                            <button style={{ color: "rgb(33, 153, 0)" }}>
                              Approved
                            </button>
                            <button style={{ color: "red" }}>Canceled</button>
                            <button style={{ color: "rgb(250, 129, 0)" }}>
                              Pending
                            </button>
                          </div>
                        </div>
                      </th>
                    </tr>
                  );
                })}
            </tbody>
          ) : (
            <tbody className={classes.ColumnField}>
              {data.map((job) => {
                // let company = companyData.find(
                //   (comp) => comp.id === job.companyId
                // );

                return (
                  <tr key={job.id}>
                    <th>
                      {" "}
                      <Link
                        to={`/jobs/${job.id}`}
                        style={{ color: "black", textDecoration: "none" }}
                      >
                        {job.id}
                      </Link>
                    </th>
                    <th>{job.companyId}</th>
                    <th>{job.jobTitle}</th>
                    <th>
                      {job.city}, {job.region}
                    </th>
                    <th>{job.datePosted} days ago</th>
                    <th
                      style={
                        job.status === "Canceled"
                          ? { color: "red", fontWeight: "bold" }
                          : job.status === "Approved"
                          ? { color: "rgb(33, 153, 0)", fontWeight: "bold" }
                          : job.status === "Expired"
                          ? { color: "rgb(130, 130, 130)", fontWeight: "bold" }
                          : { color: "rgb(250, 129, 0)", fontWeight: "bold" }
                      }
                    >
                      {job.status}
                    </th>
                    <th>
                      <div className={classes.DropDown}>
                        <button className={classes.DropButton}>
                          <ArrowDropDownIcon />
                        </button>
                        <div className={classes.DropDownContent}>
                          <button style={{ color: "rgb(33, 153, 0)" }}>
                            Approved
                          </button>
                          <button style={{ color: "red" }}>Canceled</button>
                          <button style={{ color: "rgb(250, 129, 0)" }}>
                            Pending
                          </button>
                        </div>
                      </div>
                    </th>
                  </tr>
                );
              })}
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
    getAllJob: () => dispatch(actionCreators.getAllJob()),
    getAllCompany: () => dispatch(actionCreators.getAllCompany()),
  };
};

export default connect(null, mapDispatchToProps)(JobsListAO);
