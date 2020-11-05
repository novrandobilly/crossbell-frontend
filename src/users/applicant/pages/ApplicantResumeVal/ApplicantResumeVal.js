import React from "react";

import Summary from "../Components/Add/EditSummary.js";
import Intro from "../Components/Add/EditIntro.js";
import Experience from "../Components/Add/Experience.js";
import Education from "../Components/Add/Education.js";
import Certification from "../Components/Add/Certification.js";
import Skill from "../Components/Add/Skill";
import Button from "../../../../shared/UI_Element/Button";

import classes from "./ApplicantResumeVal.module.css";

const ApplicantResumeVal = () => {
  return (
    <div>
      <h1>This is Applicant Resume Form page </h1>

      <div className={classes.Container}>
        <Intro />
        <Summary />
        <Education />
        <Experience />
        <Certification />
        <Skill />

        <div className={classes.Flexed}>
          <Button btnType="SkipButton" children="Skip this step" />
        </div>
      </div>
    </div>
  );
};

export default ApplicantResumeVal;
