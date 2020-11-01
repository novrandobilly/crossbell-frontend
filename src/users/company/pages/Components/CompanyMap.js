import React from 'react';

import CompanyCard from './CompanyCard';

const CompanyMap = props => {
	return (
		<div>
			<CompanyCard
				key={props.items.companyId}
				companyId={props.items.companyId}
				companyName={props.items.companyName}
				logo={props.items.logo}
				size={props.items.size}
				industry={props.items.industry}
				address={props.items.address}
				website={props.items.website}
				details={props.items.details}
				mission={props.items.mission}
			/>
		</div>
	);
};

export default CompanyMap;
