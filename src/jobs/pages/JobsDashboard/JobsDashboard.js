import React from 'react';

import JobsList from '../../components/JobsList';

import classes from './JobsDashboard.module.css';

export let JOBS = [
	{
		id: 'SSS001',
		logo:
			'https://vignette.wikia.nocookie.net/legendofheroes/images/b/b9/Special_Support_Section_Badge.png/revision/latest/scale-to-width-down/340?cb=20170721084057',
		company: 'Special Support Section',
		region: 'West Zemuria',
		city: 'Crossbell',
		name: 'Orbal Network Operator',
		detail:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		salary: '2500',
		emailRecipient: 'novrandobilly@gmail.com',
		level: 'Entry Level',
		employment: 'Intern',
		industry: 'Information Technology',
		jobFunction: 'Engineer',
		benefits: 'Medical Insurance',
		datePosted: '3',
		companyId: 'SSS'
	},
	{
		id: 'RCN001',
		logo:
			'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/b460938b-d443-4b2a-baad-afce23c05d19/d6mq0v4-be5ffe1e-a569-45b3-b3b9-fe9deda15f73.png',
		company: 'Recon Corps',
		region: 'Wall Maria',
		city: 'Shigansina',
		name: 'Landscape Mapping Officer',
		detail:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		salary: '4000',
		emailRecipient: 'novrandobilly10@gmail.com',
		level: 'Senior Staff',
		employment: 'Contract',
		industry: 'Military',
		jobFunction: 'Military Engineer',
		benefits: 'Medical Insurance',
		datePosted: '3',
		companyId: 'RCN'
	},
	{
		id: 'IDN001',
		logo: 'https://pngimg.com/uploads/lamborghini/lamborghini_PNG10709.png',
		company: 'Inti Dinamis',
		region: 'West Java',
		city: 'Bekasi',
		name: 'Marketing Staff',
		detail:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		salary: '1500',
		emailRecipient: 'tommyprn8@gmail.com',
		level: 'Staff',
		employment: 'Full-Time',
		industry: 'Management Consultancy',
		jobFunction: 'Marketing',
		benefits: 'Medical Insurance',
		datePosted: '3',
		companyId: 'IDN'
	}
];

const JobsDashboard = () => {
	return (
		<div className={classes.JobsDashboard}>
			<JobsList items={JOBS} />;
		</div>
	);
};

export default JobsDashboard;
