import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams, withRouter } from "react-router-dom";
// import moment from "moment";

// import * as actionTypes from "../../../../store/actions/actions";
import * as actionCreators from "../../../../store/actions/index";
import SpinnerCircle from "../../../../shared/UI_Element/Spinner/SpinnerCircle";

import classes from "./Invoice.module.css";

const Invoice = (props) => {
  let { orderid } = useParams();
  const [orderData, setOrderData] = useState();

  const { getOrderInvoice } = props;

  useEffect(() => {
    if (props.auth.token) {
      getOrderInvoice({ orderId: orderid, token: props.auth.token }).then(
        (res) => {
          if (res) {
            setOrderData(res.order);
            console.log(res);
          } else {
            throw new Error();
          }
        }
      );
    }
  }, [getOrderInvoice, orderid, props.auth]);

  let tax = 0;
  let dis = 0;
  let subTotal = 0;

  let content = <SpinnerCircle />;

  if (!props.isLoading && orderData) {
    content = (
      <React.Fragment>
        <div className={classes.Container}>
          <div className={classes.InvoiceContainer}>
            <p className={classes.Id}>
              Order Id: <span>{orderData._id}</span>
            </p>
            <div className={classes.Content}>
              <div className={classes.CompanyDetail}>
                <p className={classes.CompanyName}>
                  {orderData.companyId.companyName}
                </p>
                <p>{orderData.companyId.address}</p>
                <p>{orderData.companyId.email}</p>
                <p>{orderData.companyId.website}</p>
              </div>
              <div className={classes.InvoiceRight}>
                <p className={classes.InvoiceTitle}>INVOICE</p>
                <div className={classes.InvoiceDetail}>
                  <div className={classes.DetailLabel}>
                    <p>Date</p>
                    <p>InvoiceId</p>
                  </div>
                  <div>
                    <p>{orderData.createdAt}</p>
                    <p>{orderData.invoiceId}</p>
                  </div>
                </div>
              </div>
            </div>
            <table className={classes.Table}>
              <thead>
                <tr>
                  {orderData.packageName ? (
                    <th>package ads</th>
                  ) : (
                    <th>order</th>
                  )}
                  <th>jumlah</th>
                  <th>harga satuan</th>
                  <th>sub total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>
                    {orderData.packageName
                      ? orderData.packageName
                      : "bulk candidate"}
                  </th>
                  <th>{orderData.slot ? orderData.slot : orderData.amount}</th>
                  <th>
                    Rp.{" "}
                    {orderData.pricePerSlot
                      ? orderData.pricePerSlot
                      : orderData.price}
                    ,-
                  </th>
                  <th>
                    Rp.{" "}
                    {orderData.packageName
                      ? (subTotal = orderData.pricePerSlot * orderData.slot)
                      : (subTotal = orderData.price * orderData.amount)}
                    ,-
                  </th>
                </tr>
              </tbody>
            </table>

            <div className={classes.Footer}>
              <div className={classes.CommentContainer}>
                <div className={classes.CommentHeader}>Comment</div>
                <div className={classes.CommentContent}>
                  <ul>
                    <li>
                      Sed ut perspiciatis unde omnis iste natus error sit
                      voluptatem accusantium doloremque laudantium, totam rem
                      aperiam, eaque ipsa quae ab illo inventore veritatis et
                    </li>
                    <li>
                      quasi architecto beatae vitae dicta sunt explicabo. Nemo
                      enim ipsam voluptatem quia voluptas sit aspernatur aut
                      odit aut fugit, sed quia consequuntur magni dolores
                    </li>
                    <li>
                      eos qui ratione voluptatem sequi nesciunt. Neque porro
                      quisquam est, qui dolorem ipsum quia dolor sit amet,
                      consectetur, adipisci velit,
                    </li>
                    <li>
                      sed quia non numquam eius modi tempora incidunt ut labore
                      et dolore magnam aliquam quaerat voluptatem. Ut enim ad
                      minima veniam, quis nostrum exercitationem ullam corporis
                      suscipit laboriosam,
                    </li>
                  </ul>
                </div>
              </div>

              <div className={classes.AmountContainer}>
                <div className={classes.Amount}>
                  <p>SubTotal</p>
                  <p>
                    Rp.
                    {subTotal.toLocaleString()}
                    ,-
                  </p>
                </div>
                <p className={classes.SubTotal}>(Qty x package price)</p>
                <div className={classes.Amount}>
                  <p>Discount</p>
                  <p>
                    - Rp.
                    {(dis = subTotal * 0.2).toLocaleString()}
                    ,-
                  </p>
                </div>
                <div className={classes.Amount}>
                  <p>
                    Tax <span>(10%)</span>
                  </p>
                  <p>
                    Rp.
                    {(tax = subTotal * 0.1).toLocaleString()}
                    ,-
                  </p>
                </div>
                <div className={classes.AmountTotal}>
                  <p>Total</p>
                  <p>
                    Rp.
                    {(subTotal + tax - dis).toLocaleString()}
                    ,-
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
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
    getOrderInvoice: (orderData) =>
      dispatch(actionCreators.getOrderInvoice(orderData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Invoice));
