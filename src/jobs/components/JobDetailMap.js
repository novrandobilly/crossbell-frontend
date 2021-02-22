import React from 'react';

import JobContainer from './JobContainer';

const JobDetailMap = (props) => {
  if (!props.job) {
    return (
      <div className='centerGlobal'>
        <h2>No Job Available at the moment!</h2>
      </div>
    );
  }
  console.log(props.job);
  return (
    <div>
      <JobContainer
        logo={props.job.companyId.logo}
        companyName={props.job.companyId.companyName}
        level={props.job.level}
        jobFunction={props.job.jobFunction}
        companyDetails={props.job.companyId.briefDescriptions}
        key={props.job.id}
        jobId={props.job.id}
        technicalRequirement={props.job.technicalRequirement}
        payment={parseInt(props.job.salary)}
        releasedAt={props.job.releasedAt}
        placementLocation={props.job.placementLocation}
        jobTitle={props.job.jobTitle}
        jobQualification={props.job.jobQualification}
        jobDescriptions={props.job.jobDescriptions}
        jobApplicants={props.job.jobApplicants}
        fieldOfWork={props.job.fieldOfWork}
        expiredDate={props.job.expiredDate}
        employment={props.job.employment}
        emailRecipient={props.job.emailRecipient}
        createdAt={props.job.createdAt}
        companyId={props.job.companyId.id}
        benefit={props.job.benefit}
      />
    </div>
  );
};

export default JobDetailMap;
