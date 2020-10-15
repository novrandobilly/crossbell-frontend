import React from "react";

import JobDetails from "../../../../jobs/pages/JobDetails/JobDetails";
import CompanyForm from "../../../company/pages/CompanyProfileForm/CompanyProfileForm";

const ApplicantDetails = () => {
  return (
    <div>
      <h1>This is Applicant Details page</h1>
      <JobDetails />
      {/* <CompanyForm /> */}
    </div>
  );
};

export default ApplicantDetails;
