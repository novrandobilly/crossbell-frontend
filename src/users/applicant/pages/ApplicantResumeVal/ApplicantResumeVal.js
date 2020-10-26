import React from "react";

import EditSummary from "../Components/EditSummary.js";
import EditIntro from "../Components/EditIntro.js";
import Experience from "../Components/Experience.js";
import Education from "../Components/Education.js";
import Certification from "../Components/Certification.js";

const ApplicantResumeVal = () => {
  return (
    <div>
      <h1>This is Applicant Resume Form page </h1>
      <Certification />
      <Education />
      <Experience />
      <EditIntro />
      <EditSummary />
    </div>
  );
};

export default ApplicantResumeVal;
