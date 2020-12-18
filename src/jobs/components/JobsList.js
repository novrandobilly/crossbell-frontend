import React, { useReducer, useEffect, useState } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import JobCard from './JobCard';
import classes from './JobsList.module.css';

const ACTIONPAGE = {
	PAGEUPDATE: 'PAGEUPDATE'
};

const initPagination = {
	pageCount: 1,
	pageNumber: 1,
	rowsPerPage: 5,
	startIndex: 0
};

const paginationReducer = (state, action) => {
	switch (action.type) {
		case ACTIONPAGE.PAGEUPDATE: {
			let update = {};
			for (const key in action.payload) {
				update[key] = action.payload[key];
			}
			return {
				...state,
				...update
			};
		}
		default:
			return state;
	}
};

const JobsList = props => {
	const totaAvailableJobs = useState(props.items)[0];
	const [ displayJobs, setDisplayJobs ] = useState([]);
	const [ state, dispatch ] = useReducer(paginationReducer, initPagination);

	const pageChangeHandler = (event, value) => {
		dispatch({
			type: ACTIONPAGE.PAGEUPDATE,
			payload: {
				pageNumber: value,
				startIndex: state.rowsPerPage * (value - 1)
			}
		});
	};

	const rowsHandler = event => {
		console.log(event.target.value);
		dispatch({
			type: ACTIONPAGE.PAGEUPDATE,
			payload: {
				rowsPerPage: event.target.value
			}
		});
	};

	useEffect(
		() => {
			let filteredJobs = [ ...totaAvailableJobs ];

			let pageCount = Math.ceil(filteredJobs.length / state.rowsPerPage);
			dispatch({ type: ACTIONPAGE.PAGEUPDATE, payload: { pageCount } });

			//Slicing all jobs based on the number jobs may appear in one page
			filteredJobs = filteredJobs.slice(state.startIndex, state.startIndex + state.rowsPerPage);

			setDisplayJobs(filteredJobs);
		},
		[ totaAvailableJobs, state.startIndex, state.rowsPerPage, state.pageNumber ]
	);

	return (
		<div className={classes.JobList}>
			{displayJobs &&
				displayJobs.map(job => (
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
			<div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
				<FormControl style={{ width: '4rem' }}>
					<Select labelId='rowPerPage' id='rowPerPageSelect' value={state.rowsPerPage} onChange={rowsHandler}>
						<MenuItem value={5}>5</MenuItem>
						<MenuItem value={10}>10</MenuItem>
						<MenuItem value={15}>15</MenuItem>
					</Select>
					<FormHelperText>Rows</FormHelperText>
				</FormControl>
				<Pagination count={state.pageCount} page={state.pageNumber} onChange={pageChangeHandler} />
			</div>
		</div>
	);
};

export default JobsList;
