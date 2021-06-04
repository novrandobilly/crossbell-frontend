import React, { useEffect, useState, useReducer } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import * as actionCreators from '../../../../store/actions/index';
import SpinnerCircle from '../../../../shared/UI_Element/Spinner/SpinnerCircle';
import Spinner from '../../../../shared/UI_Element/Spinner/Spinner';
import Pagination from '@material-ui/lab/Pagination';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OrderModal from '../../../../shared/UI_Element/OrderModal';

import classes from './OrderBC.module.css';

const ACTIONPAGE = {
  PAGEUPDATE: 'PAGEUPDATE',
};

const initPagination = {
  pageCount: 1,
  pageNumber: 1,
  rowsPerPage: 10,
  startIndex: 0,
};

const paginationReducer = (state, action) => {
  switch (action.type) {
    case ACTIONPAGE.PAGEUPDATE: {
      let update = {};
      for (const key in action.payload) {
        update[key] = action.payload[key];
      }
      return {
        ...state,
        ...update,
      };
    }
    default:
      return state;
  }
};

const OrderBC = (props) => {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(null);
  const [displayData, setDisplayData] = useState();
  const [orderModal, setOrderModal] = useState(false);
  const [approveOrder, setApproveOrder] = useState({
    orderId: null,
    companyId: null,
    index: null,
  });

  const [state, dispatch] = useReducer(paginationReducer, initPagination);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { getWholeOrderBC } = props;
  useEffect(() => {
    const token = props.admin.token;
    if (token) {
      let sort = [];
      getWholeOrderBC(token)
        .then((res) => {
          sort = res.orderbc;
          sort = sort.sort((a, b) => moment(b.createdAt) - moment(a.createdAt));
          setData(sort);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [getWholeOrderBC, props.admin]);

  useEffect(() => {
    if (data && data.length > 0) {
      let applicantArray = [...data];
      let pageCount = Math.ceil(applicantArray.length / state.rowsPerPage);
      dispatch({ type: ACTIONPAGE.PAGEUPDATE, payload: { pageCount } });

      //Slicing all jobs based on the number jobs may appear in one page
      applicantArray = applicantArray.slice(
        state.startIndex,
        state.startIndex + state.rowsPerPage
      );
      setDisplayData(applicantArray);
    }
  }, [state.rowsPerPage, state.startIndex, data]);

  const approveOrderBCHandler = async (dataInput) => {
    setIndex(dataInput.i);
    setOrderModal(false);

    const payload = {
      token: props.admin.token,
      companyId: dataInput.companyId,
      orderId: dataInput.orderId,
    };
    try {
      await props.approveOrderBC(payload);
      setData((prevData) => {
        const tempData = [...prevData];
        tempData[dataInput.i].status = 'Paid';
        return tempData;
      });
      setIndex(null);
    } catch (err) {
      console.log(err);
      setIndex(null);
    }
  };

  //================= Pagination ===========================

  const pageChangeHandler = (event, value) => {
    dispatch({
      type: ACTIONPAGE.PAGEUPDATE,
      payload: {
        pageNumber: value,
        startIndex: state.rowsPerPage * (value - 1),
      },
    });
  };

  const rowsHandler = (event) => {
    console.log(event.target.value);
    dispatch({
      type: ACTIONPAGE.PAGEUPDATE,
      payload: {
        rowsPerPage: event.target.value,
      },
    });
  };

  const onCloseOrderModal = () => {
    setOrderModal(false);
  };

  const onOpenOrderModal = (orderId, companyId, index) => {
    setApproveOrder({ orderId: orderId, companyId: companyId, index: index });
    setOrderModal(true);
  };

  let content = <SpinnerCircle />;

  //   if (!props.isLoading && data.length < 1) {
  //     content = <h1>tidak ada order untuk saat ini</h1>;
  //   }

  if (!props.isLoading && displayData) {
    content = (
      <div className={classes.Container}>
        <h1 className={classes.Header}>Order Bulk Candidates</h1>
        <div className={classes.TableHolder}>
          <table className={classes.Table}>
            <thead className={classes.RowField}>
              <tr>
                <th>No</th>
                <th>Order Id</th>
                <th>Nama Perusahaan</th>
                <th>Harga Total</th>
                <th>Tanggal Order</th>
                <th>Tanggal Disetujui</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>

            <tbody className={classes.ColumnField}>
              {displayData.map((order, i) => (
                <tr key={order._id}>
                  <th> {i + 1}</th>
                  <th> {order._id}</th>
                  <th>
                    {' '}
                    <Link
                      to={`/co/${order.companyId._id}`}
                      style={{ color: 'black', textDecoration: 'none' }}
                    >
                      {order.companyId.companyName}
                    </Link>
                  </th>
                  <th>Rp.{order.totalPrice.toLocaleString()}</th>

                  <th>{moment(order.createdAt).format('D MMM YYYY')}</th>
                  <th>
                    {order.approvedAt
                      ? moment(order.approvedAt).format('D MMM YYYY')
                      : 'not approved'}
                  </th>

                  <th>
                    {props.indexIsLoading && index === i ? (
                      <Spinner />
                    ) : order.status === 'Paid' ? (
                      <span style={{ color: 'Green', fontWeight: 'bold' }}>
                        Paid
                      </span>
                    ) : (
                      <span style={{ color: 'Orange', fontWeight: 'bold' }}>
                        Pending
                      </span>
                    )}
                  </th>

                  <th>
                    <div className={classes.DropDown}>
                      <button className={classes.DropButton}>
                        <ArrowDropDownIcon />
                      </button>
                      <div className={classes.DropDownContent}>
                        {order.status === 'Pending' ? (
                          <button
                            style={{ color: 'green' }}
                            onClick={() =>
                              onOpenOrderModal(
                                order._id,
                                order.companyId._id,
                                i
                              )
                            }
                          >
                            Approve
                          </button>
                        ) : (
                          <button style={{ color: 'gray', fontWeight: 'bold' }}>
                            Telah disetujui
                          </button>
                        )}
                      </div>
                    </div>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            width: '100%',
          }}
        >
          <FormControl style={{ width: '4rem' }}>
            <Select
              labelId='rowPerPage'
              id='rowPerPageSelect'
              value={state.rowsPerPage}
              onChange={rowsHandler}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </Select>
            <FormHelperText>Rows</FormHelperText>
          </FormControl>
          <Pagination
            count={state.pageCount}
            page={state.pageNumber}
            onChange={pageChangeHandler}
          />
        </div>
      </div>
    );
  }

  if (!props.isLoading && data.length <= 0) {
    content = (
      <p className={classes.EmptyText}>
        Belum ada perusahaan yang membuat pesanan untuk saat ini
      </p>
    );
  }

  return (
    <div>
      <OrderModal
        show={orderModal}
        onCancel={onCloseOrderModal}
        Accept={() =>
          approveOrderBCHandler({
            orderId: approveOrder.orderId,
            companyId: approveOrder.companyId,
            i: approveOrder.index,
          })
        }
      >
        Setujui pembelian dari perusahaan ini?
      </OrderModal>
      {content}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    admin: state.admin,
    indexIsLoading: state.finance.indexIsLoading,
    isLoading: state.finance.isLoading,
    error: state.finance.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getWholeOrderBC: (data) => dispatch(actionCreators.getWholeOrderBC(data)),
    approveOrderBC: (payload) =>
      dispatch(actionCreators.approveOrderBC(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderBC);
