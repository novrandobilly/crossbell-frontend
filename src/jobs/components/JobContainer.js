import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './JobContainer.module.css';

const JobDetails = props => {
	const onSaveHandler = event => {
		event.preventDefault();
	};

	const jobCompany = props.companies.find(co => co.companyId === props.companyId);

	return (
		<React.Fragment>
			<div className={classes.Container}>
				<div className={classes.LeftContainer}>
					<div className={classes.UpperContainer}>
						<img src={jobCompany.logo} alt={props.companyName} className={classes.Logo} />

						<div className={classes.ContainerIntro}>
							<p className={classes.JobTitle}>{props.jobTitle}</p>
							<div className={classes.ContainerFirst}>
								<Link to={`/co/${props.companyId}`}>
									<p className={classes.TextLeft}>{jobCompany.companyName}</p>
								</Link>
								<p>-</p>
								<p className={classes.TextMiddle}>{jobCompany.industry}</p>
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
								<button className={classes.InstantButton} onClick={onSaveHandler}>
									<span>Instant Apply</span>
								</button>
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
						<p className={classes.AboutText}>{jobCompany.detail}</p>
					</div>

					<div>
						<p className={classes.AboutLabel}>Location</p>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

const mapStateToProps = state => {
	return {
		companies: state.company.companies
	};
};

export default connect(mapStateToProps)(JobDetails);
