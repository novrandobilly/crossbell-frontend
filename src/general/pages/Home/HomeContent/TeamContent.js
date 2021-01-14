import React from "react";

import classes from "./TeamContent.module.css";

const Dummy = [
  {
    picture: "",
    title: "Joko Widodo",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id purus non neque tempor tempor.",
  },
  {
    picture: "",
    title: "Susilo Bambang Yudhoyono",
    content:
      "Fusce id purus non neque tempor tempor. Sed cursus. dolor sit amet, consectetur adipiscing elit.",
  },
  {
    picture: "",
    title: "Megawati Soekarnoputri",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id purus non neque tempor tempor.",
  },
  {
    picture: "",
    title: "Abdurrahman Wahid",
    content:
      "Fusce id purus non neque tempor tempor. Sed cursus. dolor sit amet, consectetur adipiscing elit.",
  },
];

const TeamContent = (props) => {
  return (
    <div className={classes.Container}>
      <p className={classes.HeaderTitle}>Our Team</p>
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
    </div>
  );
};

export default TeamContent;
