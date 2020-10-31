import React from 'react';

import CompanyCard from './CompanyCard';

const CompanyMap = props => {
	return (
		<div>
			<CompanyCard
				key={props.items.id}
				id={props.items.id}
				companyName={props.items.companyName}
				logo={props.items.logo}
				size={props.items.size}
				industry={props.items.industry}
				address={props.items.address}
				websites={props.items.websites}
				detail={props.items.detail}
				mission={props.items.mission}
			/>
		</div>
	);
};

export default CompanyMap;
