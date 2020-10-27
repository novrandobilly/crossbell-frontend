import React from "react";
import { Link } from "react-router-dom";

import IconButton from "./IconButton";

import classes from "./TextOnly.module.css";

const Button = (props) => {
  return (
    <>
      <div className={classes.Line}></div>

      <div className={classes.Container}>
        <div className={classes.Header}>
          {props.labelName && (
            <label className={classes.Label}>{props.labelName}</label>
          )}
          <Link to={`/co/${props.id}/compro/${props.route}`}>
            <IconButton />
          </Link>
        </div>

        <p className={classes.Description}>{props.text}</p>
      </div>
    </>
  );
};
export default Button;
