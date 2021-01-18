import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";

import * as actionCreators from "../../../../store/actions/index";
import SpinnerCircle from "../../../../shared/UI_Element/Spinner/SpinnerCircle";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import classes from "./JobsListAO.module.css";

const JobsListAO = (props) => {
  const [find, setfind] = useState(false);
  const [filter, setfilter] = useState({ value: "Approved" });
  const [data, setData] = useState();
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

  const { getAllJob, getWholeCompanies, admin } = props;
  useEffect(() => {
    const payload = { token: admin.token };
    if (admin.token) {
      getAllJob(payload).then((res) => {
        setData(res.availableJobs);
        setIsLoading(false);
      });
    }
  }, [getAllJob, getWholeCompanies, setIsLoading, admin]);

  console.log(data);

  let content = <SpinnerCircle />;

  if (!isLoading) {
    content = (
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
                {data &&
                  data
                    .filter((status) => status.status === filter)
                    .map((job) => {
                      return (
                        <tr key={job.id}>
                          <th>
                            <Link
                              to={`/jobs/${job._id}`}
                              style={{ color: "black", textDecoration: "none" }}
                            >
                              {job._id}
                            </Link>
                          </th>
                          <th>{job.companyId.companyName}</th>
                          <th>{job.jobTitle}</th>
                          <th>{job.placementLocation}</th>
                          <th>{moment(job.datePosted).format("D MMM YYYY")}</th>
                          <th
                            style={
                              job.status === "Canceled"
                                ? { color: "red", fontWeight: "bold" }
                                : job.status === "Approved"
                                ? {
                                    color: "rgb(33, 153, 0)",
                                    fontWeight: "bold",
                                  }
                                : job.status === "Expired"
                                ? {
                                    color: "rgb(130, 130, 130)",
                                    fontWeight: "bold",
                                  }
                                : {
                                    color: "rgb(250, 129, 0)",
                                    fontWeight: "bold",
                                  }
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
                                <button style={{ color: "red" }}>
                                  Canceled
                                </button>
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
                {data &&
                  data.map((job) => {
                    // let difference = (moment(job.expiredDate).diff(moment()));
                    return (
                      <tr key={job._id}>
                        <th>
                          {" "}
                          <Link
                            to={`/jobs/${job._id}`}
                            style={{ color: "black", textDecoration: "none" }}
                          >
                            {job._id}
                          </Link>
                        </th>
                        <th>{job.companyId.companyName}</th>
                        <th>{job.jobTitle}</th>
                        <th>{job.placementLocation}</th>
                        <th>{moment(job.datePosted).format("D MMM YYYY")}</th>
                        <th
                          style={
                            moment(job.expiredDate) >= moment()
                              ? { color: "green", fontWeight: "600" }
                              : { color: "gray", fontWeight: "600" }
                          }
                        >
                          {moment(job.expiredDate) >= moment()
                            ? "Aktif"
                            : "Expired"}
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
  }

  return <div>{content};</div>;
};

const mapStateToProps = (state) => {
  return {
    admin: state.admin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllJob: (payload) => dispatch(actionCreators.getAllJob(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(JobsListAO);
