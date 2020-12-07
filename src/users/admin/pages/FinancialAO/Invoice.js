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

  let tax = 0;
  let dis = 0;

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
              <p>{company.email}</p>
              <p>{company.website}</p>
            </div>
            <div className={classes.InvoiceRight}>
              <p className={classes.InvoiceTitle}>INVOICE</p>
              <div className={classes.InvoiceDetail}>
                <div className={classes.DetailLabel}>
                  <p>Date</p>
                  <p>InvoiceId</p>
                </div>
                <div>
                  <p>{order.createdAt}</p>
                  <p>{order.invoiceId}</p>
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
                <th>{order.packageName}</th>
                <th>{order.slot}</th>
                <th>{order.amount}</th>
                <th>Rp. {order.packagePrice.toLocaleString()},-</th>
                <th>{order.amount * order.slot}</th>
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
                    enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                    aut fugit, sed quia consequuntur magni dolores
                  </li>
                  <li>
                    eos qui ratione voluptatem sequi nesciunt. Neque porro
                    quisquam est, qui dolorem ipsum quia dolor sit amet,
                    consectetur, adipisci velit,
                  </li>
                  <li>
                    sed quia non numquam eius modi tempora incidunt ut labore et
                    dolore magnam aliquam quaerat voluptatem. Ut enim ad minima
                    veniam, quis nostrum exercitationem ullam corporis suscipit
                    laboriosam,
                  </li>
                </ul>
              </div>
            </div>

            <div className={classes.AmountContainer}>
              <div className={classes.Amount}>
                <p>SubTotal</p>
                <p>
                  Rp.{(order.packagePrice * order.amount).toLocaleString()},-
                </p>
              </div>
              <p className={classes.SubTotal}>(Qty x package price)</p>
              <div className={classes.Amount}>
                <p>Discount</p>
                <p>
                  Rp.
                  {(dis =
                    order.packagePrice * order.amount * 0.2).toLocaleString()}
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
                    order.packagePrice * order.amount * 0.1).toLocaleString()}
                  ,-
                </p>
              </div>
              <div className={classes.AmountTotal}>
                <p>Total</p>
                <p>
                  Rp.
                  {(
                    order.packagePrice * order.amount +
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
};

const mapStateToProps = (state) => {
  return {
    company: state.company.companies,
    finance: state.finance.financial,
  };
};

export default connect(mapStateToProps)(Invoice);
