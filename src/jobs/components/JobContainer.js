import React from 'react';
import { Link } from 'react-router-dom';

import classes from './JobContainer.module.css';

const JobDetails = props => {
	const onSaveHandler = event => {
		event.preventDefault();
	};

	return (
		<React.Fragment>
			<div className={classes.Container}>
				<div className={classes.LeftContainer}>
					<div className={classes.UpperContainer}>
						<img src={props.logo} alt={props.companyName} className={classes.Logo} />

						<div className={classes.ContainerIntro}>
							<p className={classes.JobTitle}>{props.jobName}</p>
							<div className={classes.ContainerFirst}>
								<Link to={`/co/${props.id}`}>
									<p className={classes.TextLeft}>{props.companyName}</p>
								</Link>
								<p>-</p>
								<p className={classes.TextMiddle}>{props.industry}</p>
								<p>-</p>
								<p className={classes.TextRight}>{props.city}</p>
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
								<button className={classes.InstantButton} onClick={onSaveHandler}>
									<span>Instant Apply</span>
								</button>
							</div>
						</div>
					</div>

					<div className={classes.LowerContainer}>
						<div className={classes.JobDesc}>
							<p className={classes.TextLabel}>Job Description</p>
							<p className={classes.TextDetail}>{props.detail}</p>
						</div>

						<div className={classes.JobDesc}>
							<p className={classes.TextLabel}>Job Requirement</p>
							<p className={classes.TextDetail}>{props.detail}</p>
						</div>

						<div className={classes.JobDesc}>
							<p className={classes.TextLabel}>Benefits</p>
							<p className={classes.TextDetail}>{props.detail}</p>
						</div>
					</div>
				</div>

				<div className={classes.RightContainer}>
					<div>
						<p className={classes.AboutLabel}>About Company</p>
						<p className={classes.AboutText}>{props.detail}</p>
					</div>

					<div>
						<p className={classes.AboutLabel}>Location</p>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default JobDetails;
