import React from "react";
import { VALIDATOR_REQUIRE } from "../../shared/utils/validator";

import Input from "../../shared/UI_Element/Input";
import Button from "@material-ui/core/Button";

import classes from "./QueryBar.module.css";

const QueryBar = (props) => {
  return (
    <div className={classes.QueryBar}>
      <div className={classes.SearchContainer}>
        <form
          onSubmit={props.searchHandler}
          action="/jobs-dashboard"
          method="GET"
          className={classes.SearchForm}
        >
          <Input
            id="search"
            type="text"
            label="Job search"
            validatorMethod={[VALIDATOR_REQUIRE()]}
            name="search"
            onInputHandler={props.searchInputHandler}
          />

          <Button
            variant="contained"
            type="submit"
            color="primary"
            disableElevation
            style={{ padding: " 0 1rem", marginLeft: "2rem" }}
          >
            search
          </Button>
        </form>
      </div>
    </div>
  );
};

export default QueryBar;
