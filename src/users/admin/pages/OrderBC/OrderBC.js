import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import * as actionCreators from '../../../../store/actions/index';
import SpinnerCircle from '../../../../shared/UI_Element/Spinner/SpinnerCircle';
import classes from './OrderBC.module.css';

const OrderBC = props => {
	const [ data, setData ] = useState();

	const { getWholeOrderBC } = props;
	const [ index, setIndex ] = useState(null);

	useEffect(
		() => {
			const token = props.admin.token;
			if (token) {
				let sort = [];
				getWholeOrderBC(token)
					.then(res => {
						sort = res.orderbc;
						sort = sort.sort((a, b) => moment(b.createdAt) - moment(a.createdAt));
						console.log(res);
						setData(sort);
					})
					.catch(err => {
						console.log(err);
					});
			}
		},
		[ getWholeOrderBC, props.admin ]
	);

	const approveOrderBCHandler = async dataInput => {
		setIndex(dataInput.i);
		const payload = {
			token: props.admin.token,
			companyId: dataInput.companyId,
			orderId: dataInput.orderId
		};
		console.log(payload);
		try {
			await props.approveOrderBC(payload);
			setData(prevData => {
				const tempData = [ ...prevData ];
				tempData[dataInput.i].status = 'Paid';
				return tempData;
			});
			setIndex(null);
		} catch (err) {
			console.log(err);
			setIndex(null);
		}
	};

	let content = <SpinnerCircle />;

	// if (!props.isLoading && data.length < 1) {
	//   content = <h1>tidak ada order untuk saat ini</h1>;
	// }

	if (!props.isLoading && data) {
		content = (
			<div className={classes.Container}>
				<table className={classes.Table}>
					<thead className={classes.RowField}>
						<tr>
							<th>No</th>
							<th>Order Id</th>
							<th>Nama Perusahaan</th>
							<th>Tanggal Order</th>
							<th>Tanggal Disetujui</th>
							<th>Status</th>
							<th>Aksi</th>
						</tr>
					</thead>

					<tbody className={classes.ColumnField}>
						{data.map((order, i) => (
							<tr key={order._id}>
								<th> {i + 1}</th>
								<th>
									{' '}
									<Link
										to={`/ad/alphaomega/order/${order._id}/candidate`}
										style={{ color: 'black', textDecoration: 'none' }}>
										{order._id}
									</Link>
								</th>
								<th>
									{' '}
									<Link to={`/co/${order.companyId._id}`} style={{ color: 'black', textDecoration: 'none' }}>
										{order.companyId.companyName}
									</Link>
								</th>
								<th>{moment(order.createdAt).format('D MMM YYYY')}</th>
								<th>{order.approvedAt ? moment(order.approvedAt).format('D MMM YYYY') : 'not approved'}</th>

								<th>
									{props.isLoading && index === i ? (
										<SpinnerCircle />
									) : order.status === 'Paid' ? (
										<span style={{ color: 'Green', fontWeight: 'bold' }}>Paid</span>
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
												style={{ color: 'green' }}
												onClick={() =>
													approveOrderBCHandler({
														orderId: order._id,
														companyId: order.companyId._id,
														i
													})}>
												Approve
											</button>
										</div>
									</div>
								</th>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	}
	return <div>{content}</div>;
};

const mapStateToProps = state => {
	return {
		admin: state.admin,
		indexIsLoading: state.finance.indexIsLoading,
		isLoading: state.finance.isLoading,
		error: state.finance.error
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getWholeOrderBC: data => dispatch(actionCreators.getWholeOrderBC(data)),
		approveOrderBC: payload => dispatch(actionCreators.approveOrderBC(payload))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderBC);
