import React from "react";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

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

    case "Delete":
      return (
        <button
          className={[
            classes.IconDeleteButton,
            classes[props.IconButtonClass],
          ].join(" ")}
          onClick={props.onClick}
        >
          <span className={classes.DeleteButton}>
            <CloseIcon />
          </span>
        </button>
      );

    case "Order":
      return (
        <button
          className={[
            classes.IconOrderButton,
            classes[props.IconButtonClass],
          ].join(" ")}
          onClick={props.onClick}
        >
          <span className={classes.OrderButton}>
            <ShoppingCartIcon />
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
