import React from "react";

import classes from "./SaveButton.module.css";

const Button = (props) => {
  return (
    <button
      className={[classes.Button, classes[props.btnClass]].join(" ")}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      <span>{props.placeholder}</span>
    </button>
  );
};
export default Button;
