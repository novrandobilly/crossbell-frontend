import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { VALIDATOR_REQUIRE } from "../../../../shared/utils/validator";
import * as actionCreators from "../../../../store/actions/index";
import SpinnerCircle from "../../../../shared/UI_Element/Spinner/SpinnerCircle";
import Input from "../../../../shared/UI_Element/Input";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import classes from "./CustomerSupportsAO.module.css";

const CustomerSupportsAO = (props) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { getFeedback } = props;

  useEffect(() => {
    getFeedback().then((res) => {
      setData(res.Feedback);
      setIsLoading(false);
    });
  }, [getFeedback, setIsLoading]);

  const onDeleteHandler = async (id) => {
    try {
      const res = await props.deleteFeed(id);
      if (res) {
        console.log(res);
      } else {
        console.log("no feed with id:" + { id });
      }
    } catch (err) {
      console.log(err);
    }
  };

  let content = (
    <div className={classes.Container}>
      {data.map((feed, i) => {
        return (
          <div className={classes.FeedCard} key={feed._id}>
            <div className={classes.Content}>
              <div className={classes.Header}>
                <div>Created By: {feed.name}</div>
                <div>
                  <button
                    className={classes.DeleteFeed}
                    onClick={() => onDeleteHandler(feed._id)}
                  >
                    <DeleteForeverIcon />
                  </button>
                </div>
              </div>
              <div className={classes.FeedContact}>
                {feed.email} - {feed.phone}
              </div>
              <div className={classes.Feeds}>{feed.feed}</div>
              <div className={classes.Date}> {feed.datePosted} </div>

              <div className={classes.ReplyForm}>
                <Input
                  inputType="textarea"
                  id="reply"
                  inputClass="Reply"
                  validatorMethod={[VALIDATOR_REQUIRE()]}
                  placeholder="Reply Here"
                />

                <button className={classes.ReplyButton}>Reply</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  if (isLoading) {
    content = <SpinnerCircle />;
  }

  return <div>{content};</div>;
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteFeed: (feedId) => dispatch(actionCreators.deleteFeed(feedId)),
    getFeedback: () => dispatch(actionCreators.getFeedback()),
  };
};

export default connect(null, mapDispatchToProps)(CustomerSupportsAO);
