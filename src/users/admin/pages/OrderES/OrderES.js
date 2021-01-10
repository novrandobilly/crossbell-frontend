import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import * as actionCreators from '../../../../store/actions/index';
import SpinnerCircle from '../../../../shared/UI_Element/Spinner/SpinnerCircle';
import classes from './OrderES.module.css';

const OrderES = props => {
	const [ data, setData ] = useState();

	const { getWholeOrderES } = props;
	const [ index, setIndex ] = useState(null);

	useEffect(
		() => {
			const token = props.admin.token;
			if (token) {
				let sort = [];
				getWholeOrderES(token)
					.then(res => {
						sort = res.orders;
						sort = sort.sort((a, b) => moment(b.createdAt) - moment(a.createdAt));
						console.log(res);
						setData(sort);
					})
					.catch(err => {
						console.log(err);
					});
			}
		},
		[ getWholeOrderES, props.admin ]
	);

	const updateStatusHandler = async dataInput => {
		setIndex(dataInput.i);
		const payload = {
			token: props.admin.token,
			orderId: dataInput.orderId,
			status: dataInput.status
		};
		try {
			await props.updateOrderStatusES(payload);
			setData(prevData => {
				const tempData = [ ...prevData ];
				tempData[dataInput.i].status = dataInput.status;
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
									<Link to={`/ad/alphaomega/order/${order._id}/es`} style={{ color: 'black', textDecoration: 'none' }}>
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
									{props.indexIsLoading && index === i ? (
										<SpinnerCircle />
									) : (
										<p
											className={classes.Content}
											style={order.status === 'Closed' ? { color: 'gray' } : { color: 'green' }}>
											{order.status}
										</p>
									)}
								</th>

								<th>
									<div className={classes.DropDown}>
										<button className={classes.DropButton}>
											<ArrowDropDownIcon />
										</button>
										<div className={classes.DropDownContent}>
											<button
												style={{ color: 'Red' }}
												onClick={() =>
													updateStatusHandler({
														orderId: order._id,
														status: 'Closed',
														i
													})}>
												Closed
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
		getWholeOrderES: data => dispatch(actionCreators.getWholeOrderES(data)),
		updateOrderStatusES: payload => dispatch(actionCreators.updateOrderStatusES(payload))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderES);
