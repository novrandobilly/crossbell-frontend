import React from "react";

import classes from "./FeatureContent.module.css";

const Dummy = [
  {
    picture: "",
    title: "Job explore",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
  },
  {
    picture: "",
    title: "Auto aplly",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
  },
  {
    picture: "",
    title: "Executive program",
    content: "Fusce id purus non neque tempor tempor. Sed cursus.",
  },
];

const FeatureContent = (props) => {
  return (
    <div className={classes.Content}>
      {Dummy.map((dat, i) => {
        return (
          <div className={classes.CardContainer} key={i}>
            <div className={classes.CardTop}>
              <p className={classes.Picture}>picture</p>
            </div>
            <div className={classes.CardBottom}>
              <p className={classes.Title}>{dat.title}</p>
              <p> {dat.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FeatureContent;
