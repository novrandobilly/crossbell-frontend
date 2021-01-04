import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
// import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import classes from "./IconButton.module.css";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: "3rem",
    marginLeft: "1rem",
    width: "2.5rem",
    height: "2.5rem",
  },
  delete: {
    marginLeft: "1rem",
    width: "2.5rem",
    height: "2.5rem",
    backgroundColor: "rgba(245, 0, 87, 0.05)",
    "&:hover": {
      backgroundColor: "rgba(245, 0, 87, 0.05)",
    },
  },
  edit: {
    marginLeft: "1rem",
    width: "2.5rem",
    height: "2.5rem",
    backgroundColor: "rgba(0,0,0,0.05)",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.05)",
    },
  },
  add: {
    marginLeft: "1rem",
    width: "2.5rem",
    height: "2.5rem",
    backgroundColor: "rgba(63, 81, 181,0.05)",
    "&:hover": {
      backgroundColor: "rgba(63, 81, 181, 0.05)",
    },
  },
  label: {
    textTransform: "lowercase",
  },
}));

const ButtonIcon = (props) => {
  const styles = useStyles();

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
        <IconButton
          color="primary"
          classes={{ root: styles.add, label: styles.label }}
          onClick={props.onClick}
        >
          <AddIcon />
        </IconButton>
      );

    case "Delete":
      return (
        <IconButton
          color="secondary"
          classes={{ root: styles.delete, label: styles.label }}
          onClick={props.onClick}
        >
          <CloseIcon />
        </IconButton>
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
        <IconButton
          classes={{ root: styles.edit, label: styles.label }}
          onClick={props.onClick}
        >
          <EditIcon />
        </IconButton>

        // <button
        //   className={[classes.IconButton, classes[props.IconButtonClass]].join(
        //     " "
        //   )}
        // >
        //   <span className={classes.EditButton}>
        //     <EditIcon />
        //   </span>
        // </button>
      );
  }
};
export default ButtonIcon;
