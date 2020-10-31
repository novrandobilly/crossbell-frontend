import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import CompanyMap from '../Components/CompanyMap';

const CompanyDetails = props => {
	const { companyid } = useParams();

	const company = props.company.find(co => co.companyId === companyid);

	if (company) {
		return <CompanyMap items={company} />;
	} else {
		return (
			<div className='centerGlobal'>
				<h2>No Company Available with that ID</h2>
			</div>
		);
	}
};

const mapStateToProps = state => {
	return {
		company: state.company.companies
	};
};

export default connect(mapStateToProps)(CompanyDetails);
