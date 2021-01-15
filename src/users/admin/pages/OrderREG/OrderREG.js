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

  const { getWholeOrderREG } = props;
  const [index, setIndex] = useState(null);

  useEffect(() => {
    if (props.admin.token) {
      let sort = [];
      getWholeOrderREG(props.admin.token).then((res) => {
        sort = res.orderreg;
        sort = sort.sort((a, b) => moment(b.createdAt) - moment(a.createdAt));
        setData(sort);
        console.log(res);
      });
    }
  }, [getWholeOrderREG, props.admin]);

  const approveOrderREGHandler = async (dataInput) => {
    setIndex(dataInput.i);
    const payload = {
      token: props.admin.token,
      companyId: dataInput.companyId,
      orderId: dataInput.orderId,
    };

    try {
      await props.approveOrderREG(payload);
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
        <table className={classes.Table}>
          <thead className={classes.RowField}>
            <tr>
              <th>No</th>
              <th>Order Id</th>
              <th>Nama Paket</th>
              <th>Tanggal Order</th>
              <th>Tanggal Disetujui</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody className={classes.ColumnField}>
            {data.map((order, i) => (
              <tr key={order._id}>
                <th> {i + 1}</th>
                <th>{order._id}</th>
                <th>
                  {" "}
                  <Link
                    to={`/co/${order.id}`}
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    {order.packageName}
                  </Link>
                </th>
                <th>{moment(order.createdAt).format("D MMM YYYY")}</th>
                <th>
                  {order.approvedAt
                    ? moment(order.approvedAt).format("D MMM YYYY")
                    : "not approved"}
                </th>

                <th>
                  {props.indexIsLoading && index === i ? (
                    <SpinnerCircle />
                  ) : order.status === "Paid" ? (
                    <span style={{ color: "Green", fontWeight: "bold" }}>
                      Paid
                    </span>
                  ) : (
                    <span style={{ color: "Orange", fontWeight: "bold" }}>
                      Pending
                    </span>
                  )}
                </th>

                <th>
                  <div className={classes.DropDown}>
                    <button className={classes.DropButton}>
                      <ArrowDropDownIcon />
                    </button>
                    <div className={classes.DropDownContent}>
                      <button
                        style={{ color: "green" }}
                        onClick={() =>
                          approveOrderREGHandler({
                            orderId: order._id,
                            companyId: order.companyId._id,
                            i,
                          })
                        }
                      >
                        Approve
                      </button>
                    </div>
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
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
    getWholeOrderREG: (data) => dispatch(actionCreators.getWholeOrderREG(data)),
    approveOrderREG: (payload) =>
      dispatch(actionCreators.approveOrderREG(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderREG);
