import React from "react";
import { Link } from "react-router-dom";

import IconButton from "./IconButton";

import classes from "./TextOnly.module.css";

const Button = (props) => {
  return (
    <div className={classes.Wraper}>
      <div className={classes.Container}>
        <div className={classes.Header}>
          {props.labelName && (
            <label className={classes.Label}>{props.labelName}</label>
          )}
          <Link to={props.route}>
            <IconButton />
          </Link>
        </div>

        <div className={classes.Description}>{props.text}</div>
      </div>
    </div>
  );
};
export default Button;
