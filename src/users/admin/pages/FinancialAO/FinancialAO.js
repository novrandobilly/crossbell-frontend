import React from "react";
import { connect } from "react-redux";

import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import classes from "./FinancialAO.module.css";

const FinancialAO = (props) => {
  let slot = [];
  let price = [];
  let total = [];
  let revenue = 0;

  return (
    <div className={classes.FlexContainer}>
      <div className={classes.Container}>
        <div className={classes.HeaderContainer}>
          <h1 className={classes.Header}>CrossBell Finance</h1>
          <div className={classes.DropDown}>
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
          </div>
        </div>
        <table className={classes.Table}>
          <thead className={classes.RowField}>
            <tr>
              <th>Order Id</th>
              <th>Company Id</th>
              <th>Company Name</th>
              <th>Package Ads</th>
              <th>Slot</th>
              <th>Price/ Slot</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody className={classes.ColumnField}>
            {props.finance.map((fin, i) => {
              let company = props.company.find(
                (comp) => comp.companyId === fin.companyId
              );
              return (
                <tr key={fin.orderId}>
                  <th>{fin.orderId}</th>
                  <th>{fin.companyId}</th>
                  <th>{company.companyName}</th>
                  <th>{fin.package}</th>

                  {/* ========== Slot ========== */}
                  {fin.status === "Pending" ? (
                    <th>{parseInt((slot[i] = 0))}</th>
                  ) : fin.package === "Regular" ? (
                    <th>{parseInt((slot[i] = 30))}</th>
                  ) : fin.package === "Premium" ? (
                    <th>{parseInt((slot[i] = 40))}</th>
                  ) : (
                    <th>{parseInt((slot[i] = 60))}</th>
                  )}

                  {/* ========== Price/Slot ========== */}
                  {fin.status === "Pending" ? (
                    <th>{parseInt((slot[i] = 0))}</th>
                  ) : fin.package === "Regular" ? (
                    <th>Rp. {parseInt((price[i] = 20000))},-</th>
                  ) : fin.package === "Premium" ? (
                    <th>Rp. {parseInt((price[i] = 18000))},-</th>
                  ) : (
                    <th>Rp. {parseInt((price[i] = 15000))},-</th>
                  )}

                  {/* ========== Total Price ========== */}
                  {fin.status === "Pending" ? (
                    <th>{parseInt((total[i] = 0))}</th>
                  ) : (
                    <th>Rp. {parseInt((total[i] = slot[i] * price[i]))},-</th>
                  )}
                  <th
                    style={
                      fin.status === "Cancel"
                        ? { color: "Red", fontWeight: "bold" }
                        : fin.status === "Active"
                        ? { color: "Green", fontWeight: "bold" }
                        : fin.status === "Expired"
                        ? { color: "Gray", fontWeight: "bold" }
                        : { color: "rgb(250, 129, 0)", fontWeight: "bold" }
                    }
                  >
                    {fin.status}
                  </th>
                  <th>
                    <div className={classes.DropDown}>
                      <button className={classes.DropButton}>
                        <ArrowDropDownIcon />
                      </button>
                      <div className={classes.DropDownContent}>
                        <button style={{ color: "Green" }}>Activate</button>
                        <button style={{ color: "red" }}>Cancel</button>
                      </div>
                    </div>
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
};

const mapStateToProps = (state) => {
  return {
    company: state.company.companies,
    finance: state.finance.financial,
  };
};

export default connect(mapStateToProps)(FinancialAO);
