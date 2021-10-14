import React, { useEffect, useState, useReducer, useRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import * as actionCreators from '../../../../store/actions/index';
import LoadingBar from '../../../../shared/UI_Element/Spinner/LoadingBar';
import LoadingBar from '../../../../shared/UI_Element/Spinner/LoadingBar';
import Pagination from '@material-ui/lab/Pagination';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import OrderModal from '../../../../shared/UI_Element/OrderModal';

import Select from '@material-ui/core/Select';

import classes from './OrderES.module.css';
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

const OrderES = props => {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(null);
  const [displayData, setDisplayData] = useState();
  const [orderModal, setOrderModal] = useState(false);
  const [approveOrder, setApproveOrder] = useState({
    orderId: null,
    status: null,
    index: null,
  });

  const [rowsNumber, setRowsNumber] = useState(10);
  const [paginationNumber, setPaginationNumber] = useState(1);
  const emptyText = useRef('');

  const [state, dispatch] = useReducer(paginationReducer, initPagination);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { getWholeOrderES } = props;
  useEffect(() => {
    const token = props.admin.token;
    if (token) {
      let sort = [];
      getWholeOrderES(token)
        .then(res => {
          sort = res.orders;
          sort = sort.sort((a, b) => moment(b.createdAt) - moment(a.createdAt));
          setData(sort);

          if (res.message) {
            emptyText.current = 'Belum ada perusahaan yang membuat pesanan untuk saat ini';
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [getWholeOrderES, props.admin]);

  useEffect(() => {
    if (data && data.length > 0) {
      let applicantArray = [...data];
      let pageCount = Math.ceil(applicantArray.length / state.rowsPerPage);
      dispatch({ type: ACTIONPAGE.PAGEUPDATE, payload: { pageCount } });

      //Slicing all jobs based on the number jobs may appear in one page
      applicantArray = applicantArray.slice(state.startIndex, state.startIndex + state.rowsPerPage);
      setDisplayData(applicantArray);
    }
  }, [state.rowsPerPage, state.startIndex, data]);

  const updateStatusHandler = async dataInput => {
    setIndex(dataInput.i);
    setOrderModal(false);

    const payload = {
      token: props.admin.token,
      orderId: dataInput.orderId,
      status: dataInput.status,
    };
    try {
      const response = await props.updateOrderStatusES(payload);
      if (!response.order) {
        throw new Error(response);
      }
      setData(prevData => {
        const tempData = [...prevData];
        const trueIndex = dataInput.i + (paginationNumber - 1) * rowsNumber;
        tempData[trueIndex].status = dataInput.status;
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
    setPaginationNumber(value);
  };

  const rowsHandler = event => {
    dispatch({
      type: ACTIONPAGE.PAGEUPDATE,
      payload: {
        rowsPerPage: event.target.value,
      },
    });
    setRowsNumber(event.target.value);
  };

  const onCloseOrderModal = () => {
    setOrderModal(false);
  };

  const onOpenOrderModal = (orderId, index) => {
    setApproveOrder({ orderId: orderId, status: 'Closed', index: index });
    setOrderModal(true);
  };

  let content = <LoadingBar />;

  // if (!props.isLoading && data.length < 1) {
  //   content = <h1>tidak ada order untuk saat ini</h1>;
  // }

  if (!props.isLoading && displayData) {
    content = (
      <div className={classes.Container}>
        <h1 className={classes.Header}>Order Executive Search</h1>
        <div className={classes.TableHolder}>
          <table className={classes.Table}>
            <thead className={classes.RowField}>
              <tr>
                <th>No</th>
                <th>Order Id</th>
                <th>Tanggal Order</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>

            <tbody className={classes.ColumnField}>
              {displayData.map((order, i) => (
                <tr key={order._id}>
                  <th> {i + 1}</th>
                  <th>
                    {' '}
                    <Link to={`/ad/alphaomega/order/es`} style={{ color: 'black', textDecoration: 'none' }}>
                      {order._id}
                    </Link>
                  </th>

                  <th>{moment(order.createdAt).format('D MMM YYYY')}</th>

                  <th>
                    {props.indexIsLoading && index === i ? (
                      <LoadingBar />
                    ) : (
                      <p className={classes.Content} style={order.status === 'Closed' ? { color: 'red' } : { color: 'green' }}>
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
                          style={order.status === 'Open' ? { color: 'Red' } : { color: 'gray' }}
                          onClick={order.status === 'Open' ? () => onOpenOrderModal(order._id, i) : null}>
                          {order.status === 'Open' ? 'Close' : 'Sudah ditutup'}
                        </button>
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
          }}>
          <FormControl style={{ width: '4rem' }}>
            <Select labelId='rowPerPage' id='rowPerPageSelect' value={state.rowsPerPage} onChange={rowsHandler}>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </Select>
            <FormHelperText>Rows</FormHelperText>
          </FormControl>
          <Pagination count={state.pageCount} page={state.pageNumber} onChange={pageChangeHandler} />
        </div>
      </div>
    );
  }

  if (!props.isLoading && emptyText.current) {
    content = <p className={classes.EmptyText}>{emptyText.current}</p>;
  }

  return (
    <div>
      <OrderModal
        show={orderModal}
        onCancel={onCloseOrderModal}
        Accept={() =>
          updateStatusHandler({
            orderId: approveOrder.orderId,
            status: approveOrder.status,
            i: approveOrder.index,
          })
        }>
        {' '}
        Setujui pembelian dari perusahaan ini?
      </OrderModal>
      {content}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    admin: state.admin,
    indexIsLoading: state.finance.indexIsLoading,
    isLoading: state.finance.isLoading,
    error: state.finance.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getWholeOrderES: data => dispatch(actionCreators.getWholeOrderES(data)),
    updateOrderStatusES: payload => dispatch(actionCreators.updateOrderStatusES(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderES);
