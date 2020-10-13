import React from 'react';

import JobsList from '../../components/JobsList';

export let JOBS = [
	{
		id: 'SSS001',
		name: 'Orbal Network Operator',
		company: 'Special Support Section',
		city: 'Crossbell',
		region: 'West Zemuria',
		logo:
			'https://vignette.wikia.nocookie.net/legendofheroes/images/b/b9/Special_Support_Section_Badge.png/revision/latest/scale-to-width-down/340?cb=20170721084057',
		salary: '2500'
	},
	{
		id: 'RCN001',
		name: 'Landscape Mapping Officer',
		company: 'Recon Corps',
		city: 'Shigansina',
		region: 'Wall Maria',
		logo:
			'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/b460938b-d443-4b2a-baad-afce23c05d19/d6mq0v4-be5ffe1e-a569-45b3-b3b9-fe9deda15f73.png',
		salary: '4000'
	},
	{
		id: 'IDN001',
		name: 'Marketing Staff',
		company: 'Inti Dinamis',
		city: 'Bekasi',
		region: 'West Java',
		logo: 'https://pngimg.com/uploads/lamborghini/lamborghini_PNG10709.png',
		salary: '1500'
	}
];

const JobsDashboard = () => {
	return <JobsList items={JOBS} />;
};

export default JobsDashboard;
