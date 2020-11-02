import React from "react";

import classes from "./RangeSegmentMap.module.css";

const RangeSegmentMap = (props) => {
  return (
    <>
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
    </>
  );
};

export default RangeSegmentMap;
