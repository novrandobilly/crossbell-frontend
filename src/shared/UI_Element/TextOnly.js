import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import IconButton from './IconButton';

import classes from './TextOnly.module.css';

const Button = (props) => {
  return (
    <div className={classes.Wraper}>
      <div className={classes.Container}>
        <div className={classes.Header}>
          {props.labelName && (
            <label className={classes.Label}>{props.labelName}</label>
          )}

          {props.auth.userId === props.applicantid && (
            <Link to={props.route}>
              <IconButton />
            </Link>
          )}

          {(props.auth.userId === props.companyid) | props.admin.isAdmin ? (
            <Link to={props.route}>
              <IconButton />
            </Link>
          ) : (
            <div className={classes.HiddenDiv} />
          )}
        </div>

        {props.text ? (
          <div className={classes.Description}>{props.text}</div>
        ) : (
          <div className={classes.EmptyDescription}>
            Silahkan lengkapi data terlebih dahulu
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    admin: state.admin,
    isLoading: state.job.isLoading,
    error: state.job.error,
  };
};

export default connect(mapStateToProps)(Button);
