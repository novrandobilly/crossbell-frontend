import React from "react";
import { Link, useParams } from "react-router-dom";

import Summary from "../Components/Add/EditSummary.js";
import Intro from "../Components/Add/EditIntro.js";
import Experience from "../Components/Add/Experience.js";
import Education from "../Components/Add/Education.js";
import Certification from "../Components/Add/Certification.js";
import Skill from "../Components/Add/Skill";
import Button from "../../../../shared/UI_Element/Button";

import classes from "./ApplicantResumeVal.module.css";

const ApplicantResumeVal = () => {
  const { applicantid } = useParams();

  return (
    <div className={classes.Container}>
      <h1>This is Applicant Resume Form page </h1>

      <div className={classes.Container}>
        <Intro />
        <Summary />
        <Education />
        <Experience />
        <Certification />
        <Skill />
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
