import React from "react";
import { Link } from "react-router-dom";

import IconButton from "./IconButton";

import classes from "./RangeSegment.module.css";

const RangeSegment = (props) => {
  return (
    <>
      <div className={classes.Line}></div>

      <div className={classes.Container}>
        <div className={classes.Header}>
          {props.labelName && (
            <label className={classes.Label}>{props.labelName}</label>
          )}
          <div>
            <Link to={`/co/${props.id}/compro/${props.route}`}>
              <IconButton iconType="NewJob" />
            </Link>
            <Link to={`/co/${props.id}/compro/${props.route}`}>
              <IconButton />
            </Link>
          </div>
        </div>

        <div className={classes.MapContainer}>
          <div className={classes.Square} />
          <p className={classes.Title}>{props.title}</p>
          <p className={classes.SubTitle}>{props.subTitle}</p>
          <div className={classes.PeriodSegment}>
            <p className={classes.Period}>{props.start}</p>
            <p className={classes.Space}>-</p>
            <p className={classes.Period}>{props.end}</p>
          </div>
          <p className={classes.Description}>{props.description}</p>
        </div>
      </div>
    </>
  );
};

export default RangeSegment;
