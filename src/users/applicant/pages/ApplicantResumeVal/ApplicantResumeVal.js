import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

import Summary from "../Components/Add/EditSummary.js";
import Intro from "../Components/Add/EditIntro.js";
import Experience from "../Components/Add/Experience.js";
import Education from "../Components/Add/Education.js";
import Certification from "../Components/Add/Certification.js";
import Skill from "../Components/Edit/Skill";
import Button from "../../../../shared/UI_Element/Button";

import classes from "./ApplicantResumeVal.module.css";

const ApplicantResumeVal = (props) => {
  const { applicantid } = useParams();

  const [push, setPush] = useState(true);
  const [counter, setCounter] = useState(0);

  const pushHandler = () => {
    setPush(!push);
  };

  const onNextHandler = () => {
    setCounter((prevState) => {
      return prevState + 1;
    });
  };

  // const onBackHandler = () => {
  //   setCounter((prevState) => {
  //     return prevState - 1;
  //   });
  // };

  return (
    <div className={classes.Container}>
      <div className={classes.ContentContainer}>
        {counter === 0 ? (
          <Intro
            push={push}
            handler={pushHandler}
            onNextHandler={onNextHandler}
          />
        ) : counter === 1 ? (
          <Summary
            push={push}
            handler={pushHandler}
            onNextHandler={onNextHandler}
          />
        ) : (
          <Skill push={push} handler={pushHandler} />
        )}
      </div>
    </div>
  );
};

export default ApplicantResumeVal;

/* <Education push={push} handler={pushHandler} />
        <Experience push={push} handler={pushHandler} />
        <Certification push={push} handler={pushHandler} /> */
