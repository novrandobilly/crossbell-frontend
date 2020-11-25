import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams, withRouter } from "react-router-dom";
import { useForm } from "../../../../shared/utils/useForm";

import * as actionCreators from "../../../../store/actions/index";
import SpinnerCircle from "../../../../shared/UI_Element/Spinner/SpinnerCircle";
import Input from "../../../../shared/UI_Element/Input";
import { VALIDATOR_MINLENGTH } from "../../../../shared/utils/validator";

import classes from "./EditDetails.module.css";

const EditDetails = (props) => {
  const { companyid } = useParams();

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { getOneCompany } = props;
  useEffect(() => {
    getOneCompany(companyid).then((res) => {
      setData(res.company);
      setIsLoading(false);
    });
  }, [getOneCompany, setIsLoading, companyid]);

  let push = props.push;

  const [formState, onInputHandler] = useForm(
    {
      details: {
        value: data.details,
        isValid: data.details ? true : false,
      },
    },
    false
  );

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const updatedData = {
      companyId: companyid,
      details: formState.inputs.details.value,
    };
    try {
      const res = await props.updateCompanyDetail(updatedData);
      if (res) {
        console.log(res);
      } else {
        console.log("no res detected");
      }
      !push && props.history.push(`/co/${companyid}`);
    } catch (err) {
      console.log(err);
    }
  };

  let formContent = (
    <React.Fragment>
      <div className={classes.ContainerFlex}>
        <p className={classes.FormTitle}>Edit Company Details</p>

        <div className={classes.FormRow}>
          <div className={classes.EditLabel}>
            <Input
              inputType="textarea"
              id="details"
              inputClass="EditProfileTextArea"
              validatorMethod={[VALIDATOR_MINLENGTH(20)]}
              onInputHandler={onInputHandler}
              label="Details*"
              initValue={data.details}
              initIsValid={data.details}
            />
          </div>
        </div>

        <button
          disabled={!formState.formIsValid}
          className={classes.SaveButton}
        >
          <span>Save</span>
        </button>
      </div>
    </React.Fragment>
  );

  if (isLoading) {
    formContent = <SpinnerCircle />;
  }

  return (
    <div style={!push ? { marginTop: "6rem" } : { marginTop: "0" }}>
      <form onSubmit={onSubmitHandler} className={classes.Container}>
        {formContent}
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOneCompany: (data) => dispatch(actionCreators.getOneCompany(data)),
    updateCompanyDetail: (CompanyData) =>
      dispatch(actionCreators.updateCompanyDetail(CompanyData)),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(EditDetails));
