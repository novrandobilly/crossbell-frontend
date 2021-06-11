import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { useForm } from '../../../../shared/utils/useForm';

import * as actionCreators from '../../../../store/actions';
import { VALIDATOR_ALWAYSTRUE } from '../../../../shared/utils/validator';
import Spinner from '../../../../shared/UI_Element/Spinner/SpinnerCircle';
import Input from '../../../../shared/UI_Element/Input';
// import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import classes from './FinancialAO.module.css';

<<<<<<< HEAD
const FinancialAO = (props) => {
  let total = [];
  let revenue = 0;
  const [fetchData, setFetchData] = useState();
  const [displayData, setDisplayData] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [formState, onInputHandler] = useForm(
    {
      start: {
        value: null,
        isValid: true,
      },
      end: {
        value: null,
        isValid: true,
      },
    },
    true
  );
=======

const FinancialAO = (props) => {
  // let total = [];
  // let revenue = 0;

  const [total, setTotal] = useState([]);
  const [revenue, setRevenue] = useState(0);

  const [fetchData, setFetchData] = useState();
  const [displayData, setDisplayData] = useState();


const FinancialAO = props => {
	let total = [];
	let revenue = 0;
	const [fetchData, setFetchData] = useState();
	const [displayData, setDisplayData] = useState();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	const [formState, onInputHandler] = useForm(
		{
			start: {
				value: null,
				isValid: true
			},
			end: {
				value: null,
				isValid: true
			}
		},
		true
	);

	const { getWholeOrderREG, getWholeOrderBC } = props;
	useEffect(
		() => {
			let totalOrder = [];
			const token = props.admin.token;
			if (token) {
				const fetchData = async () => {
					let resreg;
					let resbc;
					try {
						resreg = await getWholeOrderREG(token);
						resbc = await getWholeOrderBC(token);
					} catch (err) {
						console.log(err);
					}
					totalOrder = [...resreg.orderreg, ...resbc.orderbc];
					totalOrder = totalOrder.sort((a, b) => moment(b.createdAt) - moment(a.createdAt));
					setFetchData(totalOrder);
				};
				fetchData();
			}
		},
		[getWholeOrderREG, getWholeOrderBC, props.admin]
	);

	useEffect(
		() => {
			if (fetchData) {
				let filteredOrders = [...fetchData];
				if (formState?.inputs?.start?.value && formState?.inputs?.end?.value) {
					filteredOrders = filteredOrders.filter(order =>
						moment(order.createdAt).isBetween(
							moment(moment(formState.inputs.start.value).format('LL')),
							moment(`${moment(formState.inputs.end.value).format('LL')} 23:59:59`),
							undefined,
							[]
						)
					);
				}
				setDisplayData(filteredOrders)
			}
		},
		[fetchData, formState.inputs.start.value, formState.inputs.end.value]
	);
	// console.log(formState.inputs)

	let content = <Spinner />;

	if (displayData && !props.isLoading) {
		content = (
			<div className={classes.FlexContainer}>
				<div className={classes.Container}>
					<div className={classes.HeaderContainer}>
						<h1 className={classes.Header}>CrossBell Finance</h1>
						<div className={classes.DateFilter}>
							<p className={classes.DateLabel}>Tanggal awal</p>
							<Input
								inputType='customdate'
								id='start'
								validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
								onInputHandler={onInputHandler}
								onChange
								views={['year', 'month', 'date']}
								maxDate={moment()}
								initIsValid={true}
								initValue={null}
								format='dd/MM/yyyy'
							/>
						</div>

						<div className={classes.DateFilter}>
							<p className={classes.DateLabel}>Tanggal akhir</p>
							<Input
								inputType='customdate'
								id='end'
								validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
								onInputHandler={onInputHandler}
								views={['year', 'month', 'date']}
								maxDate={moment()}
								initIsValid={true}
								initValue={null}
								format='dd/MM/yyyy'
							/>
						</div>
					</div>
					<div className={classes.TableHolder}>
						<table className={classes.Table}>
							<thead className={classes.RowField}>
								<tr>
									<th>No</th>
									<th>Company name</th>
									<th>Order ID</th>
									<th>Order type</th>
									<th>Package name</th>
									<th>Created at</th>
									<th>Approved at</th>
									<th>Quantity</th>
									<th>Price</th>
									<th>Total price</th>
									<th>Status</th>
								</tr>
							</thead>

							<tbody className={classes.ColumnField}>
								{displayData.map((fin, i) => {
									return (
										<tr key={fin._id}>
											<th>{i + 1}</th>
											<th>{fin.companyId.companyName}</th>
											<th>{fin._id}</th>
											<th> {fin.slot ? 'order reguler' : 'order bulk candidate'}</th>
											<th>{fin.slot ? fin.packageName : '-'}</th>
											<th>{moment(fin.createdAt).format('D MMM YYYY')}</th>
											<th>{moment(fin.approvedAt).format('D MMM YYYY')}</th>
											{/* ========== Slot ========== */}
											{fin.status === 'Pending' ? (
												<th
													style={{
														fontSize: '0.9rem',
														color: 'rgb(250, 129, 0)'
													}}>
													pending
												</th>
											) : (
												<th style={{ fontSize: '0.9rem' }}>
													<p style={{ margin: '-0.5rem 0 -1rem 0' }}>
														{fin.slot || fin.amount}
														<span style={{ margin: '0 0 0 1rem' }}>{fin.slot ? 'slot' : 'candidate'}</span>
													</p>
												</th>
											)}

											{/* ========== Price/Slot ========== */}
											{fin.status === 'Pending' ? (
												<th style={{ color: 'rgb(250, 129, 0)' }}>pending</th>
											) : (
												<th>Rp. {(fin.pricePerSlot || fin.price).toLocaleString()}</th>
											)}

											{/* ========== Total Price ========== */}
											{fin.status === 'Pending' ? (
												<th style={{ color: 'rgb(250, 129, 0)' }}>
													{/* {() => {

>>>>>>> 988a65d1d3b3a61d60fdb28849a106e4b8a0dcc7

  const { getWholeOrderREG, getWholeOrderBC } = props;
  useEffect(() => {
    let totalOrder = [];
    const token = props.admin.token;
    if (token) {
      const fetchData = async () => {
        let resreg;
        let resbc;
        try {
          resreg = await getWholeOrderREG(token);
          resbc = await getWholeOrderBC(token);
        } catch (err) {
          console.log(err);
        }
        totalOrder = [...resreg.orderreg, ...resbc.orderbc];
<<<<<<< HEAD
        totalOrder = totalOrder.sort((a, b) => moment(b.createdAt) - moment(a.createdAt));
=======
        totalOrder = totalOrder.sort(
          (a, b) => moment(b.createdAt) - moment(a.createdAt)
        );
>>>>>>> 988a65d1d3b3a61d60fdb28849a106e4b8a0dcc7
        setFetchData(totalOrder);
      };
      fetchData();
    }
  }, [getWholeOrderREG, getWholeOrderBC, props.admin]);

  useEffect(() => {
    if (fetchData) {
      let filteredOrders = [...fetchData];
      if (formState?.inputs?.start?.value && formState?.inputs?.end?.value) {
        filteredOrders = filteredOrders.filter((order) =>
          moment(order.createdAt).isBetween(
            moment(moment(formState.inputs.start.value).format('LL')),
<<<<<<< HEAD
            moment(`${moment(formState.inputs.end.value).format('LL')} 23:59:59`),
=======
            moment(
              `${moment(formState.inputs.end.value).format('LL')} 23:59:59`
            ),
>>>>>>> 988a65d1d3b3a61d60fdb28849a106e4b8a0dcc7
            undefined,
            []
          )
        );
      }
      setDisplayData(filteredOrders);
    }
  }, [fetchData, formState.inputs.start.value, formState.inputs.end.value]);
<<<<<<< HEAD
  // console.log(formState.inputs)
=======

  useEffect(() => {
    if (displayData) {
      let arrPrice = displayData.map((data) => {
        if (data.approvedAt !== null) {
          return data.totalPrice;
        }
        return null;
      });
      setTotal(arrPrice);
    }
  }, [displayData]);

  useEffect(() => {
    if (total) {
      let Rev = 0;
      total.map((data) => {
        Rev = Rev + data;
        return Rev;
      });
      setRevenue(Rev);
    }
  }, [total]);
>>>>>>> 988a65d1d3b3a61d60fdb28849a106e4b8a0dcc7

  let content = <Spinner />;

  if (displayData && !props.isLoading) {
    content = (
      <div className={classes.FlexContainer}>
        <div className={classes.Container}>
          <div className={classes.HeaderContainer}>
            <h1 className={classes.Header}>CrossBell Finance</h1>
            <div className={classes.DateFilter}>
              <p className={classes.DateLabel}>Tanggal awal</p>
              <Input
                inputType='customdate'
                id='start'
                validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
                onInputHandler={onInputHandler}
                onChange
                views={['year', 'month', 'date']}
                maxDate={moment()}
                initIsValid={true}
                initValue={null}
                format='dd/MM/yyyy'
              />
            </div>

            <div className={classes.DateFilter}>
              <p className={classes.DateLabel}>Tanggal akhir</p>
              <Input
                inputType='customdate'
                id='end'
                validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
                onInputHandler={onInputHandler}
                views={['year', 'month', 'date']}
                maxDate={moment()}
                initIsValid={true}
<<<<<<< HEAD
                initValue={null}
=======
                initValue={moment()}
>>>>>>> 988a65d1d3b3a61d60fdb28849a106e4b8a0dcc7
                format='dd/MM/yyyy'
              />
            </div>
          </div>
          <div className={classes.TableHolder}>
            <table className={classes.Table}>
              <thead className={classes.RowField}>
                <tr>
                  <th>No</th>
                  <th>Company name</th>
                  <th>Order ID</th>
                  <th>Order type</th>
                  <th>Package name</th>
                  <th>Created at</th>
                  <th>Approved at</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total price</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody className={classes.ColumnField}>
<<<<<<< HEAD
                {displayData.map((fin, i) => {
                  return (
                    <tr key={fin._id}>
                      <th>{i + 1}</th>
                      <th>{fin.companyId.companyName}</th>
                      <th>{fin._id}</th>
                      <th> {fin.slot ? 'order reguler' : 'order bulk candidate'}</th>
                      <th>{fin.slot ? fin.packageName : '-'}</th>
                      <th>{moment(fin.createdAt).format('D MMM YYYY')}</th>
                      <th>{moment(fin.approvedAt).format('D MMM YYYY')}</th>
                      {/* ========== Slot ========== */}
                      {fin.status === 'Pending' ? (
=======
                {displayData.map((display, i) => {
                  return (
                    <tr key={display._id}>
                      <th>{i + 1}</th>
                      <th>{display.companyId.companyName}</th>
                      <th>{display._id}</th>
                      <th>
                        {' '}
                        {display.slot
                          ? 'order reguler'
                          : 'order bulk candidate'}
                      </th>
                      <th>{display.slot ? display.packageName : '-'}</th>
                      <th>{moment(display.createdAt).format('D MMM YYYY')}</th>
                      <th>{moment(display.approvedAt).format('D MMM YYYY')}</th>

                      {/* ========== Slot ========== */}
                      {display.status === 'Pending' ? (
>>>>>>> 988a65d1d3b3a61d60fdb28849a106e4b8a0dcc7
                        <th
                          style={{
                            fontSize: '0.9rem',
                            color: 'rgb(250, 129, 0)',
<<<<<<< HEAD
                          }}>
=======
                          }}
                        >
>>>>>>> 988a65d1d3b3a61d60fdb28849a106e4b8a0dcc7
                          pending
                        </th>
                      ) : (
                        <th style={{ fontSize: '0.9rem' }}>
                          <p style={{ margin: '-0.5rem 0 -1rem 0' }}>
<<<<<<< HEAD
                            {fin.slot || fin.amount}
                            <span style={{ margin: '0 0 0 1rem' }}>{fin.slot ? 'slot' : 'candidate'}</span>
=======
                            {display.slot || display.amount}
                            <span style={{ margin: '0 0 0 1rem' }}>
                              {display.slot ? 'slot' : 'candidate'}
                            </span>
>>>>>>> 988a65d1d3b3a61d60fdb28849a106e4b8a0dcc7
                          </p>
                        </th>
                      )}

                      {/* ========== Price/Slot ========== */}
<<<<<<< HEAD
                      {fin.status === 'Pending' ? (
                        <th style={{ color: 'rgb(250, 129, 0)' }}>pending</th>
                      ) : (
                        <th>Rp. {(fin.pricePerSlot || fin.price).toLocaleString()}</th>
                      )}

                      {/* ========== Total Price ========== */}
                      {fin.status === 'Pending' ? (
                        <th style={{ color: 'rgb(250, 129, 0)' }}>
                          {/* {() => {
                          parseInt((total[i] = 0));
                          return null;
                        }}
                        {fin.totalPrice.toLocaleString()} */}
                          pending
                        </th>
                      ) : (
                        <th>Rp. {parseInt((total[i] = fin.totalPrice)).toLocaleString()}</th>
=======
                      {display.status === 'Pending' ? (
                        <th style={{ color: 'rgb(250, 129, 0)' }}>pending</th>
                      ) : (
                        <th>
                          Rp.{' '}
                          {(
                            display.pricePerSlot || display.price
                          ).toLocaleString()}
                        </th>
                      )}

                      {/* ========== Total Price ========== */}
                      {display.status === 'Pending' ? (
                        <th style={{ color: 'rgb(250, 129, 0)' }}>pending</th>
                      ) : (
                        <th>
                          Rp. {parseInt(display.totalPrice).toLocaleString()}
                        </th>
>>>>>>> 988a65d1d3b3a61d60fdb28849a106e4b8a0dcc7
                      )}

                      <th
                        style={
<<<<<<< HEAD
                          fin.status === 'Pending'
                            ? { color: 'rgb(250, 129, 0)', fontWeight: 'bold' }
                            : fin.status === 'Expired'
                            ? { color: 'Gray', fontWeight: 'bold' }
                            : { color: 'green', fontWeight: 'bold' }
                        }>
                        {fin.status}
=======
                          display.status === 'Pending'
                            ? { color: 'rgb(250, 129, 0)', fontWeight: 'bold' }
                            : display.status === 'Expired'
                            ? { color: 'Gray', fontWeight: 'bold' }
                            : { color: 'green', fontWeight: 'bold' }
                        }
                      >
                        {display.status}
>>>>>>> 988a65d1d3b3a61d60fdb28849a106e4b8a0dcc7
                      </th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className={classes.RevenueContainer}>
            <div className={classes.RevenueLabel}>
              <div className={classes.Label}>Revenue/ month</div>
              <div className={classes.Label}>Revenue/ year</div>
            </div>
            <div className={classes.RevenueNumber}>
              <div className={classes.Label}>
<<<<<<< HEAD
                {total.map((tot) => {
                  revenue = revenue + tot;
                  return null;
                })}
                Rp. {revenue.toLocaleString()},-
              </div>
              <div className={classes.Label}>Rp. {(revenue * 12).toLocaleString()},-</div>
=======
                Rp. {revenue.toLocaleString()},-
              </div>
              <div className={classes.Label}>
                Rp. {(revenue * 12).toLocaleString()},-
              </div>
>>>>>>> 988a65d1d3b3a61d60fdb28849a106e4b8a0dcc7
            </div>
          </div>
        </div>
      </div>
    );
  }

  return content;
<<<<<<< HEAD
=======

>>>>>>> 988a65d1d3b3a61d60fdb28849a106e4b8a0dcc7
};

const mapStateToProps = (state) => {
  return {
    admin: state.admin,
    isLoading: state.finance.isLoading,
    error: state.finance.error,
  };
};

<<<<<<< HEAD
const mapDispatchToProps = (dispatch) => {
  return {
    getWholeOrderREG: (token) => dispatch(actionCreators.getWholeOrderREG(token)),
    getWholeOrderBC: (token) => dispatch(actionCreators.getWholeOrderBC(token)),
  };
=======

const mapDispatchToProps = dispatch => {
	return {
		getWholeOrderREG: token => dispatch(actionCreators.getWholeOrderREG(token)),
		getWholeOrderBC: token => dispatch(actionCreators.getWholeOrderBC(token))
	};

>>>>>>> 988a65d1d3b3a61d60fdb28849a106e4b8a0dcc7
};

export default connect(mapStateToProps, mapDispatchToProps)(FinancialAO);
