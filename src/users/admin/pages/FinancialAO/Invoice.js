import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { useParams, withRouter, Link } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import terbilang from 'angka-menjadi-terbilang';
import moment from 'moment';

// import * as actionTypes from "../../../../store/actions/actions";
import * as actionCreators from '../../../../store/actions/index';
import SpinnerCircle from '../../../../shared/UI_Element/Spinner/SpinnerCircle';
import GetAppIcon from '@material-ui/icons/GetApp';
import Button from '@material-ui/core/Button';

import classes from './Invoice.module.css';

const Invoice = (props) => {
  let { orderid } = useParams();
  const [orderData, setOrderData] = useState();

  const { getOrderInvoice } = props;
  console.log(getOrderInvoice);

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

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    documentTitle: `invoice_${orderid}`,
    content: () => componentRef.current,
  });

  let tax = 0;
  let dis = 0;
  let subTotal = 0;

  let content = <SpinnerCircle />;

  if (!props.isLoading && orderData) {
    content = (
      <React.Fragment>
        <div className={classes.Container}>
          <div className={classes.DownloadButton}>
            <Button
              size='small'
              variant='contained'
              color='primary'
              className={classes.margin}
              onClick={handlePrint}
              startIcon={<GetAppIcon />}
            >
              dowload/ print
            </Button>
          </div>

          <div className={classes.InvoiceContainer} ref={componentRef}>
            <p className={classes.Id}>
              Order Id: <span>{orderData._id}</span>
            </p>
            <div className={classes.Content}>
              <div className={classes.CompanyDetail}>
                <p className={classes.CompanyName}>
                  {orderData.companyId.companyName}
                </p>
                <p className={classes.Address}>{orderData.companyId.address}</p>
                <p>{orderData.companyId.email}</p>
                <p>{orderData.companyId.website}</p>
              </div>
              <div className={classes.InvoiceRight}>
                <p className={classes.InvoiceTitle}>INVOICE</p>
                <div className={classes.InvoiceDetail}>
                  <div className={classes.DetailLabel}>
                    <p>Date</p>
                    {/* <p>InvoiceId</p> */}
                  </div>
                  <div>
                    <p>{moment(orderData.createdAt).format('D MMMM  YYYY')}</p>
                    {/* <p>{orderData.invoiceId}</p> */}
                  </div>
                </div>
              </div>
            </div>
            <table className={classes.Table}>
              <thead>
                <tr>
                  {orderData.packageName ? (
                    <th>Package Ads</th>
                  ) : (
                    <th>Order</th>
                  )}
                  <th>Jumlah</th>
                  <th>Harga Satuan</th>
                  <th>Sub Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>
                    {orderData.packageName
                      ? orderData.packageName
                      : orderData.amount
                      ? 'bulk candidate'
                      : 'executive search'}
                  </th>
                  <th>{orderData.slot ? orderData.slot : orderData.amount}</th>
                  <th>
                    Rp.{' '}
                    {orderData.pricePerSlot
                      ? orderData.pricePerSlot
                      : orderData.price}
                    ,-
                  </th>
                  <th>
                    Rp.{' '}
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
                <div className={classes.CommentHeader}>
                  Instruksi Pembayaran
                </div>
                <div className={classes.CommentContent}>
                  <ul>
                    <li>
                      Pembayaran harus dilakukan sebelum tanggal jatuh tempo
                      yaitu 14 hari dari tanggal pemesanan.
                    </li>
                    <li>
                      Pembayaran dapat di transfer ke rekening BCA{' '}
                      <span style={{ fontWeight: '500' }}>1234567xxx</span> a/n
                      Bagong
                    </li>
                    <li>
                      Pembayaran melalui virtual account dapat transfer melalui
                      bank BCA dengan nomor VA{' '}
                      <span style={{ fontWeight: '500' }}>807770817329xxx</span>
                    </li>
                    <li>
                      Setelah melakukan pembayaran, mohon kirimkan bukti
                      transfer kepada nomor wa{' '}
                      <span style={{ fontWeight: '500' }}>081732954xxx</span>
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
                    {(dis = subTotal * 0).toLocaleString()}
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
                <div className={classes.NumberToText}>
                  <strong>
                    {terbilang(subTotal + tax - dis)
                      .split(' ')
                      .map((word) => {
                        let upperCaseWord = '';
                        upperCaseWord =
                          word[0].toUpperCase() + word.slice(1, word.length);
                        return upperCaseWord;
                      })
                      .join(' ')}{' '}
                    rupiah
                  </strong>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{ display: 'flex', width: '100%', justifyContent: 'center' }}
          >
            <p className={classes.LinkedText}>
              <Link
                style={{ textDecoration: 'none', color: 'blue' }}
                to={`/co/${props.auth.userId}/listOrder`}
              >
                Lanjut ke daftar order {'>>'}
              </Link>
            </p>
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
