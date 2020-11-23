import React, { useState } from 'react';
import { connect } from 'react-redux';

// import Finance from "../FinancialAO/FinancialAO";

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import classes from './JobsListAO.module.css';

const JobsListAO = props => {
	const [ find, setfind ] = useState(false);
	const [ filter, setfilter ] = useState({ value: 'Approved' });

	const handleAll = () => {
		setfind(false);
	};

	const handleApproved = () => {
		setfind(true);
		setfilter('Approved');
	};

	const handleCanceled = () => {
		setfind(true);
		setfilter('Canceled');
	};

	const handlePending = () => {
		setfind(true);
		setfilter('Pending');
	};

	const handleExpired = () => {
		setfind(true);
		setfilter('Expired');
	};

	return (
		<div className={classes.FlexContainer}>
			<div className={classes.Container}>
				<div className={classes.HeaderContainer}>
					<h1 className={classes.Header}>Job List</h1>
					<div className={classes.DropDown}>
						<button className={classes.DropButton}>
							Filter
							<ArrowDropDownIcon />
						</button>
						<div className={classes.DropDownContent}>
							<button style={{ color: 'black' }} value='All' onClick={handleAll}>
								All
							</button>
							<button style={{ color: 'rgb(33, 153, 0)' }} value='Approved' onClick={handleApproved}>
								Approved
							</button>
							<button style={{ color: 'red' }} value='Canceled' onClick={handleCanceled}>
								Canceled
							</button>
							<button style={{ color: 'rgb(250, 129, 0)' }} value='Pending' onClick={handlePending}>
								Pending
							</button>
							<button style={{ color: 'rgb(130, 130, 130)' }} value='Expired' onClick={handleExpired}>
								Expired
							</button>
						</div>
					</div>
				</div>
				<table className={classes.Table}>
					<thead className={classes.RowField}>
						<tr>
							<th>Id</th>
							<th>Company</th>
							<th>JobTitle</th>
							<th>Location</th>
							<th>Date posted</th>
							<th>Status</th>
							<th>Action</th>
						</tr>
					</thead>

					{find ? (
						<tbody className={classes.ColumnField}>
							{props.jobStore.filter(status => status.status === filter).map(job => (
								<tr key={job.jobId}>
									<th>{job.jobId}</th>
									<th>{job.companyId}</th>
									<th>{job.jobTitle}</th>
									<th>
										{job.city}, {job.region}
									</th>
									<th>{job.datePosted} days ago</th>
									<th
										style={
											job.status === 'Canceled' ? (
												{ color: 'red', fontWeight: 'bold' }
											) : job.status === 'Approved' ? (
												{ color: 'rgb(33, 153, 0)', fontWeight: 'bold' }
											) : job.status === 'Expired' ? (
												{ color: 'rgb(130, 130, 130)', fontWeight: 'bold' }
											) : (
												{ color: 'rgb(250, 129, 0)', fontWeight: 'bold' }
											)
										}>
										{job.status}
									</th>
									<th>
										<div className={classes.DropDown}>
											<button className={classes.DropButton}>
												<ArrowDropDownIcon />
											</button>
											<div className={classes.DropDownContent}>
												<button style={{ color: 'rgb(33, 153, 0)' }}>Approved</button>
												<button style={{ color: 'red' }}>Canceled</button>
												<button style={{ color: 'rgb(250, 129, 0)' }}>Pending</button>
											</div>
										</div>
									</th>
								</tr>
							))}
						</tbody>
					) : (
						<tbody className={classes.ColumnField}>
							{props.jobStore.map(job => (
								<tr key={job.jobId}>
									<th>{job.jobId}</th>
									<th>{job.companyId}</th>
									<th>{job.jobTitle}</th>
									<th>
										{job.city}, {job.region}
									</th>
									<th>{job.datePosted} days ago</th>
									<th
										style={
											job.status === 'Canceled' ? (
												{ color: 'red', fontWeight: 'bold' }
											) : job.status === 'Approved' ? (
												{ color: 'rgb(33, 153, 0)', fontWeight: 'bold' }
											) : job.status === 'Expired' ? (
												{ color: 'rgb(130, 130, 130)', fontWeight: 'bold' }
											) : (
												{ color: 'rgb(250, 129, 0)', fontWeight: 'bold' }
											)
										}>
										{job.status}
									</th>
									<th>
										<div className={classes.DropDown}>
											<button className={classes.DropButton}>
												<ArrowDropDownIcon />
											</button>
											<div className={classes.DropDownContent}>
												<button style={{ color: 'rgb(33, 153, 0)' }}>Approved</button>
												<button style={{ color: 'red' }}>Canceled</button>
												<button style={{ color: 'rgb(250, 129, 0)' }}>Pending</button>
											</div>
										</div>
									</th>
								</tr>
							))}
						</tbody>
					)}
				</table>
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		jobStore: state.job.jobs
	};
};

export default connect(mapStateToProps)(JobsListAO);
