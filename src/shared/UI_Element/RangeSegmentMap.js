import React from "react";
import { connect } from "react-redux";
import { useParams, withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import * as actionTypes from "../../store/actions/actions";
import IconButton from "./IconButton";

import classes from "./RangeSegmentMap.module.css";

const RangeSegmentMap = (props) => {
  const { applicantid } = useParams();

  const onDeleteHandler = (event) => {
    event.preventDefault();
    const deleteSegment = {
      applicantId: applicantid,
      index: props.index,
      stateName: props.stateName,
    };
    props.onDeleteSegment(deleteSegment);
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
    onDeleteSegment: (deleteSegment) =>
      dispatch({
        type: actionTypes.DELETESEGMENT,
        payload: deleteSegment,
      }),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(RangeSegmentMap));
