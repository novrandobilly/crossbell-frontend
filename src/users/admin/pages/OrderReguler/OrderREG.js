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
  const [index, setIndex] = useState(null);

  useEffect(() => {
    if (props.admin.token) {
      getOrderReguler(props.admin.token).then((res) => {
        setData(res.orderreg);
        console.log(res);
      });
    }
  }, [getOrderReguler, props.admin]);

  const approveOrderHandler = async (dataInput) => {
    setIndex(dataInput.i);
    const payload = {
      token: props.admin.token,
      companyId: dataInput.companyId,
      orderId: dataInput.orderId,
    };
    try {
      await props.approveOrder(payload);
      setData((prevData) => {
        const tempData = [...prevData];
        tempData[dataInput.i].status = "Paid";
        return tempData;
      });
      setIndex(null);
    } catch (err) {
      console.log(err);
      setIndex(null);
    }
  };

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
            return (
              <div className={classes.OrderCard} key={i}>
                <Link to={`/co/${order._id}/invoice`}>
                  <p className={classes.ContentId}>{order._id}</p>{" "}
                </Link>
                <p className={classes.Content}>{order.packageName}</p>
                <p className={classes.ContentDate}>
                  {moment(order.createdAt).format("D MMM YYYY")}
                </p>
                <p className={classes.Content}>
                  {order.approvedAt
                    ? moment(order.approvedAt).format("D MMM YYYY")
                    : "not approved"}
                </p>
                {props.indexIsLoading && index === i ? (
                  <SpinnerCircle />
                ) : (
                  <p
                    className={classes.Content}
                    style={
                      order.status === "expired"
                        ? { color: "gray" }
                        : order.status === "Pending"
                        ? { color: "#FF8C00" }
                        : order.status === "Cancel"
                        ? { color: "red" }
                        : { color: "green" }
                    }
                  >
                    {order.status}
                  </p>
                )}
                <div className={classes.DropDown}>
                  <button className={classes.DropButton}>
                    <ArrowDropDownIcon />
                  </button>
                  <div className={classes.DropDownContent}>
                    {order.status === "Paid" ? (
                      <p style={{ color: "gray", width: "10rem" }}>
                        telah disetujui
                      </p>
                    ) : (
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
                    )}
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
    indexIsLoading: state.finance.indexIsLoading,
    isLoading: state.finance.isLoading,
    error: state.finance.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOrderReguler: (data) => dispatch(actionCreators.getOrderReguler(data)),
    approveOrder: (payload) => dispatch(actionCreators.approveOrder(payload)),
    // cancelOrder: (payload) => dispatch(actionCreators.cancelOrder(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderREG);
