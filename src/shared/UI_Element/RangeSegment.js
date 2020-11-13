import React from "react";
import { Link } from "react-router-dom";

import RangeSegmentMap from "./RangeSegmentMap";
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
            <Link to={props.routeAdd}>
              <IconButton iconType="NewSegment" />
            </Link>
          </div>
        </div>

        {props.contents &&
          props.contents.map((content, i) => {
            return (
              <div key={i}>
                <RangeSegmentMap
                  title={content.school || content.prevTitle || content.title}
                  subTitle={
                    content.major || content.prevCompany || content.organization
                  }
                  start={content.startDate}
                  end={content.endDate}
                  description={content.description}
                  routeEdit={`${props.routeEdit}/${i}`}
                  index={i}
                  state={props.state}
                />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default RangeSegment;
