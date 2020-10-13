import React from "react";
import { Link } from "react-router-dom";

import classes from "./JobCard.module.css";
import Button from "../../shared/UI_Element/Button";

const JobCard = (props) => {
  return (
    <div className={classes.JobCard}>
      <div className={classes.Logo}>
        <img src={props.logo} alt={props.company} />
      </div>
      <div className={classes.Content}>
        <h3>
          <Link
            to={`/jobs/${props.id}`}
            style={{ textDecoration: "inherit", color: "inherit" }}
          >
            {props.name}
          </Link>
        </h3>

        <p>
          <em>
            <strong>{props.company} </strong>
          </em>
          - {props.city}, {props.region}
        </p>
        <p>${props.salary} /month</p>
      </div>
      <div className={classes.InstantSubmit}>
        <Button btnType="InstantApply">Instant Apply</Button>
      </div>
      <footer />
    </div>
  );
};

export default JobCard;
