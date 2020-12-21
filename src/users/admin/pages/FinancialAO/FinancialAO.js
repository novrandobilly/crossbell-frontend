import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import moment from "moment";

import * as actionCreators from "../../../../store/actions";
import Spinner from "../../../../shared/UI_Element/Spinner/SpinnerCircle";
// import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import classes from "./FinancialAO.module.css";

const FinancialAO = (props) => {
  let total = [];
  let revenue = 0;
  const [displayData, setDisplayData] = useState();

  const { getWholeOrderREG, getWholeOrderBC } = props;

  useEffect(() => {
    let orderReg = [];
    let orderBC = [];
    let allOrder = [];
    const token = props.admin.token;
    if (token) {
      const fetchData = async () => {
        let resreg;
        let resbc;
        try {
          resreg = await getWholeOrderREG(token);
          resbc = await getWholeOrderBC(token);
        } catch (err) {
          console.log(err);
        }
        orderReg = resreg.orderreg;
        orderBC = resbc.orderbc;
        allOrder = [...orderReg, ...orderBC];
        console.log(allOrder);
        allOrder = allOrder.sort(
          (a, b) => moment(b.createdAt) - moment(a.createdAt)
        );
        setDisplayData(allOrder);
      };
      fetchData();
    }
  }, [getWholeOrderREG, getWholeOrderBC, props.admin]);
  let content = <Spinner />;

  if (displayData && !props.isLoading) {
    content = (
      <div className={classes.FlexContainer}>
        <div className={classes.Container}>
          <div className={classes.HeaderContainer}>
            <h1 className={classes.Header}>CrossBell Finance</h1>
            {/* <div className={classes.DropDown}>
              <button className={classes.DropButton}>
                Filter
                <ArrowDropDownIcon />
              </button>
              <div className={classes.DropDownContent}>
                <button style={{ color: "black" }}>All</button>
                <button style={{ color: "rgb(33, 153, 0)" }} value="Active">
                  Active
                </button>
                <button style={{ color: "red" }} value="Cancel">
                  Cancel
                </button>

                <button style={{ color: "rgb(250, 129, 0)" }} value="Pending">
                  Pending
                </button>
              </div>
            </div> */}
          </div>
          <table className={classes.Table}>
            <thead className={classes.RowField}>
              <tr>
                <th>No</th>
                <th>Company Name</th>
                <th>Order type</th>
                <th>Slot/ Amount</th>
                <th>Price</th>
                <th>Total Price</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody className={classes.ColumnField}>
              {displayData.map((fin, i) => {
                return (
                  <tr key={fin._id}>
                    <th>{i + 1}</th>
                    <th>{fin.companyId.companyName}</th>
                    <th>
                      {" "}
                      {fin.slot ? "order reguler" : "order bulk candidate"}
                    </th>

                    {/* ========== Slot ========== */}
                    {fin.status === "Pending" ? (
                      <th style={{ fontSize: "0.9rem" }}>0</th>
                    ) : (
                      <th style={{ fontSize: "0.9rem" }}>
                        <p style={{ margin: "-0.5rem 0 -1rem 0" }}>
                          {fin.slot || fin.amount}
                          <span style={{ margin: "0 0 0 1rem" }}>
                            {fin.slot ? "slot" : "candidate"}
                          </span>
                        </p>
                      </th>
                    )}

                    {/* ========== Price/Slot ========== */}
                    {fin.status === "Pending" ? (
                      <th>0</th>
                    ) : (
                      <th>
                        Rp. {(fin.pricePerSlot || fin.price).toLocaleString()}
                      </th>
                    )}

                    {/* ========== Total Price ========== */}
                    {fin.status === "Pending" ? (
                      <th>
                        {/* {() => {
                          parseInt((total[i] = 0));
                          return null;
                        }}
                        {fin.totalPrice.toLocaleString()} */}
                        Pending
                      </th>
                    ) : (
                      <th>
                        Rp.{" "}
                        {parseInt((total[i] = fin.totalPrice)).toLocaleString()}
                      </th>
                    )}

                    <th
                      style={
                        fin.status === "Pending"
                          ? { color: "rgb(250, 129, 0)", fontWeight: "bold" }
                          : fin.status === "Expired"
                          ? { color: "Gray", fontWeight: "bold" }
                          : { color: "green", fontWeight: "bold" }
                      }
                    >
                      {fin.status}
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className={classes.RevenueContainer}>
            <div className={classes.RevenueLabel}>
              <div className={classes.Label}>Revenue/ month</div>
              <div className={classes.Label}>Revenue/ year</div>
            </div>
            <div className={classes.RevenueNumber}>
              <div className={classes.Label}>
                {total.map((tot) => {
                  revenue = revenue + tot;
                  return null;
                })}
                Rp. {revenue.toLocaleString()},-
              </div>
              <div className={classes.Label}>
                Rp. {(revenue * 12).toLocaleString()},-
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return content;
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
    getWholeOrderREG: (data) => dispatch(actionCreators.getWholeOrderREG(data)),
    getWholeOrderBC: (data) => dispatch(actionCreators.getWholeOrderBC(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FinancialAO);
