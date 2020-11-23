import React from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import classes from "./Invoice.module.css";

const Invoice = (props) => {
  let { orderid } = useParams();

  let order = props.finance.find((or) => or.orderId === orderid);

  let company = props.company.find(
    (comp) => comp.companyId === order.companyId
  );

  let total = [];
  let amount = 0;

  return (
    <React.Fragment>
      <div className={classes.Container}>
        <div className={classes.InvoiceContainer}>
          <p className={classes.Id}>
            Order Id: <span>{order.orderId}</span>
          </p>
          <div className={classes.Content}>
            <div className={classes.CompanyDetail}>
              <p className={classes.CompanyName}>{company.companyName}</p>
              <p>{company.address}</p>
            </div>
          </div>
          <table className={classes.Table}>
            <thead>
              <tr>
                <th>Package Ads</th>
                <th>Slot</th>
                <th>Price/ Slot</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {order.orders.map((order, i) => (
                <tr key={i}>
                  <th>{order.package}</th>
                  <th>{order.slot}</th>
                  <th>Rp.{order.price},-</th>
                  <th>Rp.{(total[i] = order.slot * order.price)},-</th>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={classes.Amount}>
            {total.map((tot) => {
              amount = amount + tot;
              return null;
            })}
            <p>Total</p>
            <p>Rp.{amount.toLocaleString()},-</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    company: state.company.companies,
    finance: state.finance.financial,
  };
};

export default connect(mapStateToProps)(Invoice);
