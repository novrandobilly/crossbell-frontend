import React, { useReducer, useCallback } from 'react';
import { connect } from 'react-redux';

import JobsList from '../components/JobsList';
import QueryBar from '../components/QueryBar';

import classes from './JobsDashboard.module.css';

const ACTION = {
	SEARCHUPDATE: 'update-search',
	SEARCHEXECUTE: 'search-execute',
	SEARCHEMPTY: 'search-empty'
};
const searchReducer = (state, action) => {
	switch (action.type) {
		case ACTION.SEARCHUPDATE: {
			return {
				...state,
				search: {
					...state.search,
					id: action.payload.id,
					value: action.payload.value,
					isValid: action.payload.isValid
				}
			};
		}
		case ACTION.SEARCHEXECUTE: {
			const filteredJob = action.payload.jobs.filter(job => {
				let searchValidity = false;
				for (const key in job) {
					searchValidity = searchValidity || job[key].toLowerCase().includes(state.search.value.toLowerCase());
				}
				return searchValidity;
			});
			return {
				...state,
				jobList: filteredJob
			};
		}
		case ACTION.SEARCHEMPTY: {
			return {
				...state,
				jobList: action.payload.jobStore
			};
		}
		default: {
			return state;
		}
	}
};

const JobsDashboard = props => {
	const [ state, dispatch ] = useReducer(searchReducer, {
		search: {
			id: '',
			value: '',
			isValid: ''
		},
		jobList: props.jobStore
	});

	const searchHandler = event => {
		event.preventDefault();
		if (state.search.value) {
			dispatch({ type: ACTION.SEARCHEXECUTE, payload: { jobs: props.jobStore } });
		} else {
			dispatch({ type: ACTION.SEARCHEMPTY, payload: { jobStore: props.jobStore } });
		}
	};

	const searchInputHandler = useCallback((id, value, isValid) => {
		dispatch({
			type: ACTION.SEARCHUPDATE,
			payload: {
				id,
				value,
				isValid
			}
		});
	}, []);

	return (
		<div className={classes.JobsDashboard}>
			<QueryBar searchInputHandler={searchInputHandler} searchHandler={searchHandler} />
			<JobsList items={state.jobList} />;
		</div>
	);
};

const mapStateToProps = state => {
	return {
		jobStore: state.job.jobs
	};
};

export default connect(mapStateToProps)(JobsDashboard);
