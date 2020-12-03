import React, { useEffect, useState } from "react";
import { useParams, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { useForm } from "../../../../shared/utils/useForm";

import * as actionTypes from "../../../../store/actions/actions";
import * as actionCreators from "../../../../store/actions/index";
import { VALIDATOR_MINLENGTH } from "../../../../shared/utils/validator";

import Modal from "../../../../shared/UI_Element/Modal";
import SpinnerCircle from "../../../../shared/UI_Element/Spinner/SpinnerCircle";
import Input from "../../../../shared/UI_Element/Input";

import classes from "./EditMission.module.css";

const EditMission = (props) => {
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
      mission: {
        value: data ? data.mission : null,
        isValid: data && data.mission ? true : false,
      },
    },
    false
  );

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!formState.formIsValid) {
      return props.updateCompanyFail();
    }

    const updatedData = {
      companyId: companyid,
      mission: formState.inputs.mission.value,
    };
    try {
      const res = await props.updateCompanyMission(updatedData);
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

  let formContent = <SpinnerCircle />;

  if (!props.isLoading && data) {
    formContent = (
      <React.Fragment>
        <div className={classes.ContainerFlex}>
          <p className={classes.FormTitle}>Edit Company Mission</p>

          <div className={classes.FormRow}>
            <div className={classes.EditLabel}>
              <Input
                inputType="textarea"
                id="mission"
                inputClass="EditProfileTextArea"
                validatorMethod={[VALIDATOR_MINLENGTH(20)]}
                onInputHandler={onInputHandler}
                label="Mission*"
                initValue={data.mission}
                initIsValid={data.mission}
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

const mapStateToProps = (state) => {
  return {
    isLoading: state.company.isLoading,
    error: state.company.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCompanyFail: () => dispatch({ type: actionTypes.UPDATECOMPANYFAIL }),
    resetCompany: () => dispatch({ type: actionTypes.COMPANYRESET }),
    getOneCompany: (data) => dispatch(actionCreators.getOneCompany(data)),
    updateCompanyMission: (CompanyData) =>
      dispatch(actionCreators.updateCompanyMission(CompanyData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditMission));
