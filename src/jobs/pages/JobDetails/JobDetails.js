import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import JobDetailMap from '../../components/JobDetailMap';

const JobDetails = props => {
	const { jobsid } = useParams();

	const JobDetails = props.jobStore.find(job => job.id === jobsid);
	console.log(jobsid);

	return (
		<React.Fragment>
			<JobDetailMap job={JobDetails} />
		</React.Fragment>
	);
};

const mapStateToProps = state => {
	return {
		jobStore: state.jobs
	};
};

export default connect(mapStateToProps)(JobDetails);
