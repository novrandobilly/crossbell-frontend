import React from "react";
import { connect } from "react-redux";

import * as actionTypes from "../../../../store/actions/actions";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import classes from "./CustomerSupportsAO.module.css";

const CustomerSupportsAO = (props) => {
  const onDeleteHandler = (index) => {
    props.onDeleteFeed(props.feeds[index].feedId);
  };

  return (
    <div className={classes.Container}>
      <div className={classes.FeedContainer}>
        {props.feeds.map((feed, i) => {
          return (
            <div className={classes.FeedCard} key={feed.feedId}>
              <div className={classes.Content}>
                <div className={classes.Header}>
                  <div>Created By: {feed.userId}</div>
                  <div>
                    <button
                      className={classes.DeleteFeed}
                      onClick={() => onDeleteHandler(i)}
                    >
                      <DeleteForeverIcon />
                    </button>
                  </div>
                </div>
                <div className={classes.Feeds}>{feed.feed}</div>
                <div className={classes.Date}> {feed.datePosted} </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    feeds: state.feed.feedback,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteFeed: (deleteFeed) =>
      dispatch({
        type: actionTypes.DELETEFEEDBACK,
        payload: deleteFeed,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerSupportsAO);
