import React from "react";
import { Link } from "react-router-dom";

import IconButton from "./IconButton";

import classes from "./RangeSegmentMap.module.css";

const RangeSegmentMap = (props) => {
  return (
    <>
      <div className={classes.MapContainer}>
        <div>
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

        <div>
          <Link to={props.routeEdit}>
            <IconButton />
          </Link>

          <IconButton iconType="Delete" />
        </div>
      </div>
    </>
  );
};

export default RangeSegmentMap;
