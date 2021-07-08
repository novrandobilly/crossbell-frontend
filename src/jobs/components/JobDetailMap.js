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

  return (
    <div>
      <JobContainer
        companyName={props.job.companyId.companyName}
        isHidden={props.job.isHidden}
        companyDetails={props.job.companyId.briefDescriptions}
        companyId={props.job.companyId.id}
        companyLocation={props.job.companyId.address}
        logo={props.job.companyId.logo}
        level={props.job.level}
        jobFunction={props.job.jobFunction}
        key={props.job.id}
        jobId={props.job.id}
        specialRequirement={props.job.specialRequirement}
        payment={parseInt(props.job.salary)}
        releasedAt={props.job.releasedAt}
        placementLocation={props.job.placementLocation}
        jobTitle={props.job.jobTitle}
        educationalStage={props.job.educationalStage}
        jobDescriptions={props.job.jobDescriptions}
        jobExperience={props.job.jobExperience}
        jobApplicants={props.job.jobApplicants}
        fieldOfWork={props.job.fieldOfWork}
        expiredDate={props.job.expiredDate}
        employment={props.job.employment}
        emailRecipient={props.job.emailRecipient}
        createdAt={props.job.createdAt}
        benefit={props.job.benefit}
      />
    </div>
  );
};

export default JobDetailMap;
