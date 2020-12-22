import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";

import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import * as actionCreators from "../../../../store/actions/index";
import SpinnerCircle from "../../../../shared/UI_Element/Spinner/SpinnerCircle";
import classes from "./OrderBC.module.css";

const OrderBC = (props) => {
  const [data, setData] = useState();

  const { getWholeOrderBC } = props;
  const [index, setIndex] = useState(null);

  useEffect(() => {
    const token = props.admin.token;
    if (token) {
      let sort = [];
      getWholeOrderBC(token)
        .then((res) => {
          sort = res.orderbc;
          sort = sort.sort((a, b) => moment(b.createdAt) - moment(a.createdAt));
          console.log(res);
          setData(sort);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [getWholeOrderBC, props.admin]);

  const approveOrderBCHandler = async (dataInput) => {
    setIndex(dataInput.i);
    const payload = {
      token: props.admin.token,
      companyId: dataInput.companyId,
      orderId: dataInput.orderId,
    };
    console.log(payload);
    try {
      await props.approveOrderBC(payload);
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
                <Link to={`/ad/alphaomega/order/${order._id}/candidate`}>
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
                          approveOrderBCHandler({
                            orderId: order._id,
                            companyId: order.companyId._id,
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
    getWholeOrderBC: (data) => dispatch(actionCreators.getWholeOrderBC(data)),
    approveOrderBC: (payload) =>
      dispatch(actionCreators.approveOrderBC(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderBC);
