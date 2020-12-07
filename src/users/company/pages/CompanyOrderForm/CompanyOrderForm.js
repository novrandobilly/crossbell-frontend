import React from "react";

import OrderComponent from "./OrderComponent";

import classes from "./CompanyOrderForm.module.css";

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
        createOrder={props.createOrder}
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
        createOrder={props.createOrder}
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
        createOrder={props.createOrder}
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
        createOrder={props.createOrder}
      />
    </React.Fragment>
  );

  return <div className={classes.Container}>{formContent}</div>;
};

export default CompanyOrderForm;
