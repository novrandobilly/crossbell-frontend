import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { useForm } from "../../../../shared/utils/useForm";
import moment from "moment";

import * as actionTypes from "../../../../store/actions/actions";
// import * as actionCreators from "../../../../store/actions/index";
import { VALIDATOR_NUMSTR } from "../../../../shared/utils/validator";

// import Modal from "../../../../shared/UI_Element/Modal";
// import SpinnerCircle from "../../../../shared/UI_Element/Spinner/SpinnerCircle";
import Input from "../../../../shared/UI_Element/Input";

import classes from "./OrderComponent.module.css";

const OrderComponent = (props) => {
  const companyData = JSON.parse(localStorage.getItem("userData"));

  const [formState, onInputHandler] = useForm(
    {
      amount: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const orderData = {
      orderId: `${companyData.userId}`,
      invoiceId: "CTO_11",
      companyId: companyData.userId,
      packageName: props.title.toLowerCase(),
      status: "pending",
      createdAt: moment().toISOString(),
      approvetAt: null,
      dueDate: moment().add(2, "w").toISOString(),
      slot: props.slot,
      packagePrice: props.price,
      amount: formState.inputs.amount.value,
      totalPrice: props.price * formState.inputs.amount.value,
    };
    props.createOrder(orderData);
    props.history.push(`/co/${companyData.userId}/invoice`);
  };

  return (
    <form className={classes.Container} onSubmit={onSubmitHandler}>
      <div className={classes.OrderCard}>
        <div className={classes.CardHolder}>
          <div>
            <div
              className={classes.CardHeader}
              style={
                props.title === "Bronze"
                  ? { backgroundColor: "#ad8a56" }
                  : props.title === "Silver"
                  ? { backgroundColor: "#a9a9a9" }
                  : props.title === "Gold"
                  ? { backgroundColor: "#d4af47" }
                  : { backgroundColor: "rgba(58, 81, 153, 1)" }
              }
            >
              <p className={classes.Title}>{props.title}</p>
              <div className={classes.Perks}>
                <p className={classes.Price}>IDR {props.price}</p>
                <p className={classes.Slot}>
                  {props.slot} Slot (Active for 7 days)
                </p>
              </div>
              <div className={classes.InputAmount}>
                <div>
                  <p className={classes.Label}>Input amount</p>
                </div>
                <div>
                  <Input
                    inputType="input"
                    id="amount"
                    inputClass="PackageAmount"
                    validatorMethod={[VALIDATOR_NUMSTR]}
                    onInputHandler={onInputHandler}
                    placeolder="Input amount number"
                  />
                </div>
              </div>
            </div>
            <div className={classes.CardContent}>
              <ul>
                {props.perks.map((perk, i) => {
                  return <li key={i}> {perk}</li>;
                })}
              </ul>
            </div>
          </div>

          <div>
            <p className={classes.SlotPrice}>
              <span>IDR {props.price / props.slot}</span> each slot
            </p>
            <button className={classes.PurchaseButton}>Purchase now</button>
          </div>
        </div>
      </div>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    // isLoading: state.finance.isLoading,
    // error: state.finance.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createOrder: (data) =>
      dispatch({ type: actionTypes.CREATEORDER, payload: data }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(OrderComponent));
