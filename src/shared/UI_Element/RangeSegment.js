import React from "react";
import { Link } from "react-router-dom";

import RangeSegmentMap from "./RangeSegmentMap";
import IconButton from "./IconButton";

import classes from "./RangeSegment.module.css";

const RangeSegment = (props) => {
  console.log(props.contents);
  return (
    <>
      <div className={classes.Line}></div>

      <div className={classes.Container}>
        <div className={classes.Header}>
          {props.labelName && (
            <label className={classes.Label}>{props.labelName}</label>
          )}
          <div>
            <Link to={`#`}>
              <IconButton iconType="NewJob" />
            </Link>
            <Link to={`#`}>
              <IconButton />
            </Link>
          </div>
        </div>

        {/* {props.contents.map((content, i) => {
          return (
            <div key={i}>
              <RangeSegmentMap
                title={content.title}
                subTitle={content.subTitle}
                start={content.startDate}
                end={content.endDate}
                description={content.description}
              />
            </div>
          );
        })} */}

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
