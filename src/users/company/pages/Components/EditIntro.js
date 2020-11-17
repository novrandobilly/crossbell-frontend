import React from "react";
import { useParams, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { useForm } from "../../../../shared/utils/useForm";
import * as actionTypes from "../../../../store/actions/actions";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Input from "../../../../shared/UI_Element/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
} from "../../../../shared/utils/validator";

import classes from "./EditIntro.module.css";

const EditIntro = (props) => {
  const { companyid } = useParams();

  console.log(companyid);
  const identifiedCompany = props.company.find(
    (co) => co.companyId === companyid
  );
  console.log(identifiedCompany);
  const [formState, onInputHandler] = useForm(
    {
      companyName: {
        value: identifiedCompany.companyName,
        isValid: identifiedCompany.companyName ? true : false,
      },
      size: {
        value: identifiedCompany.size,
        isValid: identifiedCompany.size ? true : false,
      },
      industry: {
        value: identifiedCompany.industry,
        isValid: identifiedCompany.industry ? true : false,
      },
      address: {
        value: identifiedCompany.address,
        isValid: identifiedCompany.address ? true : false,
      },
      website: {
        value: identifiedCompany.website,
        isValid: identifiedCompany.website ? true : false,
      },
      emailRecipient: {
        value: identifiedCompany.emailRecipient,
        isValid: identifiedCompany.emailRecipient ? true : false,
      },
    },
    true
  );

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const updatedIntro = {
      companyId: identifiedCompany.companyId,
      companyName: formState.inputs.companyName.value,
      size: formState.inputs.size.value,
      industry: formState.inputs.industry.value,
      address: formState.inputs.address.value,
      website: formState.inputs.website.value,
      emailRecipient: formState.inputs.emailRecipient.value,
    };
    props.updateCompanyIntro(updatedIntro);
    props.history.goBack();
  };

  return (
    <React.Fragment>
      <form onSubmit={onSubmitHandler} className={classes.Container}>
        <div className={classes.ContainerFlex}>
          <p className={classes.FormTitle}>Edit Company Intro</p>

          <div className={classes.FormRow}>
            <div className={classes.EditLabel}>
              <div className={classes.ProfilePicture}>
                <AccountCircleIcon
                  style={{
                    fontSize: "15rem",
                    marginBottom: "1rem",
                  }}
                />
                <label className={classes.InputButton}>
                  <input type="file"></input>
                  <span className={classes.InputButtonText}> Upload Logo </span>
                </label>
              </div>
              <Input
                inputType="input"
                id="companyName"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="Name*"
                initValue={formState.inputs.companyName.value}
                initIsValid={formState.inputs.companyName.isValid}
              />

              <Input
                inputType="input"
                id="size"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="Size*"
                initValue={formState.inputs.size.value}
                initIsValid={formState.inputs.size.isValid}
              />

              <Input
                inputType="input"
                id="industry"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="Industry*"
                initValue={formState.inputs.industry.value}
                initIsValid={formState.inputs.industry.isValid}
              />

              <Input
                inputType="input"
                id="address"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="Address*"
                initValue={formState.inputs.address.value}
                initIsValid={formState.inputs.address.isValid}
              />

              <Input
                inputType="input"
                id="website"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="Websites*"
                initValue={formState.inputs.website.value}
                initIsValid={formState.inputs.website.isValid}
              />

              <Input
                inputType="input"
                id="emailRecipient"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_EMAIL()]}
                onInputHandler={onInputHandler}
                label="Email Recipient*"
                initValue={formState.inputs.emailRecipient.value}
                initIsValid={formState.inputs.emailRecipient.isValid}
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
      </form>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    company: state.company.companies,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCompanyIntro: (payload) =>
      dispatch({ type: actionTypes.EDITCOMPANYINTRO, payload }),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditIntro));
