import React from 'react';

import JobCard from './JobCard';
import classes from './JobsList.module.css';

const JobsList = props => {
	return (
		<div className={classes.JobList}>
			{props.items.map(job => (
				<JobCard
					key={job._id}
					jobId={job._id}
					jobTitle={job.jobTitle}
					placementLocation={job.placementLocation}
					company={job.companyId.companyName}
					logo={job.logo ? job.logo : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}
					salary={job.salary}
					emailRecipient={job.companyId.emailRecipient}
					companyId={job.companyId}
				/>
			))}
		</div>
	);
};

export default JobsList;
