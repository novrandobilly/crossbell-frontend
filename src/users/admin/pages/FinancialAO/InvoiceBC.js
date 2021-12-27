import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { useParams, withRouter, Link } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import terbilang from 'angka-menjadi-terbilang';
import moment from 'moment';

// import * as actionTypes from "../../../../store/actions/actions";
import * as actionCreators from '../../../../store/actions/index';
import LoadingBar from '../../../../shared/UI_Element/Spinner/LoadingBar';
import GetAppIcon from '@material-ui/icons/GetApp';
import Button from '@material-ui/core/Button';
import PaymentProve from '../../../../shared/UI_Element/PaymentProve';
import OrderModal from '../../../../shared/UI_Element/OrderModal';

import classes from './Invoice.module.css';

const Invoice = (props) => {
  let { orderid } = useParams();
  const [orderData, setOrderData] = useState();
  const [orderModal, setOrderModal] = useState(false);
  const [approveModal, setApproveModal] = useState(false);

  const [paymentData, setPaymentData] = useState([]);
  const [payOff, setPayOff] = useState(0);
  const [paymentInput, setPaymentInput] = useState();
  const [approveSuccess, setApproveSuccess] = useState(false);

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
        if (res.order) {
          console.log(res);

          setOrderData(res.order);
          setPaymentData(res.order.payment);
        } else {
          throw new Error('Can not retrive order data at the moment');
        }
      });
    }
  }, [getOrderInvoice, orderid, props.admin.token, props.auth.token]);

  useEffect(() => {
    if (paymentData && paymentData.length > 0) {
      let tempPay = 0;
      paymentData.map((pay, i) => {
        return (tempPay = tempPay + pay.nominal);
      });
      setPayOff(tempPay);
    }
  }, [paymentData]);

  useEffect(() => {
    if (paymentInput) {
      setPaymentData((prevState) => [...prevState, paymentInput]);
    }
  }, [paymentInput]);

  useEffect(() => {
    if (approveSuccess) {
      setOrderData((prevState) => {
        prevState.status = 'Paid';
        return prevState;
      });
      setApproveSuccess(false);
    }
  }, [approveSuccess]);
  const onCloseApproveModal = () => {
    setApproveModal(false);
  };

  const onOpenApproveModal = () => {
    setApproveModal(true);
  };

  const onCloseOrderModal = () => {
    setOrderModal(false);
  };

  const onOpenOrderModal = () => {
    setOrderModal(true);
  };

  const onUpdatePaymentInput = (payload) => {
    setPaymentInput(payload);
  };

  const approveOrderBCHandler = async (dataInput) => {
    setOrderModal(false);

    const payload = {
      token: props.admin.token,
      companyId: dataInput.companyId,
      orderId: dataInput.orderId,
    };

    try {
      const res = await props.approveOrderBC(payload);
      if (res.message === 'Successfully approve order!') {
        setApproveSuccess(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    documentTitle: `invoice_${orderid}`,
    content: () => componentRef.current,
  });

  let tax = 0;
  let dis = 0;
  let subTotal = 0;

  let content = <LoadingBar />;

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
            startIcon={<GetAppIcon />}>
            dowload/ print
          </Button>
        </div>
        <div className={classes.InvoiceContainer} ref={componentRef}>
          <p className={classes.Id}>
            Order Id: <span>{orderData._id}</span>
          </p>
          <div className={classes.Content}>
            <div className={classes.CompanyDetail}>
              <p className={classes.CompanyName}>{orderData.companyId.companyName}</p>
              <p className={classes.InvoiceCompanyData}>{orderData.companyId.address}</p>
              <p className={classes.InvoiceCompanyData}>{orderData.companyId.email}</p>
              <p className={classes.InvoiceCompanyData}>{orderData.companyId.website}</p>
            </div>
            <div className={classes.InvoiceRight}>
              <p className={classes.InvoiceTitle}>Informasi Rincian Pemesanan</p>
              <div className={classes.InvoiceDetail}>
                <div className={classes.DetailLabel}>
                  <p className={classes.InvoiceCompanyData}>Date</p>
                </div>
                <div>
                  <p className={classes.InvoiceCompanyData}>{moment(orderData.createdAt).format('D MMMM  YYYY')}</p>
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
                  {orderData.pricePerSlot ? orderData.pricePerSlot.toLocaleString() : orderData.price.toLocaleString()}
                  ,-
                </th>
                <th>
                  Rp.{' '}
                  {orderData.packageName
                    ? (subTotal = orderData.pricePerSlot * orderData.slot).toLocaleString()
                    : (subTotal = orderData.price * orderData.amount).toLocaleString()}
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
                  <li>Pembayaran dilakukan sebelum tanggal jatuh tempo yaitu 14 hari sejak tanggal invoice ini</li>
                  <li>
                    Pembayaran dapat di transfer ke rekening BCA <span style={{ fontWeight: '500' }}>1234567xxx</span>{' '}
                    a/n Bagong
                  </li>
                  {/* <li>
                      Pembayaran melalui virtual account dapat transfer melalui
                      bank BCA dengan nomor VA{' '}
                      <span style={{ fontWeight: '500' }}>807770817329xxx</span>
                    </li> */}
                  <li>
                    Setelah melakukan pembayaran, mohon kirimkan bukti transfer kepada nomor wa{' '}
                    <span style={{ fontWeight: '500' }}>081732954xxx</span>
                  </li>
                  {orderData.PPH && (
                    <li>
                      bukti potong PPH pasal 23 paling lambat dikirimkan pada akhir bulan berikutnya setelah pesanan ini
                      dibuat.{' '}
                      <ul className={classes.CrossbellInfo} style={{ listStyleType: 'circle' }}>
                        <li className={classes.AdditionalInfo}>Nama perusahaan: PT. Inti Dinamis</li>
                        <li className={classes.AdditionalInfo}>Nomor Pokok Wajib Pajak: 23001939900293</li>
                        <li className={classes.AdditionalInfo}>
                          Alamat: Taman Laguna Blok K, Jati Sampurna Bekasi 17435
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
                  {(dis = (subTotal * orderData.promo) / 100).toLocaleString()}
                  ,-
                </p>
              </div>

              {orderData.PPH && (
                <div className={classes.Amount}>
                  <p>
                    PPH<span>(2%)</span>
                  </p>
                  <p>
                    - Rp. {(tax = subTotal * 0.02).toLocaleString()}
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
                      upperCaseWord = word[0].toUpperCase() + word.slice(1, word.length);
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
          <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
            <p className={classes.LinkedText}>
              <Link style={{ textDecoration: 'none', color: 'blue' }} to={`/co/${props.auth.userId}/listOrder`}>
                Lanjut ke daftar order {'>>'}
              </Link>
            </p>
          </div>
        )}{' '}
      </div>
    );
  }

  let payment = null;

  if (!props.isLoading && orderData && props.admin.isAdmin) {
    payment = (
      <div className={classes.PaymentDiv}>
        <div className={classes.PaymentHeader}>Pembayaran</div>
        <div className={classes.PaymentContent}>
          <div className={classes.ContentHead}>
            <Button
              type='button'
              variant='contained'
              color='primary'
              size='small'
              disableElevation
              disabled={orderData?.totalPrice <= payOff}
              onClick={onOpenApproveModal}>
              + Tambah Pembayaran
            </Button>
          </div>
          <div className={classes.ContentBody}>
            <div className={classes.PaymentCardHead}>
              <div className={classes.Numbering}>No</div>
              <div className={classes.Nominals}>Nominal</div>
              <div className={classes.PaymentDate}>Tanggal</div>
              <div className={classes.PaymentTime}>WIB</div>
            </div>
            {paymentData &&
              paymentData.length > 0 &&
              paymentData.map((payment, i) => {
                return (
                  <div className={classes.PaymentCard} key={i}>
                    <div className={classes.Numbering}>{i + 1}</div>
                    <div className={classes.Nominals}>Rp. {payment.nominal.toLocaleString()} </div>
                    <div className={classes.PaymentDate}>{moment(payment.paymentDate).format('DD MMM YYYY ')}</div>
                    <div className={classes.PaymentTime}>{payment.paymentTime}</div>
                  </div>
                );
              })}
          </div>
          <div className={classes.PaymentCardFooter}>
            <Button
              type='button'
              variant='contained'
              color='primary'
              size='small'
              disableElevation
              disabled={orderData.status !== 'Pending' || orderData?.totalPrice > payOff}
              onClick={onOpenOrderModal}>
              Setujui Pesanan
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.FlexContainer}>
      <OrderModal
        show={orderModal}
        onCancel={onCloseOrderModal}
        Accept={() =>
          approveOrderBCHandler({
            orderId: orderData._id,
            companyId: orderData.companyId._id,
          })
        }>
        Setujui pembelian dari perusahaan ini?
      </OrderModal>
      <PaymentProve
        show={approveModal}
        onCancel={onCloseApproveModal}
        orderId={orderid}
        orderType='BC'
        onUpdatePaymentInput={(pay) => onUpdatePaymentInput(pay)}>
        Form Persetujuan
      </PaymentProve>
      {content}
      {payment}
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
    approveOrderBC: (payload) => dispatch(actionCreators.approveOrderBC(payload)),
    getOrderInvoice: (orderData) => dispatch(actionCreators.getOrderInvoice(orderData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Invoice));
