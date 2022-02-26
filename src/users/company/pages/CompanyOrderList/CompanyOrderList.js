import React, { useEffect, useState, useReducer } from 'react';
import { connect } from 'react-redux';
import { withRouter, useParams, useHistory } from 'react-router-dom';
import moment from 'moment';

// import * as actionTypes from "../../../../store/actions/actions";
import * as actionCreators from '../../../../store/actions/index';
import LoadingBar from '../../../../shared/UI_Element/Spinner/LoadingBar';
import Pagination from '@material-ui/lab/Pagination';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import classes from './CompanyOrderList.module.css';

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

const CompanyOrderList = (props) => {
  const { companyid } = useParams();
  const [orderData, setOrderData] = useState([]);
  const [displayData, setDisplayData] = useState();
  const [displayIsLoading, setDisplayIsLoading] = useState(true);

  const [state, dispatch] = useReducer(paginationReducer, initPagination);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { getOrder, getCompanyBC, getCompanyES } = props;
  useEffect(() => {
    let orderReg = [];
    let orderBC = [];
    let orderES = [];
    let allOrder = [];
    if (props.auth.token) {
      const fetchData = async () => {
        let resreg;
        let resbc;
        let reses;
        try {
          resreg = await getOrder({
            userId: companyid,
            token: props.auth.token,
          });
          resbc = await getCompanyBC({
            userId: companyid,
            token: props.auth.token,
          });
          reses = await getCompanyES({
            userId: companyid,
            token: props.auth.token,
          });
          setDisplayIsLoading(false);
        } catch (err) {
          console.log(err);
        }
        orderReg = resreg.orderreg;
        orderBC = resbc.orderbc;
        orderES = reses.orderes;
        allOrder = [...orderReg, ...orderBC, ...orderES];
        console.log(allOrder);
        allOrder = allOrder.sort((a, b) => moment(b.createdAt) - moment(a.createdAt));
        setOrderData(allOrder);
      };
      fetchData();
    }
  }, [getOrder, getCompanyBC, getCompanyES, companyid, props.auth]);

  useEffect(() => {
    if (orderData && orderData.length > 0) {
      let applicantArray = [...orderData];
      let pageCount = Math.ceil(applicantArray.length / state.rowsPerPage);
      dispatch({ type: ACTIONPAGE.PAGEUPDATE, payload: { pageCount } });

      //Slicing all jobs based on the number jobs may appear in one page
      applicantArray = applicantArray.slice(state.startIndex, state.startIndex + state.rowsPerPage);
      setDisplayData(applicantArray);
    }
  }, [state.rowsPerPage, state.startIndex, orderData]);

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

  const history = useHistory();

  const rowPushInvoice = (id) => {
    if (id) {
      history.push(`/co/${id}/invoice`);
    }
  };

  const rowPushES = (id) => {
    if (id) {
      history.push(`/co/order/${id}/es`);
    }
  };

  let content = <LoadingBar />;

  if (!displayIsLoading && displayData) {
    content = (
      <div className={classes.Container}>
        <div className={classes.TableHolder}>
          <div className={classes.Title}>
            <h2>Riwayat pesanan</h2>
          </div>
          <table className={classes.Table}>
            <thead className={classes.RowField}>
              <tr>
                <th>No</th>
                <th>Order Id</th>
                <th>Jenis Pesanan</th>
                <th>Tanggal Order</th>
                <th>Tanggal Approve</th>
                <th>Jumlah Slot</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody className={classes.ColumnField}>
              {displayData.map((order, i) => {
                return (
                  <tr
                    key={order._id}
                    onClick={() => (order.slot || order.amount ? rowPushInvoice(order._id) : rowPushES(order._id))}>
                    <td> {i + 1}</td>
                    <td>{order._id}</td>

                    <td>{order.slot ? 'Reguler' : order.amount ? 'Bulk Candidate' : 'Executive Search'}</td>
                    <td>{moment(order.createdAt).format('D MMM YYYY')}</td>
                    <td style={{ color: 'green' }}>
                      {order.approvedAt ? moment(order.approvedAt).format('D MMM YYYY') : '-'}
                    </td>

                    <td>{order.slot ? order.slot : order.amount ? order.amount : '-'}</td>
                    <td>
                      <p
                        className={classes.Content}
                        style={
                          order.status === 'Closed'
                            ? { color: 'gray' }
                            : order.status === 'Pending'
                            ? { color: 'orange' }
                            : { color: 'green' }
                        }>
                        {order.status}
                      </p>
                    </td>
                  </tr>
                );
              })}
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

  if (!displayIsLoading && orderData && orderData.length < 1) {
    content = <p className={classes.EmptyText}>Anda belum melakukan pembelian sebelumnya</p>;
  }

  return <div className={classes.Wraper}>{content}</div>;
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    isLoading: state.finance.isLoading,
    error: state.finance.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOrder: (data) => dispatch(actionCreators.getOrder(data)),
    getCompanyBC: (data) => dispatch(actionCreators.getCompanyBC(data)),
    getCompanyES: (data) => dispatch(actionCreators.getCompanyES(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CompanyOrderList));
