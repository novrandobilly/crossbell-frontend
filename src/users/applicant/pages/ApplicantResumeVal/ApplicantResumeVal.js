import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

import Summary from "../Components/Add/EditSummary.js";
import Intro from "../Components/Add/EditIntro.js";
import Experience from "../Components/Add/Experience.js";
import Education from "../Components/Add/Education.js";
import Certification from "../Components/Add/Certification.js";
import Skill from "../Components/Add/Skill";
import Button from "../../../../shared/UI_Element/Button";

import classes from "./ApplicantResumeVal.module.css";

const ApplicantResumeVal = (props) => {
  const { applicantid } = useParams();

  const [push, setPush] = useState(true);

  const pushHandler = () => {
    setPush(!push);
  };

  return (
    <div className={classes.Container}>
      <div className={classes.ContentContainer}>
        <Intro push={push} handler={pushHandler} />
        <Summary push={push} handler={pushHandler} />
        <Education push={push} handler={pushHandler} />
        <Experience push={push} handler={pushHandler} />
        <Certification push={push} handler={pushHandler} />
        <Skill push={push} handler={pushHandler} />
      </div>
      <div className={classes.Flexed}>
        <Link to={`/ap/${applicantid}`}>
          <Button btnType="SkipButton" children="Skip this step" />
        </Link>
      </div>
    </div>
  );
};

export default ApplicantResumeVal;
