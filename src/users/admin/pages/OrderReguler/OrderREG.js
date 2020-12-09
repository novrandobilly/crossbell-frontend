import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";

import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import * as actionCreators from "../../../../store/actions/index";
import SpinnerCircle from "../../../../shared/UI_Element/Spinner/SpinnerCircle";
import classes from "./OrderREG.module.css";

const OrderREG = (props) => {
  const [data, setData] = useState();

  const { getOrderReguler } = props;

  const [indexLoading, setIndexLoading] = useState(null);

  useEffect(() => {
    if (props.admin.token) {
      getOrderReguler().then((res) => {
        setData(res.orderreg);
        console.log(res);
      });
    }
  }, [getOrderReguler, props.admin]);

  const approveOrderHandler = async (dataInput) => {
    setIndexLoading(dataInput.i);
    const payload = {
      token: props.admin.token,
      companyId: dataInput.companyId,
      orderId: dataInput.orderId,
    };
    try {
      await props.approveOrder(payload);
      setData((prevData) => {
        const tempData = [...prevData];
        tempData[dataInput.i].isActive = true;
        return tempData;
      });
      setIndexLoading(null);
    } catch (err) {
      console.log(err);
      setIndexLoading(null);
    }
  };

  // const cancelOrderHandler = async (dataInput) => {
  //   setIndexLoading(dataInput.index);
  //   const payload = {
  //     token: props.admin.token,
  //     companyId: dataInput.companyId,
  //   };
  //   try {
  //     await props.cancelOrderHandler(payload);
  //     setData((prevData) => {
  //       const tempData = [...prevData];
  //       tempData[dataInput.index].isActive = false;
  //       return tempData;
  //     });
  //     setIndexLoading(null);
  //   } catch (err) {
  //     console.log(err);
  //     setIndexLoading(null);
  //   }
  // };

  let content = <SpinnerCircle />;

  if (!props.isLoading && data) {
    content = (
      <div className={classes.Container}>
        <div className={classes.OrderContainer}>
          <div className={classes.Header}>
            <div className={classes.OrderHeader}>
              <p className={classes.ContentIdLabel}>ORDER ID</p>
              <p className={classes.ContentLabel}>NAMA PAKET</p>
              <p className={classes.ContentLabel}>TANGGAL ORDER</p>
              <p className={classes.ContentLabel}>TANGGAL DISETUJUI</p>
              <p className={classes.ContentLabel}>STATUS</p>
              <p className={classes.ContentLabel}>AKSI</p>
            </div>
          </div>
          {data.map((order, i) => {
            let dueDate = Math.ceil(
              moment(order.dueDate).diff(moment(), "days", true)
            );

            return (
              <div className={classes.OrderCard} key={i}>
                <Link to={`/co/${order._id}/invoice`}>
                  <p className={classes.ContentId}>{order._id}</p>{" "}
                </Link>
                <p className={classes.Content}>{order.packageName}</p>
                <p className={classes.ContentDate}>
                  {moment(order.createdAt).format("D MMM YYYY")}
                </p>
                <p
                  className={classes.Content}
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
                  {moment(order.createdAt).format("D MMM YYYY")}
                </p>
                <p
                  className={classes.Content}
                  style={
                    order.status === "expired"
                      ? { color: "gray" }
                      : order.status === "Pending"
                      ? { color: "#FF8C00" }
                      : { color: "green" }
                  }
                >
                  {props.isLoading && indexLoading === i ? (
                    <SpinnerCircle />
                  ) : (
                    order.status
                  )}
                </p>
                <div className={classes.DropDown}>
                  <button className={classes.DropButton}>
                    <ArrowDropDownIcon />
                  </button>
                  <div className={classes.DropDownContent}>
                    <button
                      style={{ color: "Green" }}
                      onClick={() =>
                        approveOrderHandler({
                          orderId: order._id,
                          companyId: order.companyId,
                          i,
                        })
                      }
                    >
                      setujui
                    </button>
                    <button style={{ color: "red" }}>batalkan</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  return <div>{content}</div>;
};

const mapStateToProps = (state) => {
  return {
    admin: state.admin,
    isLoading: state.finance.isLoading,
    error: state.finance.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOrderReguler: (data) => dispatch(actionCreators.getOrderReguler(data)),
    approveOrder: (payload) => dispatch(actionCreators.approveOrder(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderREG);
