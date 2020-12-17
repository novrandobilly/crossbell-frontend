import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";

import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import * as actionCreators from "../../../../store/actions/index";
import SpinnerCircle from "../../../../shared/UI_Element/Spinner/SpinnerCircle";
import classes from "./OrderES.module.css";

const OrderES = (props) => {
  const [data, setData] = useState();

  const { getWholeOrderES } = props;
  const [index, setIndex] = useState(null);

  useEffect(() => {
    const token = props.admin.token;
    if (token) {
      let sort = [];
      getWholeOrderES(token)
        .then((res) => {
          sort = res.orders;
          sort = sort.sort((a, b) => moment(b.createdAt) - moment(a.createdAt));
          console.log(res);
          setData(sort);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [getWholeOrderES, props.admin]);

  const updateStatusHandler = async (dataInput) => {
    setIndex(dataInput.i);
    const payload = {
      token: props.admin.token,
      orderId: dataInput.orderId,
      status: dataInput.status,
    };
    try {
      await props.updateOrderStatusES(payload);
      setData((prevData) => {
        const tempData = [...prevData];
        tempData[dataInput.i].status = dataInput.status;
        return tempData;
      });
      setIndex(null);
    } catch (err) {
      console.log(err);
      setIndex(null);
    }
  };

  let content = <SpinnerCircle />;

  // if (!props.isLoading && data.length < 1) {
  //   content = <h1>tidak ada order untuk saat ini</h1>;
  // }

  if (!props.isLoading && data) {
    content = (
      <div className={classes.Container}>
        <div className={classes.OrderContainer}>
          <div className={classes.Header}>
            <div className={classes.OrderHeader}>
              <p className={classes.ContentIdLabel}>ORDER ID</p>
              <p className={classes.ContentLabel}>NAMA PERUSAHAAN</p>
              <p className={classes.ContentLabel}>TANGGAL ORDER</p>
              <p className={classes.ContentLabel}>TANGGAL DISETUJUI</p>
              <p className={classes.ContentLabel}>STATUS</p>
              <p className={classes.ContentLabel}>AKSI</p>
            </div>
          </div>
          {data.map((order, i) => {
            return (
              <div className={classes.OrderCard} key={i}>
                <Link to={`/ad/alphaomega/order/${order._id}/es`}>
                  <p className={classes.ContentId}>{order._id}</p>{" "}
                </Link>
                <p className={classes.ContentCompany}>
                  {order.companyId.companyName}
                </p>
                <p className={classes.ContentDate}>
                  {moment(order.createdAt).format("D MMM YYYY")}
                </p>
                <p className={classes.ContentCompany}>
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
                      order.status === "Closed"
                        ? { color: "gray" }
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
                    <button
                      style={{ color: "Green" }}
                      onClick={() =>
                        updateStatusHandler({
                          orderId: order._id,
                          status: "Open",
                          i,
                        })
                      }
                    >
                      Open
                    </button>
                    <button
                      style={{ color: "Red" }}
                      onClick={() =>
                        updateStatusHandler({
                          orderId: order._id,
                          status: "Closed",
                          i,
                        })
                      }
                    >
                      Closed
                    </button>
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
    getWholeOrderES: (data) => dispatch(actionCreators.getWholeOrderES(data)),
    updateOrderStatusES: (payload) =>
      dispatch(actionCreators.updateOrderStatusES(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderES);
