import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import CompanyMap from '../Components/CompanyMap';

const CompanyDetails = props => {
	const { companyid } = useParams();

	const company = props.company.find(co => co.id === companyid);

	return <CompanyMap items={company} />;
};

const mapStateToProps = state => {
	return {
		company: state.company.companies
	};
};

export default connect(mapStateToProps)(CompanyDetails);
