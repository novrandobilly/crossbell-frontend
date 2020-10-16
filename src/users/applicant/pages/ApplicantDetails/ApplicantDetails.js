import React from 'react';


import NewJob from "../../../../jobs/pages/NewJob/NewJob";
import JobDetails from "../../../../jobs/pages/JobDetails/JobDetails";
import CompanyForm from "../../../company/pages/CompanyProfileForm/CompanyProfileForm";

const ApplicantDetails = () => {
  return (
    <div>
      <h1>This is Applicant Details page</h1>
      {/* <NewJob /> */}
      <JobDetails />
      {/* <CompanyForm /> */}
    </div>
  );

};

export default ApplicantDetails;
