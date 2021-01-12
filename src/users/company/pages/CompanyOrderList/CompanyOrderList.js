import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import moment from "moment";

// import * as actionTypes from "../../../../store/actions/actions";
import * as actionCreators from "../../../../store/actions/index";
import SpinnerCircle from "../../../../shared/UI_Element/Spinner/SpinnerCircle";

import classes from "./CompanyOrderList.module.css";

const CompanyOrderList = (props) => {
  const { companyid } = useParams();

  const [orderData, setOrderData] = useState();

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
        } catch (err) {
          console.log(err);
        }
        orderReg = resreg.orderreg;
        orderBC = resbc.orderbc;
        orderES = reses.orderes;
        allOrder = [...orderReg, ...orderBC, ...orderES];
        console.log(allOrder);
        allOrder = allOrder.sort(
          (a, b) => moment(b.createdAt) - moment(a.createdAt)
        );
        setOrderData(allOrder);
      };
      fetchData();
    }
  }, [getOrder, getCompanyBC, getCompanyES, companyid, props.auth]);

  console.log(orderData);

  let content = <SpinnerCircle />;

  if (!props.isLoading && orderData) {
    content = (
      <div className={classes.Container}>
        <table className={classes.Table}>
          <thead className={classes.RowField}>
            <tr>
              <th>No</th>
              <th>Order Id</th>
              <th>Jenis Pesanan</th>
              <th>Tanggal Order</th>
              <th>Jatuh Tempo</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody className={classes.ColumnField}>
            {orderData.map((order, i) => {
              let dueDate = Math.ceil(
                moment(order.dueDate).diff(moment(), "days", true)
              );
              return (
                <tr key={order._id}>
                  <th> {i + 1}</th>
                  <th>
                    <Link
                      to={
                        order.slot || order.amount
                          ? `/co/${order._id}/invoice`
                          : `/co/order/${order._id}/es`
                      }
                      key={i}
                    >
                      {order._id}
                    </Link>
                  </th>

                  <th>
                    {order.slot
                      ? "Reguler"
                      : order.amount
                      ? "Bulk Candidate"
                      : "Executive Search"}
                  </th>
                  <th>{moment(order.createdAt).format("D MMM YYYY")}</th>
                  <th>
                    <p
                      style={
                        dueDate === 0
                          ? { color: "gray" }
                          : dueDate <= 3
                          ? { color: "red" }
                          : dueDate <= 7
                          ? { color: "#FF8C00" }
                          : { color: "green" }
                      }
                    >
                      {order.status === "Pending"
                        ? `${dueDate} day`
                        : order.status === "Open"
                        ? "no due"
                        : "0 day"}
                    </p>
                  </th>

                  <th>
                    <p
                      className={classes.Content}
                      style={
                        order.status === "Closed"
                          ? { color: "gray" }
                          : { color: "green" }
                      }
                    >
                      {order.status}
                    </p>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  return <div>{content}</div>;
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

export default connect(mapStateToProps, mapDispatchToProps)(CompanyOrderList);
