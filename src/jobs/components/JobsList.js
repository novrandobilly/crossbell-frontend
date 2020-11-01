import React from 'react';

import JobCard from './JobCard';
import classes from './JobsList.module.css';

const JobsList = props => {
	if (props.items.length <= 0) {
		return (
			<div className='centerGlobal'>
				<h2>No Job Available at the moment!</h2>
			</div>
		);
	}

	return (
		<div className={classes.JobList}>
			{props.items.map(job => (
				<JobCard
					key={job.jobId}
					jobId={job.jobId}
					jobTitle={job.jobTitle}
					city={job.city}
					region={job.region}
					company={job.company}
					logo={job.logo}
					salary={job.salary}
					emailRecipient={job.emailRecipient}
					companyId={job.companyId}
				/>
			))}
		</div>
	);
};

export default JobsList;
