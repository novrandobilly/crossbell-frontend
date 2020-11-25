
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import Spinner from '../../../../shared/UI_Element/Spinner/SpinnerCircle';
import * as actionCreators from '../../../../store/actions/';
import CompanyMap from '../Components/CompanyMap';

const CompanyDetails = props => {
	const { companyid } = useParams();
	const [ loadedCompany, setLoadedCompany ] = useState(null);

	const { getOneCompany } = props;
	useEffect(
		() => {
			const getCompany = async () => {
				try {
					let res = await getOneCompany({ userId: companyid });
					console.log(res);

					setLoadedCompany(res.company);
				} catch (err) {
					console.log(err);
				}
			};
			getCompany();
		},
		[ companyid, getOneCompany ]
	);

	if (loadedCompany) {
		// const company = props.company.find(co => co.companyId === companyid);
		return <CompanyMap items={loadedCompany} />;
	} else {
		return <Spinner />;
	}

};

const mapDispatchToProps = (dispatch) => {
  return {
    getOneCompany: (data) => dispatch(actionCreators.getOneCompany(data)),
  };
};


const mapDispatchToProps = dispatch => {
	return {
		getOneCompany: companyData => dispatch(actionCreators.getOneCompany(companyData))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyDetails);

