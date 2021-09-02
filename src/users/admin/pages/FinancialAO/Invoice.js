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
import ApproveModal from '../../../../shared/UI_Element/ApproveModal';

import classes from './Invoice.module.css';

const Invoice = (props) => {
  let { orderid } = useParams();
  const [orderData, setOrderData] = useState();
  const [orderModal, setOrderModal] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { getOrderInvoice } = props;
  useEffect(() => {
    if (props.auth.token || props.admin.token) {
      getOrderInvoice({
        orderId: orderid,
        token: props.auth.token || props.admin.token,
      }).then((res) => {
        if (res) {
          setOrderData(res.order);
          console.log(res);
        } else {
          throw new Error();
        }
      });
    }
  }, [getOrderInvoice, orderid, props.admin.token, props.auth.token]);

  const onCloseOrderModal = () => {
    setOrderModal(false);
  };

  const onOpenOrderModal = () => {
    setOrderModal(true);
  };

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
              <p className={classes.InvoiceCompanyData}>
                {orderData.companyId.address}
              </p>
              <p className={classes.InvoiceCompanyData}>
                {orderData.companyId.email}
              </p>
              <p className={classes.InvoiceCompanyData}>
                {orderData.companyId.website}
              </p>
            </div>
            <div className={classes.InvoiceRight}>
              <p className={classes.InvoiceTitle}>
                Informasi Rincian Pemesanan
              </p>
              <div className={classes.InvoiceDetail}>
                <div className={classes.DetailLabel}>
                  <p className={classes.InvoiceCompanyData}>Date</p>
                  {/* <p>InvoiceId</p> */}
                </div>
                <div>
                  <p className={classes.InvoiceCompanyData}>
                    {moment(orderData.createdAt).format('D MMMM  YYYY')}
                  </p>
                  {/* <p>{orderData.invoiceId}</p> */}
                </div>
              </div>
            </div>
          </div>
          <table className={classes.Table}>
            <thead>
              <tr>
                {orderData.packageName ? <th>Package Ads</th> : <th>Order</th>}
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
                    ? orderData.pricePerSlot.toLocaleString()
                    : orderData.price.toLocaleString()}
                  ,-
                </th>
                <th>
                  Rp.{' '}
                  {orderData.packageName
                    ? (subTotal =
                        orderData.pricePerSlot *
                        orderData.slot).toLocaleString()
                    : (subTotal =
                        orderData.price * orderData.amount).toLocaleString()}
                  ,-
                </th>
              </tr>
            </tbody>
          </table>

          <div className={classes.Footer}>
            <div className={classes.CommentContainer}>
              <div className={classes.CommentHeader}>Instruksi Pembayaran</div>
              <div className={classes.CommentContent}>
                <ul>
                  <li>
                    Pembayaran dilakukan sebelum tanggal jatuh tempo yaitu 14
                    hari sejak tanggal invoice ini
                  </li>
                  <li>
                    Pembayaran dapat di transfer ke rekening BCA{' '}
                    <span style={{ fontWeight: '500' }}>1234567xxx</span> a/n
                    Bagong
                  </li>
                  {/* <li>
                      Pembayaran melalui virtual account dapat transfer melalui
                      bank BCA dengan nomor VA{' '}
                      <span style={{ fontWeight: '500' }}>807770817329xxx</span>
                    </li> */}
                  <li>
                    Setelah melakukan pembayaran, mohon kirimkan bukti transfer
                    kepada nomor wa{' '}
                    <span style={{ fontWeight: '500' }}>081732954xxx</span>
                  </li>
                  {orderData.PPH && (
                    <li>
                      bukti potong PPH pasal 23 paling lambat dikirimkan pada
                      akhir bulan berikutnya setelah pesanan ini dibuat.{' '}
                      <ul
                        className={classes.CrossbellInfo}
                        style={{ listStyleType: 'circle' }}
                      >
                        <li className={classes.AdditionalInfo}>
                          Nama perusahaan: PT. Inti Dinamis
                        </li>
                        <li className={classes.AdditionalInfo}>
                          Nomor Pokok Wajib Pajak: 23001939900293
                        </li>
                        <li className={classes.AdditionalInfo}>
                          Alamat: Taman Laguna Blok K, Jati Sampurna Bekasi
                          17435
                        </li>
                      </ul>
                    </li>
                  )}
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

              <p className={classes.SubTotal}>(jumlah x harga satuan)</p>
              <div className={classes.Amount}>
                <p>Diskon</p>
                <p>
                  - Rp.
                  {(dis = subTotal * 0).toLocaleString()}
                  ,-
                </p>
              </div>

              {orderData.PPH && (
                <div className={classes.Amount}>
                  <p>
                    PPH<span>(2%)</span>
                  </p>
                  <p>
                    Rp.
                    {(tax = subTotal * 0.02).toLocaleString()}
                    ,-
                  </p>
                </div>
              )}

              <div className={classes.AmountTotal}>
                <p>Total </p>
                <p>
                  Rp.
                  {(subTotal - tax - dis).toLocaleString()}
                  ,-
                </p>
              </div>
              <div className={classes.NumberToText}>
                <strong>
                  {terbilang(subTotal - tax - dis)
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
        {props.auth.isCompany && (
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
        )}{' '}
      </div>
    );
  }

  return (
    <div className={classes.FlexContainer}>
      <ApproveModal
        show={orderModal}
        onCancel={onCloseOrderModal}
        orderId={orderid}
        orderType='Reg'
      >
        Form Persetujuan
      </ApproveModal>
      {content}
      <div className={classes.PaymentDiv}>
        <div className={classes.PaymentHeader}>Pembayaran</div>
        <div className={classes.PaymentContent}>
          <div className={classes.ContentHead}>
            <div
              className={classes.PaymentButton}
              onClick={() => onOpenOrderModal()}
            >
              + Tambah Pembayaran
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    isLoading: state.finance.isLoading,
    error: state.finance.error,
    admin: state.admin,
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
