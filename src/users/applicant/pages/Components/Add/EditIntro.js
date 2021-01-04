import React, { useEffect, useState } from "react";
import { useForm } from "../../../../../shared/utils/useForm";
import { withRouter, useParams } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";

import * as actionTypes from "../../../../../store/actions/actions";
import * as actionCreators from "../../../../../store/actions/index";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_ALWAYSTRUE,
} from "../../../../../shared/utils/validator";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Modal from "../../../../../shared/UI_Element/Modal";
import SpinnerCircle from "../../../../../shared/UI_Element/Spinner/SpinnerCircle";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Input from "../../../../../shared/UI_Element/Input";
import SaveButton from "../../../../../shared/UI_Element/SaveButton";
import WorkFieldData from "../../../../../shared/UI_Element/WorkFieldData";

import classes from "./EditIntro.module.css";

const EditIntro = (props) => {
  const { applicantid } = useParams();
  const [data, setData] = useState();
  const [interest, setInterest] = useState("");
  const [open, setOpen] = useState(false);
  let push = props.push;

  const [formState, onInputHandler] = useForm(
    {
      firstName: {
        value: data ? data.firstName : null,
        isValid: data && data.firstName ? true : false,
      },

      lastName: {
        value: data ? data.lastName : null,
        isValid: data && data.lastName ? true : false,
      },
      headline: {
        value: "",
        isValid: false,
      },
      dateOfBirth: {
        value: "",
        isValid: false,
      },
      gender: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      city: {
        value: "",
        isValid: false,
      },
      state: {
        value: "",
        isValid: false,
      },
      zip: {
        value: "",
        isValid: false,
      },
      email: {
        value: data ? data.email : null,
        isValid: data && data.email ? true : false,
      },
      phone: {
        value: "",
        isValid: false,
      },
      outOfTown: {
        value: false,
        isValid: true,
      },
      workShifts: {
        value: false,
        isValid: true,
      },
      autoSend: {
        value: false,
        isValid: true,
      },
      autoRemind: {
        value: false,
        isValid: true,
      },
      headhunterProgram: {
        value: false,
        isValid: true,
      },
      interest: {
        value: false,
        isValid: true,
      },
    },
    false
  );

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!formState.formIsValid) {
      return props.updateApplicantFail();
    }

    const ApplicantData = {
      applicantId: data.id,
      firstName: formState.inputs.firstName.value,
      lastName: formState.inputs.lastName.value,
      headline: formState.inputs.headline.value,
      dateOfBirth: formState.inputs.dateOfBirth.value,
      gender: formState.inputs.gender.value,
      email: formState.inputs.email.value,
      address: formState.inputs.address.value,
      city: formState.inputs.city.value,
      state: formState.inputs.state.value,
      zip: formState.inputs.zip.value,
      phone: formState.inputs.phone.value,
      outOfTown: formState.inputs.outOfTown.value,
      workShifts: formState.inputs.workShifts.value,
      autoSend: formState.inputs.autoSend.value,
      autoRemind: formState.inputs.autoRemind.value,
      headhunterProgram: formState.inputs.headhunterProgram.value,
      interest: formState.inputs.interest.value,
    };

    try {
      const res = await props.updateApplicantIntro(ApplicantData);
      if (res) {
        console.log(res);
      } else {
        console.log("no response");
      }
      !push && props.history.push(`/ap/${applicantid}`);
    } catch (err) {
      console.log(err);
    }
  };

  const { getOneApplicant } = props;
  useEffect(() => {
    getOneApplicant(applicantid).then((res) => {
      setData(res.applicant);
    });
  }, [getOneApplicant, applicantid]);

  const handleChange = (e) => {
    const elementId = e.target.name;
    const elementValue = e.target.value;
    onInputHandler(elementId, elementValue, true);
    setInterest(e.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const onManualInputHandler = (e) => {
    const elementId = e.target.name;
    const elementValue = e.target.value;

    onInputHandler(elementId, elementValue, true);
  };

  let formContent = <SpinnerCircle />;

  if (!props.isLoading && data) {
    formContent = (
      <React.Fragment>
        <div className={classes.ContainerFlex}>
          <p className={classes.FormTitle}>About Me</p>

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
                  <input type="file" />
                  <span className={classes.InputButtonText}> Upload File </span>
                </label>
              </div>
              <Input
                inputType="input"
                id="firstName"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="First Name*"
                initValue={data.firstName}
                initIsValid={true}
              />

              <Input
                inputType="input"
                id="lastName"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="Last Name*"
                initValue={data.lastName}
                initIsValid={true}
              />

              <Input
                inputType="input"
                id="headline"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="Headline*"
                placeholder="Ex: Full stack developer"
              />
              <Input
                inputType="customdate"
                id="dateOfBirth"
                style={{ marginBottom: "1rem" }}
                validatorMethod={[VALIDATOR_ALWAYSTRUE()]}
                onInputHandler={onInputHandler}
                views={["year", "month", "date"]}
                label="Tanggal Lahir"
                maxDate={moment()}
                initValue={moment()}
                format="dd/MM/yyyy"
              />
              <div
                id="gender"
                onChange={onManualInputHandler}
                style={{
                  textAlign: "start",
                  marginBottom: "1rem",
                  color: "rgba(58, 81, 153, 1)",
                  fontSize: ".9rem",
                }}
              >
                Jenis Kelamin:
                <label>
                  <input type="radio" value="male" name="gender" /> Pria
                </label>
                <label>
                  <input type="radio" value="female" name="gender" /> Wanita
                </label>
              </div>
              <Input
                inputType="input"
                id="address"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="Address*"
                placeholder="Ex: Cilandak Street no.188, South Jakarta"
              />

              <Input
                inputType="input"
                id="city"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="City*"
                placeholder="Ex: South Jakarta"
              />

              <Input
                inputType="input"
                id="state"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="State*"
                placeholder="Ex: West Java"
              />

              <Input
                inputType="input"
                id="zip"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="Zip*"
                placeholder="Ex: 16869"
              />

              <Input
                inputType="input"
                id="email"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_EMAIL()]}
                onInputHandler={onInputHandler}
                label="Email*"
                placeholder="Ex: Dwi_haryo@hotmail.com"
                initValue={data.email}
                initIsValid={true}
              />

              <Input
                inputType="input"
                id="phone"
                inputClass="AddJobInput"
                validatorMethod={[VALIDATOR_REQUIRE()]}
                onInputHandler={onInputHandler}
                label="Phone*"
                placeholder="Ex: 08179192342"
              />

              <FormControl
                className={classes.formControl}
                style={{ marginBottom: "1rem" }}
              >
                <InputLabel id="interest" style={{ fontSize: "1rem" }}>
                  Bidang minat
                </InputLabel>

                <Select
                  labelId="interest"
                  id="interest"
                  name="interest"
                  open={open}
                  onClose={handleClose}
                  onOpen={handleOpen}
                  value={interest}
                  onChange={handleChange}
                  style={{ fontSize: "0.9rem", textAlign: "left" }}
                >
                  <MenuItem value="" style={{ fontSize: "0.9rem" }}>
                    <em>Belum ada untuk saat ini</em>
                  </MenuItem>
                  {WorkFieldData.sort().map((work, i) => {
                    return (
                      <MenuItem
                        id={i}
                        value={work}
                        style={{ fontSize: "0.9rem" }}
                        key={i}
                      >
                        {work}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              <label onChange={onManualInputHandler}>
                <input
                  id="outOfTown"
                  type="checkbox"
                  name="outOfTown"
                  value={true}
                />{" "}
                Bersedia ditempatkan di luar kota asal
              </label>
              <label onChange={onManualInputHandler}>
                <input
                  id="workShifts"
                  type="checkbox"
                  name="workShifts"
                  value={true}
                />{" "}
                Bersedia bekerja dengan sistem shift
              </label>
              <label onChange={onManualInputHandler}>
                <input
                  id="autoSend"
                  type="checkbox"
                  name="autoSend"
                  value={true}
                />
                saya bersedia didaftarkan kerja secara otomatis oleh Crossbel
              </label>
              <label onChange={onManualInputHandler}>
                <input
                  id="autoRemind"
                  type="checkbox"
                  name="autoRemind"
                  value={true}
                />{" "}
                saya ingin diingatkan bila ada pekerjaan yang cocok dengan minat
                saya
              </label>
              <label onChange={onManualInputHandler}>
                <input
                  id="headhunterProgram"
                  type="checkbox"
                  name="headhunterProgram"
                  value={true}
                />{" "}
                saya ingin mengikuti headhunter program Crossbell asal
              </label>
            </div>
          </div>

          <SaveButton
            btnClass="SaveButton"
            disabled={!formState.formIsValid}
            placeholder="Save"
          />
        </div>
      </React.Fragment>
    );
  }

  const onCancelHandler = () => {
    props.resetApplicant();
  };

  return (
    <form onSubmit={onSubmitHandler} className={classes.Container}>
      <Modal show={props.error} onCancel={onCancelHandler}>
        Could not update changes at the moment, please try again later
      </Modal>
      {formContent}
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.applicant.isLoading,
    error: state.applicant.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateApplicantFail: () =>
      dispatch({ type: actionTypes.UPDATEAPPLICANTFAIL }),
    resetApplicant: () => dispatch({ type: actionTypes.APPLICANTRESET }),
    getOneApplicant: (data) => dispatch(actionCreators.getOneApplicant(data)),
    updateApplicantIntro: (ApplicantData) =>
      dispatch(actionCreators.updateApplicantIntro(ApplicantData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditIntro));
