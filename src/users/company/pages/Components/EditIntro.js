
import React, { useEffect, useState } from "react";
import { useParams, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { useForm } from "../../../../shared/utils/useForm";

import Button from "@material-ui/core/Button";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import * as actionTypes from "../../../../store/actions/actions";
import * as actionCreators from "../../../../store/actions/index";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
} from "../../../../shared/utils/validator";

import Modal from "../../../../shared/UI_Element/Modal";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Input from "../../../../shared/UI_Element/Input";
import SpinnerCircle from "../../../../shared/UI_Element/Spinner/SpinnerCircle";
import classes from "./EditIntro.module.css";

const EditIntro = (props) => {
  const { companyid } = useParams();

  const [data, setData] = useState();

  const { getOneCompany } = props;
  useEffect(() => {
    getOneCompany({ userId: companyid }).then((res) => {
      setData(res.company);
    });
  }, [getOneCompany, companyid]);

  let push = props.push;

  const [formState, onInputHandler] = useForm(
    {
      logo: {
				value: data ? data.logo : null,
				isValid: true
			},
      companyName: {
        value: data ? data.companyName : null,
        isValid: data && data.companyName ? true : false,
      },
      email: {
        value: data ? data.email : null,
        isValid: data && data.email ? true : false,
      },
      industry: {
        value: data ? data.industry : null,
        isValid: data && data.industry ? true : false,
      },
      address: {
        value: data ? data.address : null,
        isValid: data && data.address ? true : false,
      },
      website: {
        value: data ? data.website : null,
        isValid: data && data.website ? true : false,
      },
    },
    true
  );

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!formState.formIsValid) {
      return props.updateCompanyFail();
    }

   const updatedIntro = {
			companyId: companyid,
			companyName: formState.inputs.companyName.value,
			email: formState.inputs.email.value,
			industry: formState.inputs.industry.value,
			address: formState.inputs.address.value,
			logo: formState.inputs.logo.value,
     website: formState.inputs.website.value
		};

    try {
      const res = await props.updateCompanyIntro(updatedIntro);
      if (res) {
        console.log(res);
        if (push) {
          return props.onNextHandler();
        }
      } else {
        console.log("no res detected");
      }

      !push && props.history.push(`/co/${companyid}`);
    } catch (err) {
      console.log(err);
    }
  };

  let formContent = <SpinnerCircle />;

  if (!props.isLoading && data) {
    formContent = (
      <React.Fragment>
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
									<input type='file' name='logo' id='logo' onChange={onUploadHandler} accept='.jpg, .jpeg, .png' />
									<span className={classes.InputButtonText}> Upload File </span>
								</label>
                
              </div>

              <Input
                inputType="input"
                id="companyName"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="Name*"
                initValue={data.companyName}
                initIsValid={data.companyName}
              />
              <Input
                inputType="input"
                id="email"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_EMAIL()]}
                onInputHandler={onInputHandler}
                label="Company Email* (This is your email account for login)"
                initValue={data.email}
                initIsValid={data.email}
              />

              <Input
                inputType="input"
                id="industry"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="Industry*"
                initValue={data.industry}
                initIsValid={data.industry}
                placeholder="Your Company Industry"
              />

              <Input
                inputType="input"
                id="address"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="Address*"
                initValue={data.address}
                initIsValid={data.address}
                placeholder="Company address"
              />

              <Input
                inputType="input"
                id="website"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="Websites*"
                initValue={data.website}
                initIsValid={data.website}
                placeholder="Company Website"
              />
            </div>
          </div>

          <div className={classes.Footer}>
            <Button
              disabled={!formState.formIsValid}
              variant="contained"
              color="primary"
              type="submit"
              className={classes.button}
              endIcon={<NavigateNextIcon />}
            >
              {push ? "Next" : "Save"}
            </Button>
          </div>
        </div>
      </React.Fragment>
    );
  }

  const onCancelHandler = () => {
    props.resetCompany();
  };

  return (
    <div style={!push ? { marginTop: "6rem" } : { marginTop: "0" }}>
      <form onSubmit={onSubmitHandler} className={classes.Container}>
        <Modal show={props.error} onCancel={onCancelHandler}>
          Could not update changes at the moment, please try again later
        </Modal>
        {formContent}
      </form>
    </div>
  );

};

const mapStateToProps = state => {
	return {
		isLoading: state.company.isLoading,
		error: state.company.error
	};
};

const mapDispatchToProps = dispatch => {
	return {
		updateCompanyFail: () => dispatch({ type: actionTypes.UPDATECOMPANYFAIL }),
		resetCompany: () => dispatch({ type: actionTypes.COMPANYRESET }),
		getOneCompany: data => dispatch(actionCreators.getOneCompany(data)),
		updateCompanyIntro: CompanyData => dispatch(actionCreators.updateCompanyIntro(CompanyData))
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditIntro));
