import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { useForm } from "../../../../shared/utils/useForm";

import OrderComponent from "./OrderComponent";
// import * as actionTypes from "../../../../store/actions/actions";
import * as actionCreators from "../../../../store/actions/index";
import { VALIDATOR_MIN } from "../../../../shared/utils/validator";
import Button from "@material-ui/core/Button";

// import Modal from "../../../../shared/UI_Element/Modal";
// import SpinnerCircle from "../../../../shared/UI_Element/Spinner/SpinnerCircle";
import Input from "../../../../shared/UI_Element/Input";

import classes from "./CompanyOrderForm.module.css";

const CompanyOrderForm = (props) => {
  const companyData = JSON.parse(localStorage.getItem("userData"));

  const [formState, onInputHandler] = useForm(
    {
      slot: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    let title = "bronze";

    if (formState.inputs.slot.value > 1) {
      title = "silver";
    }
    if (formState.inputs.slot.value > 4) {
      title = "gold";
    }
    if (formState.inputs.slot.value > 9) {
      title = "platinum";
    }

    const orderData = {
      invoiceId: companyData.userId.slice(0, 3),
      companyId: companyData.userId,
      packageName: title,
      slot: formState.inputs.slot.value,
      token: props.auth.token,
    };

    try {
      if (orderData.slot < 1) {
        throw new Error("jumlah pembelian tidak boleh dibawah 1");
      }
      const res = await props.createOrder(orderData);
      console.log(res);
      if (res) {
        props.history.push(`/co/${res.order.id}/invoice`);
        console.log(res);
      } else {
        throw new Error("Error nih bro");
      }
    } catch (err) {
      console.log(err);
    }
  };

  let price;

  if (formState.inputs.slot.value > 4) {
    price = 17500;
    if (formState.inputs.slot.value > 10) {
      price = 16000;
      if (formState.inputs.slot.value >= 15) {
        price = 15000;
      }
    }
  } else {
    price = 20000;
  }

  let formContent = (
    <React.Fragment>
      <div className={classes.PackageList}>
        <div>
          <OrderComponent
            title="Bronze"
            price={20000}
            slot="1 slot"
            perks={[
              "Lorem ipsum dolor sit amet",
              "consectetur adipiscing elit",
              "eiusmod tempor incididunt ut labore et dolore magna aliqua",
              "aliquip ex ea commodo consequat",
              "Duis aute irure dolor in",
            ]}
            createOrder={props.createOrder}
          />
        </div>
        <div>
          <OrderComponent
            title="Silver"
            price={17500}
            slot="2 - 4 slot"
            perks={[
              "Lorem ipsum dolor sit amet",
              "consectetur adipiscing elit",
              "eiusmod tempor incididunt ut labore et dolore magna aliqua",
              "aliquip ex ea commodo consequat",
              "Duis aute irure dolor in",
              "Lorem ipsum dolor sit amet",
              "consectetur adipiscing elit",
            ]}
            createOrder={props.createOrder}
          />
        </div>
        <div>
          <OrderComponent
            title="Gold"
            price={16000}
            slot="5 - 9 slot"
            perks={[
              "Lorem ipsum dolor sit amet",
              "consectetur adipiscing elit",
              "eiusmod tempor incididunt ut labore et dolore magna aliqua",
              "aliquip ex ea commodo consequat",
              "Duis aute irure dolor in",
            ]}
            createOrder={props.createOrder}
          />
        </div>
        <div>
          <OrderComponent
            title="Platinum"
            price={15000}
            slot="9 slot keatas"
            perks={[
              "Lorem ipsum dolor sit amet",
              "consectetur adipiscing elit",
              "eiusmod tempor incididunt ut labore et dolore magna aliqua",
              "aliquip ex ea commodo consequat",
              "Duis aute irure dolor in",
            ]}
            createOrder={props.createOrder}
          />
        </div>
      </div>
      <form className={classes.FormContainer} onSubmit={onSubmitHandler}>
        <div className={classes.InputAmount}>
          <div>
            <p className={classes.Label}>Jumlah slot yang ingin dibeli</p>
          </div>
          <div>
            <Input
              inputType="number"
              id="slot"
              inputClass="PackageSlot"
              validatorMethod={[VALIDATOR_MIN(1)]}
              onInputHandler={onInputHandler}
              type="number"
              initValue="0"
              min="0"
              step="1"
            />
          </div>
        </div>
        <p className={classes.PricePerSlot}>
          harga per slot: <span> IDR {price.toLocaleString()}</span>
        </p>
        <div style={{ width: "100%" }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disableElevation
            style={{ width: "100%", marginTop: "1rem" }}
          >
            Submit
          </Button>
        </div>
      </form>
    </React.Fragment>
  );

  return <div className={classes.Container}>{formContent}</div>;
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createOrder: (orderData) => dispatch(actionCreators.createOrder(orderData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CompanyOrderForm));
