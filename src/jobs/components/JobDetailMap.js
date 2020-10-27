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

	// return (
	//   <div>
	//     {props.items.map((job) => (
	//       <JobContainer
	//         key={job.id}
	//         id={job.id}
	//         logo={job.logo}
	//         jobName={job.jobName}
	//         name={job.name}
	//         city={job.city}
	//         datePosted={job.datePosted}
	//         payment={job.payment}
	//         employment={job.employment}
	//         level={job.level}
	//         industry={job.industry}
	//         jobFunction={job.jobFunction}
	//         detail={job.detail}
	//         benefits={job.benefits}
	//       />
	//     ))}
	//   </div>
	// );
	return (
		<div>
			<JobContainer
				key={props.job.id}
				id={props.job.id}
				logo={props.job.logo}
				jobName={props.job.name}
				companyName={props.job.company}
				city={props.job.city}
				datePosted={props.job.datePosted}
				payment={props.job.salary}
				employment={props.job.employment}
				level={props.job.level}
				industry={props.job.industry}
				jobFunction={props.job.jobFunction}
				detail={props.job.detail}
				benefits={props.job.benefits}
			/>
		</div>
	);
};

export default JobDetailMap;
