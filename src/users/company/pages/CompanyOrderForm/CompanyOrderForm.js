import React, { useEffect, useState } from "react";
import { useParams, withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { useForm } from "../../../../shared/utils/useForm";

import * as actionTypes from "../../../../store/actions/actions";
import * as actionCreators from "../../../../store/actions/index";
import { VALIDATOR_NUMSTR } from "../../../../shared/utils/validator";

import Modal from "../../../../shared/UI_Element/Modal";
import SpinnerCircle from "../../../../shared/UI_Element/Spinner/SpinnerCircle";
import Input from "../../../../shared/UI_Element/Input";

import classes from "./CompanyOrderForm.module.css";

const OrderComponent = (props) => {
  return (
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
                  // onInputHandler={onInputHandler}
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
          <Link to="/co/SSS_O2/invoice">
            <button className={classes.PurchaseButton}>Purchase now</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const CompanyOrderForm = (props) => {
  let formContent = (
    <React.Fragment>
      <OrderComponent
        title="Bronze"
        price={20000}
        slot={1}
        perks={[
          "Lorem ipsum dolor sit amet",
          "consectetur adipiscing elit",
          "eiusmod tempor incididunt ut labore et dolore magna aliqua",
          "aliquip ex ea commodo consequat",
          "Duis aute irure dolor in",
        ]}
      />

      <OrderComponent
        title="Silver"
        price={35000}
        slot={2}
        perks={[
          "Lorem ipsum dolor sit amet",
          "consectetur adipiscing elit",
          "eiusmod tempor incididunt ut labore et dolore magna aliqua",
          "aliquip ex ea commodo consequat",
          "Duis aute irure dolor in",
          "Lorem ipsum dolor sit amet",
          "consectetur adipiscing elit",
        ]}
      />

      <OrderComponent
        title="Gold"
        price={80000}
        slot={5}
        perks={[
          "Lorem ipsum dolor sit amet",
          "consectetur adipiscing elit",
          "eiusmod tempor incididunt ut labore et dolore magna aliqua",
          "aliquip ex ea commodo consequat",
          "Duis aute irure dolor in",
        ]}
      />

      <OrderComponent
        title="Platinum"
        price={150000}
        slot={10}
        perks={[
          "Lorem ipsum dolor sit amet",
          "consectetur adipiscing elit",
          "eiusmod tempor incididunt ut labore et dolore magna aliqua",
          "aliquip ex ea commodo consequat",
          "Duis aute irure dolor in",
        ]}
      />
    </React.Fragment>
  );

  return (
    <div className={classes.Container}>
      <form className={classes.Container}>{formContent}</form>
    </div>
  );
};

export default CompanyOrderForm;
