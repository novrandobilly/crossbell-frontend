import React from "react";

import EditSummary from "../Components/EditSummary.js";
import EditIntro from "../Components/EditIntro.js";

const ApplicantResumeVal = () => {
  return (
    <div>
      <h1>This is Applicant Resume Form page </h1>
      <EditIntro />
      <EditSummary />
    </div>
  );
};

export default ApplicantResumeVal;
