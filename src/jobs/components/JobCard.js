import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './JobCard.module.css';

import Spinner from '../../shared/UI_Element/Spinner/Spinner';
import Button from '../../shared/UI_Element/Button';

const JobCard = props => {
	const [ isLoading, setIsLoading ] = useState(false);

	//=====================================INSTANT APPLY=====================================
	const applyHandler = async () => {
		setIsLoading(true);
		try {
			// const response = await fetch(`https://crossbell-corps.herokuapp.com/api/jobs/${props.jobId}/apply`, {
			const response = await fetch(`http://localhost:5000/api/jobs/${props.id}/apply`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${props.auth.token}`
				},
				body: JSON.stringify({
					companyEmail: props.emailRecipient
				})
			});

			const responseData = await response.json();
			console.log(responseData);
			setIsLoading(false);
		} catch (err) {
			console.log(err);
			setIsLoading(false);
		}
	};

	let instantApplyButton = (
		<Button btnType='InstantApply' onClick={applyHandler}>
			Instant Apply
		</Button>
	);

	if (isLoading) {
		instantApplyButton = <Spinner />;
	}
	//=====================================================================================

	return (
		<div className={classes.JobCard}>
			<div className={classes.Logo}>
				<img
					src={props.logo || 'https://i.pinimg.com/originals/00/50/71/005071cbf1fdd17673607ecd7b7e88f6.png'}
					alt={props.company}
				/>
			</div>
			<div className={classes.Content}>
				<h3>
					<Link to={`/jobs/${props.jobId}`} style={{ textDecoration: 'inherit', color: 'inherit' }}>
						{props.jobTitle}
					</Link>
				</h3>

				<p>
					<Link to={`/co/${props.companyId._id}`} style={{ textDecoration: 'inherit', color: 'inherit' }}>
						<em>
							<strong>{props.company} </strong>
						</em>
					</Link>
					- {props.city}, {props.region}
				</p>
				<p>${props.salary} /month</p>
			</div>
			<div className={classes.InstantSubmit}>{instantApplyButton}</div>
			<footer />
		</div>
	);
};

const mapStateToProps = state => {
	return {
		companies: state.company.companies,
		auth: state.auth
	};
};

export default connect(mapStateToProps)(JobCard);
