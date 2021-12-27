import React, { useEffect, useState, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import { useParams, withRouter, Link } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import terbilang from 'angka-menjadi-terbilang';
import moment from 'moment';

// import * as actionTypes from "../../../../store/actions/actions";
import * as actionCreators from '../../../../store/actions/index';
import LoadingBar from '../../../../shared/UI_Element/Spinner/LoadingBar';
import PaymentProve from '../../../../shared/UI_Element/PaymentProve';
import OrderModal from '../../../../shared/UI_Element/OrderModal';

import styles from './Invoice.module.scss';

const Invoice = (props) => {
  let { orderid } = useParams();
  const [orderData, setOrderData] = useState();
  const [orderModal, setOrderModal] = useState(false);
  const [approveModal, setApproveModal] = useState(false);

  const [paymentData, setPaymentData] = useState([]);
  const [payOff, setPayOff] = useState(0);
  const [approveSuccess, setApproveSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { getOrderInvoice } = props;

  const fetchPayment = useCallback(
    () =>
      getOrderInvoice({
        orderId: orderid,
        token: props.auth.token || props.admin.token,
      }).then((res) => {
        if (res.order) {
          setOrderData(res.order);
          setPaymentData(res.order.payment);
        } else {
          throw new Error('Can not retrive order data at the moment');
        }
      }),
    [getOrderInvoice, orderid, props.admin.token, props.auth.token]
  );

  useEffect(() => {
    if (props.auth.token || props.admin.token) {
      fetchPayment();
    }
  }, [fetchPayment, props.admin.token, props.auth.token]);

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

  const approveOrderREGHandler = async (dataInput) => {
    setOrderModal(false);

    const payload = {
      token: props.admin.token,
      companyId: dataInput.companyId,
      orderId: dataInput.orderId,
    };

    try {
      const res = await props.approveOrderREG(payload);
      if (res.message === 'Payment approval has been submitted') {
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
      <div className={styles.Container}>
        <div className={styles.DownloadButton}>
          <button className={styles.Button} onClick={handlePrint}>
            Download / Print
          </button>
        </div>
        <div className={styles.InvoiceContainer} ref={componentRef}>
          <p className={styles.Id}>
            Order Id: <span>{orderData._id}</span>
          </p>
          <div className={styles.Content}>
            <div className={styles.CompanyDetail}>
              <p className={styles.CompanyName}>{orderData.companyId.companyName}</p>
              <p className={styles.InvoiceCompanyData}>{orderData.companyId.address}</p>
              <p className={styles.InvoiceCompanyData}>{orderData.companyId.email}</p>
              <p className={styles.InvoiceCompanyData}>{orderData.companyId.website}</p>
            </div>
            <div className={styles.InvoiceRight}>
              <p className={styles.InvoiceTitle}>Informasi Rincian Pemesanan</p>
              <div className={styles.InvoiceDetail}>
                <div className={styles.DetailLabel}>
                  <p className={styles.InvoiceCompanyData}>Date</p>
                </div>
                <div>
                  <p className={styles.InvoiceCompanyData}>{moment(orderData.createdAt).format('D MMMM  YYYY')}</p>
                </div>
              </div>
            </div>
          </div>
          <table className={styles.Table}>
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

          <div className={styles.Footer}>
            <div className={styles.CommentContainer}>
              <div className={styles.CommentHeader}>Instruksi Pembayaran</div>
              <div className={styles.CommentContent}>
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
                      <ul className={styles.CrossbellInfo} style={{ listStyleType: 'circle' }}>
                        <li className={styles.AdditionalInfo}>Nama perusahaan: PT. Inti Dinamis</li>
                        <li className={styles.AdditionalInfo}>Nomor Pokok Wajib Pajak: 23001939900293</li>
                        <li className={styles.AdditionalInfo}>
                          Alamat: Taman Laguna Blok K, Jati Sampurna Bekasi 17435
                        </li>
                      </ul>
                    </li>
                  )}
                </ul>
              </div>
            </div>

            <div className={styles.AmountContainer}>
              <div className={styles.Amount}>
                <p>SubTotal</p>
                <p>
                  Rp.
                  {subTotal.toLocaleString()}
                  ,-
                </p>
              </div>

              <p className={styles.SubTotal}>(jumlah x harga satuan)</p>
              <div className={styles.Amount}>
                <p>Diskon</p>
                <p>
                  - Rp.
                  {(dis = (subTotal * orderData.promo) / 100).toLocaleString()}
                  ,-
                </p>
              </div>

              {orderData.PPH && (
                <div className={styles.Amount}>
                  <p>
                    PPH<span>(2%)</span>
                  </p>
                  <p>
                    - Rp. {(tax = (subTotal - dis) * 0.02).toLocaleString()}
                    ,-
                  </p>
                </div>
              )}

              <div className={styles.AmountTotal}>
                <p>Total </p>
                <p>
                  Rp.
                  {(subTotal - tax - dis).toLocaleString()}
                  ,-
                </p>
              </div>
              <div className={styles.NumberToText}>
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
            <p className={styles.LinkedText}>
              <Link style={{ textDecoration: 'none', color: '#f79f35' }} to={`/co/${props.auth.userId}/listOrder`}>
                Lanjut ke daftar order {'>>'}
              </Link>
            </p>
          </div>
        )}{' '}
      </div>
    );
  }

  let payment = null;

  if (!props.isLoading && orderData && (props.admin.isAdmin || props.auth.userId === orderData?.companyId?.id)) {
    payment = (
      <div className={styles.PaymentDiv}>
        <div className={styles.PaymentHeader}>Bukti Pembayaran</div>
        <div className={styles.PaymentContent}>
          <div className={styles.ContentHead}>
            <button
              type='button'
              className={styles.Button}
              disabled={orderData?.totalPrice <= payOff}
              onClick={onOpenApproveModal}>
              + Upload Bukti Pembayaran
            </button>
          </div>
          <div className={styles.ContentBody}>
            <div className={styles.PaymentCardHead}>
              <div className={styles.Numbering}>No</div>
              <div className={styles.Nominals}>Nominal</div>
              <div className={styles.PaymentDate}>Tanggal</div>
              <div className={styles.PaymentTime}>WIB</div>
            </div>
            {paymentData &&
              paymentData.length > 0 &&
              paymentData.map((payment, i) => {
                return (
                  <div className={styles.PaymentCard} key={i}>
                    <div className={styles.Numbering}>{i + 1}</div>
                    <div className={styles.Nominals}>Rp. {payment.nominal?.toLocaleString()} </div>
                    <div className={styles.PaymentDate}>{moment(payment.paymentDate).format('DD MMM YYYY ')}</div>
                    <div className={styles.PaymentTime}>{payment.paymentTime}</div>
                  </div>
                );
              })}
          </div>
          {props.admin.isVerificator && (
            <div className={styles.PaymentCardFooter}>
              <button
                type='button'
                variant='contained'
                color='primary'
                size='small'
                disableElevation
                disabled={orderData.status !== 'Pending' || orderData?.totalPrice > payOff}
                onClick={onOpenOrderModal}>
                Setujui Pesanan
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.FlexContainer}>
      <OrderModal
        show={orderModal}
        onCancel={onCloseOrderModal}
        Accept={() =>
          approveOrderREGHandler({
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
        orderType='REG'
        fetchPayment={fetchPayment}>
        Upload Bukti Pembayaran
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
    approveOrderREG: (payload) => dispatch(actionCreators.approveOrderREG(payload)),
    getOrderInvoice: (orderData) => dispatch(actionCreators.getOrderInvoice(orderData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Invoice));
