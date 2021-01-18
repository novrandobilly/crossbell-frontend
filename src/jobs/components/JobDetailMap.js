import React from 'react';

import JobContainer from './JobContainer';

const JobDetailMap = props => {
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
				key={props.job.id}
				jobId={props.job.id}
				logo={props.job.companyId.logo}
				jobTitle={props.job.jobTitle}
				companyName={props.job.companyId.companyName}
				placementLocation={props.job.placementLocation}
				emailRecipient={props.job.emailRecipient}
				createdAt={props.job.createdAt}
				releasedAt={props.job.releasedAt}
				payment={parseInt(props.job.salary)}
				employment={props.job.employment}
				level={props.job.level}
				fieldOfWork={props.job.fieldOfWork}
				jobFunction={props.job.jobFunction}
				jobQualification={props.job.jobQualification}
				jobDescriptions={props.job.jobDescriptions}
				technicalRequirement={props.job.technicalRequirement}
				benefit={props.job.benefit}
				companyDetails={props.job.companyId.details}
				companyId={props.job.companyId.id}
			/>
		</div>
	);
};

export default JobDetailMap;
