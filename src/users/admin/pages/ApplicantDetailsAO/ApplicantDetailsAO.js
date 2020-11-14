import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import classes from "./ApplicantDetailsAO.module.css";

const ApplicantDetailsAO = (props) => {
  const { applicantid } = useParams();
  const app = props.applicant.find((app) => app.applicantId === applicantid);

  const Arr = [];

  app.jobApplied.map(
    (job, i) => (Arr[i] = props.job.find((apply) => apply.jobId === job))
  );

  const [find, setfind] = useState(false);
  const [filter, setfilter] = useState({ value: "" });

  const handleAll = () => {
    setfind(false);
  };

  const handleCanceled = () => {
    setfind(true);
    setfilter("Canceled");
  };

  const handleApproved = () => {
    setfind(true);
    setfilter("Approved");
  };

  const handlePending = () => {
    setfind(true);
    setfilter("Pending");
  };

  return (
    <div className={classes.FlexContainer}>
      <div className={classes.Container}>
        <div className={classes.HeaderContainer}>
          <h1 className={classes.Header}>
            Jobs Applied ({app.firstName}_{app.lastName})
          </h1>
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
            </div>
          </div>
        </div>
        <table className={classes.Table}>
          <thead className={classes.RowField}>
            <tr>
              <th>No</th>
              <th>Job Id</th>
              <th>Job Title</th>
              <th>Job Function</th>
              <th>Company Id</th>
              <th>Date Posted</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          {find ? (
            <tbody className={classes.ColumnField}>
              {Arr.filter((job) => job.status === filter).map((job, i) => (
                <tr key={job.jobId}>
                  <th>{i + 1}</th>
                  <th>{job.jobId}</th>
                  <th>{job.jobTitle}</th>
                  <th>{job.jobFunction}</th>
                  <th>{job.companyId}</th>
                  <th>{job.datePosted} days ago</th>
                  <th
                    style={
                      job.status === "Canceled"
                        ? { color: "Red", fontWeight: "bold" }
                        : job.status === "Approved"
                        ? { color: "Green", fontWeight: "bold" }
                        : { color: "Yellow", fontWeight: "bold" }
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
              {Arr.map((job, i) => (
                <tr key={job.jobId}>
                  <th>{i + 1}</th>
                  <th>{job.jobId}</th>
                  <th>{job.jobTitle}</th>
                  <th>{job.jobFunction}</th>
                  <th>{job.companyId}</th>
                  <th>{job.datePosted} days ago</th>
                  <th
                    style={
                      job.status === "Canceled"
                        ? { color: "Red", fontWeight: "bold" }
                        : job.status === "Approved"
                        ? { color: "Green", fontWeight: "bold" }
                        : { color: "Yellow", fontWeight: "bold" }
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
    job: state.job.jobs,
  };
};

export default connect(mapStateToProps)(ApplicantDetailsAO);
