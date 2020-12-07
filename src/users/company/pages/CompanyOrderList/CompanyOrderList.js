import React from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";

// import * as actionTypes from "../../../../store/actions/actions";
// import * as actionCreators from "../../../../store/actions/index";
// import SpinnerCircle from "../../../../shared/UI_Element/Spinner/SpinnerCircle";

import classes from "./CompanyOrderList.module.css";

const CompanyOrderList = (props) => {
  const { companyid } = useParams();

  let companyOrder = props.order.filter(
    (order) => order.companyId === companyid
  );

  let content = (
    <div className={classes.Container}>
      <div className={classes.Header}>
        <div className={classes.OrderHeader}>
          <p className={classes.Content}>ORDER ID</p>
          <p className={classes.Content}>PACKAGE</p>
          <p className={classes.Content}>ORDERED AT</p>
          <p className={classes.Content}>DUE DATE</p>
          <p className={classes.Content}>STATUS</p>
        </div>
      </div>
      {companyOrder.map((order, i) => {
        return (
          <Link to={`/co/${order.orderId}/invoice`} key={i}>
            <div className={classes.OrderCard}>
              <p className={classes.Content}>{order.orderId}</p>
              <p className={classes.Content}>{order.packageName}</p>
              <p className={classes.Content}>{order.createdAt}</p>
              <p
                className={classes.Content}
                style={
                  order.dueDate === 0
                    ? { color: "gray" }
                    : order.dueDate <= 3
                    ? { color: "red" }
                    : order.dueDate <= 7
                    ? { color: "#FF8C00" }
                    : { color: "green" }
                }
              >
                {order.dueDate} day
              </p>
              <p
                className={classes.Content}
                style={
                  order.status === "expired"
                    ? { color: "gray" }
                    : order.status === "pending"
                    ? { color: "#FF8C00" }
                    : { color: "green" }
                }
              >
                {order.status}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );

  //   if (isLoading) {
  //     content = <SpinnerCircle />;
  //   }

  return <div>{content}</div>;
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    order: state.finance.financial,
  };
};

export default connect(mapStateToProps)(CompanyOrderList);
