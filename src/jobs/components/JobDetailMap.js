import React from "react";

import JobContainer from "./JobContainer";

const JobDetailMap = (props) => {
  if (!props.job) {
    return (
      <div className="centerGlobal">
        <h2>No Job Available at the moment!</h2>
      </div>
    );
  }

  return (
    <div>
      <JobContainer
        key={props.job.id}
        jobId={props.job.id}
        logo={
          props.job.logo
            ? props.job.logo
            : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        }
        jobTitle={props.job.jobTitle}
        companyName={props.job.companyId.companyName}
        placementLocation={props.job.placementLocation}
        createdAt={props.job.createdAt}
        releasedAt={props.job.releasedAt}
        payment={props.job.salary}
        employment={props.job.employment}
        level={props.job.level}
        industry={props.job.companyId.industry}
        region={props.job.region}
        jobFunction={props.job.jobFunction}
        jobQualification={props.job.jobQualification}
        jobDescription={props.job.jobDescription}
        technicalRequirement={props.job.technicalRequirement}
        benefit={props.job.benefit}
        companyDetails={props.job.companyId.details}
        companyId={props.job.companyId.id}
      />
    </div>
  );
};

export default JobDetailMap;
