import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

import RangeSegmentMap from './RangeSegmentMap';
import IconButton from './IconButton';

import classes from './RangeSegment.module.css';

const RangeSegment = props => {
  const [segmentArray, setSegmentArray] = useState(props.contents);

  const deleteItemHandler = elementId => {
    let tempSegment = [...segmentArray];
    tempSegment = tempSegment.filter(seg => {
      return seg.id !== elementId;
    });
    setSegmentArray(tempSegment);
  };

  return (
    <div className={classes.Wraper}>
      <div className={classes.Container}>
        <div className={classes.Header}>
          {props.labelName && <label className={classes.Label}>{props.labelName}</label>}
          {props.auth.userId === props.applicantid && (
            <div>
              <Link to={props.routeAdd}>
                <IconButton iconType='NewSegment' text={props.buttonText} />
              </Link>
            </div>
          )}
        </div>

        {segmentArray &&
          segmentArray.map((content, i) => {
            return (
              <div key={i} className={classes.MapContainer}>
                <RangeSegmentMap
                  title={content.school || content.prevTitle || content.title}
                  subTitle={content.major || content.prevCompany || content.organization}
                  start={moment(content.startDate).format('MMMM YYYY')}
                  end={
                    moment(content.endDate).year() < 10000
                      ? moment(content.endDate).format('MMMM  YYYY')
                      : props.labelName === 'Pengalaman'
                      ? 'Saat ini'
                      : 'No expiry date'
                  }
                  description={content.description}
                  routeEdit={`${props.routeEdit}/${i}`}
                  stateName={props.state}
                  index={i}
                  elementId={content._id}
                  isLoading={props.isLoading}
                  deleteItemHandler={elementId => deleteItemHandler(elementId)}
                  token={props.token}
                  applicantid={props.applicantid}
                />
              </div>
            );
          })}
        {segmentArray.length < 1 && (
          <p className={classes.EmptyDescription}>Silahkan lengkapi data diri anda terlebih dahulu</p>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    admin: state.admin,
    isLoading: state.job.isLoading,
    error: state.job.error,
  };
};

export default connect(mapStateToProps)(RangeSegment);
