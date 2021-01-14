import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { useForm } from "../../../../shared/utils/useForm";

// import * as actionTypes from "../../../../store/actions/actions";
import * as actionCreators from "../../../../store/actions/index";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MIN,
  VALIDATOR_EMAIL,
  VALIDATOR_ALWAYSTRUE,
} from "../../../../shared/utils/validator";

// import Modal from "../../../../shared/UI_Element/Modal";
// import SpinnerCircle from "../../../../shared/UI_Element/Spinner/SpinnerCircle";
import Button from "@material-ui/core/Button";
import Input from "../../../../shared/UI_Element/Input";

import classes from "./OrderBCForm.module.css";

const OrderBCForm = (props) => {
  const [formState, onInputHandler] = useForm(
    {
      education: {
        value: "",
        isValid: false,
      },
      gender: {
        value: "",
        isValid: false,
      },
      note: {
        value: "",
        isValid: true,
      },
      jobFunction: {
        value: "",
        isValid: false,
      },
      emailRecipient: {
        value: "",
        isValid: false,
      },
      amount: {
        value: "",
        isValid: false,
      },
      location: {
        value: false,
        isValid: true,
      },
      shift: {
        value: false,
        isValid: true,
      },
      min: {
        value: "",
        isValid: false,
      },
      max: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const orderData = {
      invoiceId: props.auth.userId.slice(0, 6),
      companyId: props.auth.userId,
      token: props.auth.token,
      education: formState.inputs.education.value,
      gender: formState.inputs.gender.value,
      location: formState.inputs.location.value,
      shift: formState.inputs.shift.value,
      min: formState.inputs.min.value,
      max: formState.inputs.max.value,
      note: formState.inputs.note.value,
      jobFunction: formState.inputs.jobFunction.value,
      emailRecipient: formState.inputs.emailRecipient.value,
      amount: formState.inputs.amount.value,
    };
    try {
      const res = await props.createOrderCandidate(orderData);
      if (res) {
        console.log(res);
        props.history.push(`/co/${res.order.id}/invoice`);
      } else {
        console.log("no res detected");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onChangeHandler = (e) => {
    const elementId = e.target.name;
    const elementValue = e.target.value;
    onInputHandler(elementId, elementValue, true);
  };

  const checkHandler = (e) => {
    const element = document.getElementById(e.target.name);
    onInputHandler(e.target.name, element.checked, true);
  };
  // let formContent = <SpinnerCircle />;

  // if (!props.isLoading && data) {
  let formContent = (
    <React.Fragment>
      <div className={classes.ContainerFlex}>
        <p className={classes.FormTitle}>Order bulk candidates</p>

        <div className={classes.FormRow}>
          <div className={classes.EditLabel}>
            <div className={classes.Inputs}>
              <div className={classes.RadioGroup}>
                <p className={classes.RadioLabel}>Pendidikan</p>
                <div
                  className={classes.RadioGroupInput}
                  onChange={onChangeHandler}
                >
                  <input
                    type="radio"
                    value="SMA"
                    name="education"
                    className={classes.RadioValue}
                  />{" "}
                  <p className={classes.RadioText}>SMA</p>
                  <input
                    type="radio"
                    value="SMK"
                    name="education"
                    className={classes.RadioValue}
                  />{" "}
                  <p className={classes.RadioText}>SMK</p>
                  <input
                    type="radio"
                    value="D3"
                    name="education"
                    className={classes.RadioValue}
                  />{" "}
                  <p className={classes.RadioText}>D3</p>
                  <input
                    type="radio"
                    value="S1"
                    name="education"
                    className={classes.RadioValue}
                  />{" "}
                  <p className={classes.RadioText}>S1</p>
                  <input
                    type="radio"
                    value="S2"
                    name="education"
                    className={classes.RadioValue}
                  />{" "}
                  <p className={classes.RadioText}>S2</p>
                  <input
                    type="radio"
                    value="S3"
                    name="education"
                    className={classes.RadioValue}
                  />{" "}
                  <p className={classes.RadioText}>S3</p>
                </div>
              </div>

              <div>
                <p className={classes.AgeLabel}>Umur</p>
                <div className={classes.AgeGroup}>
                  <Input
                    inputType="number"
                    id="min"
                    inputClass="Age"
                    labelClass="Range"
                    validatorMethod={[VALIDATOR_MIN(1)]}
                    onInputHandler={onInputHandler}
                    type="number"
                    initValue="0"
                    min="0"
                    step="1"
                    label="min"
                  />
                  <Input
                    inputType="number"
                    id="max"
                    inputClass="Age"
                    labelClass="Range"
                    validatorMethod={[VALIDATOR_MIN(1)]}
                    onInputHandler={onInputHandler}
                    type="number"
                    initValue="0"
                    min="0"
                    step="1"
                    label="max"
                  />
                </div>
              </div>
            </div>

            <div className={classes.Inputs}>
              <div onChange={onChangeHandler} className={classes.RadioGroup}>
                <p className={classes.RadioLabel}>Jenis kelamin</p>
                <div className={classes.RadioGroupInput}>
                  <input
                    type="radio"
                    value="pria"
                    name="gender"
                    className={classes.RadioValue}
                  />{" "}
                  <p className={classes.RadioText}>pria</p>
                  <input
                    type="radio"
                    value="wanita"
                    name="gender"
                    className={classes.RadioValue}
                  />{" "}
                  <p className={classes.RadioText}>wanita</p>
                  <input
                    type="radio"
                    value="bebas"
                    name="gender"
                    className={classes.RadioValue}
                  />{" "}
                  <p className={classes.RadioTextGender}>no criteria</p>
                </div>
              </div>

              <div className={classes.CandidateAmount}>
                <Input
                  inputType="number"
                  id="amount"
                  inputClass="Amount"
                  validatorMethod={[VALIDATOR_MIN(1)]}
                  onInputHandler={onInputHandler}
                  type="number"
                  initValue="0"
                  min="0"
                  step="1"
                  label="Jumlah kandidat*"
                />
              </div>
            </div>

            <div className={classes.CheckInputs}>
              <div className={classes.CheckGroup}>
                <input
                  type="checkbox"
                  value={formState.inputs.location.value}
                  name="location"
                  id="location"
                  className={classes.CheckValue}
                  onChange={checkHandler}
                />
                <p className={classes.CheckText}>
                  Bersedia ditempatkan diluar kota
                </p>
              </div>
              <div className={classes.CheckGroup}>
                <input
                  type="checkbox"
                  value={formState.inputs.location.value}
                  name="shift"
                  id="shift"
                  className={classes.CheckValue}
                  onChange={checkHandler}
                />
                <p className={classes.CheckText}>
                  Bersedia bekerja secara shift
                </p>
              </div>
            </div>

            <div>
              <Input
                inputType="input"
                id="jobFunction"
                inputClass="Position"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="Posisi pekerjaan yang ditawarkan*"
              />
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <Input
                inputType="input"
                id="emailRecipient"
                inputClass="Position"
                validatorMethod={[VALIDATOR_EMAIL()]}
                onInputHandler={onInputHandler}
                label="Email Penerima*"
              />
            </div>

            <Input
              inputType="textarea"
              id="note"
              inputClass="JobSpec"
              validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
              onInputHandler={onInputHandler}
              label="Catatan tambahan*"
            />
          </div>
        </div>

        <div className={classes.Footer}>
          <Button
            disabled={!formState.formIsValid}
            variant="contained"
            color="primary"
            type="submit"
          >
            Save
          </Button>
        </div>
      </div>
    </React.Fragment>
  );

  // }
  // const onCancelHandler = () => {
  //   props.resetCompany();
  // };

  return (
    <form onSubmit={onSubmitHandler} className={classes.Container}>
      {/* <Modal show={props.error} onCancel={onCancelHandler}>
          Could not update changes at the moment, please try again later
        </Modal> */}
      {formContent}
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    isLoading: state.finance.isLoading,
    error: state.finance.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createOrderCandidate: (data) =>
      dispatch(actionCreators.createOrderCandidate(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(OrderBCForm));
