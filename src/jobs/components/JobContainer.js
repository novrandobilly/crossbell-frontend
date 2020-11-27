import React from 'react';
import { Link, withRouter, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/';

import Spinner from '../../shared/UI_Element/Spinner/SpinnerCircle';
import classes from './JobContainer.module.css';
// import { act } from '@testing-library/react';

const JobDetails = props => {
	const { jobsid } = useParams();
	const onSaveHandler = event => {
		event.preventDefault();
	};

	const onDeleteHandler = async event => {
		event.preventDefault();

		const payload = {
			jobId: jobsid,
			token: props.auth.token
		};
		try {
			await props.deleteJob(payload);
			props.history.push('/jobs-dashboard');
		} catch (err) {
			console.log(err);
		}
	};

	let containerContent = (
		<div className={classes.Container}>
			<div className={classes.LeftContainer}>
				<div className={classes.UpperContainer}>
					<img src={props.logo} alt={props.companyName} className={classes.Logo} />

					<div className={classes.ContainerIntro}>
						<p className={classes.JobTitle}>{props.jobTitle}</p>
						<div className={classes.ContainerFirst}>
							<Link
								to={`/co/${props.companyId}`}
								style={{
									textDecoration: 'none',
									color: 'rgba(58, 81, 153, 1)'
								}}>
								<p className={classes.TextLeft}>{props.companyName}</p>
							</Link>
							<p>-</p>
							<p className={classes.TextMiddle}>{props.industry}</p>
							<p>-</p>
							<p className={classes.TextMiddle}>{props.city}</p>
							<p>-</p>
							<p className={classes.TextRight}>{props.region}</p>
						</div>

						<div className={classes.ContainerSecond}>
							<p className={classes.TextLeft}>Salary: {props.payment}</p>
							<p>-</p>
							<p className={classes.TextMiddle}>{props.employment}</p>
							<p>-</p>
							<p className={classes.TextMiddle}>{props.level}</p>
							<p>-</p>
							<p className={classes.TextRight}>{props.jobFunction}</p>
						</div>

						<div className={classes.ContainerThird}>
							<p className={classes.TextDate}>Posted {props.datePosted} days ago</p>
							<div className={classes.ButtonContainer}>
								<Link to={`/jobs/${props.jobId}/edit`}>
									<button className={classes.InstantButton}>
										<span>Edit</span>
									</button>
								</Link>

								<button onClick={onDeleteHandler} className={[ classes.InstantButton, classes.DeleteButton ].join(' ')}>
									<span>Delete</span>
								</button>

								<Link to='#'>
									<button className={classes.InstantButton} onClick={onSaveHandler}>
										<span>Apply</span>
									</button>
								</Link>
							</div>
						</div>
					</div>
				</div>

				<div className={classes.LowerContainer}>
					<div className={classes.JobDesc}>
						<p className={classes.TextLabel}>Job Description</p>
						<p className={classes.TextDetail}>{props.jobDescription}</p>
					</div>

					<div className={classes.JobDesc}>
						<p className={classes.TextLabel}>Technical Requirement</p>
						<p className={classes.TextDetail}>{props.technicalRequirement}</p>
					</div>

					<div className={classes.JobDesc}>
						<p className={classes.TextLabel}>Benefits</p>
						<p className={classes.TextDetail}>{props.benefit}</p>
					</div>
				</div>
			</div>

			<div className={classes.RightContainer}>
				<div>
					<p className={classes.AboutLabel}>About Company</p>
					<p className={classes.AboutText}>{props.companyDetails}</p>
				</div>

				<div>
					<p className={classes.AboutLabel}>Location</p>
				</div>
			</div>
		</div>
	);

	if (props.job.isLoading) {
		containerContent = <Spinner />;
	}

	return containerContent;
};

const mapStateToProps = state => {
	return {
		auth: state.auth,
		job: state.job
	};
};

const mapDispatchToProps = dispatch => {
	return {
		deleteJob: payload => dispatch(actionCreators.deleteJob(payload))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(JobDetails));
