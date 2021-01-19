import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actionCreators from '../../../../store/actions/index';
import SpinnerCircle from '../../../../shared/UI_Element/Spinner/SpinnerCircle';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import classes from './CompaniesListAO.module.css';

const CompaniesListAO = props => {
	const [ find, setfind ] = useState(false);
	const [ filter, setfilter ] = useState({ value: '' });
	const [ data, setData ] = useState([]);
	const [ isLoading, setIsLoading ] = useState(true);
	const [ indexLoading, setIndexLoading ] = useState(null);

	const { getWholeCompanies, admin } = props;

	useEffect(
		() => {
			const payload = { token: admin.token };
			getWholeCompanies(payload).then(res => {
				setData(res.wholeCompanies);
				setIsLoading(false);
			});
		},
		[ getWholeCompanies, setIsLoading, admin ]
	);

	const handleAll = () => {
		setfind(false);
	};

	const handleMember = () => {
		setfind(true);
		setfilter('Member');
	};

	const handleRegular = () => {
		setfind(true);
		setfilter('Blocked');
	};

	const handlePremium = () => {
		setfind(true);
		setfilter('Premium');
	};

	const activateCompanyHandler = async dataInput => {
		setIndexLoading(dataInput.index);
		const payload = {
			token: props.admin.token,
			companyId: dataInput.companyId
		};
		try {
			await props.activateCo(payload);
			setData(prevData => {
				const tempData = [ ...prevData ];
				tempData[dataInput.index].isActive = true;
				return tempData;
			});
			setIndexLoading(null);
		} catch (err) {
			console.log(err);
			setIndexLoading(null);
		}
	};
	const blockCompanyHandler = async dataInput => {
		setIndexLoading(dataInput.index);
		const payload = {
			token: props.admin.token,
			companyId: dataInput.companyId
		};
		try {
			await props.blockCo(payload);
			setData(prevData => {
				const tempData = [ ...prevData ];
				tempData[dataInput.index].isActive = false;
				return tempData;
			});
			setIndexLoading(null);
		} catch (err) {
			console.log(err);
			setIndexLoading(null);
		}
	};

	let content = (
		<div className={classes.FlexContainer}>
			<div className={classes.Container}>
				<div className={classes.HeaderContainer}>
					<h1 className={classes.Header}>Companies Account List</h1>
					<div className={classes.DropDown}>
						<button className={classes.DropButton}>
							Filter
							<ArrowDropDownIcon />
						</button>
						<div className={classes.DropDownContent}>
							<button style={{ color: 'black' }} onClick={handleAll}>
								All
							</button>

							<button style={{ color: 'red' }} value='Blocked' onClick={handleRegular}>
								Blocked
							</button>

							<button style={{ color: 'rgb(250, 129, 0)' }} value='Premium' onClick={handlePremium}>
								Premium
							</button>

							<button style={{ color: 'rgb(33, 153, 0)' }} value='Member' onClick={handleMember}>
								Member
							</button>
						</div>
					</div>
				</div>

				<table className={classes.Table}>
					<thead className={classes.RowField}>
						<tr>
							<th>No</th>
							<th>Company Name</th>
							<th>Industry</th>
							<th>Email</th>
							<th>Address</th>
							<th>isActive</th>
							<th>Action</th>
						</tr>
					</thead>

					{find ? (
						<tbody className={classes.ColumnField}>
							{data.filter(company => company.status === filter).map((company, index) => (
								<tr key={company.id}>
									<th> {index + 1}</th>

									<th>
										{' '}
										<Link to={`/co/${company.id}`} style={{ color: 'black', textDecoration: 'none' }}>
											{company.companyName}
										</Link>
									</th>
									<th>{company.industry ? company.industry : 'no data'}</th>
									<th>{company.email}</th>
									<th>{company.address}</th>

									<th>
										{props.company.isLoading && indexLoading === index ? (
											<SpinnerCircle />
										) : company.isActive ? (
											<span style={{ color: 'Green', fontWeight: 'bold' }}>Active</span>
										) : (
											<span style={{ color: 'Orange', fontWeight: 'bold' }}>Pending</span>
										)}
									</th>

									<th>
										<div className={classes.DropDown}>
											<button className={classes.DropButton}>
												<ArrowDropDownIcon />
											</button>
											<div className={classes.DropDownContent}>
												<button
													style={{ color: 'Green' }}
													onClick={() =>
														activateCompanyHandler({
															companyId: company.id,
															index
														})}>
													Activate
												</button>
												<button
													style={{ color: 'red' }}
													onClick={() =>
														blockCompanyHandler({
															companyId: company.id,
															index
														})}>
													Block
												</button>
											</div>
										</div>
									</th>
								</tr>
							))}
						</tbody>
					) : (
						<tbody className={classes.ColumnField}>
							{data &&
								data.map((company, index) => (
									<tr key={company.id}>
										<th> {index + 1}</th>

										<th>
											{' '}
											<Link to={`/co/${company.id}`} style={{ color: 'black', textDecoration: 'none' }}>
												{company.companyName}
											</Link>
										</th>
										<th
											style={
												company.industry ? { color: 'black' } : { color: 'rgba(255,0,0,0.7)', fontWeight: 'bold' }
											}>
											{company.industry ? company.industry : 'no data'}
										</th>
										<th>{company.email}</th>
										<th
											style={
												company.address ? { color: 'black' } : { color: 'rgba(255,0,0,0.7)', fontWeight: 'bold' }
											}>
											{' '}
											{company.address ? company.address : 'no data'}
										</th>

										<th>
											{props.company.isLoading && indexLoading === index ? (
												<SpinnerCircle />
											) : company.isActive ? (
												<span style={{ color: 'Green', fontWeight: 'bold' }}>Active</span>
											) : (
												<span style={{ color: 'Orange', fontWeight: 'bold' }}>Pending</span>
											)}
										</th>

										<th>
											<div className={classes.DropDown}>
												<button className={classes.DropButton}>
													<ArrowDropDownIcon />
												</button>
												<div className={classes.DropDownContent}>
													<button
														style={{ color: 'Green' }}
														onClick={() =>
															activateCompanyHandler({
																companyId: company.id,
																index
															})}>
														Activate
													</button>
													<button
														style={{ color: 'red' }}
														onClick={() =>
															blockCompanyHandler({
																companyId: company.id,
																index
															})}>
														Block
													</button>
												</div>
											</div>
										</th>
									</tr>
								))}
						</tbody>
					)}
				</table>
			</div>
		</div>
	);

	if (isLoading) {
		content = <SpinnerCircle />;
	}

	return <div>{content}</div>;
};

const mapStateToProps = state => {
	return {
		admin: state.admin,
		company: state.company
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getWholeCompanies: payload => dispatch(actionCreators.getWholeCompanies(payload)),
		activateCo: payload => dispatch(actionCreators.activateCompany(payload)),
		blockCo: payload => dispatch(actionCreators.blockCompany(payload))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CompaniesListAO);
