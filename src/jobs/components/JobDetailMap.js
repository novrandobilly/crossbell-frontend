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

	return (
		<div>
			<JobContainer
				key={props.job.id}
				jobId={props.job.jobId}
				logo={props.job.logo}
				jobTitle={props.job.jobTitle}
				companyName={props.job.company}
				city={props.job.city}
				datePosted={props.job.datePosted}
				payment={props.job.salary}
				employment={props.job.employment}
				level={props.job.level}
				region={props.job.region}
				industry={props.job.industry}
				jobFunction={props.job.jobFunction}
				jobDescription={props.job.jobDescription}
				technicalRequirement={props.job.technicalRequirement}
				benefit={props.job.benefit}
				benefits={props.job.benefits}
				companyId={props.job.companyId}
			/>
		</div>
	);
};

export default JobDetailMap;
