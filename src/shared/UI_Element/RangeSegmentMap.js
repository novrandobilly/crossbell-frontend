import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useParams, withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

// import * as actionTypes from "../../store/actions/actions";
import Spinner from './Spinner/SpinnerCircle';
import * as actionCreators from '../../store/actions/index';
import IconButton from './IconButton';

import classes from './RangeSegmentMap.module.css';

const RangeSegmentMap = (props) => {
  const { applicantid } = useParams();
  const [indexLoading, setIndexLoading] = useState(null);

  const onDeleteHandler = async (event, index) => {
    event.preventDefault();
    setIndexLoading(index);
    console.log(event, index);
    const segmentData = {
      applicantId: applicantid,
      elementId: props.elementId,
      index: props.index,
      segment: props.stateName,
    };

    try {
      const res = await props.deleteSegment(segmentData);
      if (res) {
        console.log(res);
      }
      setIndexLoading(null);
      props.deleteSegmentHandler(props.elementId.toString());
    } catch (err) {
      console.log(err);
      setIndexLoading(null);
    }

    // props.history.push(`/ap/${applicantid}`);
  };

  let segmentElement = (
    <div className={classes.MapContainer}>
      <div className={classes.TopContent}>
        <div className={classes.Square} />
        <div>
          <p className={classes.Title}>{props.title}</p>
          <p className={classes.SubTitle}>{props.subTitle}</p>

          <div className={classes.PeriodSegment}>
            <p className={classes.Period}>{props.start}</p>
            <p className={classes.Space}>-</p>
            <p className={classes.Period}>{props.end}</p>
          </div>
        </div>
        <div>
          <Link to={props.routeEdit}>
            <IconButton />
          </Link>

          <IconButton
            iconType='Delete'
            onClick={(event) => onDeleteHandler(event, props.index)}
          />
        </div>
      </div>

      <div className={classes.ButtonAction}>
        <p className={classes.Description}>{props.description}</p>
      </div>
    </div>
  );

  if (props.isLoading && indexLoading === props.index) {
    segmentElement = <Spinner />;
  }

  return segmentElement;
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteSegment: (segmentData) =>
      dispatch(actionCreators.deleteSegment(segmentData)),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(RangeSegmentMap));
