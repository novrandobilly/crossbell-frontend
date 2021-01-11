import React, { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import RangeSegmentMap from "./RangeSegmentMap";
import IconButton from "./IconButton";

import classes from "./RangeSegment.module.css";

const RangeSegment = (props) => {
  const [segmentArray, setSegmentArray] = useState(props.contents);

  const deleteSegmentHandler = (elementId) => {
    let tempSegment = [...segmentArray];
    tempSegment = tempSegment.filter((seg) => {
      return seg.id !== elementId;
    });
    setSegmentArray(tempSegment);
  };

  return (
    <div className={classes.Wraper}>
      <div className={classes.Line} />

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

        {segmentArray &&
          segmentArray.map((content, i) => {
            return (
              <div key={i}>
                <RangeSegmentMap
                  title={content.school || content.prevTitle || content.title}
                  subTitle={
                    content.major || content.prevCompany || content.organization
                  }
                  start={moment(content.startDate).format("MMMM YYYY")}
                  end={
                    moment(content.endDate).year() < 10000
                      ? moment(content.endDate).format("MMMM  YYYY")
                      : "No expiry date"
                  }
                  description={content.description}
                  routeEdit={`${props.routeEdit}/${i}`}
                  stateName={props.state}
                  index={i}
                  elementId={content._id}
                  isLoading={props.isLoading}
                  deleteSegmentHandler={(elementId) =>
                    deleteSegmentHandler(elementId)
                  }
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default RangeSegment;
