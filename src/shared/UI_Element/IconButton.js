import React from "react";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";

import classes from "./IconButton.module.css";

const IconButton = (props) => {
  switch (props.iconType) {
    case "NewJob":
      return (
        <button
          className={[
            classes.IconAddJobButton,
            classes[props.IconButtonClass],
          ].join(" ")}
        >
          <span className={classes.AddButton}>
            <AddIcon />
          </span>
        </button>
      );

    case "NewSegment":
      return (
        <button
          className={[
            classes.IconAddButton,
            classes[props.IconButtonClass],
          ].join(" ")}
        >
          <span className={classes.AddButton}>
            <AddIcon />
          </span>
        </button>
      );

    default:
      return (
        <button
          className={[classes.IconButton, classes[props.IconButtonClass]].join(
            " "
          )}
        >
          <span className={classes.EditButton}>
            <EditIcon />
          </span>
        </button>
      );
  }
};
export default IconButton;
