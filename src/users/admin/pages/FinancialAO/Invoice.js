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
          if (res.orderreg) {
            setOrderData(res.orderreg);
            console.log(res);
          } else if (res.orderbc) {
            setOrderData(res.orderbc);
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
                <p className={classes.CompanyName}>{orderData.companyName}</p>
                <p>{orderData.address}</p>
                <p>{orderData.email}</p>
                <p>{orderData.website}</p>
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
                  <th>Package Ads</th>
                  <th>Slot</th>
                  <th>Amount/ Qty</th>
                  <th>Package Price</th>
                  <th>Total Slot</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>{orderData.packageName}</th>
                  <th>{orderData.slot}</th>
                  <th>{orderData.amount}</th>
                  <th>Rp. {orderData.pricePerSlot},-</th>
                  <th>{orderData.amount * orderData.slot}</th>
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
                    {(
                      orderData.packagePrice * orderData.amount
                    ).toLocaleString()}
                    ,-
                  </p>
                </div>
                <p className={classes.SubTotal}>(Qty x package price)</p>
                <div className={classes.Amount}>
                  <p>Discount</p>
                  <p>
                    Rp.
                    {(dis =
                      orderData.packagePrice *
                      orderData.amount *
                      0.2).toLocaleString()}
                    ,-
                  </p>
                </div>
                <div className={classes.Amount}>
                  <p>
                    Tax <span>(10%)</span>
                  </p>
                  <p>
                    Rp.
                    {(tax =
                      orderData.packagePrice *
                      orderData.amount *
                      0.1).toLocaleString()}
                    ,-
                  </p>
                </div>
                <div className={classes.AmountTotal}>
                  <p>Total</p>
                  <p>
                    Rp.
                    {(
                      orderData.packagePrice * orderData.amount +
                      tax -
                      dis
                    ).toLocaleString()}
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
