import React, { useReducer, useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';

import Spinner from '../../shared/UI_Element/Spinner/SpinnerCircle';
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
				jobList: action.payload.jobs
			};
		}
		default: {
			return state;
		}
	}
};

const JobsDashboard = props => {
	const [ jobEmpty, setJobEmpty ] = useState(false);
	const [ state, dispatch ] = useReducer(searchReducer, {
		search: {
			id: '',
			value: '',
			isValid: ''
		},
		jobList: null
	});

	const { getAllAvailableJobs } = props;

	useEffect(
		() => {
			const getJobs = async () => {
				setJobEmpty(false);
				try {
					const res = await getAllAvailableJobs();
					if (!res.availableJobs) {
						throw new Error('No Job avalable at the moment');
					}
					dispatch({ type: ACTION.SEARCHEMPTY, payload: { jobs: res.availableJobs } });
				} catch (err) {
					setJobEmpty(true);
					console.log(err);
				}
			};
			getJobs();
		},
		[ getAllAvailableJobs ]
	);

	const searchHandler = event => {
		event.preventDefault();
		if (state.search.value) {
			dispatch({ type: ACTION.SEARCHEXECUTE, payload: { jobs: state.jobList } });
		} else {
			dispatch({ type: ACTION.SEARCHEMPTY, payload: { jobs: state.jobList } });
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

	let jobLists = <Spinner />;
	if (state.jobList) {
		jobLists = <JobsList items={state.jobList} />;
	}
	if (jobEmpty && !state.jobLists) {
		jobLists = (
			<div className='centerGlobal'>
				<h2>No Job Available at the moment!</h2>
			</div>
		);
	}

	return (
		<div className={classes.JobsDashboard}>
			<QueryBar searchInputHandler={searchInputHandler} searchHandler={searchHandler} />
			{jobLists}
		</div>
	);
};

const mapStateToProps = state => {
	return {
		jobs: state.job,
		companyStore: state.company.companies
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getAllAvailableJobs: () => dispatch(actionCreators.getAllAvailableJobs())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(JobsDashboard);
