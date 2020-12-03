import React from "react";
import { connect } from "react-redux";
import { useParams, withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import * as actionTypes from "../../store/actions/actions";
import * as actionCreators from "../../store/actions/index";
import IconButton from "./IconButton";

import classes from "./RangeSegmentMap.module.css";

const RangeSegmentMap = (props) => {
  const { applicantid } = useParams();

  const onDeleteHandler = async (event) => {
    event.preventDefault();
    const segmentData = {
      applicantId: applicantid,
      index: props.index,
      segment: props.stateName,
    };

    try {
      const res = await props.deleteSegment(segmentData);
      if (res) {
        console.log(res);
      }
    } catch (err) {
      console.log(err);
    }

    props.history.push(`/ap/${applicantid}`);
  };

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

          <IconButton iconType="Delete" onClick={onDeleteHandler} />
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteSegment: (segmentData) =>
      dispatch(actionCreators.deleteSegment(segmentData)),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(RangeSegmentMap));
