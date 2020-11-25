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
					key={job._id}
					jobId={job._id}
					jobTitle={job.jobTitle}
					city={job.city}
					region={job.region}
					company={job.companyId.companyName}
					logo={
						job.logo ? (
							job.logo
						) : (
							'https://lh3.googleusercontent.com/proxy/LomeBTfLTjXTh6rgqVoCJoGvqw004hnQnkhBMZenTgKSNRrQPReGRTH5R1r6f_Eubh6mDEC_-9nmSuQdHOUa-yJuMbOeRT032w'
						)
					}
					salary={job.salary}
					emailRecipient={job.companyId.emailRecipient}
					companyId={job.companyId}
				/>
			))}
		</div>
	);
};

export default JobsList;
